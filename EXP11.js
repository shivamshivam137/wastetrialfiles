const isFirefox = typeof InstallTrigger !== 'undefined';
const words = "The Web Designer"; // text to animate
const AMPLITUDE = 80;       // vertical amplitude in px
const PERIOD = 4000;       // ms for one full oscillation
const SPACING = 0.45;      // per-character phase offset (radians)
const SCALE_MIN = 0.5;
const SCALE_MAX = 1.0;
function createCharacters(container) {
  // create a div per character so we can animate them independently
  words.split('').forEach((ch, i) => {
    const el = document.createElement('div');
    el.className = 'character';
    el.dataset.index = i;
    // keep spaces visible without collapsing
    el.textContent = ch === ' ' ? '\u00A0' : ch;
    container.appendChild(el);
  });
}
const s1 = document.getElementById('spiral');
const s2 = document.getElementById('spiral2');
createCharacters(s1);
createCharacters(s2);
let startTime = null;
function animate(ts) {
  if (!startTime) startTime = ts;
  const t = ts - startTime; // elapsed ms
   [s1, s2].forEach((container, idx) => {
    const direction = idx === 0 ? 1 : -1; // opposite directions for two rows
    const chars = container.querySelectorAll('.character');
    chars.forEach((el, i) => {
      // phase depends on time + character index
      const phase = (t / PERIOD) * (2 * Math.PI) + i * SPACING * direction;
      const y = Math.sin(phase) * AMPLITUDE;
      const scale = ((Math.cos(phase) * 0.5 + 0.5) * (SCALE_MAX - SCALE_MIN)) + SCALE_MIN;
      const opacity = 0.55 + 0.45 * (Math.cos(phase) * 0.5 + 0.5);
     // Apply transform + subtle opacity
      el.style.transform = `translateY(${y}px) scale(${scale})`;
      el.style.opacity = String(opacity);
    });
  });
requestAnimationFrame(animate);
}
// Start animation
requestAnimationFrame(animate);
