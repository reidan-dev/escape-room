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

## 2. Paano gumagana ang bawat station (3 puzzle: physical + interactive + combination)

**Bawat station (isang webpage bawat sangkap) ay may 3 puzzle tile**, lahat naka-display nang sabay-sabay — pwedeng solusyunan sa kahit anong pagkakasunod-sunod, pwedeng hati-hatiin ng team:

1. **Physical** — isang printed logic/spatial/cipher/math puzzle (`printables/physical-puzzle-*.html`), self-checking sa papel mismo, walang gunting/prop na kailangan. Ang sagot ay isang **LETRA**.
2. **Interactive** — isang maliit na digital puzzle sa phone (bilangin, kumpletuhin, kalkulahin) — nag-iisip talaga, hindi lang motor-skill/reflex. Ang sagot ay isang **NUMERO**.
3. **Combination** — pagsamahin ang letra + numero mula sa dalawang nauna para ma-unlock ang final code ng sangkap na 'yun.

Walang trivia/wordplay na riddle kahit saan, walang phone sensors/permissions na kailangan — puro genuine logic, cipher, at math na puzzle.

## 3. Mga Station, ang 3 Puzzle Bawat Isa, at Final Code

### 🌬️ Hangin (spatial reasoning) — final code `W9`
1. **Physical:** alin sa 4 candidate shape ang totoong pag-ikot lamang (hindi mirrored) ng target → letrang `W`
2. **Interactive:** bilangin ang 2 pangkat ng icon (5 + 4) → `9`
3. **Combination:** `W9`

### 💧 Tubig (cipher) — final code `T2`
1. **Physical:** i-decode ang ciphertext `TVDLK` gamit ang dumaragdag na shift (+0,+1,+2,+3,+4) → nagiging "TUBIG" → unang letra `T`
2. **Interactive:** kumpletuhin ang 3×3 magic square (blangkong cell, dapat magkaparehong kabuuan ang bawat hilera/hanay/diagonal) → `2`
3. **Combination:** `T2`

### 🪨 Lupa (logic-grid deduction) — final code `L4`
1. **Physical:** logic grid, 5 palatandaan, 4 bagay sa 4 puwesto — sino ang nasa ikatlong puwesto? (sagot: Pala) → letrang `L`
2. **Interactive:** A+B+C=9, B=2, A=C−1 → ano ang C? → `4`
3. **Combination:** `L4`

### 🔥 Apoy (math/balanse) — final code `B7`
1. **Physical:** Kalan=2×Kahoy, 3×Kahoy=Baga+3, Baga=6 → ano ang Kahoy? (sagot: 3) → letrang `B`
2. **Interactive:** susunod sa sequence na 23, 19, 15, 11, ? → `7`
3. **Combination:** `B7`

### ✨ Aether (mixed) — final code `K5`
1. **Physical:** i-decode ang ciphertext `NDOX` gamit ang palaging +3 shift → nagiging "KALU..." → unang letra `K`
2. **Interactive:** 🔮+🌙=12, 🌙=7 → ano ang 🔮? → `5`
3. **Combination:** i-type ang `K5` KASAMA ang 4 code mula sa ibang sangkap (Lupa/Tubig/Apoy/Hangin) — dito lang required ang lahat ng 4, bilang pagbubuklod ng Aether sa lahat ng elemento.

**Final Lock combination** (`final/final.html`): `L4-T2-B7-W9-K5` (Lupa-Tubig-Apoy-Hangin-Aether) — hindi type-in, **rotary dial** na may 5 pares ng letter/digit reels na pinipihit (click/scroll/swipe) hanggang tama ang combination.

Kung gusto mong palitan ang mga sagot: `FRAGMENT_LETTER`/`FRAGMENT_DIGIT`/`FINAL_CODE` sa `<script>` ng bawat `puzzles/*.html`, `CORRECT` sa `final/final.html`, at ang laman ng puzzle mismo sa kani-kanyang `printables/physical-puzzle-*.html`.

## 4. Prep Checklist (gawin BAGO ang party)

### 📱 QR Codes ng mga Station
1. Buksan ang `printables/qr-codes.html` (link din sa GM menu ng Hub — ⚙ button sa ibabang-kanan), i-print, gupitin, at idikit sa tamang physical station. Naka-hardcode na ang deployed URL (`DEPLOY_BASE` sa `<script>` ng file) kaya tama ang QR kahit binuksan mo lokal lang para i-preview — **kung mag-iiba ang hosting URL mo, palitan ang constant na 'yun.**
2. I-test munang i-scan ang bawat QR gamit ang sariling phone bago ang party.

### 🧩 Physical Puzzles (lahat ng 5 sangkap)
- I-print ang `printables/physical-puzzle-air.html`, `-water.html`, `-earth.html`, `-fire.html`, `-aether.html` — 1 kopya bawat team bawat station. Ilagay sa tabi ng QR code sa bawat station.
- Bawat isa ay self-contained (may sariling instructions + legend/lookup table) — walang gunting o ibang gamit na kailangan, basa at isip lang.
- **I-solve mo muna mismo ang lahat ng 5 bago i-print** para masiguro walang typo sa mga printable (tingnan Section 3 para sa buong solusyon ng bawat isa).

### 📜 Story Card
- I-print ang `printables/story-card.html`, 1 kopya bawat team, ibigay bago magsimula ang timer.

### 📱 Tungkol sa interactive puzzles
- Walang phone permission/sensor na kailangan kahit saan ngayon — puro simpleng number/text input, gagana sa kahit anong browser/device (kahit laptop pa nga, pero mas convenient sa phone dahil doon nakadikit ang QR).
- I-solve mo muna mismo ang bawat interactive puzzle para ma-verify na tama ang mga sagot bago ang party.

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

Wala nang HTTPS/sensor requirement ngayon (walang phone permissions na ginagamit) — pero i-deploy pa rin muna bago i-print ang QR codes, para tama ang naka-encode na URL doon.

Ang mga codes ay naka-store lang sa localStorage ng browser ng Hub, kaya iisang device/browser lang ang dapat gamiting "official" Hub + Final Lock.

## 7. Pag-reset

Sa Hub, i-click ang ⚙ GM button sa ibabang-kanan → "Reset Game." Bubura nito ang timer state at balik sa setup screen. Puwede ring i-clear ang localStorage manually via DevTools kung kinakailangan.

---

Enjoy, at wag kalimutan si Aling Turing sa susunod na party. 🕯️
