/* ============================================
   Shared components v3
   Injects nav, menu overlay, ticker, footer
   ============================================ */

const navHTML = `
<div class="nav-bar">
  <a href="index.html" class="nav-mark">
    <span class="nav-mark-logo"><img src="assets/logo/logo.png" alt="Star Media"></span>
    <span>Star Media</span>
  </a>
  <button class="nav-menu-btn" aria-label="Open menu">
    <span data-pl="MENU" data-en="MENU">MENU</span>
    <span class="nav-menu-btn-lines"><span></span><span></span></span>
  </button>
</div>

<div class="ticker">
  <span class="ticker-time">00:00:00</span>
  <span data-pl="Warszawa · CET" data-en="Warsaw · CET">Warszawa · CET</span>
  <span class="ticker-lang">
    <button data-lang="pl">PL</button>
    <span>/</span>
    <button data-lang="en">EN</button>
  </span>
</div>

<div class="scroll-hint">
  <span data-pl="Przewiń" data-en="Scroll">Przewiń</span>
</div>
`;

const menuHTML = `
<div class="menu-overlay" role="dialog" aria-modal="true">
  <div class="menu-overlay-inner">

    <div class="menu-header">
      <a href="index.html" class="nav-mark">
        <span class="nav-mark-logo"><img src="assets/logo/logo.png" alt="Star Media"></span>
        <span>Star Media</span>
      </a>
      <button class="menu-close" aria-label="Close menu">
        <span data-pl="ZAMKNIJ" data-en="CLOSE">ZAMKNIJ</span>
        <span class="menu-close-x"></span>
      </button>
    </div>

    <div class="menu-body">
      <nav class="menu-links">
        <a href="index.html" class="menu-link"><span class="menu-link-num">01</span><span class="ml-text"><span class="ml-normal" data-pl="Strona główna" data-en="Home">Strona główna</span><span class="ml-italic" data-pl="Strona główna" data-en="Home" aria-hidden="true">Strona główna</span></span></a>
        <a href="about.html" class="menu-link"><span class="menu-link-num">02</span><span class="ml-text"><span class="ml-normal" data-pl="O nas" data-en="About">O nas</span><span class="ml-italic" data-pl="O nas" data-en="About" aria-hidden="true">O nas</span></span></a>
        <a href="talents.html" class="menu-link"><span class="menu-link-num">03</span><span class="ml-text"><span class="ml-normal" data-pl="Talenty" data-en="Talents">Talenty</span><span class="ml-italic" data-pl="Talenty" data-en="Talents" aria-hidden="true">Talenty</span></span></a>
        <a href="services.html" class="menu-link"><span class="menu-link-num">04</span><span class="ml-text"><span class="ml-normal" data-pl="Usługi" data-en="Services">Usługi</span><span class="ml-italic" data-pl="Usługi" data-en="Services" aria-hidden="true">Usługi</span></span></a>
        <a href="influencer-marketing.html" class="menu-link"><span class="menu-link-num">05</span><span class="ml-text"><span class="ml-normal" data-pl="Influencer Marketing" data-en="Influencer Marketing">Influencer Marketing</span><span class="ml-italic" data-pl="Influencer Marketing" data-en="Influencer Marketing" aria-hidden="true">Influencer Marketing</span></span></a>
        <a href="cases.html" class="menu-link"><span class="menu-link-num">06</span><span class="ml-text"><span class="ml-normal" data-pl="Projekty" data-en="Projects">Projekty</span><span class="ml-italic" data-pl="Projekty" data-en="Projects" aria-hidden="true">Projekty</span></span></a>
        <a href="contact.html" class="menu-link"><span class="menu-link-num">07</span><span class="ml-text"><span class="ml-normal" data-pl="Kontakt" data-en="Contact">Kontakt</span><span class="ml-italic" data-pl="Kontakt" data-en="Contact" aria-hidden="true">Kontakt</span></span></a>
      </nav>

      <aside class="menu-aside">
        <div class="menu-aside-block">
          <span class="mono" data-pl="Kontakt" data-en="Contact">Kontakt</span>
          <a href="mailto:hello@star-media.pl">hello@star-media.pl</a>
        </div>
        <div class="menu-aside-block">
          <span class="mono" data-pl="Lokalizacja" data-en="Location">Lokalizacja</span>
          <p>Warszawa, Polska</p>
        </div>
        <div class="menu-aside-block">
          <span class="mono" data-pl="Social" data-en="Social">Social</span>
          <a href="https://instagram.com/star_media_pl" target="_blank" rel="noopener">@star_media_pl</a>
        </div>
        <div class="menu-aside-block">
          <span class="mono" data-pl="Partner" data-en="Partner">Partner</span>
          <p data-pl="Oficjalny partner Polska Press" data-en="Official Polska Press partner">Oficjalny partner Polska Press</p>
        </div>
      </aside>
    </div>

    <div class="menu-footer mono">
      <span>© 2026 Star Media</span>
      <span data-pl="Butikowa agencja talentów" data-en="Boutique talent agency">Butikowa agencja talentów</span>
    </div>

  </div>
</div>
`;

const footerHTML = `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="assets/logo/logo.png" alt="Star Media">
        <div class="mono" style="letter-spacing: 0.18em; font-weight: 600; color: var(--white); font-size: 0.85rem;">Star Media</div>
        <p data-pl="Butikowa agencja talentów i influencer marketing. Oficjalny partner Polska Press."
           data-en="Boutique talent management and influencer marketing. Official Polska Press partner.">
          Butikowa agencja talentów i influencer marketing. Oficjalny partner Polska Press.
        </p>
      </div>
      <div class="footer-col">
        <h4 data-pl="Nawigacja" data-en="Navigation">Nawigacja</h4>
        <ul>
          <li><a href="index.html" data-pl="Strona główna" data-en="Home">Strona główna</a></li>
          <li><a href="about.html" data-pl="O nas" data-en="About">O nas</a></li>
          <li><a href="talents.html" data-pl="Talenty" data-en="Talents">Talenty</a></li>
          <li><a href="services.html" data-pl="Usługi" data-en="Services">Usługi</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-pl="Współpraca" data-en="Work with us">Współpraca</h4>
        <ul>
          <li><a href="contact.html#brands" data-pl="Dla marek" data-en="For brands">Dla marek</a></li>
          <li><a href="contact.html#talents" data-pl="Dla talentów" data-en="For talents">Dla talentów</a></li>
          <li><a href="influencer-marketing.html">Polska Press</a></li>
          <li><a href="cases.html" data-pl="Projekty" data-en="Projects">Projekty</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-pl="Kontakt" data-en="Contact">Kontakt</h4>
        <ul>
          <li><a href="mailto:hello@star-media.pl">hello@star-media.pl</a></li>
          <li><a href="https://instagram.com/star_media_pl" target="_blank" rel="noopener">Instagram</a></li>
          <li>Warszawa, Polska</li>
        </ul>
      </div>
    </div>
    <div class="footer-bot">
      <span>© 2026 Star Media</span>
      <span data-pl="Oficjalny partner Polska Press" data-en="Official Polska Press partner">Oficjalny partner Polska Press</span>
    </div>
  </div>
</footer>
`;

// Inject synchronously. The script tag uses `defer`, so the DOM is fully
// parsed (mount points exist) by the time this runs, AND main.js — which
// is also defer and depends on these elements — runs strictly after this.
// Wrapping in DOMContentLoaded would queue a task that can lose the race
// against main.js's setTimeout(0), leaving .ticker-time and .nav-menu-btn
// missing when initMain queries the DOM.
const navMount = document.getElementById('nav-mount');
const menuMount = document.getElementById('menu-mount');
const footerMount = document.getElementById('footer-mount');
if (navMount) navMount.innerHTML = navHTML;
if (menuMount) menuMount.innerHTML = menuHTML;
if (footerMount) footerMount.innerHTML = footerHTML;
