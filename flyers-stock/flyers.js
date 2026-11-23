/* ================================================================
   FLYERS STOCK — CORESAN
   40 productos nuevos (no incluidos en el catálogo actual), sin
   etiquetas de oferta ni de fiestas. Quedan "en stock" de diseño,
   listos para salir a producción cuando se definan.

   CÓMO EDITAR UN FLYER
   - nombre / sub / formato / venta: textos del flyer.
   - marca: si se define la marca, completala y aparece sobre el nombre.
   - foto:  cuando tengas la foto real, guardala en flyers-stock/fotos/
            y poné  foto:'fotos/archivo.jpg'  — reemplaza la ilustración.
   - Después corré:  node flyers-stock/export.js  para regenerar los PNG.
   ================================================================ */

const CATEGORIAS = {
  almacen:     { label: 'Almacén',      bg1: '#F7E7C4', bg2: '#E3C58A', ink: '#7A5418' },
  legumbres:   { label: 'Legumbres',    bg1: '#EFE3CF', bg2: '#CFB48A', ink: '#6B4A22' },
  pastas:      { label: 'Pastas',       bg1: '#FBEBC0', bg2: '#E9C46A', ink: '#7A5A10' },
  conservas:   { label: 'Conservas',    bg1: '#F6D6CC', bg2: '#D9887A', ink: '#7A2418' },
  desayuno:    { label: 'Desayuno',     bg1: '#EADBCB', bg2: '#B9906A', ink: '#5A3A22' },
  condimentos: { label: 'Condimentos',  bg1: '#F5D9C2', bg2: '#D98E5A', ink: '#7A3410' },
  yerbas:      { label: 'Yerbas',       bg1: '#DCEBDD', bg2: '#8DB896', ink: '#1F5C30' },
  snacks:      { label: 'Snacks',       bg1: '#FBE9B5', bg2: '#E8B84A', ink: '#7A5208' },
  bebidas:     { label: 'Bebidas',      bg1: '#E9D3D6', bg2: '#A8636E', ink: '#5A1622' }
};

/* tipo de envase: bolsa | botella | lata | caja | frasco | sachet | tetra */
const FLYERS = [
  /* ── ALMACÉN ── */
  { cat:'almacen', env:'bolsa',   color:'#F4F1EA', acento:'#2F6FB0', nombre:'Arroz Largo Fino',      sub:'Grano largo 00000 · No se pasa', formato:'Bolsa 1 kg',        venta:'Bulto x 10 u.' },
  { cat:'almacen', env:'bolsa',   color:'#F1E3B8', acento:'#C8281E', nombre:'Arroz Parboil',         sub:'Grano entero · Siempre suelto',  formato:'Bolsa 1 kg',        venta:'Bulto x 10 u.' },
  { cat:'almacen', env:'bolsa',   color:'#F7F4EE', acento:'#2D7A3A', nombre:'Harina 000',            sub:'Harina de trigo · Panificación', formato:'Paquete 1 kg',      venta:'Bulto x 10 u.' },
  { cat:'almacen', env:'bolsa',   color:'#F7F4EE', acento:'#9E1F17', nombre:'Harina 0000',           sub:'Extra refinada · Repostería',    formato:'Paquete 1 kg',      venta:'Bulto x 10 u.' },
  { cat:'almacen', env:'bolsa',   color:'#F7F4EE', acento:'#E07A1F', nombre:'Harina Leudante',       sub:'Con polvo de hornear incluido',  formato:'Paquete 1 kg',      venta:'Bulto x 10 u.' },
  { cat:'almacen', env:'bolsa',   color:'#F6D25C', acento:'#1F5C30', nombre:'Polenta Instantánea',   sub:'Harina de maíz · Lista en 1 min.', formato:'Paquete 500 g',   venta:'Bulto x 20 u.' },
  { cat:'almacen', env:'botella', color:'#6E7F1E', acento:'#2B3A0E', nombre:'Aceite de Oliva',       sub:'Extra virgen · Primera prensada', formato:'Botella 500 ml',   venta:'Caja x 12 u.' },
  { cat:'almacen', env:'botella', color:'#E9EEF2', acento:'#C8281E', nombre:'Vinagre de Alcohol',    sub:'Acidez 5% · Uso diario',         formato:'Botella 1 L',       venta:'Caja x 12 u.' },

  /* ── LEGUMBRES ── */
  { cat:'legumbres', env:'bolsa', color:'#F2EBDD', acento:'#8A5A2B', nombre:'Lentejas',              sub:'Seleccionadas · Cocción pareja', formato:'Paquete 400 g',     venta:'Bulto x 20 u.' },
  { cat:'legumbres', env:'bolsa', color:'#F2EBDD', acento:'#3D3D3D', nombre:'Porotos Alubia',        sub:'Grano grande · Guisos y ensaladas', formato:'Paquete 400 g',  venta:'Bulto x 20 u.' },
  { cat:'legumbres', env:'bolsa', color:'#F2EBDD', acento:'#C08A2E', nombre:'Garbanzos',             sub:'Calibre grande · Ricos en proteína', formato:'Paquete 400 g', venta:'Bulto x 20 u.' },
  { cat:'legumbres', env:'bolsa', color:'#F2EBDD', acento:'#4F8A3A', nombre:'Arvejas Partidas',      sub:'Secas · Sopas y purés',          formato:'Paquete 400 g',     venta:'Bulto x 20 u.' },

  /* ── PASTAS ── */
  { cat:'pastas', env:'bolsa',    color:'#FFF6DE', acento:'#C8281E', nombre:'Fideos Moñito',         sub:'Pasta seca de sémola',           formato:'Paquete 500 g',     venta:'Bulto x 20 u.' },
  { cat:'pastas', env:'bolsa',    color:'#FFF6DE', acento:'#2F6FB0', nombre:'Fideos Cabello de Ángel', sub:'Pasta fina · Cocción rápida',  formato:'Paquete 500 g',     venta:'Bulto x 20 u.' },
  { cat:'pastas', env:'bolsa',    color:'#FFF6DE', acento:'#2D7A3A', nombre:'Fideos Munición',       sub:'Pasta para sopa',                formato:'Paquete 500 g',     venta:'Bulto x 20 u.' },
  { cat:'pastas', env:'bolsa',    color:'#FFF6DE', acento:'#E07A1F', nombre:'Fideos Ñoquis',         sub:'Pasta seca de sémola',           formato:'Paquete 500 g',     venta:'Bulto x 20 u.' },

  /* ── CONSERVAS ── */
  { cat:'conservas', env:'tetra', color:'#C8281E', acento:'#2D7A3A', nombre:'Puré de Tomate',        sub:'Tomates seleccionados · Sin TACC', formato:'Caja 520 g',      venta:'Caja x 24 u.' },
  { cat:'conservas', env:'lata',  color:'#C8281E', acento:'#F0B429', nombre:'Tomate Perita',         sub:'Pelado entero en lata',          formato:'Lata 400 g',        venta:'Caja x 24 u.' },
  { cat:'conservas', env:'lata',  color:'#F0D24A', acento:'#2D7A3A', nombre:'Choclo Amarillo',       sub:'Granos enteros al natural',      formato:'Lata 300 g',        venta:'Caja x 24 u.' },
  { cat:'conservas', env:'lata',  color:'#4F8A3A', acento:'#F0B429', nombre:'Arvejas en Lata',       sub:'Remojadas · Listas para usar',   formato:'Lata 300 g',        venta:'Caja x 24 u.' },

  /* ── DESAYUNO ── */
  { cat:'desayuno', env:'bolsa',  color:'#3A2416', acento:'#B8965A', nombre:'Café Molido',           sub:'Torrado intenso · Aroma pleno',  formato:'Paquete 500 g',     venta:'Bulto x 12 u.' },
  { cat:'desayuno', env:'frasco', color:'#5A3A22', acento:'#F0B429', nombre:'Cacao en Polvo',        sub:'Instantáneo · Se disuelve fácil', formato:'Pote 360 g',       venta:'Caja x 12 u.' },
  { cat:'desayuno', env:'caja',   color:'#9E1F17', acento:'#F5F0E8', nombre:'Té en Saquitos',        sub:'Té negro · Saquitos con hilo',   formato:'Caja x 50 saquitos', venta:'Caja x 24 u.' },
  { cat:'desayuno', env:'caja',   color:'#1F5C30', acento:'#F0B429', nombre:'Mate Cocido',           sub:'Yerba en saquitos',              formato:'Caja x 50 saquitos', venta:'Caja x 24 u.' },
  { cat:'desayuno', env:'frasco', color:'#8A5524', acento:'#F5F0E8', nombre:'Dulce de Leche',        sub:'Clásico · Cremoso',              formato:'Pote 400 g',        venta:'Caja x 24 u.' },
  { cat:'desayuno', env:'frasco', color:'#E8892A', acento:'#C8281E', nombre:'Mermelada de Durazno',  sub:'Con trozos de fruta',            formato:'Frasco 454 g',      venta:'Caja x 12 u.' },
  { cat:'desayuno', env:'bolsa',  color:'#E9F0F6', acento:'#2F6FB0', nombre:'Leche en Polvo',        sub:'Entera · Fortificada',           formato:'Paquete 800 g',     venta:'Caja x 12 u.' },
  { cat:'desayuno', env:'caja',   color:'#F0B429', acento:'#9E1F17', nombre:'Galletitas de Agua',    sub:'Crocantes · Paquete familiar',   formato:'Paquete 3 x 100 g', venta:'Caja x 20 u.' },

  /* ── CONDIMENTOS ── */
  { cat:'condimentos', env:'sachet', color:'#B07A3A', acento:'#5A3A16', nombre:'Comino Molido',      sub:'Aroma cálido · Empanadas y guisos', formato:'Sachet 25 g',   venta:'Caja mayorista' },
  { cat:'condimentos', env:'sachet', color:'#C8281E', acento:'#7A1410', nombre:'Pimentón Dulce',     sub:'Color intenso · Sabor suave',    formato:'Sachet 25 g',       venta:'Caja mayorista' },
  { cat:'condimentos', env:'sachet', color:'#8A5A35', acento:'#4A2E16', nombre:'Nuez Moscada',       sub:'Molida · Salsas y purés',        formato:'Sachet 25 g',       venta:'Caja mayorista' },
  { cat:'condimentos', env:'sachet', color:'#A0522D', acento:'#5A2A10', nombre:'Canela Molida',      sub:'Dulce y aromática · Repostería', formato:'Sachet 25 g',       venta:'Caja mayorista' },
  { cat:'condimentos', env:'sachet', color:'#4F7A3A', acento:'#22401A', nombre:'Laurel en Hojas',    sub:'Hojas enteras seleccionadas',    formato:'Sachet 10 g',       venta:'Caja mayorista' },
  { cat:'condimentos', env:'sachet', color:'#E0A21A', acento:'#7A5208', nombre:'Cúrcuma',            sub:'Molida · Color y sabor',         formato:'Sachet 25 g',       venta:'Caja mayorista' },
  { cat:'condimentos', env:'sachet', color:'#B83A1E', acento:'#2D7A3A', nombre:'Adobo para Pizza',   sub:'Mezcla de hierbas y especias',   formato:'Sachet 25 g',       venta:'Caja mayorista' },
  { cat:'condimentos', env:'sachet', color:'#3E8A3A', acento:'#1A4A1A', nombre:'Perejil Deshidratado', sub:'Hojas en escamas',            formato:'Sachet 25 g',       venta:'Caja mayorista' },

  /* ── YERBAS ── */
  { cat:'yerbas', env:'bolsa',    color:'#1F5C30', acento:'#F0B429', nombre:'Yerba Despalada',       sub:'Sin palo · Sabor intenso',       formato:'Paquete 1 kg',      venta:'Bulto x 10 u.' },
  { cat:'yerbas', env:'bolsa',    color:'#3E7A3A', acento:'#F5F0E8', nombre:'Yerba Compuesta',       sub:'Con hierbas serranas',           formato:'Paquete 500 g',     venta:'Bulto x 20 u.' },

  /* ── SNACKS / BEBIDAS ── */
  { cat:'snacks',  env:'bolsa',   color:'#C8281E', acento:'#F0B429', nombre:'Maní Salado',           sub:'Tostado · Sin piel',             formato:'Bolsa 500 g',       venta:'Bulto x 12 u.' },
  { cat:'bebidas', env:'botella', color:'#5A1622', acento:'#B8965A', nombre:'Vermut Rosso',          sub:'Aperitivo · Hierbas y especias', formato:'Botella 1 L',       venta:'Caja x 6 u.' }
];
