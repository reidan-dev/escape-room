/* ==========================================================================
   HUB — Ang Kaldero ng Oras
   Timer, team roster, at ang "random shot" announcer.
   Walang backend — lahat naka-save sa localStorage ng browser na ito.
   ========================================================================== */

const STORAGE_KEY = 'poisonGame';
const TOTAL_SECONDS = 80 * 60;

// (minuto ng laro, min members, max members) — ito yung "lumalala ang lason" schedule
const PHASE_1 = [10, 20, 30, 40, 50, 60].map(m => ({ minute: m, min: 1, max: 3 }));
const PHASE_2 = [65, 70, 75, 80].map(m => ({ minute: m, min: 1, max: 2 }));
const SCHEDULE = [...PHASE_1, ...PHASE_2];

let audioCtx = null;
let tickHandle = null;

function defaultState() {
  return {
    teams: [
      { name: 'Kulto ng Kalabasa', members: [] },
      { name: 'Sabaw Squad', members: [] },
    ],
    startedAt: null,
    fired: [],
    won: false,
    lost: false,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!parsed.teams || parsed.teams.length !== 2) return defaultState();
    return parsed;
  } catch (e) {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function unlockAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) { /* walang audio, ok lang, di naman deal breaker */ }
}

function playAlarm() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  [0, 0.35, 0.7].forEach((offset, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(i % 2 === 0 ? 660 : 520, now + offset);
    gain.gain.setValueAtTime(0.0001, now + offset);
    gain.gain.exponentialRampToValueAtTime(0.25, now + offset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.3);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now + offset);
    osc.stop(now + offset + 0.32);
  });
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickVictims(members, min, max) {
  if (!members.length) return [];
  const count = Math.min(members.length, randInt(min, max));
  const pool = [...members];
  const picks = [];
  for (let i = 0; i < count; i++) {
    const idx = randInt(0, pool.length - 1);
    picks.push(pool.splice(idx, 1)[0]);
  }
  return picks;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/* ---------------- SETUP SCREEN ---------------- */

function initSetupScreen() {
  const state = loadState();
  document.getElementById('team1-name').value = state.teams[0].name;
  document.getElementById('team2-name').value = state.teams[1].name;
  document.getElementById('team1-members').value = state.teams[0].members.join('\n');
  document.getElementById('team2-members').value = state.teams[1].members.join('\n');

  document.getElementById('start-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const parseNames = (raw) => raw.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
    const t1members = parseNames(document.getElementById('team1-members').value);
    const t2members = parseNames(document.getElementById('team2-members').value);

    if (t1members.length === 0 || t2members.length === 0) {
      alert('Oy, kailangan may kahit isang miyembro bawat team ha. Wala pang laban kung solo run.');
      return;
    }

    unlockAudio();

    const newState = {
      teams: [
        { name: document.getElementById('team1-name').value.trim() || 'Team 1', members: t1members },
        { name: document.getElementById('team2-name').value.trim() || 'Team 2', members: t2members },
      ],
      startedAt: Date.now(),
      fired: [],
      won: false,
      lost: false,
    };
    saveState(newState);
    showGameScreen();
  });
}

/* ---------------- GAME SCREEN ---------------- */

function renderTeams(state) {
  [0, 1].forEach(i => {
    const nameEl = document.getElementById(`team${i + 1}-display-name`);
    const listEl = document.getElementById(`team${i + 1}-display-members`);
    nameEl.textContent = state.teams[i].name;
    listEl.innerHTML = state.teams[i].members
      .map(m => `<li id="member-${i}-${cssSafe(m)}">${escapeHtml(m)}</li>`)
      .join('');
  });
}

function cssSafe(str) {
  return str.replace(/[^a-z0-9]/gi, '_');
}
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function markDrunk(teamIdx, name, minute) {
  const el = document.getElementById(`member-${teamIdx}-${cssSafe(name)}`);
  if (el) {
    const count = (el.dataset.shots || 0) * 1 + 1;
    el.dataset.shots = count;
    el.innerHTML = `${escapeHtml(name)} <span class="pill">🥃 x${count}</span>`;
  }
}

function showShotOverlay(minute, picksPerTeam, state) {
  const overlay = document.getElementById('shot-overlay');
  const body = document.getElementById('shot-overlay-body');
  const isLate = minute > 60;
  body.innerHTML = `
    <h2 class="spooky">🍷 LUMALALA ANG LASON! 🍷</h2>
    <p class="dim">Minuto ${minute} ng 80. ${isLate ? 'Bilisan na, humihina na sila!' : 'Oras na ng dagdag-lason.'}</p>
    ${state.teams.map((team, i) => `
      <div class="card" style="text-align:left; margin: 10px 0;">
        <strong>${escapeHtml(team.name)}</strong> — kailangan uminom ng shot:
        <ul>${picksPerTeam[i].length ? picksPerTeam[i].map(n => `<li>${escapeHtml(n)}</li>`).join('') : '<li><em>walang tinamaan ngayong round, swerte!</em></li>'}</ul>
      </div>
    `).join('')}
    <p class="dim">GM: pakibuhos na ang shots sa mga nabanggit. 🫡</p>
  `;
  overlay.classList.remove('hidden');
  playAlarm();
}

function dismissOverlay() {
  document.getElementById('shot-overlay').classList.add('hidden');
}

function checkSchedule(state, elapsedMinutes) {
  for (const entry of SCHEDULE) {
    if (elapsedMinutes >= entry.minute && !state.fired.includes(entry.minute)) {
      const picksPerTeam = state.teams.map(t => pickVictims(t.members, entry.min, entry.max));
      state.fired.push(entry.minute);
      picksPerTeam.forEach((picks, i) => picks.forEach(name => markDrunk(i, name, entry.minute)));
      saveState(state);
      showShotOverlay(entry.minute, picksPerTeam, state);
      return; // isang overlay lang sa isang tick, kahit magkasabay pa yan
    }
  }
}

function showLostScreen() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('lost-screen').classList.remove('hidden');
}

function showWonScreen() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('won-screen').classList.remove('hidden');
}

function tick() {
  const state = loadState(); // re-read para makuha rin yung 'won' galing sa ibang tab (final.html)
  if (!state.startedAt) return;

  if (state.won) { showWonScreen(); return; }

  const elapsedSeconds = Math.floor((Date.now() - state.startedAt) / 1000);
  const remaining = Math.max(0, TOTAL_SECONDS - elapsedSeconds);
  document.getElementById('timer-display').textContent = formatTime(remaining);

  const timerCard = document.getElementById('timer-card');
  if (remaining <= 5 * 60) timerCard.classList.add('flicker');

  if (remaining <= 0) {
    if (!state.lost) {
      state.lost = true;
      saveState(state);
    }
    showLostScreen();
    return;
  }

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  checkSchedule(state, elapsedMinutes);
  renderTeams(loadState());
}

function showGameScreen() {
  document.getElementById('setup-screen').classList.add('hidden');
  document.getElementById('game-active').classList.remove('hidden');
  renderTeams(loadState());
  if (tickHandle) clearInterval(tickHandle);
  tickHandle = setInterval(tick, 1000);
  tick();
}

function resetGame() {
  if (!confirm('Sigurado ka bang i-restart ang buong laro? Mabubura yung timer at progress.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function initGmMenu() {
  document.getElementById('gm-toggle').addEventListener('click', () => {
    document.getElementById('gm-menu').classList.toggle('hidden');
  });
  document.getElementById('reset-btn').addEventListener('click', resetGame);
  document.getElementById('shot-overlay-dismiss').addEventListener('click', dismissOverlay);
}

document.addEventListener('DOMContentLoaded', () => {
  initGmMenu();
  const state = loadState();
  if (state.startedAt && !state.lost) {
    unlockAudio();
    showGameScreen();
  } else if (state.startedAt && state.lost) {
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-active').classList.remove('hidden');
    showLostScreen();
  } else {
    initSetupScreen();
  }
});
