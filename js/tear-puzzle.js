/* Tear-card puzzle: prints N solid-shade pieces in shuffled order.
   Torn apart and rearranged by shade (darkest -> lightest), the letters
   read left-to-right spell the station's unlock code. No cutting tools,
   no reading/riddle required - pure visual sorting. */
function renderTearPuzzle(containerId, chars, displayOrder, icon) {
  const container = document.getElementById(containerId);
  const n = chars.length;
  displayOrder.forEach((trueIndex, slot) => {
    const piece = document.createElement('div');
    piece.className = 'tear-piece';
    if (slot < n - 1) piece.classList.add('tear-edge');
    const lightness = Math.round((trueIndex / (n - 1)) * 82 + 8);
    piece.style.background = `hsl(0, 0%, ${lightness}%)`;
    const textColor = lightness > 55 ? '#000' : '#fff';
    piece.innerHTML = `
      <div class="tear-icon">${icon}</div>
      <div class="tear-char" style="color:${textColor}">${chars[trueIndex]}</div>
    `;
    container.appendChild(piece);
  });
}
