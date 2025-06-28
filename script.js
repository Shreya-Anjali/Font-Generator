function generateFonts() {
  const text = document.getElementById('userInput').value;
  const outputDiv = document.getElementById('outputs');
  outputDiv.innerHTML = '';

  const styles = [
    { name: "Fancy Monospace", transform: (t) => t.split('').join(' ') },
    { name: "Terminal Green", class: 'terminal-green', transform: (t) => t },
    { name: "Glitchy Bold", transform: (t) => toGlitchBold(t) },
    { name: "Spaced Letters", transform: (t) => t.split('').join(' ') },
    { name: "Upside Down", transform: (t) => toUpsideDown(t) },
    { name: "Fiery Flicker", class: 'fire-text', transform: (t) => t },
    { name: "Zalgo Text", transform: (t) => toZalgo(t) },
    { name: "Rainbow Gradient", class: 'rainbow-text', transform: (t) => t },
    { name: "Mirror Text", transform: (t) => t.split('').reverse().join('') },
    { name: "Block Letters", transform: (t) => toBlockText(t) }
  ];

  styles.forEach(style => {
    const div = document.createElement('div');
    div.className = 'output-style';

    // Create label
    const label = document.createElement('strong');
    label.innerText = `${style.name}:`;
    div.appendChild(label);

    // Create styled span
    const span = document.createElement('span');
    span.className = 'styled-output';
    if (style.class) span.classList.add(style.class);
    span.textContent = style.transform(text);

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = () => {
      const temp = document.createElement('textarea');
      temp.value = span.textContent;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 1500);
    };

    div.appendChild(document.createElement('br'));
    div.appendChild(span);
    div.appendChild(copyBtn);
    outputDiv.appendChild(div);
  });
}


// Helper functions for different styles

function toGlitchBold(text) {
  const map = {
    a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷',
    k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁',
    u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
    A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝',
    K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧',
    U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭'
  };
  return [...text].map(c => map[c] || c).join('');
}

function toUpsideDown(text) {
  const map = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ',
    f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ',
    k: 'ʞ', l: 'ʃ', m: 'ɯ', n: 'u', o: 'o',
    p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ',
    u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ',
    z: 'z', '.': '˙', ',': "'", "'": ',', '"': ',,',
    '_': '‾', '?': '¿', '!': '¡', '(': ')', ')': '('
  };
  return text.split('').reverse().map(c => map[c.toLowerCase()] || c).join('');
}

function toZalgo(text) {
  const zalgo_up = [
    '\u030d', '\u030e', '\u0304', '\u0305', '\u033f',
    '\u0311', '\u0306', '\u0310', '\u0352', '\u0357',
    '\u0351', '\u0307', '\u0308', '\u030a', '\u0342',
    '\u0343', '\u0344', '\u034a', '\u034b', '\u034c'
  ];
  return text.split('').map(c => c + zalgo_up[Math.floor(Math.random() * zalgo_up.length)]).join('');
}

function toBlockText(text) {
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const block = ['🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜','🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩',
                 '🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜','🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩',
                 '0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
  return text.split('').map(c => {
    const index = base.indexOf(c);
    return index !== -1 ? block[index] : c;
  }).join('');
}


