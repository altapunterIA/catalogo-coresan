/* ================================================================
   RENDER — arma cada flyer (1080 x 1920, formato historia) con el
   estilo de los flyers Coresan: banda amarilla con marca, foto del
   producto y banda bordó con nombre y presentación.
   ================================================================ */

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

function codigo(i) { return 'STK-' + String(i + 1).padStart(2, '0'); }

function flyerHTML(f, i) {
  const cat = CATEGORIAS[f.cat];
  return `
  <article class="flyer" id="${codigo(i)}" data-cat="${f.cat}">
    <header class="fl-top">
      <div class="fl-brand">CORE<span>SAN</span></div>
      <div class="fl-tag">DISTRIBUIDORA MAYORISTA · MENDOZA</div>
    </header>

    <section class="fl-stage" style="--bg1:${cat.bg1};--bg2:${cat.bg2};--ink:${cat.ink}">
      <div class="fl-watermark">${esc(f.marca.toUpperCase())}</div>
      <div class="fl-chip">${esc(cat.label)}</div>
      <div class="fl-code">${codigo(i)}</div>
      <div class="fl-visual"><img class="fl-foto" src="${esc(f.foto)}" alt="${esc(f.marca + ' ' + f.nombre)}"></div>
      <div class="fl-floor"></div>
    </section>

    <section class="fl-info">
      <div class="fl-marca">${esc(f.marca)}</div>
      <h2 class="fl-name">${esc(f.nombre)}</h2>
      <p class="fl-sub">${esc(f.sub)}</p>
      <div class="fl-table">
        <div class="fl-row"><span>Presentación</span><b>${esc(f.formato)}</b></div>
        <div class="fl-row"><span>Venta</span><b>${esc(f.venta)}</b></div>
      </div>
      <footer class="fl-foot">
        <span class="fl-dot"></span> DISPONIBLE · CONSULTÁ POR TU PEDIDO
        <em>@coresan.sr</em>
      </footer>
    </section>
  </article>`;
}

if (typeof module !== 'undefined') module.exports = { flyerHTML, codigo };
