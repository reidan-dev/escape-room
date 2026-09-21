# 🎃 Ang Sumpa ni Aling Turing — Halloween Escape Room

Isang print + website na escape room para sa Halloween party. Group ng magkakaibigan, may lason sa punch, 80 minuto bago tuluyang manigas — kailangang pagsamahin ang 5 sangkap ng mundo (Lupa, Tubig, Apoy, Hangin, Aether) para makagawa ng lunas bago maubos ang oras.

**Ito ay GM (Game Master) guide.** Wag ipakita ito sa mga players — dito nakalagay ang lahat ng answer key.

---

## 1. Buod ng Mekanika

- 2 teams, 4+ members bawat isa (i-configure sa Hub bago simulan).
- 80-minute countdown timer sa Hub, laging naka-display (projector/TV/laptop na nakikita ng lahat).
- Habang tumatakbo ang timer:
  - **Minuto 10, 20, 30, 40, 50, 60** — random 1–3 members bawat team ang "kailangan uminom ng shot" (lalabas sa screen, GM ang mag-eexecute nang physical).
  - **Minuto 65, 70, 75, 80** — random 1–2 members bawat team, mas mabilis na.
- Layunin: i-solve ang 5 puzzle (Air/Hangin, Water/Tubig, Earth/Lupa, Fire/Apoy, Aether) para makakuha ng 5 code, ipasok sa Final Lock bago maubos ang 80 minuto.

## 2. Mga Puzzle at Answer Key

| Sangkap | Uri | Code | Paano nakukuha |
|---|---|---|---|
| 🌬️ Hangin | Digital | `W9` | `puzzles/air.html` — sagutan: hangin / air / wind |
| 💧 Tubig | Digital | `T2` | `puzzles/water.html` — sagutan: tubig / water |
| 🪨 Lupa | Physical | `L4` | `printables/earth-cipher-wheel.html` — Caesar cipher, shift +7. Ciphertext: `HUN ZBZP HF S4` → decodes to `ANG SUSI AY L4` |
| 🔥 Apoy | Physical | `B7` | `printables/fire-parchment.html` — invisible ink, revealed by heat (tingnan Section 3) |
| ✨ Aether | Hybrid | `K5` | `puzzles/aether.html` — kailangan munang tama ang 4 code sa itaas, saka lalabas ang grille overlay (`printables/aether-grille-overlay.html`) na i-o-overlay sa `printables/aether-jumbled-sheet.html` |

**Final Lock combination** (`final/final.html`): `L4-T2-B7-W9-K5` (Lupa-Tubig-Apoy-Hangin-Aether)

Kung gusto mong palitan ang mga codes (para hindi ma-guess kung may naka-inspect ng source), palitan sa mga sumusunod na files at siguraduhing consistent lahat:
- `puzzles/air.html`, `puzzles/water.html`, `puzzles/earth.html`, `puzzles/fire.html`, `puzzles/aether.html` (may hardcoded correct answers sa `<script>`)
- `final/final.html` (`CORRECT` constant)
- Kaugnay na printables kung nagbago ang cipher/grid.

## 3. Physical Prep Checklist (gawin BAGO ang party)

### 🪨 Earth — Cipher Wheel
1. I-print ang `printables/earth-cipher-wheel.html` (Cmd+P sa browser, o buksan lang at i-print).
2. Gupitin ang dalawang bilog, butasan ang gitna, pagsamahin gamit ang brad/split pin.
3. Ready na — makikita rin sa print page ang naka-encode na mensahe.

### 🔥 Fire — Invisible Ink Parchment
1. I-print ang `printables/fire-parchment.html`.
2. Gawin ang invisible ink: pisilin ang kalamansi/lemon (o gumamit ng gatas) sa isang maliit na lalagyan.
3. Gamit ang cotton swab o toothpick, isulat ang **`B7`** (o "SUSI: B7") sa blangkong espasyo sa gitna ng parchment. Hayaang matuyo nang tuluyan (mawawala ang kulay, magmumukhang blangko talaga).
4. Sa party: ilagay ang parchment malapit sa init (kandila mula sa malayo, plantsa sa mahinang init, o hairdryer) para lumabas/mag-brown ang sulat.
5. ⚠️ **Safety:** GM/adult lang ang dapat humawak ng bukas na apoy. Hairdryer ang pinaka-safe.

### ✨ Aether — Jumbled Sheet + Grille
1. I-print ang `printables/aether-jumbled-sheet.html` — ito ang ibigay/itago para makuha ng bawat team SIMULA PA LANG ng laro (parte ito ng starting kit, hindi hint na hahanapin).
2. Ang `printables/aether-grille-overlay.html` ay hindi kailangang i-print nang maaga — website mismo (`puzzles/aether.html`) ang magbibigay ng link dito pagkatapos ma-solve ang ibang 4 sangkap. Pwede ring i-print in advance at itago kung gusto mong physical talaga ang buong flow.
3. Siguraduhin parehong-pareho ang print settings (100% scale, parehong paper size) para tumugma ang alignment marks (✛) ng dalawang sheet.

### 📜 Story Card
- I-print ang `printables/story-card.html`, 1 kopya bawat team, ibigay bago magsimula ang timer.

## 4. Pag-set up ng Hub sa Araw ng Party

1. Buksan ang `index.html` sa browser (o sa naka-host na URL — tingnan Section 5).
2. I-type ang pangalan ng bawat team at ilista ang miyembro (isa bawat linya).
3. I-click ang **"Simulan ang Ritwal"** — dito na magsisimula tumakbo ang 80-minute timer. Hindi na maiuurong maliban kung i-reset (⚙ GM button sa ibabang-kanan).
4. I-project/i-display ang screen na ito kung saan makikita ng lahat.
5. Sa bawat shot-trigger, lalabas ang full-screen alert — basahin ito nang malakas at ibuhos ang shots sa mga nabanggit.
6. Kapag na-solve na nila ang lahat, pumunta sila sa Final Lock page (`final/final.html`) para i-type ang buong combination.

## 5. Pag-host (para sa production/live event)

Static site ito — walang backend, kaya kahit saan pwede i-host nang libre:

- **GitHub Pages:** i-push ang repo sa GitHub, i-enable ang Pages sa Settings → Pages → source: `main` branch, root.
- **Netlify / Vercel:** i-drag-and-drop ang folder o i-connect ang GitHub repo, walang build step na kailangan (plain HTML/CSS/JS).

Puwede rin itong patakbuhin nang offline/local lang (walang internet sa venue): buksan lang ang `index.html` gamit ang browser sa laptop na gagamitin bilang Hub. Ang mga puzzle codes ay naka-store lang sa localStorage ng browser na 'yun, kaya mas maganda kung iisang device/browser lang ang ginagamit bilang "official" Hub + Final Lock (o kung magkaiba man ang device, same lang naman ang codes kaya okay pa rin).

## 6. Pag-reset

Sa Hub, i-click ang ⚙ GM button sa ibabang-kanan → "Reset Game." Bubura nito ang timer state at balik sa setup screen. Puwede ring i-clear ang localStorage manually via DevTools kung kinakailangan.

---

Enjoy, at wag kalimutan si Aling Turing sa susunod na party. 🕯️
