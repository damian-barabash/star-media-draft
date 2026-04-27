/* ============================================
   HERO 3D — star.glb
   - Slow auto-rotate on Y axis
   - Smooth tilt toward mouse cursor
   - Scroll accelerates rotation + slight parallax
   - Mobile: auto-rotate only, no mouse interaction
   - If GLB fails to load, SVG fallback stays visible
   ============================================ */

(function () {
  // Wait for THREE + GLTFLoader to be available (they load via defer,
  // but we poll briefly in case of jitter before giving up).
  let tries = 0;
  function boot() {
    const hosts = document.querySelectorAll('.hero-3d');
    if (!hosts.length) return;
    if (typeof THREE === 'undefined' || typeof THREE.GLTFLoader !== 'function') {
      if (tries++ < 40) return setTimeout(boot, 100); // up to 4s
      console.warn('[hero3d] THREE / GLTFLoader never loaded — keeping fallback.');
      return;
    }
    hosts.forEach(init);
  }

  function init(host) {
  const glbUrl = host.dataset.glb || 'assets/3d/star.glb';
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  // ----- scene -----
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  host.appendChild(renderer.domElement);

  // ----- lights -----
  // Soft ambient so the model is never pitch black
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  // Warm gold key light from upper-right (matches brand gold)
  const keyLight = new THREE.DirectionalLight(0xffcb7a, 1.4);
  keyLight.position.set(3, 4, 3);
  scene.add(keyLight);
  // Cool purple rim light from behind-left (matches brand purple)
  const rimLight = new THREE.DirectionalLight(0x9b7bff, 0.9);
  rimLight.position.set(-4, 2, -3);
  scene.add(rimLight);
  // Subtle fill
  const fill = new THREE.DirectionalLight(0xffffff, 0.35);
  fill.position.set(0, -3, 4);
  scene.add(fill);

  // ----- sizing -----
  function sizeToHost() {
    const rect = host.getBoundingClientRect();
    const w = Math.max(100, rect.width);
    const h = Math.max(100, rect.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  sizeToHost();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sizeToHost, 120);
  });

  // ----- interaction state -----
  const mouse = { x: 0, y: 0 };       // normalized -1..1 relative to host
  const target = { rotX: 0, rotY: 0 };
  const current = { rotX: 0, rotY: 0 };
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;
  let heroVisible = true;

  if (!isTouch) {
    window.addEventListener('mousemove', (e) => {
      const rect = host.getBoundingClientRect();
      // Only react when mouse is over the hero section's vertical band,
      // so scrolling further down doesn't twist the model.
      const inBand = e.clientY >= 0 && e.clientY <= window.innerHeight * 1.1;
      if (!inBand) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouse.x = Math.max(-1.5, Math.min(1.5, nx));
      mouse.y = Math.max(-1.5, Math.min(1.5, ny));
      // Gentle tilt range — ±~18°
      target.rotY = mouse.x * 0.32;
      target.rotX = mouse.y * 0.22;
    }, { passive: true });
  }

  // Scroll: track velocity for short rotation boost, plus parallax
  let parallaxY = 0;
  window.addEventListener('scroll', () => {
    const dy = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    scrollVelocity = dy * 0.002;       // decays each frame
    parallaxY = window.scrollY * 0.0008; // subtle drift up/down
    heroVisible = window.scrollY < window.innerHeight * 1.2;
  }, { passive: true });

  // Pause rendering when hero is out of view (perf)
  const visObs = new IntersectionObserver((entries) => {
    heroVisible = entries[0].isIntersecting;
  }, { threshold: 0 });
  visObs.observe(host);

  // ----- load GLB -----
  let model = null;

  if (typeof THREE.GLTFLoader !== 'function') {
    console.warn('[hero3d] GLTFLoader not available — fallback stays.');
    return;
  }

  const loader = new THREE.GLTFLoader();
  const progressEl = host.querySelector('.hero-3d-progress-value');
  console.log('[hero3d] Loading', glbUrl, '…');

  loader.load(
    glbUrl,
    (gltf) => {
      console.log('[hero3d] ✓ Loaded', glbUrl);
      model = gltf.scene;

      // Auto-fit: center and scale the model so its longest dim ≈ 2 units
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      console.log('[hero3d] Model original size:', size.x.toFixed(2), size.y.toFixed(2), size.z.toFixed(2));
      model.position.sub(center); // recenter at origin
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      // Compact variant renders smaller so it feels like an accent, not a hero
      const targetUnits = host.classList.contains('hero-3d--compact') ? 1.4 : 2.2;
      const scale = targetUnits / maxDim;
      model.scale.setScalar(scale);

      scene.add(model);
      host.classList.add('ready'); // fades canvas in, fades fallback out
    },
    (xhr) => {
      if (xhr.total) {
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        if (progressEl) progressEl.textContent = pct + '%';
        console.log(`[hero3d] Loading ${glbUrl}: ${pct}% (${Math.round(xhr.loaded/1024)}KB / ${Math.round(xhr.total/1024)}KB)`);
      } else if (progressEl) {
        // Some servers don't send Content-Length — show downloaded KB
        progressEl.textContent = Math.round(xhr.loaded/1024) + 'KB';
      }
    },
    (err) => {
      console.error('[hero3d] ✗ Could not load', glbUrl, '— fallback stays visible.');
      console.error('  Error:', err);
      console.error('  Check: 1) file exists at that exact path, 2) file name is exactly star.glb, 3) valid GLB format');
      host.classList.add('failed');
      // Keep SVG fallback
    }
  );

  // ----- render loop -----
  const AUTO_ROT_SPEED = 0.003; // radians per frame — slow

  function tick() {
    requestAnimationFrame(tick);
    if (!heroVisible) return;

    // Easing toward mouse-derived targets
    current.rotX += (target.rotX - current.rotX) * 0.06;
    current.rotY += (target.rotY - current.rotY) * 0.06;

    if (model) {
      model.rotation.y += AUTO_ROT_SPEED + scrollVelocity;
      // Tilt on top of the auto-spin
      model.rotation.x = current.rotX;
      // slight parallax drift
      model.position.y = -parallaxY;
    }

    // Scroll velocity decay
    scrollVelocity *= 0.9;

    renderer.render(scene, camera);
  }
  tick();
  } // end init()

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
