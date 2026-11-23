/* ================================================================
   RENDER — arma cada flyer (1080 x 1920, formato historia) con el
   estilo Coresan: fondo rojo con hexágonos, marca grande, franja
   amarilla con el producto, foto real y pie blanco con el logo.
   ================================================================ */

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

function codigo(i) { return 'STK-' + String(i + 1).padStart(2, '0'); }

/* Hexágono de punta arriba centrado en (cx,cy) con radio r */
function hexPts(cx, cy, r) {
  return [-90, -30, 30, 90, 150, 210].map(a => {
    const t = a * Math.PI / 180;
    return (cx + r * Math.cos(t)).toFixed(1) + ',' + (cy + r * Math.sin(t)).toFixed(1);
  }).join(' ');
}

/* Fondo: hexágonos concéntricos tenues, como el isotipo */
const HEX_BG = `
<svg class="fl-hex" viewBox="0 0 1200 1200" aria-hidden="true">
  <polygon points="${hexPts(600, 600, 560)}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="70"/>
  <polygon points="${hexPts(600, 600, 400)}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="60"/>
  <polygon points="${hexPts(600, 600, 250)}" fill="none" stroke="rgba(0,0,0,.05)" stroke-width="50"/>
</svg>`;

/* Isotipo Coresan: hexágono rojo con "C" y cubo amarillo con líneas de velocidad */
const LOGO = `
<svg viewBox="0 0 100 100" aria-label="Coresan">
  <polygon points="${hexPts(50, 50, 48)}" fill="#C7291D"/>
  <polygon points="${hexPts(50, 50, 38)}" fill="#fff"/>
  <polygon points="${hexPts(50, 50, 31)}" fill="#C7291D"/>
  <polygon points="${hexPts(50, 50, 22)}" fill="#fff"/>
  <rect x="66" y="40" width="20" height="20" fill="#fff"/>
  <polygon points="56,34 69,41.5 56,49 43,41.5" fill="#F7C948"/>
  <polygon points="43,41.5 56,49 56,64 43,56.5" fill="#F0B429"/>
  <polygon points="56,49 69,41.5 69,56.5 56,64" fill="#D99418"/>
  <rect x="26" y="44" width="13" height="3.2" rx="1.6" fill="#1A1A1A"/>
  <rect x="23" y="50" width="16" height="3.2" rx="1.6" fill="#1A1A1A"/>
  <rect x="26" y="56" width="13" height="3.2" rx="1.6" fill="#1A1A1A"/>
</svg>`;

function flyerHTML(f, i) {
  const cat = CATEGORIAS[f.cat];
  return `
  <article class="flyer" id="${codigo(i)}" data-cat="${f.cat}">
    <section class="fl-hero">
      ${HEX_BG}
      <div class="fl-eyebrow">${esc(cat.label)}</div>
      <div class="fl-brandname">${esc(f.marca)}</div>
      <div class="fl-banner">
        <div class="fl-banner-main">${esc(f.nombre)}</div>
        <div class="fl-banner-sub">${esc(f.formato)}</div>
      </div>
      <div class="fl-photo"><img src="${esc(f.foto)}" alt="${esc(f.marca + ' ' + f.nombre)}"></div>
    </section>

    <section class="fl-info">
      <div class="fl-info-eyebrow">${esc(f.sub)}</div>
      <div class="fl-info-text">${esc(f.nombre)} · ${esc(f.formato)} · ${esc(f.venta)}</div>
      <div class="fl-rule"></div>
      <div class="fl-foot">
        <div class="fl-logo">${LOGO}<b>CORESAN</b></div>
        <div class="fl-contact">DISTRIBUIDORA MAYORISTA<br>@CORESAN.SR</div>
      </div>
    </section>
  </article>`;
}

if (typeof module !== 'undefined') module.exports = { flyerHTML, codigo };
