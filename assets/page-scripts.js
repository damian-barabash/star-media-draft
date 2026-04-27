/* ============================================
   Page scripts v3
   ============================================ */

// ===== 3D CAROUSEL =====
const init3DCarousel = () => {
  const stage = document.querySelector('.carousel-stage');
  if (!stage) return;
  const cards = stage.querySelectorAll('.carousel-card');
  const counter = document.querySelector('.carousel-count');
  const bar = document.querySelector('.carousel-bar');
  const prev = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  if (!cards.length) return;

  const total = cards.length;
  let active = 0;
  let timer = null;

  const layout = () => {
    cards.forEach((card, i) => {
      let offset = i - active;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const abs = Math.abs(offset);
      const isActive = offset === 0;
      const x = offset * 260;
      const z = isActive ? 180 : -abs * 140;
      const rot = offset * -18;
      const scale = isActive ? 1.12 : Math.max(0.75, 1 - abs * 0.12);
      const op = abs > 3 ? 0 : Math.max(0.12, 1 - abs * 0.25);

      card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`;
      card.style.opacity = op;
      card.style.zIndex = isActive ? 20 : 10 - abs;
      card.classList.toggle('active', isActive);
    });

    if (counter) counter.innerHTML = `<em>${String(active + 1).padStart(2, '0')}</em> / ${String(total).padStart(2, '0')}`;
    if (bar) bar.style.setProperty('--progress', `${((active + 1) / total) * 100}%`);
  };

  const go = (dir) => {
    active = (active + dir + total) % total;
    layout();
    resetTimer();
  };

  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));

  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (i === active) return;
      active = i;
      layout();
      resetTimer();
    });
  });

  const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => go(1), 5000);
  };
  const resetTimer = () => { clearInterval(timer); startTimer(); };

  stage.addEventListener('mouseenter', () => clearInterval(timer));
  stage.addEventListener('mouseleave', startTimer);

  // Drag
  let dragStart = null;
  stage.addEventListener('pointerdown', (e) => { dragStart = e.clientX; });
  stage.addEventListener('pointerup', (e) => {
    if (dragStart === null) return;
    const dx = e.clientX - dragStart;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    dragStart = null;
  });

  layout();
  startTimer();
};

// ===== TALENTS FILTER =====
const initFilters = () => {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.talent-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card, i) => {
        const show = cat === 'all' || card.dataset.category === cat;
        if (show) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
};

// ===== CONTACT TABS =====
const initTabs = () => {
  const tabs = document.querySelectorAll('.tab-btn[data-tab]');
  const forms = document.querySelectorAll('.form');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`form-${target}`)?.classList.add('active');
    });
  });

  const hash = window.location.hash.replace('#', '');
  if (hash === 'brands' || hash === 'talents') {
    document.querySelector(`.tab-btn[data-tab="${hash}"]`)?.click();
  }
};

// ===== FORMS (mock submit) =====
const initForms = () => {
  document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const html = btn.innerHTML;
      const lang = document.documentElement.getAttribute('data-lang') || 'pl';
      btn.innerHTML = `<span>${lang === 'pl' ? 'WYSŁANO ✓' : 'SENT ✓'}</span>`;
      setTimeout(() => {
        form.reset();
        btn.innerHTML = html;
      }, 3000);
    });
  });
};

// ===== COUNTERS =====
const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const duration = 1800;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('pl-PL', { maximumFractionDigits: decimals }) + suffix;
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  init3DCarousel();
  initFilters();
  initTabs();
  initForms();
  initCounters();
});
