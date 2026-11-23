/* ================================================================
   FLYERS STOCK — CORESAN
   40 productos reales de las marcas que ya trabaja Coresan, que NO
   están en el catálogo actual. Sin etiquetas de oferta ni de fiestas:
   quedan listos para salir a producción cuando se definan.

   CÓMO EDITAR UN FLYER
   - marca / nombre / sub / formato / venta: textos del flyer.
   - foto: imagen del producto en flyers-stock/fotos/ (fondo transparente).
   - Después corré:  node flyers-stock/export.js  para regenerar los PNG.
   ================================================================ */

const CATEGORIAS = {
  almacen:     { label: 'Almacén',      bg1: '#FBF1DA', bg2: '#E6C88C', ink: '#7A5418' },
  condimentos: { label: 'Condimentos',  bg1: '#FBE3D2', bg2: '#DE9A6A', ink: '#7A3410' },
  yerbas:      { label: 'Yerbas',       bg1: '#E3F0E4', bg2: '#94BE9C', ink: '#1F5C30' },
  infusiones:  { label: 'Infusiones',   bg1: '#F3E6D8', bg2: '#C29A72', ink: '#5A3A22' },
  bebidas:     { label: 'Bebidas',      bg1: '#E6E9EE', bg2: '#9AA6B6', ink: '#2A3240' }
};

const FLYERS = [
  /* ── CAÑUELAS ── */
  { cat:'almacen', marca:'Cañuelas', nombre:'Aceite Mezcla',        sub:'Girasol y oliva · Uso diario',           formato:'Botella 1,5 L',   venta:'Caja mayorista', foto:'fotos/can-aceitemezcla.webp' },
  { cat:'almacen', marca:'Cañuelas', nombre:'Aceite de Oliva',      sub:'Extra virgen',                          formato:'Botella 500 ml',  venta:'Caja mayorista', foto:'fotos/can-oliva.webp' },
  { cat:'almacen', marca:'Cañuelas', nombre:'Arroz Largo Fino',     sub:'Grano largo fino',                      formato:'Paquete 1 kg',    venta:'Bulto mayorista', foto:'fotos/can-arrozlargo.webp' },
  { cat:'almacen', marca:'Cañuelas', nombre:'Arroz Parboil',        sub:'No se pasa · Siempre suelto',           formato:'Paquete 1 kg',    venta:'Bulto mayorista', foto:'fotos/can-arrozparboil.webp' },
  { cat:'almacen', marca:'Cañuelas', nombre:'Arroz Integral',       sub:'Fuente de fibra',                       formato:'Paquete 1 kg',    venta:'Bulto mayorista', foto:'fotos/can-arrozintegral.webp' },
  { cat:'almacen', marca:'Cañuelas', nombre:'Harina 000',           sub:'Ultra refinada · Panificación',         formato:'Paquete 1 kg',    venta:'Bulto mayorista', foto:'fotos/can-harina000.webp' },
  { cat:'almacen', marca:'Cañuelas', nombre:'Pan Rallado',          sub:'Milanesas livianas y ricas',            formato:'Paquete 500 g',   venta:'Bulto mayorista', foto:'fotos/can-panrallado.webp' },
  { cat:'almacen', marca:'Cañuelas', nombre:'Avena Tradicional',    sub:'Copos de avena',                        formato:'Paquete 400 g',   venta:'Bulto mayorista', foto:'fotos/can-avena.webp' },
  { cat:'almacen', marca:'Cañuelas', nombre:'Mayonesa',             sub:'Con jugo de limón',                     formato:'Doypack 500 ml',  venta:'Caja mayorista', foto:'fotos/can-mayonesa.webp' },

  /* ── LEDESMA ── */
  { cat:'almacen', marca:'Ledesma',  nombre:'Azúcar Rubio Mascabo', sub:'Sin refinar · Sin conservantes',        formato:'Paquete 800 g',   venta:'Bulto mayorista', foto:'fotos/led-mascabo.webp' },
  { cat:'almacen', marca:'Ledesma',  nombre:'Azúcar Light',         sub:'Azúcar + sucralosa',                    formato:'Paquete 500 g',   venta:'Bulto mayorista', foto:'fotos/led-light.webp' },
  { cat:'almacen', marca:'Ledesma',  nombre:'Stevia Líquida',       sub:'Edulcorante líquido',                   formato:'Botella 200 ml',  venta:'Caja mayorista', foto:'fotos/led-stevia.webp' },

  /* ── CELUSAL ── */
  { cat:'almacen', marca:'Celusal',  nombre:'Sal Gruesa',           sub:'La sal de la vida',                     formato:'Paquete 1 kg',    venta:'Bulto mayorista', foto:'fotos/cel-gruesa.webp' },
  { cat:'almacen', marca:'Celusal',  nombre:'Sal Parrillera',       sub:'Sal entrefina para parrilla',           formato:'Paquete 1 kg',    venta:'Bulto mayorista', foto:'fotos/cel-parrillera.webp' },
  { cat:'almacen', marca:'Celusal',  nombre:'Sal Light',            sub:'Reducida en sodio',                     formato:'Estuche 500 g',   venta:'Caja mayorista', foto:'fotos/cel-light.webp' },

  /* ── REINA MORA ── */
  { cat:'condimentos', marca:'Reina Mora', nombre:'Comino Molido',          sub:'Empanadas, guisos y locro',     formato:'Sachet 25 g',  venta:'Caja mayorista', foto:'fotos/rm-comino.webp' },
  { cat:'condimentos', marca:'Reina Mora', nombre:'Pimentón',               sub:'Seleccionado · Color intenso',  formato:'Sachet 25 g',  venta:'Caja mayorista', foto:'fotos/rm-pimenton.webp' },
  { cat:'condimentos', marca:'Reina Mora', nombre:'Nuez Moscada',           sub:'Molida · Salsas y purés',       formato:'Sachet 10 g',  venta:'Caja mayorista', foto:'fotos/rm-nuezmoscada.webp' },
  { cat:'condimentos', marca:'Reina Mora', nombre:'Canela Molida',          sub:'Repostería y postres',          formato:'Sachet 25 g',  venta:'Caja mayorista', foto:'fotos/rm-canela.webp' },
  { cat:'condimentos', marca:'Reina Mora', nombre:'Laurel en Hojas',        sub:'Hojas enteras seleccionadas',   formato:'Sachet 15 g',  venta:'Caja mayorista', foto:'fotos/rm-laurel.webp' },
  { cat:'condimentos', marca:'Reina Mora', nombre:'Perejil',                sub:'Deshidratado',                  formato:'Sachet 25 g',  venta:'Caja mayorista', foto:'fotos/rm-perejil.webp' },
  { cat:'condimentos', marca:'Reina Mora', nombre:'Condimento para Pizza',  sub:'Mezcla de hierbas',             formato:'Sachet 25 g',  venta:'Caja mayorista', foto:'fotos/rm-pizza.webp' },
  { cat:'condimentos', marca:'Reina Mora', nombre:'Condimento para Arroz',  sub:'Color y sabor al instante',     formato:'Sachet 25 g',  venta:'Caja mayorista', foto:'fotos/rm-arroz.webp' },
  { cat:'condimentos', marca:'Reina Mora', nombre:'Polvo para Hornear',     sub:'Tortas y bizcochuelos',         formato:'Sachet 50 g',  venta:'Caja mayorista', foto:'fotos/rm-polvohornear.webp' },
  { cat:'condimentos', marca:'Reina Mora', nombre:'Esencia de Vainilla',    sub:'Aromatizante para repostería',  formato:'Botella 110 ml', venta:'Caja mayorista', foto:'fotos/rm-vainilla.webp' },

  /* ── PLAYADITO ── */
  { cat:'yerbas', marca:'Playadito', nombre:'Yerba Suave',          sub:'Con palo · Suave',                      formato:'Paquete 1 kg',    venta:'Bulto mayorista', foto:'fotos/pla-suave.webp' },
  { cat:'yerbas', marca:'Playadito', nombre:'Yerba Sin Palo',       sub:'Despalada · Sabor intenso',             formato:'Paquete 500 g',   venta:'Bulto mayorista', foto:'fotos/pla-sinpalo.webp' },
  { cat:'yerbas', marca:'Playadito', nombre:'Yerba con Hierbas',    sub:'Compuesta con palo',                    formato:'Paquete 500 g',   venta:'Bulto mayorista', foto:'fotos/pla-hierbas.webp' },
  { cat:'infusiones', marca:'Playadito', nombre:'Mate Cocido',      sub:'En saquitos',                           formato:'Caja x 50 saquitos', venta:'Caja mayorista', foto:'fotos/pla-matecocido.webp' },

  /* ── TARAGÜI ── */
  { cat:'yerbas', marca:'Taragüi',   nombre:'Yerba Sin Palo',       sub:'Envase 4Flex',                          formato:'Paquete 1 kg',    venta:'Bulto mayorista', foto:'fotos/tar-sinpalo.webp' },
  { cat:'infusiones', marca:'Taragüi', nombre:'Té Negro',           sub:'En saquitos',                           formato:'Caja x 50 saquitos', venta:'Caja mayorista', foto:'fotos/tar-tenegro.webp' },
  { cat:'infusiones', marca:'Taragüi', nombre:'Mate Cocido',        sub:'En saquitos',                           formato:'Caja x 50 saquitos', venta:'Caja mayorista', foto:'fotos/tar-matecocido.webp' },
  { cat:'infusiones', marca:'Taragüi', nombre:'Té Verde',           sub:'En saquitos',                           formato:'Caja x 20 saquitos', venta:'Caja mayorista', foto:'fotos/tar-teverde.webp' },

  /* ── PIPORÉ ── */
  { cat:'yerbas', marca:'Piporé',    nombre:'Yerba Despalada',      sub:'Sin palo',                              formato:'Paquete 500 g',   venta:'Bulto mayorista', foto:'fotos/pip-despalada.webp' },
  { cat:'yerbas', marca:'Piporé',    nombre:'Hierbas Serranas',     sub:'Yerba compuesta',                       formato:'Paquete 500 g',   venta:'Bulto mayorista', foto:'fotos/pip-serranas.webp' },
  { cat:'yerbas', marca:'Piporé',    nombre:'Yerba Sublime',        sub:'Con palo',                              formato:'Paquete 500 g',   venta:'Bulto mayorista', foto:'fotos/pip-sublime.webp' },
  { cat:'yerbas', marca:'Piporé',    nombre:'Yerba Naranja',        sub:'Saborizada',                            formato:'Paquete 500 g',   venta:'Bulto mayorista', foto:'fotos/pip-naranja.webp' },

  /* ── SMIRNOFF ── */
  { cat:'bebidas', marca:'Smirnoff', nombre:'Vodka Original',       sub:'Triple destilado · Nº 21',              formato:'Botella 700 ml',  venta:'Caja mayorista', foto:'fotos/smi-original.webp' },
  { cat:'bebidas', marca:'Smirnoff', nombre:'Green Apple',          sub:'Vodka sabor manzana verde',             formato:'Botella 700 ml',  venta:'Caja mayorista', foto:'fotos/smi-greenapple.webp' },
  { cat:'bebidas', marca:'Smirnoff', nombre:'Tropical Fruits',      sub:'Vodka sabor frutas tropicales',         formato:'Botella 700 ml',  venta:'Caja mayorista', foto:'fotos/smi-tropical.webp' }
];
