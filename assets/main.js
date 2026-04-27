/* ============================================
   STAR MEDIA v3 — Core JS
   ============================================ */

const initMain = () => {

// ===== TICKER TIME (Warsaw CET) =====
const tickerTime = document.querySelector('.ticker-time');
const updateTime = () => {
  const now = new Date();
  const warsawTime = now.toLocaleTimeString('pl-PL', {
    timeZone: 'Europe/Warsaw',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  if (tickerTime) tickerTime.textContent = warsawTime;
};
updateTime();
setInterval(updateTime, 1000);

// ===== FULLSCREEN MENU =====
const menuBtn = document.querySelector('.nav-menu-btn');
const menuClose = document.querySelector('.menu-close');
const menuOverlay = document.querySelector('.menu-overlay');

menuBtn?.addEventListener('click', () => {
  menuOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
});

menuClose?.addEventListener('click', () => {
  menuOverlay?.classList.remove('open');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOverlay?.classList.contains('open')) {
    menuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== LANGUAGE SWITCHER (must run BEFORE reveal wrapping) =====
const LANG_KEY = 'sm_lang';
const getLang = () => localStorage.getItem(LANG_KEY) || 'pl';

const applyLang = (lang) => {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-pl]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null) {
      // Reset wrapping flag so reveal re-wraps with new lang content
      delete el.dataset.wrapped;
      if (text.includes('<')) el.innerHTML = text;
      else el.textContent = text;
    }
  });
  document.querySelectorAll('.ticker-lang button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem(LANG_KEY, lang);
  // Re-apply reveal wrapping after lang change
  applyRevealWrapping();
};

// ===== SMART REVEAL WRAPPING =====
// Animation via opacity+translateY — text never clipped
const applyRevealWrapping = () => {
  document.querySelectorAll('.words-reveal').forEach(el => {
    if (el.dataset.wrapped) return;

    // Wrap text words. Keep punctuation-only tokens inline without animation wrapper
    // so they don't become orphan words on their own line.
    const wrapText = (text) => {
      const parts = text.split(/(\s+)/);
      return parts.map(part => {
        if (!part) return '';
        if (/^\s+$/.test(part)) return part;
        // If token is only punctuation, output as plain text (attaches naturally)
        if (/^[.,!?;:—–\-]+$/.test(part)) return part;
        return `<span class="word"><span class="word-inner">${part}</span></span>`;
      }).join('');
    };

    const walk = (node) => {
      let out = '';
      node.childNodes.forEach(child => {
        if (child.nodeType === 3) {
          out += wrapText(child.textContent);
        } else if (child.nodeType === 1) {
          const tag = child.tagName.toLowerCase();
          const cls = child.className ? ` class="${child.className}"` : '';
          out += `<${tag}${cls}>${walk(child)}</${tag}>`;
        }
      });
      return out;
    };

    el.innerHTML = walk(el);
    el.dataset.wrapped = '1';
  });

  document.querySelectorAll('[data-split-lines]').forEach(el => {
    if (el.dataset.wrapped) return;
    const lines = el.innerHTML.split('<br>').map(l => l.trim()).filter(Boolean);
    el.innerHTML = lines.map(l => `<span class="line-mask"><span class="line-inner">${l}</span></span>`).join('');
    el.dataset.wrapped = '1';
  });
};

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.ticker-lang button');
  if (btn) applyLang(btn.dataset.lang);
});

// Apply language FIRST, then wrap
applyLang(getLang());

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal, .fade-in, .words-reveal').forEach(el => {
  revealObserver.observe(el);
});

// ===== SCROLL STACK — active chapter detection =====
const chapters = document.querySelectorAll('.chapter');
const chapterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.3 });

chapters.forEach(ch => chapterObserver.observe(ch));

// ===== SCROLL HINT hide after scroll =====
const scrollHint = document.querySelector('.scroll-hint');
let scrollHintHidden = false;
window.addEventListener('scroll', () => {
  if (!scrollHintHidden && window.scrollY > 100) {
    scrollHint?.classList.add('hidden');
    scrollHintHidden = true;
  } else if (scrollHintHidden && window.scrollY < 50) {
    scrollHint?.classList.remove('hidden');
    scrollHintHidden = false;
  }
}, { passive: true });

// ===== PLACEHOLDER PARALLAX =====
// Each .ph has its background on ::before with -20%/+20% overscan.
// We move it via --ph-parallax CSS var, max ±15% of element height,
// driven by element's vertical position relative to viewport center.
const initPlaceholderParallax = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = Array.from(document.querySelectorAll('.ph'));
  if (!elements.length) return;

  const STRENGTH = 0.15; // max offset = 15% of element height

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -50 || rect.top > vh + 50) return;
      const center = rect.top + rect.height / 2;
      const progress = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
      const offset = -progress * rect.height * STRENGTH;
      el.style.setProperty('--ph-parallax', `${offset.toFixed(1)}px`);
    });
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    requestAnimationFrame(update);
    ticking = true;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
};
initPlaceholderParallax();

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

}; // end initMain

/* ===== STAR CURSOR ===== */
function initStarCursor() {
  // Skip on touch devices
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  if (window.innerWidth < 900) return;

  const cursor = document.createElement('div');
  cursor.className = 'star-cursor';
  cursor.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>';
  document.body.appendChild(cursor);

  let mx = -100, my = -100;   // mouse target
  let cx = -100, cy = -100;   // cursor current (lerped)
  let visible = false;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!visible) {
      visible = true;
      cursor.classList.add('visible');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    visible = false;
    cursor.classList.remove('visible');
  });

  // Hover detection — grow on interactive elements
  const HOVER_SELECTOR = 'a, button, .menu-link, .service-row, .carousel-card, [data-cursor-hover]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_SELECTOR)) {
      cursor.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVER_SELECTOR) && !e.relatedTarget?.closest(HOVER_SELECTOR)) {
      cursor.classList.remove('hover');
    }
  });

  // Smooth easing loop (lerp ~0.18 = nice trail)
  function tick() {
    const dx = mx - cx;
    const dy = my - cy;
    cx += dx * 0.18;
    cy += dy * 0.18;
    // Center the 32×32 cursor on the actual pointer
    cursor.style.transform = `translate3d(${cx - 16}px, ${cy - 16}px, 0)`;
    requestAnimationFrame(tick);
  }
  tick();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMain, 0);
    setTimeout(initStarCursor, 0);
  });
} else {
  setTimeout(initMain, 0);
  setTimeout(initStarCursor, 0);
}


