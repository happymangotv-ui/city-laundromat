(function() {
  const NAV = `
<nav>
  <a href="/index.html" class="nav-logo" style="text-decoration:none">The City <span>Laundromat</span></a>
  <ul class="nav-links" id="navLinks">
    <li><a href="/index.html">Home</a></li>
    <li><a href="/pickup-delivery.html">Pickup &amp; Delivery</a></li>
    <li><a href="/self-serve.html">Self-Serve</a></li>
    <li><a href="/commercial.html">Commercial</a></li>
    <li><a href="/about.html">About</a></li>
  </ul>
  <a href="/order.html" class="nav-cta"><span>Schedule a Pickup</span><span class="arrow" style="margin-left:6px">&#x2192;</span></a>
  <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
</nav>`;

  const FOOTER = `
<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <div class="logo">The City <span>Laundromat</span></div>
      <p>Professional laundry services serving Manhattan and the Bronx. Clean clothes, happy customers &mdash; every single time.</p>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="/pickup-delivery.html">Pickup &amp; Delivery</a></li>
        <li><a href="/self-serve.html">Self-Serve</a></li>
        <li><a href="/commercial.html">Commercial</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Info</h4>
      <ul>
        <li><span>&#x1F4CD; 391 Brook Ave, Bronx NY 10454</span></li>
        <li><span>&#x1F4DE; <a href="tel:3477587966" style="color:rgba(255,255,255,0.6);text-decoration:none">(347) 758-7966</a></span></li>
        <li><span>&#x2709;&#xFE0F; <a href="mailto:Uticalaundry@gmail.com" style="color:rgba(255,255,255,0.6);text-decoration:none">Uticalaundry@gmail.com</a></span></li>
        <li><span>&#x1F550; Mon&ndash;Sun: 7am &ndash; 10pm</span></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2025 The City Laundromat. All rights reserved.</span>
    <span>391 Brook Ave, Bronx, NY 10454</span>
  </div>
</footer>`;

  document.addEventListener('DOMContentLoaded', function() {
    // Inject nav
    var navEl = document.getElementById('nav-placeholder');
    if (navEl) navEl.outerHTML = NAV;

    // Inject footer
    var footerEl = document.getElementById('footer-placeholder');
    if (footerEl) footerEl.outerHTML = FOOTER;

    // Init hamburger
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
      });
    }

    // Nav height CSS var
    var nav = document.querySelector('nav');
    if (nav) {
      function setNavH() {
        document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
      }
      window.addEventListener('resize', setNavH);
      setNavH();
    }
  });
})();
