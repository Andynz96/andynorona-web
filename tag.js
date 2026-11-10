/* Medición de andynz.com. Un solo ID para todo el sitio.
   "GTM-XXXXXXX" carga Google Tag Manager; "G-XXXXXXXXXX" carga GA4 directo. Vacío: no se carga nada.
   Cada página envía su page_view (el inicio lo hace por ruta, porque usa #secciones).
   Cualquier elemento con data-track="nombre_evento" envía ese evento al hacer clic. */
(function () {
  var TAG_ID = '';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  var ok = /^(GTM|G)-[A-Z0-9]+$/.test(TAG_ID);
  var isGTM = ok && TAG_ID.indexOf('GTM-') === 0;

  window.anTrack = function (name, params) {
    if (!ok) return;
    params = params || {};
    if (isGTM) { params.event = name; window.dataLayer.push(params); }
    else gtag('event', name, params);
  };

  if (ok) {
    var sc = document.createElement('script'); sc.async = true;
    if (isGTM) {
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      sc.src = 'https://www.googletagmanager.com/gtm.js?id=' + TAG_ID;
    } else {
      sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + TAG_ID;
      gtag('js', new Date());
      gtag('config', TAG_ID, { send_page_view: false });
    }
    document.head.appendChild(sc);
  }

  /* Páginas normales (handbooks, artefactos): un page_view al cargar. El inicio lo maneja él mismo. */
  if (!document.documentElement.hasAttribute('data-spa')) {
    window.anTrack('page_view', { page_path: location.pathname, page_title: document.title, page_location: location.href });
  }

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-track]') : null;
    if (!el) return;
    window.anTrack(el.getAttribute('data-track'), { page_path: location.pathname, label: (el.textContent || '').trim().slice(0, 80) });
  });
})();
