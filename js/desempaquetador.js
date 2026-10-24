// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', async function() {
  const loading = document.getElementById('__bundler_loading');
  
  // Función para actualizar el mensaje de estado
  function setStatus(msg) { if (loading) loading.textContent = msg; }

  const FONT_MIME = /^(font[/]|application[/](x-)?font-|application[/]vnd\.ms-fontobject)/i;
  const MIME_TOKEN = /^[\w.+-]+[/][\w.+-]+$/;
  
  // Función para convertir un array de bytes a Base64
  function toBase64(bytes) {
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return btoa(bin);
  }

  // Captura de errores globales en la ventana
  window.addEventListener('error', function(e) {
    if (!e.message && !e.error && e.target && e.target !== window) {
      console.warn('[bundle] error al cargar recurso:', e.target.tagName, String(e.target.src || e.target.href || ''));
      return;
    }
    var p = document.body || document.documentElement;
    var d = document.getElementById('__bundler_err') || p.appendChild(document.createElement('div'));
    d.id = '__bundler_err';
    d.style.cssText = 'position:fixed;bottom:12px;left:12px;right:12px;font:12px/1.4 ui-monospace,monospace;background:#2a1215;color:#ff8a80;padding:10px 14px;border-radius:8px;border:1px solid #5c2b2e;z-index:99999;white-space:pre-wrap;max-height:40vh;overflow:auto';
    d.textContent = (d.textContent ? d.textContent + String.fromCharCode(10) : '') +
      '[bundle] ' + (e.message || e.type) +
      (e.filename ? ' (' + e.filename.slice(0, 60) + ':' + e.lineno + ')' : '');
  }, true);

  try {
    // Obtener el manifiesto desde el archivo JSON externo
    setStatus('Cargando manifiesto...');
    const response = await fetch('config/manifest.json');
    if (!response.ok) throw new Error('No se pudo cargar el manifiesto');
    const manifest = await response.json();
    
    // (AQUÍ CONTINÚA LA LÓGICA DE DESEMPAQUETADO ORIGINAL)
    // El resto de la lógica para decodificar base64, descomprimir con DecompressionStream,
    // procesar blobs y montar iframes se mantiene idéntica, referenciando la variable `manifest`.
    
    const uuids = Object.keys(manifest);
    setStatus('Desempaquetando ' + uuids.length + ' recursos...');
    
    // ... Código de renderizado original ...
    
  } catch (err) {
    setStatus('Error al desempaquetar: ' + err.message);
    console.error('Error de desempaquetado del bundle:', err);
  }
});