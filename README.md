# 🎃 Ang Sumpa ni Aling Turing — Halloween Escape Room

Isang print + website na escape room para sa Halloween party. Group ng magkakaibigan, may lason sa punch, 80 minuto bago tuluyang manigas — kailangang pagsamahin ang 5 sangkap ng mundo (Lupa, Tubig, Apoy, Hangin, Aether) para makagawa ng lunas bago maubos ang oras.

**Ito ay GM (Game Master) guide.** Wag ipakita ito sa mga players — dito nakalagay ang lahat ng answer key.

---

## 1. Buod ng Mekanika

- 2 teams, 4+ members bawat isa (i-configure sa Hub bago simulan).
- **Ang Hub (`index.html`) ay standalone** — walang direct links papunta sa mga puzzle. Nakikita lang dito ang timer at team roster (ito ang naka-project/naka-display sa lahat). Ang mga puzzle ay naa-access ng mga players sa kanya-kanyang phone via **QR code** na naka-print at nakadikit sa bawat physical station.
- 80-minute countdown timer, laging naka-display sa Hub.
- Habang tumatakbo ang timer:
  - **Minuto 10, 20, 30, 40, 50, 60** — random 1–3 members bawat team ang "kailangan uminom ng shot" (lalabas sa screen, GM ang mag-eexecute nang physical).
  - **Minuto 65, 70, 75, 80** — random 1–2 members bawat team, mas mabilis na.
- Layunin: i-solve ang 5 puzzle station (Air/Hangin, Water/Tubig, Earth/Lupa, Fire/Apoy, Aether) para makakuha ng 5 code, i-dial sa Final Lock bago maubos ang 80 minuto.

## 2. Paano gumagana ang bawat station (4 hakbang, walang riddles)

**Bawat station ay may parehong balangkas** — physical tear-card muna, saka phone/sensor mini-game:

1. **Physical (off-page):** may naka-print na "tear card" sa bawat station — 4 piraso, bawat isa may letra/numero at iba't ibang lambot ng abo (gray shade). Punitin (kamay lang, walang gunting) at ayusin mula pinakamadilim hanggang pinakamaliwanag. Ang mga character, mula kaliwa papuntang kanan, ang UNLOCK CODE — random alphanumeric, hindi totoong salita, kaya hindi basta mahuhulaan.
2. **Hakbang 1/4 (sa website):** i-type ang UNLOCK CODE para ma-access ang puzzle.
3. **Hakbang 2/4:** i-allow ang kinakailangang phone permission (kung meron) — ihanda ang mekanismo.
4. **Hakbang 3/4 → 4/4:** gawin ang interactive mini-game (sensor/gesture-based, hindi trivia) hanggang mag-100% ang progress — awtomatikong lalabas ang 2-character na code ng sangkap na 'yun.

Walang typed-answer na riddle kahit saan — puro tactile/interactive.

## 3. Mga Station, Unlock Code, at Final Code

| Sangkap | Unlock Code (physical tear card) | Mobile mini-game | Final code |
|---|---|---|---|
| 🌬️ Hangin | `QK37` | Itutok ang phone sa tamang direksyon (gauge, ±18°) habang humihip sa mic, hanggang malinaw ang fog | `W9` |
| 💧 Tubig | `TZ84` | Itagilid ang phone para magbuhos ng tubig papunta sa 64–72% na zone (makitid), panatilihing steady 3 segundo | `T2` |
| 🪨 Lupa | `MR29` | I-shake ang phone nang malakas para "maghukay" hanggang mahanap ang laman ng hukay | `L4` |
| 🔥 Apoy | `JX56` | I-drag/kuskusin ang daliri sa screen nang mabilis hanggang sumiklab | `B7` |
| ✨ Aether | `VN71` (+ apat na code sa itaas) | Hawakan/i-steady ang phone nang halos-hindi-gumagalaw (kabaligtaran ng iba!) hanggang ma-charge | `K5` |

**Tahasang non-obvious ang unlock codes ngayon** (dating totoong salita tulad ng "WIND"/"ROCK" na basta pwedeng hulaan kahit hindi pa nagagawa ang physical puzzle — pinalitan ng random alphanumeric para talagang kailangang punitin at ayusin ang tear card). Mas mahigpit din ang lahat ng sensor tolerance/sustain time kumpara sa unang bersyon.

**Final Lock combination** (`final/final.html`): `L4-T2-B7-W9-K5` (Lupa-Tubig-Apoy-Hangin-Aether) — hindi na type-in, **rotary dial** na may 5 pares ng letter/digit reels na pinipihit (click/scroll/swipe) hanggang tama ang combination.

Kung gusto mong palitan ang mga unlock codes o final codes, nasa `<script>` ng kani-kanyang file ang lahat (search `UNLOCK_CODE` sa `puzzles/*.html`, at `CORRECT` sa `final/final.html`). Ang tear card data (letters + shuffle order) ay nasa `<script>` sa dulo ng bawat `printables/tear-puzzle-*.html`.

## 4. Prep Checklist (gawin BAGO ang party)

### 📱 QR Codes ng mga Station
1. Buksan ang `printables/qr-codes.html` (link din sa GM menu ng Hub — ⚙ button sa ibabang-kanan), i-print, gupitin, at idikit sa tamang physical station. Naka-hardcode na ang deployed URL (`DEPLOY_BASE` sa `<script>` ng file) kaya tama ang QR kahit binuksan mo lokal lang para i-preview — **kung mag-iiba ang hosting URL mo, palitan ang constant na 'yun.**
2. I-test munang i-scan ang bawat QR gamit ang sariling phone bago ang party.

### ✂️ Tear Cards (lahat ng 5 sangkap)
- I-print ang `printables/tear-puzzle-air.html`, `-water.html`, `-earth.html`, `-fire.html`, `-aether.html` — 1 kopya bawat team bawat station. Ilagay sa tabi ng QR code sa bawat station.
- Walang gunting/prop na kailangan — punitin lang gamit ang kamay sa dashed lines.

### 📜 Story Card
- I-print ang `printables/story-card.html`, 1 kopya bawat team, ibigay bago magsimula ang timer.

### 📵 Tungkol sa mga phone sensor
- **Air/Water/Aether** — kailangan ng orientation access (at mic para sa Air). iOS Safari hihingi ng permission prompt bawat page, i-allow lang.
- **Earth** — kailangan ng motion access (accelerometer/shake detection). Parehong permission-prompt pattern sa iOS.
- **Fire** — walang permission na kailangan (touch/mouse drag lang), pinaka-robust sa lahat.
- Lahat ng sensor puzzle ay may **manual fallback controls** na awtomatikong lalabas kapag tumanggi o walang sensor ang device — hindi ma-stuck ang players.
- **Kailangan ng HTTPS** ang mic/motion/orientation access — gagana lang once naka-host (Section 6), hindi sa plain file o LAN IP sa phone.
- I-test munang i-solve ang bawat station gamit ang totoong phone bago ang party.

## 5. Pag-set up ng Hub sa Araw ng Party

1. Buksan ang `index.html` sa browser (o sa naka-host na URL) sa laptop/TV na gagamitin bilang Hub.
2. I-type ang pangalan ng bawat team at ilista ang miyembro (isa bawat linya).
3. I-click ang **"Simulan ang Ritwal"** — dito na magsisimula tumakbo ang 80-minute timer. Hindi na maiuurong maliban kung i-reset (⚙ GM button sa ibabang-kanan).
4. I-project/i-display ang screen na ito kung saan makikita ng lahat.
5. Sa bawat shot-trigger, lalabas ang full-screen alert — basahin ito nang malakas at ibuhos ang shots sa mga nabanggit.
6. Ipaalam sa mga players na i-scan ang QR sa bawat station gamit ang sariling phone.
7. Kapag na-solve na nila ang lahat, pumunta sila sa Final Lock page (may QR din o link sa GM menu) para i-dial ang combination.

## 6. Pag-host (para sa production/live event)

Static site ito — walang backend, kaya kahit saan pwede i-host nang libre:

- **GitHub Pages:** i-push ang repo sa GitHub, i-enable ang Pages sa Settings → Pages → source: `main` branch, root.
- **Netlify / Vercel:** i-drag-and-drop ang folder o i-connect ang GitHub repo, walang build step na kailangan (plain HTML/CSS/JS).

**Mahalaga:** kailangan ng totoong HTTPS deployment (hindi lang local file) para gumana ang sensors ng Air/Water/Earth/Aether sa mga phone ng players. I-deploy muna bago i-print ang QR codes.

Ang mga codes ay naka-store lang sa localStorage ng browser ng Hub, kaya iisang device/browser lang ang dapat gamiting "official" Hub + Final Lock.

## 7. Pag-reset

Sa Hub, i-click ang ⚙ GM button sa ibabang-kanan → "Reset Game." Bubura nito ang timer state at balik sa setup screen. Puwede ring i-clear ang localStorage manually via DevTools kung kinakailangan.

---

Enjoy, at wag kalimutan si Aling Turing sa susunod na party. 🕯️
