# 🎃 Ang Sumpa ni Aling Turing — Halloween Escape Room

Isang print + website na escape room para sa Halloween party. Group ng magkakaibigan, may lason sa punch, 80 minuto bago tuluyang manigas — kailangang pagsamahin ang 5 sangkap ng mundo (Lupa, Tubig, Apoy, Hangin, Aether) para makagawa ng lunas bago maubos ang oras.

**Ito ay GM (Game Master) guide.** Wag ipakita ito sa mga players — dito nakalagay ang lahat ng answer key.

---

## 1. Buod ng Mekanika

- 2 teams, 4+ members bawat isa (i-configure sa Hub bago simulan).
- **Ang Hub (`index.html`) ay standalone** — walang direct links papunta sa mga puzzle. Nakikita lang dito ang timer at team roster (ito ang naka-project/naka-display sa lahat). Ang mga puzzle ay naa-access ng mga players sa kanya-kanyang phone via **QR code** na naka-print at nakadikit sa bawat physical station (tingnan Section 3).
- 80-minute countdown timer, laging naka-display sa Hub.
- Habang tumatakbo ang timer:
  - **Minuto 10, 20, 30, 40, 50, 60** — random 1–3 members bawat team ang "kailangan uminom ng shot" (lalabas sa screen, GM ang mag-eexecute nang physical).
  - **Minuto 65, 70, 75, 80** — random 1–2 members bawat team, mas mabilis na.
- Layunin: i-solve ang 5 puzzle station (Air/Hangin, Water/Tubig, Earth/Lupa, Fire/Apoy, Aether) para makakuha ng 5 code, ipasok sa Final Lock bago maubos ang 80 minuto.
- **Bawat puzzle ay may 3 sub-hakbang** (mga 10 minuto bawat station, depende sa bilis ng team) — hindi na basta isang tanong-sagot lang.

## 2. Mga Puzzle Station at Answer Key

### 🌬️ Hangin (Digital, `puzzles/air.html`) — final code `W9`
Kailangan ng **phone** (hindi laptop) — gagamit ng mic + orientation sensor.
1. **Hakbang 1 — Riddle:** "40 + (9 buwan × 10)" → sagot: **`130`** (degrees). Ito ang unlock papunta sa sensor mini-game.
2. **Hakbang 2 — Sensor mini-game:** ipupuntok ang phone papunta sa naka-highlight na direksyon sa gauge (relative sa unang orientation ng phone, hindi totoong compass) habang humihip sa mic, hanggang mabunyag ang multo sa fog. Kung walang sensor access ang device, otomatikong lalabas ang manual fallback controls (slider + hold-button).
3. **Hakbang 3 — Closing riddle:** "Ako'y walang katawan... Ano ako?" → sagot: **hangin / air / wind**.

### 💧 Tubig (Digital, `puzzles/water.html`) — final code `T2`
Kailangan din ng **phone** — gagamit ng orientation sensor (tilt).
1. **Hakbang 1 — Riddle:** "50% + 10%" → sagot: **`60`** (minimum na porsyento).
2. **Hakbang 2 — Tilt-to-pour mini-game:** itagilid ang phone para "magbuhos," panatilihing steady sa loob ng 60–75% na zone nang 2 segundo. Kung lumagpas sa 100%, "lumalabis" at nagsisimula ulit sa zero. May manual fallback slider kung walang sensor access.
3. **Hakbang 3 — Closing riddle:** "Wala akong kulay pero sumasalamin ako... Ano ako?" → sagot: **tubig / water**.

### 🪨 Lupa (Physical, `puzzles/earth.html` + `printables/earth-cipher-key.html`) — final code `L4`
1. **Hakbang 1 — Gate riddle:** "Ilang hakbang ang shift?" (galing sa Story Card clue tungkol sa Bantay Dagat) → sagot: **`7`**.
2. **Hakbang 2 — Cipher decode:** gamit ang printed lookup table (Caesar shift +7), i-decode ang `HUN ZBZP HF S4` → `ANG SUSI AY L4` → sagot: **`L4`**.
3. **Hakbang 3 — Closing check:** "Ilang letra ang 'LUPA'?" → sagot: **`4`**.

### 🔥 Apoy (Physical, `puzzles/fire.html` + `printables/fire-parchment.html`) — final code `B7`
1. **Hakbang 1 — Gate riddle:** "Ilang minuto ang buong countdown?" (nakikita sa Hub) → sagot: **`80`**.
2. **Hakbang 2 — Rune decode:** gamit ang legend sa parchment, i-decode ang `▲◆● ■▼■★ ▲☾ ✦7` → `ANG SUSI AY B7` → sagot: **`B7`**.
3. **Hakbang 3 — Closing riddle:** "Kabaligtaran ng 'lamig'?" → sagot: **`init`**.

### ✨ Aether (Hybrid, `puzzles/aether.html` + `printables/aether-jumbled-sheet.html`) — final code `K5`
1. **Hakbang 1 — Gate:** i-type ang 4 code (Lupa `L4`, Tubig `T2`, Apoy `B7`, Hangin `W9`).
2. **Hakbang 2 — Checksum riddle:** idagdag ang 4 numero (4+2+7+9) → sagot: **`22`**.
3. **Hakbang 3 — Coordinate reveal:** sasabihin ng website: "ikatlong hilera, ika-apat at ika-limang kahon" — babasahin sa `printables/aether-jumbled-sheet.html` na hawak na ng team simula pa lang → sagot: **`K5`**.

**Final Lock combination** (`final/final.html`): `L4-T2-B7-W9-K5` (Lupa-Tubig-Apoy-Hangin-Aether)

Kung gusto mong palitan ang mga sagot/codes, hardcoded lahat ito sa `<script>` ng kani-kanyang puzzle file — palitan lang nang consistent kung saan-saan ito ginagamit (lalo na sa `puzzles/aether.html` gate at `final/final.html`).

## 3. Prep Checklist (gawin BAGO ang party)

### 📱 QR Codes ng mga Station
1. **I-deploy muna ang site** (tingnan Section 5) bago i-print ang QR codes, para tama ang naka-encode na URL.
2. Buksan ang `printables/qr-codes.html` (may link dito sa GM menu ng Hub — ⚙ button sa ibabang-kanan), i-print, gupitin, at idikit sa tamang physical station (hal. QR ng "Lupa" sa tabi ng lababo kung saan nakita ang grimoire fragment).
3. I-test munang i-scan ang bawat QR gamit ang sariling phone bago ang party.

### 🪨 Earth — Susi ng Lupa
- I-print ang `printables/earth-cipher-key.html` (1 kopya bawat team). Printable lang, walang gunting/prop.

### 🔥 Fire — Parchment ng Apoy
- I-print ang `printables/fire-parchment.html` (1 kopya bawat team). Printable lang, walang ink/heat.

### ✨ Aether — Jumbled Sheet
- I-print ang `printables/aether-jumbled-sheet.html` — ibigay sa bawat team SIMULA PA LANG ng laro (parte ng starting kit, hindi hint na hahanapin mamaya).

### 📜 Story Card
- I-print ang `printables/story-card.html`, 1 kopya bawat team, ibigay bago magsimula ang timer.

### 📵 Tungkol sa Air at Water (sensor puzzles)
- Kailangan ng **HTTPS** ang mic/orientation access (gagana once naka-host sa GitHub Pages/Netlify/Vercel — hindi gagana kung binuksan lang bilang plain file o via LAN IP sa phone).
- Sa iOS Safari, hihingi ng hiwalay na permission prompt bawat puzzle page (orientation + mic) — normal lang 'yan, i-allow.
- Kung tumanggi ang device/browser (o walang sensors), otomatikong lalabas ang manual fallback controls — hindi ma-stuck ang players.
- I-test munang i-scan at i-solve ang Air/Water gamit ang totoong phone bago ang party, para masanay sa calibration.

## 4. Pag-set up ng Hub sa Araw ng Party

1. Buksan ang `index.html` sa browser (o sa naka-host na URL — tingnan Section 5) sa laptop/TV na gagamitin bilang Hub.
2. I-type ang pangalan ng bawat team at ilista ang miyembro (isa bawat linya).
3. I-click ang **"Simulan ang Ritwal"** — dito na magsisimula tumakbo ang 80-minute timer. Hindi na maiuurong maliban kung i-reset (⚙ GM button sa ibabang-kanan).
4. I-project/i-display ang screen na ito kung saan makikita ng lahat.
5. Sa bawat shot-trigger, lalabas ang full-screen alert — basahin ito nang malakas at ibuhos ang shots sa mga nabanggit.
6. Ipaalam sa mga players na i-scan ang QR sa bawat station gamit ang sariling phone para simulan ang bawat puzzle.
7. Kapag na-solve na nila ang lahat, pumunta sila sa Final Lock page (`final/final.html`, may QR din o link sa GM menu) para i-type ang buong combination.

## 5. Pag-host (para sa production/live event)

Static site ito — walang backend, kaya kahit saan pwede i-host nang libre:

- **GitHub Pages:** i-push ang repo sa GitHub, i-enable ang Pages sa Settings → Pages → source: `main` branch, root.
- **Netlify / Vercel:** i-drag-and-drop ang folder o i-connect ang GitHub repo, walang build step na kailangan (plain HTML/CSS/JS).

**Mahalaga:** kailangan ng totoong HTTPS deployment (hindi lang local file) para gumana ang mic/orientation sensors ng Air at Water puzzle sa mga phone ng players. I-deploy muna bago i-print ang QR codes (Section 3).

Ang mga codes ay naka-store lang sa localStorage ng browser ng Hub, kaya iisang device/browser lang ang dapat gamiting "official" Hub + Final Lock.

## 6. Pag-reset

Sa Hub, i-click ang ⚙ GM button sa ibabang-kanan → "Reset Game." Bubura nito ang timer state at balik sa setup screen. Puwede ring i-clear ang localStorage manually via DevTools kung kinakailangan.

---

Enjoy, at wag kalimutan si Aling Turing sa susunod na party. 🕯️
