// Simple client-side includes for GitHub Pages
(function () {
  // Detect GitHub Pages project base (e.g., /portfolio) so /partials works everywhere
  const base = (function () {
    const p = location.pathname.split('/').filter(Boolean);
    // If served at username.github.io/<repo>/..., use "/<repo>"
    return (location.hostname.endsWith('github.io') && p.length) ? ('/' + p[0]) : '';
  })();

  async function inject(el) {
    const url = el.getAttribute('data-include');
    if (!url) return;
    try {
      const res = await fetch(base + url + `?v=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(res.statusText);
      const html = await res.text();

      // Replace placeholder with fetched HTML
      const tpl = document.createElement('template');
      tpl.innerHTML = html.trim();
      const frag = tpl.content.cloneNode(true);
      el.replaceWith(frag);

      // If the partial had <script> tags, re-execute them (rare for nav/footer)
      tpl.content.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        [...old.attributes].forEach(a => s.setAttribute(a.name, a.value));
        s.textContent = old.textContent;
        document.body.appendChild(s);
      });
    } catch (e) {
      console.warn('Include failed:', url, e);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-include]').forEach(inject);
  });
})();