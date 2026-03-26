// Loads shared nav and footer components into every page
async function loadComponent(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    const html = await res.text();
    el.outerHTML = html;
  } catch(e) {
    console.warn('Could not load component:', url, e);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('#nav-placeholder', '/nav.html'),
    loadComponent('#footer-placeholder', '/footer.html'),
  ]);

  // Re-init nav toggle after inject
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  // Re-init nav height CSS var
  const nav = document.querySelector('nav');
  if (nav) {
    const setNavH = () => document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
    window.addEventListener('resize', setNavH);
    setNavH();
  }
});
