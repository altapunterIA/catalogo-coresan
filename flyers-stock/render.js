/* ================================================================
   RENDER — arma cada flyer (1080 x 1920, formato historia) con el
   estilo de los flyers Coresan: banda amarilla con marca, zona de
   producto y banda bordó con nombre y presentaciones.
   ================================================================ */

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

/* Oscurece / aclara un color hex (amt entre -1 y 1) */
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
function isLight(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) > 150;
}

/* Parte el nombre en 1–2 líneas para la etiqueta del envase */
function labelLines(nombre, max) {
  const words = nombre.toUpperCase().split(' ');
  if (nombre.length <= max || words.length === 1) return [nombre.toUpperCase()];
  let best = [words.join(' ')], bestDiff = 1e9;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
    const d = Math.abs(a.length - b.length);
    if (d < bestDiff) { bestDiff = d; best = [a, b]; }
  }
  return best;
}

function labelText(f, cx, y, w, ink, sizeMax) {
  const lines = labelLines(f.nombre, 11);
  const longest = Math.max(...lines.map(l => l.length));
  const size = Math.min(sizeMax, Math.floor(w / (longest * 0.5)));
  return lines.map((l, i) =>
    `<text x="${cx}" y="${y + i * size * 0.98}" text-anchor="middle" font-family="Barlow Condensed" font-weight="800" font-size="${size}" fill="${ink}" letter-spacing="0.5">${esc(l)}</text>`
  ).join('') + `<!--h:${lines.length * size}-->`;
}

const PESO = f => f.formato.replace(/^(Bolsa|Paquete|Botella|Lata|Caja|Pote|Frasco|Sachet)\s*/i, '');

/* ── ENVASES (SVG) ─────────────────────────────────────────── */
const ENVASES = {

  bolsa(f, id) {
    const c = f.color, a = f.acento, ink = isLight(c) ? '#1A1A1A' : '#FFFFFF';
    return `
    <svg viewBox="0 0 420 600" width="430" height="614">
      <defs>
        <linearGradient id="g${id}" x1="0" x2="1">
          <stop offset="0" stop-color="${shade(c,-0.18)}"/><stop offset="0.18" stop-color="${c}"/>
          <stop offset="0.55" stop-color="${shade(c,0.10)}"/><stop offset="0.85" stop-color="${c}"/>
          <stop offset="1" stop-color="${shade(c,-0.25)}"/>
        </linearGradient>
      </defs>
      <path d="M48 70 Q40 300 30 560 Q210 585 390 560 Q380 300 372 70 Z" fill="url(#g${id})"/>
      <path d="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade(c,-0.12)}"/>
      ${Array.from({length:22},(_,i)=>`<rect x="${50+i*15}" y="42" width="6" height="34" fill="${shade(c,-0.22)}" opacity=".55"/>`).join('')}
      <rect x="40" y="118" width="340" height="22" fill="${a}"/>
      <rect x="62" y="170" width="296" height="250" rx="22" fill="${isLight(c) ? '#FFFFFF' : shade(c,-0.25)}" stroke="${a}" stroke-width="6"/>
      ${labelText(f, 210, 262, 270, isLight(c) ? '#1A1A1A' : '#FFFFFF', 78).replace(/<!--.*-->/,'')}
      <rect x="120" y="360" width="180" height="40" rx="20" fill="${a}"/>
      <text x="210" y="390" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="28" fill="${isLight(a)?'#1A1A1A':'#FFF'}">${esc(PESO(f))}</text>
      <rect x="34" y="500" width="352" height="22" fill="${a}" opacity=".9"/>
      <path d="M80 90 Q70 300 66 540" stroke="#FFF" stroke-width="14" opacity=".18" fill="none" stroke-linecap="round"/>
    </svg>`;
  },

  botella(f, id) {
    const c = f.color, a = f.acento;
    return `
    <svg viewBox="0 0 300 700" width="300" height="700">
      <defs>
        <linearGradient id="g${id}" x1="0" x2="1">
          <stop offset="0" stop-color="${shade(c,-0.35)}"/><stop offset="0.3" stop-color="${c}"/>
          <stop offset="0.45" stop-color="${shade(c,0.25)}"/><stop offset="0.7" stop-color="${c}"/>
          <stop offset="1" stop-color="${shade(c,-0.4)}"/>
        </linearGradient>
      </defs>
      <rect x="118" y="20" width="64" height="70" rx="8" fill="${a}"/>
      <rect x="114" y="82" width="72" height="14" rx="4" fill="${shade(a,-0.3)}"/>
      <path d="M124 96 L176 96 L178 190 Q262 240 262 330 L262 650 Q262 680 232 680 L68 680 Q38 680 38 650 L38 330 Q38 240 122 190 Z" fill="url(#g${id})"/>
      <rect x="44" y="360" width="212" height="230" rx="10" fill="#F8F5EE"/>
      <rect x="44" y="360" width="212" height="18" fill="${a}"/>
      <rect x="44" y="572" width="212" height="18" fill="${a}"/>
      ${labelText(f, 150, 450, 190, '#1A1A1A', 56).replace(/<!--.*-->/,'')}
      <text x="150" y="552" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="28" fill="${shade(a,-0.1)}">${esc(PESO(f))}</text>
      <path d="M70 330 L70 640" stroke="#FFF" stroke-width="12" opacity=".22" stroke-linecap="round"/>
    </svg>`;
  },

  lata(f, id) {
    const c = f.color, a = f.acento;
    return `
    <svg viewBox="0 0 380 480" width="420" height="530">
      <defs>
        <linearGradient id="m${id}" x1="0" x2="1">
          <stop offset="0" stop-color="#8E8E8E"/><stop offset="0.4" stop-color="#F2F2F2"/><stop offset="1" stop-color="#7A7A7A"/>
        </linearGradient>
        <linearGradient id="g${id}" x1="0" x2="1">
          <stop offset="0" stop-color="${shade(c,-0.3)}"/><stop offset="0.4" stop-color="${shade(c,0.12)}"/><stop offset="1" stop-color="${shade(c,-0.35)}"/>
        </linearGradient>
      </defs>
      <rect x="30" y="40" width="320" height="400" fill="url(#m${id})"/>
      <ellipse cx="190" cy="40" rx="160" ry="30" fill="#D8D8D8" stroke="#9A9A9A" stroke-width="4"/>
      <ellipse cx="190" cy="40" rx="130" ry="22" fill="none" stroke="#A8A8A8" stroke-width="3"/>
      <rect x="30" y="80" width="320" height="320" fill="url(#g${id})"/>
      <ellipse cx="190" cy="440" rx="160" ry="30" fill="#8A8A8A"/>
      <rect x="30" y="410" width="320" height="30" fill="url(#m${id})"/>
      <rect x="70" y="140" width="240" height="200" rx="16" fill="#FFF8EC" stroke="${a}" stroke-width="6"/>
      ${labelText(f, 190, 220, 210, '#1A1A1A', 62).replace(/<!--.*-->/,'')}
      <text x="190" y="318" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="30" fill="${shade(c,-0.2)}">${esc(PESO(f))}</text>
      <rect x="30" y="100" width="320" height="14" fill="${a}"/><rect x="30" y="366" width="320" height="14" fill="${a}"/>
    </svg>`;
  },

  caja(f, id) {
    const c = f.color, a = f.acento, ink = isLight(c) ? '#1A1A1A' : '#FFFFFF';
    return `
    <svg viewBox="0 0 520 520" width="560" height="560">
      <path d="M60 140 L330 140 L330 480 L60 480 Z" fill="${c}"/>
      <path d="M330 140 L460 80 L460 420 L330 480 Z" fill="${shade(c,-0.28)}"/>
      <path d="M60 140 L190 80 L460 80 L330 140 Z" fill="${shade(c,0.18)}"/>
      <rect x="60" y="180" width="270" height="16" fill="${a}"/>
      <rect x="84" y="220" width="222" height="170" rx="14" fill="${isLight(c)?'#FFFFFF':'rgba(255,255,255,.12)'}" stroke="${a}" stroke-width="5"/>
      ${labelText(f, 195, 290, 200, ink, 60).replace(/<!--.*-->/,'')}
      <text x="195" y="440" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="28" fill="${ink}">${esc(PESO(f))}</text>
      <path d="M330 220 L460 160" stroke="${a}" stroke-width="14" opacity=".8"/>
    </svg>`;
  },

  tetra(f, id) {
    const c = f.color, a = f.acento;
    return `
    <svg viewBox="0 0 420 600" width="420" height="600">
      <path d="M90 90 L270 90 L270 560 L90 560 Z" fill="${c}"/>
      <path d="M270 90 L350 60 L350 530 L270 560 Z" fill="${shade(c,-0.3)}"/>
      <path d="M90 90 L170 60 L350 60 L270 90 Z" fill="${shade(c,0.2)}"/>
      <path d="M170 60 L190 30 L330 30 L350 60 Z" fill="${shade(c,0.05)}"/>
      <rect x="90" y="150" width="180" height="230" fill="#FFF8EC"/>
      ${labelText(f, 180, 230, 160, '#1A1A1A', 52).replace(/<!--.*-->/,'')}
      <text x="180" y="350" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="28" fill="${shade(c,-0.2)}">${esc(PESO(f))}</text>
      <circle cx="180" cy="460" r="50" fill="${shade(c,0.15)}"/><path d="M180 418 q-8 18 6 26" stroke="${a}" stroke-width="10" fill="none" stroke-linecap="round"/>
      <rect x="90" y="400" width="180" height="10" fill="${a}"/>
    </svg>`;
  },

  frasco(f, id) {
    const c = f.color, a = f.acento;
    return `
    <svg viewBox="0 0 420 520" width="440" height="545">
      <defs>
        <linearGradient id="g${id}" x1="0" x2="1">
          <stop offset="0" stop-color="${shade(c,-0.3)}"/><stop offset="0.35" stop-color="${shade(c,0.15)}"/><stop offset="1" stop-color="${shade(c,-0.35)}"/>
        </linearGradient>
      </defs>
      <rect x="80" y="40" width="260" height="70" rx="12" fill="${a}"/>
      ${Array.from({length:14},(_,i)=>`<rect x="${92+i*18}" y="48" width="6" height="54" fill="${shade(a,-0.2)}" opacity=".5"/>`).join('')}
      <path d="M90 110 L330 110 Q370 130 370 180 L370 450 Q370 490 330 490 L90 490 Q50 490 50 450 L50 180 Q50 130 90 110 Z" fill="url(#g${id})"/>
      <rect x="50" y="200" width="320" height="220" fill="#FFF8EC"/>
      <rect x="50" y="200" width="320" height="14" fill="${a}"/><rect x="50" y="406" width="320" height="14" fill="${a}"/>
      ${labelText(f, 210, 285, 280, '#1A1A1A', 64).replace(/<!--.*-->/,'')}
      <text x="210" y="390" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="30" fill="${shade(c,-0.2)}">${esc(PESO(f))}</text>
      <path d="M80 160 L80 460" stroke="#FFF" stroke-width="12" opacity=".2" stroke-linecap="round"/>
    </svg>`;
  },

  sachet(f, id) {
    const c = f.color, a = f.acento;
    return `
    <svg viewBox="0 0 400 560" width="420" height="588">
      <defs>
        <linearGradient id="g${id}" x1="0" x2="1">
          <stop offset="0" stop-color="${shade(c,-0.2)}"/><stop offset="0.5" stop-color="${shade(c,0.12)}"/><stop offset="1" stop-color="${shade(c,-0.25)}"/>
        </linearGradient>
      </defs>
      <rect x="50" y="30" width="300" height="500" rx="10" fill="url(#g${id})"/>
      <rect x="50" y="30" width="300" height="40" fill="${shade(c,-0.15)}"/>
      ${Array.from({length:30},(_,i)=>`<path d="M${50+i*10} 30 l5 8 l5 -8" stroke="${shade(c,-0.35)}" fill="none" stroke-width="2"/>`).join('')}
      <circle cx="200" cy="52" r="9" fill="${shade(c,-0.45)}"/>
      <rect x="50" y="490" width="300" height="40" fill="${shade(c,-0.15)}"/>
      <rect x="80" y="120" width="240" height="240" rx="120" fill="#FFF8EC"/>
      ${labelText(f, 200, 228, 200, '#1A1A1A', 56).replace(/<!--.*-->/,'')}
      <rect x="120" y="400" width="160" height="44" rx="22" fill="${a}"/>
      <text x="200" y="431" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="28" fill="#FFF">${esc(PESO(f))}</text>
      <path d="M80 90 L80 470" stroke="#FFF" stroke-width="10" opacity=".18" stroke-linecap="round"/>
    </svg>`;
  }
};

/* ── FLYER ─────────────────────────────────────────────────── */
function codigo(i) { return 'STK-' + String(i + 1).padStart(2, '0'); }

function flyerHTML(f, i) {
  const cat = CATEGORIAS[f.cat];
  const visual = f.foto
    ? `<img class="fl-foto" src="${esc(f.foto)}" alt="${esc(f.nombre)}">`
    : ENVASES[f.env](f, i);
  return `
  <article class="flyer" id="${codigo(i)}" data-cat="${f.cat}">
    <header class="fl-top">
      <div class="fl-brand">CORE<span>SAN</span></div>
      <div class="fl-tag">DISTRIBUIDORA MAYORISTA · MENDOZA</div>
    </header>

    <section class="fl-stage" style="--bg1:${cat.bg1};--bg2:${cat.bg2};--ink:${cat.ink}">
      <div class="fl-watermark">${esc(cat.label.toUpperCase())}</div>
      <div class="fl-chip">${esc(cat.label)}</div>
      <div class="fl-code">${codigo(i)}</div>
      <div class="fl-visual">${visual}</div>
      <div class="fl-floor"></div>
    </section>

    <section class="fl-info">
      ${f.marca ? `<div class="fl-marca">${esc(f.marca)}</div>` : ''}
      <h2 class="fl-name">${esc(f.nombre)}</h2>
      <p class="fl-sub">${esc(f.sub)}</p>
      <div class="fl-table">
        <div class="fl-row"><span>Presentación</span><b>${esc(f.formato)}</b></div>
        <div class="fl-row"><span>Venta</span><b>${esc(f.venta)}</b></div>
        <div class="fl-row"><span>Categoría</span><b>${esc(cat.label)}</b></div>
      </div>
      <footer class="fl-foot">
        <span class="fl-dot"></span> DISPONIBLE · CONSULTÁ POR TU PEDIDO
        <em>@coresan.sr</em>
      </footer>
    </section>
  </article>`;
}

if (typeof module !== 'undefined') module.exports = { flyerHTML, codigo };
