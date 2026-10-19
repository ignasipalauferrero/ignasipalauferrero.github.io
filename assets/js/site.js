(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle
    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var current = root.getAttribute('data-theme') ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        var next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        toggle.setAttribute('aria-label', next === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
        try { localStorage.setItem('theme', next); } catch (e) {}
      });
    }

    // Header border once the page scrolls
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Lightbox for screenshots
    var dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.innerHTML = '<button class="close" type="button" aria-label="Cerrar">×</button><img alt=""><p></p>';
    document.body.appendChild(dialog);
    var img = dialog.querySelector('img');
    var cap = dialog.querySelector('p');
    dialog.querySelector('.close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    document.querySelectorAll('[data-zoom]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var src = btn.getAttribute('data-zoom');
        var inner = btn.querySelector('img');
        img.src = src;
        img.alt = inner ? inner.alt : '';
        cap.textContent = btn.getAttribute('data-caption') || (inner ? inner.alt : '');
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else window.open(src, '_blank');
      });
    });
  });
})();
