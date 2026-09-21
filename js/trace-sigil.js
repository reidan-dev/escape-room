/* Trace-sigil mini-game: drag continuously through N checkpoints in order.
   No reading/riddle - pure motor-skill/visual task. Works with mouse or touch
   via Pointer Events. Calls onComplete() once all checkpoints are hit in one
   continuous drag; releasing early resets progress. */
function renderTraceSigil(containerId, checkpoints, onComplete) {
  const container = document.getElementById(containerId);
  container.style.position = 'relative';
  container.style.touchAction = 'none';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.position = 'absolute';
  svg.style.inset = '0';
  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', 'var(--orange)');
  polyline.setAttribute('stroke-width', '3');
  polyline.setAttribute('points', '');
  svg.appendChild(polyline);
  container.appendChild(svg);

  const dots = checkpoints.map((cp, i) => {
    const dot = document.createElement('div');
    dot.className = 'sigil-dot';
    dot.style.left = cp.x + '%';
    dot.style.top = cp.y + '%';
    dot.textContent = String(i + 1);
    container.appendChild(dot);
    return dot;
  });

  let expectedIndex = 0;
  let dragging = false;
  let points = [];
  let done = false;

  function reset() {
    expectedIndex = 0;
    points = [];
    polyline.setAttribute('points', '');
    dots.forEach(d => d.classList.remove('sigil-hit'));
  }

  function checkPoint(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    const xPct = ((clientX - rect.left) / rect.width) * 100;
    const yPct = ((clientY - rect.top) / rect.height) * 100;
    points.push(`${xPct},${yPct}`);
    polyline.setAttribute('points', points.join(' '));

    if (expectedIndex < checkpoints.length) {
      const cp = checkpoints[expectedIndex];
      const dist = Math.hypot(xPct - cp.x, yPct - cp.y);
      if (dist < 13) {
        dots[expectedIndex].classList.add('sigil-hit');
        expectedIndex++;
        if (expectedIndex === checkpoints.length) {
          done = true;
          onComplete();
        }
      }
    }
  }

  container.addEventListener('pointerdown', (e) => {
    if (done) return;
    dragging = true;
    reset();
    checkPoint(e.clientX, e.clientY);
  });
  container.addEventListener('pointermove', (e) => {
    if (!dragging || done) return;
    checkPoint(e.clientX, e.clientY);
  });
  const stop = () => {
    dragging = false;
    if (!done && expectedIndex < checkpoints.length) reset();
  };
  container.addEventListener('pointerup', stop);
  container.addEventListener('pointercancel', stop);
  container.addEventListener('pointerleave', stop);
}
