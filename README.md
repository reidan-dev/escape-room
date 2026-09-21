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

## 2. Paano gumagana ang bawat station (4 HIWALAY na puzzle, walang riddles)

**Bawat station (isang webpage bawat sangkap) ay may 4 independiyenteng puzzle tile**, lahat naka-display nang sabay-sabay sa parehong page — pwedeng solusyunan sa kahit anong pagkakasunod-sunod, at pwedeng hati-hatiin ng team (iba't ibang miyembro, iba't ibang tile, sabay-sabay). Bawat tile may sariling ✅/🔒 badge; kapag 4/4 na, awtomatikong lalabas ang 2-character na final code ng sangkap na 'yun. Target na tagal: ~10 minuto kada station kung sabay-sabay ginagawa ng team.

Walang typed-answer na riddle kahit saan — puro tactile/motor-skill/sensor na hamon.

## 3. Mga Station, ang 4 Puzzle Bawat Isa, at Final Code

### 🌬️ Hangin — final code `W9`
1. **Susi mula sa Papel** (physical tear-card, walang gunting) → unlock code `QK37`
2. **Itutok ang Hangin** — itutok ang phone sa direksyon (gauge ±18°), panatilihin 2.5s (walang hihip)
3. **Huminga nang Malalim** — humipan sa mic, panatilihin 2.5s (walang direction)
4. **Guhitin ang Hangin** — i-drag ang daliri sa 3 checkpoint nang tuloy-tuloy

### 💧 Tubig — final code `T2`
1. **Susi mula sa Papel** → unlock code `TZ84`
2. **Buhusan Hanggang sa Guhit** — itagilid para abutin ang 64–72% na zone (minsan lang, hindi kailangang tagalan)
3. **Panatilihing Patag** — ihiga ang phone nang level, panatilihin 2.5s
4. **Guhitin ang Alon** — trace-checkpoint task

### 🪨 Lupa — final code `L4`
1. **Susi mula sa Papel** → unlock code `MR29`
2. **Hukayin** — shake-to-fill meter (accelerometer)
3. **Ihalo ang Semento** — umikot ang phone nang 2 buong ikot (orientation alpha rotation, iba sa shake)
4. **Guhitin ang Bato** — trace-checkpoint task

### 🔥 Apoy — final code `B7`
1. **Susi mula sa Papel** → unlock code `JX56`
2. **Kuskusin** — drag/rub speed sa screen (walang permission na kailangan)
3. **Pukpukin ang Pingkian** — rapid-tap rhythm (discrete taps, hindi drag)
4. **Guhitin ang Apoy** — trace-checkpoint task

### ✨ Aether — final code `K5`
1. **Susi mula sa Papel** → unlock code `VN71`
2. **Pagsamahin ang mga Sangkap** — i-type ang 4 code sa itaas (Lupa/Tubig/Apoy/Hangin)
3. **Manahimik** — hawakan nang halos-hindi-gumagalaw 2.5s (kabaligtaran ng iba — stillness, hindi motion)
4. **Guhitin ang Bilog** — trace-checkpoint task

**Non-obvious ang lahat ng unlock codes** — random alphanumeric (hindi totoong salita tulad ng dating "WIND"/"ROCK" na basta mahuhulaan), kaya kailangan talagang punitin at ayusin ang tear card.

**Final Lock combination** (`final/final.html`): `L4-T2-B7-W9-K5` (Lupa-Tubig-Apoy-Hangin-Aether) — hindi type-in, **rotary dial** na may 5 pares ng letter/digit reels na pinipihit (click/scroll/swipe) hanggang tama ang combination.

Kung gusto mong palitan ang mga unlock codes o final codes: `UNLOCK_CODE` sa simula ng `<script>` ng bawat `puzzles/*.html`, `CORRECT` sa `final/final.html`, at ang tear card data (letters + shuffle order) sa `<script>` sa dulo ng bawat `printables/tear-puzzle-*.html`.

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
- **Air** — puzzle 2 kailangan ng orientation access, puzzle 3 kailangan ng mic access. Magkahiwalay na permission bawat isa.
- **Water** — puzzle 2 at 3 pareho kailangan ng orientation access (magkahiwalay na "Simulan" button, kaya pwedeng dalawang beses mag-prompt ang iOS sa parehong page — normal lang, i-allow lang).
- **Earth** — puzzle 2 kailangan ng motion access (shake), puzzle 3 kailangan ng orientation access (rotation). Magkaibang sensor, magkahiwalay na permission.
- **Aether** — puzzle 3 kailangan ng orientation access.
- **Fire** — walang permission na kailangan kahit saan (touch/mouse drag/tap lang), pinaka-robust sa lahat.
- Lahat ng sensor puzzle ay may **manual fallback controls** na awtomatikong lalabas kapag tumanggi o walang sensor ang device — hindi ma-stuck ang players.
- **Kailangan ng HTTPS** ang mic/motion/orientation access — gagana lang once naka-host (Section 6), hindi sa plain file o LAN IP sa phone.
- I-test munang i-solve ang bawat puzzle tile gamit ang totoong phone bago ang party.

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
