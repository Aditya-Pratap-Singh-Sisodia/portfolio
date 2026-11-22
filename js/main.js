/**
 * ADITYA PRATAP SINGH SISODIA - PORTFOLIO INTERACTION ENGINE
 * Full suite: Particle Canvas, YOLOv11 Marine Simulator, ResNet Softmax Tester,
 * DevOps Pipeline Runner, Developer CLI, Theme Switcher, Copy-to-Clipboard & Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypingEffect();
  initScrollSpyAndNavbar();
  initRevealAnimations();
  initThemeToggle();
  initProjectFilters();
  initYoloMarineSim();
  initFlowerClassifierSim();
  initDevOpsPipeline();
  initInteractiveTerminal();
  initContactActions();
  initResumeModal();
  initMobileMenu();
});

/* ==========================================================================
   1. Particle Constellation Canvas (Hero Background)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 16), 85);
  const maxDistance = 140;

  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Typing Effect in Hero Section
   ========================================================================== */
function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const roles = [
    'AI & Deep Learning Engineer',
    'Real-time Computer Vision (YOLOv11)',
    'Enterprise DevOps & Kubernetes (Dell)',
    'Transfer Learning & CNNs (PyTorch)',
    'High-Performance SDE (C++ / Python)'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingDelay = 80;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingDelay = 40;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingDelay = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      typingDelay = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingDelay = 450;
    }

    setTimeout(type, typingDelay);
  }

  type();
}

/* ==========================================================================
   3. Scroll Spy, Navbar Elevation & Mobile Menu
   ========================================================================== */
function initScrollSpyAndNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar elevation background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy active link
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
    const isOpen = navMenu.classList.contains('mobile-open');
    toggleBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close menu when clicking link
  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ==========================================================================
   4. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   5. Dark / Light Theme Toggle with LocalStorage
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} theme`);
  });

  function updateThemeIcon(theme) {
    themeToggle.innerHTML =
      theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
  }
}

/* ==========================================================================
   6. Project Category Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Interactive AI Lab: YOLOv11 Marine Vision Simulator
   ========================================================================== */
function initYoloMarineSim() {
  const canvas = document.getElementById('marine-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const confSlider = document.getElementById('conf-slider');
  const confVal = document.getElementById('conf-val');
  const sceneBtns = document.querySelectorAll('.scene-btn');
  const detectedList = document.getElementById('detected-species-list');
  const fpsEl = document.getElementById('yolo-fps');
  const latencyEl = document.getElementById('yolo-latency');
  const detectionsCountEl = document.getElementById('yolo-detections');

  let currentScene = 'coral';
  let confThreshold = 0.5;

  const scenes = {
    coral: {
      bgGradient: ['#04223b', '#020f1b'],
      waterColor: 'rgba(6, 182, 212, 0.08)',
      targets: [
        { label: 'Green Sea Turtle (Chelonia mydas)', short: 'Sea Turtle', conf: 0.984, x: 70, y: 80, w: 220, h: 140, color: '#10b981', vx: 0.4, vy: 0.2 },
        { label: 'Clown Anemonefish (Amphiprion)', short: 'Clownfish', conf: 0.942, x: 370, y: 220, w: 110, h: 80, color: '#f59e0b', vx: -0.6, vy: 0.3 },
        { label: 'Red Lionfish (Pterois volitans)', short: 'Lionfish', conf: 0.918, x: 420, y: 90, w: 130, h: 90, color: '#ef4444', vx: 0.3, vy: -0.3 },
        { label: 'Blue Tang (Paracanthurus)', short: 'Blue Tang', conf: 0.725, x: 180, y: 260, w: 90, h: 65, color: '#38bdf8', vx: 0.7, vy: -0.4 }
      ]
    },
    deep: {
      bgGradient: ['#021124', '#00050c'],
      waterColor: 'rgba(59, 130, 246, 0.05)',
      targets: [
        { label: 'Giant Pacific Manta (Mobula birostris)', short: 'Manta Ray', conf: 0.976, x: 90, y: 90, w: 260, h: 150, color: '#38bdf8', vx: 0.5, vy: 0.1 },
        { label: 'Pelagic White-tip Shark (Carcharhinus)', short: 'Pelagic Shark', conf: 0.931, x: 340, y: 190, w: 180, h: 100, color: '#f59e0b', vx: -0.7, vy: 0.2 },
        { label: 'Deep Sea Moon Jelly (Aurelia aurita)', short: 'Moon Jelly', conf: 0.684, x: 220, y: 270, w: 80, h: 70, color: '#a855f7', vx: 0.2, vy: -0.4 }
      ]
    },
    kelp: {
      bgGradient: ['#05231c', '#010d0b'],
      waterColor: 'rgba(16, 185, 129, 0.08)',
      targets: [
        { label: 'California Sea Lion (Zalophus)', short: 'Sea Lion', conf: 0.962, x: 130, y: 100, w: 230, h: 130, color: '#10b981', vx: 0.6, vy: 0.3 },
        { label: 'Leopard Shark (Triakis semifasciata)', short: 'Leopard Shark', conf: 0.905, x: 360, y: 210, w: 160, h: 85, color: '#f59e0b', vx: -0.5, vy: -0.2 },
        { label: 'Garibaldi Damselfish (Hypsypops)', short: 'Garibaldi', conf: 0.768, x: 80, y: 250, w: 95, h: 65, color: '#f97316', vx: 0.4, vy: -0.3 }
      ]
    }
  };

  // Slider change
  if (confSlider) {
    confSlider.addEventListener('input', (e) => {
      confThreshold = parseFloat(e.target.value);
      if (confVal) confVal.textContent = confThreshold.toFixed(2);
      updateSpeciesList();
    });
  }

  // Scene switch
  sceneBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sceneBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentScene = btn.getAttribute('data-scene');
      updateSpeciesList();
      showToast(`Loaded ${btn.textContent} specimen video feed`);
    });
  });

  // Switch tab buttons in projects section to scroll/open
  document.querySelectorAll('.launch-underwater-demo').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabBtn = document.querySelector('.lab-tab[data-tab="yolo-tab"]');
      if (tabBtn) tabBtn.click();
      document.getElementById('interactive-lab').scrollIntoView({ behavior: 'smooth' });
    });
  });

  function updateSpeciesList() {
    if (!detectedList) return;
    const targets = scenes[currentScene].targets;
    const visible = targets.filter((t) => t.conf >= confThreshold);

    detectedList.innerHTML = visible.length
      ? visible
          .map(
            (t) => `<li><span class="color-dot" style="background:${t.color}"></span> ${t.short} (${(t.conf * 100).toFixed(1)}%)</li>`
          )
          .join('')
      : '<li style="color:var(--text-muted); font-style:italic;">No detections above confidence threshold</li>';

    if (detectionsCountEl) {
      detectionsCountEl.innerHTML = `<i class="fa-solid fa-crosshairs"></i> Targets: ${visible.length}`;
    }
  }

  updateSpeciesList();

  // Animation Loop for Underwater Canvas
  let frameCount = 0;
  function renderYolo() {
    frameCount++;
    const scene = scenes[currentScene];
    const width = canvas.width;
    const height = canvas.height;

    // Background underwater gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, scene.bgGradient[0]);
    grad.addColorStop(1, scene.bgGradient[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle caustic light rays
    ctx.fillStyle = scene.waterColor;
    ctx.beginPath();
    ctx.moveTo(100 + Math.sin(frameCount * 0.02) * 40, 0);
    ctx.lineTo(250 + Math.sin(frameCount * 0.03) * 50, height);
    ctx.lineTo(160 + Math.sin(frameCount * 0.03) * 50, height);
    ctx.lineTo(40 + Math.sin(frameCount * 0.02) * 40, 0);
    ctx.fill();

    // Subtle water bubbles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let b = 0; b < 6; b++) {
      const bx = (b * 95 + frameCount * 0.8) % width;
      const by = height - ((frameCount * (1 + b * 0.2) + b * 60) % height);
      ctx.beginPath();
      ctx.arc(bx, by, 3 + (b % 3), 0, Math.PI * 2);
      ctx.fill();
    }

    // Render bounding boxes & marine creatures
    scene.targets.forEach((target) => {
      // Gentle floating motion
      target.x += target.vx;
      target.y += target.vy;

      if (target.x < 20 || target.x + target.w > width - 20) target.vx *= -1;
      if (target.y < 30 || target.y + target.h > height - 20) target.vy *= -1;

      // Draw the actual swimming creature inside its coordinates
      drawMarineCreature(ctx, target, frameCount);

      // Draw if above threshold
      if (target.conf >= confThreshold) {
        // Box outline
        ctx.strokeStyle = target.color;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(target.x, target.y, target.w, target.h);

        // Corner accents
        const cornerLen = 12;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;

        // Top-left corner
        ctx.beginPath();
        ctx.moveTo(target.x, target.y + cornerLen);
        ctx.lineTo(target.x, target.y);
        ctx.lineTo(target.x + cornerLen, target.y);
        ctx.stroke();

        // Label background banner
        ctx.fillStyle = target.color;
        const labelText = `${target.short} ${(target.conf * 100).toFixed(1)}%`;
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        const textWidth = ctx.measureText(labelText).width;
        ctx.fillRect(target.x - 1, target.y - 20, textWidth + 12, 19);

        // Label text
        ctx.fillStyle = '#050b14';
        ctx.fillText(labelText, target.x + 5, target.y - 6);
      }
    });

    // Realistic FPS / Latency fluctuations
    if (frameCount % 45 === 0) {
      if (fpsEl) {
        const fps = (43.8 + (Math.random() - 0.5) * 3).toFixed(1);
        fpsEl.innerHTML = `<i class="fa-solid fa-gauge-simple"></i> FPS: ${fps}`;
      }
      if (latencyEl) {
        const lat = (13.1 + (Math.random() - 0.5) * 1.8).toFixed(1);
        latencyEl.innerHTML = `<i class="fa-solid fa-stopwatch"></i> Latency: ${lat}ms`;
      }
    }

    requestAnimationFrame(renderYolo);
  }

  function drawMarineCreature(ctx, target, frameCount) {
    ctx.save();
    const cx = target.x + target.w / 2;
    const cy = target.y + target.h / 2;
    const dir = target.vx >= 0 ? 1 : -1;

    ctx.translate(cx, cy);
    ctx.scale(dir, 1);

    const short = target.short;

    if (short === 'Sea Turtle') {
      const flipperWave = Math.sin(frameCount * 0.06) * 12;
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.ellipse(25, -28 + flipperWave, 35, 12, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(25, 28 - flipperWave, 35, 12, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#166534';
      ctx.beginPath();
      ctx.ellipse(-45, -20, 18, 8, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-45, 20, 18, 8, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.ellipse(55, 0, 18, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(60, -4, 2.5, 0, Math.PI * 2);
      ctx.fill();
      const shellGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 55);
      shellGrad.addColorStop(0, '#86efac');
      shellGrad.addColorStop(0.6, '#15803d');
      shellGrad.addColorStop(1, '#052e16');
      ctx.fillStyle = shellGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 50, 32, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#052e16';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.stroke();
    } else if (short === 'Clownfish') {
      const tailWiggle = Math.sin(frameCount * 0.18) * 8;
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(-42, -15 + tailWiggle);
      ctx.lineTo(-36, tailWiggle);
      ctx.lineTo(-42, 15 + tailWiggle);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-38, -10 + tailWiggle, 4, 20);
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.ellipse(0, 0, 28, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(8, 0, 5, 17, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-6, 0, 4, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.ellipse(0, -18, 12, 6, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(4, 8, 8, 5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(16, -4, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(17, -5, 1, 0, Math.PI * 2);
      ctx.fill();
    } else if (short === 'Lionfish') {
      const finWav = Math.sin(frameCount * 0.1) * 6;
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-5, -10);
        ctx.lineTo(i * 9, -32 + Math.abs(i) * 3 + finWav);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
      ctx.strokeStyle = '#fca5a5';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(25, 20 + finWav);
      ctx.lineTo(5, 30 + finWav);
      ctx.lineTo(-20, 22 + finWav);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(0, 0, 32, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      for (let x = -18; x <= 18; x += 9) {
        ctx.beginPath();
        ctx.moveTo(x, -14);
        ctx.lineTo(x - 4, 14);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(248, 113, 113, 0.7)';
      ctx.beginPath();
      ctx.moveTo(-28, 0);
      ctx.lineTo(-46, -16 + finWav);
      ctx.lineTo(-46, 16 + finWav);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(18, -4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      ctx.arc(19, -4, 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (short === 'Blue Tang') {
      const wag = Math.sin(frameCount * 0.14) * 6;
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(-38, -14 + wag);
      ctx.lineTo(-30, wag);
      ctx.lineTo(-38, 14 + wag);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.ellipse(0, 0, 26, 17, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(2, -2, 14, 0.3, Math.PI * 1.3);
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(14, -4, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(15, -5, 1, 0, Math.PI * 2);
      ctx.fill();
    } else if (short === 'Manta Ray') {
      const wing = Math.sin(frameCount * 0.07) * 14;
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(35, 0);
      ctx.quadraticCurveTo(15, -55 + wing, -25, -60 + wing);
      ctx.quadraticCurveTo(-15, -20, -35, -5);
      ctx.lineTo(-75, 0);
      ctx.lineTo(-35, 5);
      ctx.quadraticCurveTo(-15, 20, -25, 60 - wing);
      ctx.quadraticCurveTo(15, 55 - wing, 35, 0);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(38, -10, 8, 4, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(38, 10, 8, 4, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (short === 'Pelagic Shark' || short === 'Leopard Shark') {
      const sharkTail = Math.sin(frameCount * 0.12) * 9;
      ctx.fillStyle = short === 'Leopard Shark' ? '#b45309' : '#475569';
      ctx.beginPath();
      ctx.moveTo(45, 0);
      ctx.quadraticCurveTo(15, -18, -15, -16);
      ctx.lineTo(-12, -32);
      ctx.lineTo(-2, -15);
      ctx.quadraticCurveTo(-30, -10, -50, sharkTail);
      ctx.lineTo(-65, -18 + sharkTail);
      ctx.lineTo(-58, sharkTail);
      ctx.lineTo(-65, 12 + sharkTail);
      ctx.quadraticCurveTo(-30, 10, -10, 14);
      ctx.lineTo(2, 24);
      ctx.lineTo(12, 12);
      ctx.quadraticCurveTo(30, 8, 45, 0);
      ctx.fill();
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(40, 2);
      ctx.quadraticCurveTo(15, 6, -30, 6);
      ctx.lineTo(-30, 10);
      ctx.quadraticCurveTo(10, 14, 40, 2);
      ctx.fill();
      if (short === 'Leopard Shark') {
        ctx.fillStyle = '#451a03';
        for (let s = -20; s < 30; s += 12) {
          ctx.beginPath();
          ctx.arc(s, -5, 2.5, 0, Math.PI * 2);
          ctx.arc(s + 5, 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(32, -3, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (short === 'Moon Jelly') {
      const pulse = Math.sin(frameCount * 0.08);
      const bellW = 24 + pulse * 4;
      const bellH = 20 - pulse * 3;
      const jGrad = ctx.createRadialGradient(0, -6, 2, 0, 0, bellW);
      jGrad.addColorStop(0, 'rgba(216, 180, 254, 0.8)');
      jGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.4)');
      jGrad.addColorStop(1, 'rgba(147, 51, 234, 0.1)');
      ctx.fillStyle = jGrad;
      ctx.beginPath();
      ctx.ellipse(0, -6, bellW, bellH, 0, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(216, 180, 254, 0.5)';
      ctx.lineWidth = 1.5;
      for (let t = -14; t <= 14; t += 7) {
        const tentWave = Math.sin(frameCount * 0.1 + t) * 6;
        ctx.beginPath();
        ctx.moveTo(t, 0);
        ctx.quadraticCurveTo(t + tentWave, 18, t - tentWave, 36);
        ctx.stroke();
      }
    } else if (short === 'Sea Lion') {
      const bodyWave = Math.sin(frameCount * 0.1) * 5;
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.moveTo(42, -5);
      ctx.quadraticCurveTo(20, -18, -15, -14);
      ctx.quadraticCurveTo(-40, -10, -55, bodyWave);
      ctx.quadraticCurveTo(-35, 12, -10, 14);
      ctx.lineTo(8, 26);
      ctx.lineTo(18, 12);
      ctx.quadraticCurveTo(35, 6, 42, -5);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(32, -8, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (short === 'Garibaldi') {
      const gWag = Math.sin(frameCount * 0.15) * 5;
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(-36, -16 + gWag);
      ctx.lineTo(-28, gWag);
      ctx.lineTo(-36, 16 + gWag);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, 0, 26, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(-4, -6, 2, 0, Math.PI * 2);
      ctx.arc(6, -8, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(14, -5, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  renderYolo();
}

/* ==========================================================================
   8. Interactive AI Lab: ResNet-18 Flower Species Classifier
   ========================================================================== */
function initFlowerClassifierSim() {
  const flowerChips = document.querySelectorAll('.specimen-chip');
  const flowerVisual = document.getElementById('flower-visual');
  const flowerName = document.getElementById('flower-name-display');
  const softmaxContainer = document.getElementById('softmax-container');

  const specimens = {
    sunflower: {
      emoji: '🌻',
      latin: 'Sunflower (Helianthus annuus)',
      distribution: [
        { name: 'Sunflower', prob: 98.7 },
        { name: 'Daisy', prob: 0.8 },
        { name: 'Dandelion', prob: 0.3 },
        { name: 'Marigold', prob: 0.1 },
        { name: 'Tulip', prob: 0.1 }
      ]
    },
    rose: {
      emoji: '🌹',
      latin: 'Rose (Rosa gallica)',
      distribution: [
        { name: 'Rose', prob: 97.4 },
        { name: 'Carnation', prob: 1.6 },
        { name: 'Tulip', prob: 0.6 },
        { name: 'Camellia', prob: 0.3 },
        { name: 'Peony', prob: 0.1 }
      ]
    },
    tulip: {
      emoji: '🌷',
      latin: 'Tulip (Tulipa gesneriana)',
      distribution: [
        { name: 'Tulip', prob: 96.2 },
        { name: 'Crocus', prob: 2.1 },
        { name: 'Rose', prob: 0.9 },
        { name: 'Lily', prob: 0.5 },
        { name: 'Orchid', prob: 0.3 }
      ]
    },
    daisy: {
      emoji: '🌼',
      latin: 'Daisy (Bellis perennis)',
      distribution: [
        { name: 'Daisy', prob: 95.8 },
        { name: 'Sunflower', prob: 2.4 },
        { name: 'Chamomile', prob: 1.1 },
        { name: 'Aster', prob: 0.5 },
        { name: 'Dandelion', prob: 0.2 }
      ]
    },
    lotus: {
      emoji: '🪷',
      latin: 'Sacred Lotus (Nelumbo nucifera)',
      distribution: [
        { name: 'Lotus', prob: 99.1 },
        { name: 'Water Lily', prob: 0.6 },
        { name: 'Magnolia', prob: 0.2 },
        { name: 'Rose', prob: 0.1 },
        { name: 'Hibiscus', prob: 0.0 }
      ]
    }
  };

  function renderSoftmax(key) {
    const data = specimens[key];
    if (!data || !softmaxContainer) return;

    if (flowerVisual) flowerVisual.textContent = data.emoji;
    if (flowerName) flowerName.textContent = data.latin;

    softmaxContainer.innerHTML = data.distribution
      .map(
        (item) => `
      <div class="softmax-row">
        <div class="softmax-info">
          <span class="softmax-class">${item.name}</span>
          <span class="softmax-prob">${item.prob.toFixed(1)}%</span>
        </div>
        <div class="softmax-track">
          <div class="softmax-fill" style="width: ${item.prob}%"></div>
        </div>
      </div>
    `
      )
      .join('');
  }

  flowerChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      flowerChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const key = chip.getAttribute('data-flower');
      renderSoftmax(key);
    });
  });

  // Launch from project button
  document.querySelectorAll('.launch-flower-demo').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabBtn = document.querySelector('.lab-tab[data-tab="resnet-tab"]');
      if (tabBtn) tabBtn.click();
      document.getElementById('interactive-lab').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Initial render
  renderSoftmax('sunflower');
}

/* ==========================================================================
   9. Interactive AI Lab: Jenkins & Kubernetes CI/CD Pipeline Simulator
   ========================================================================== */
function initDevOpsPipeline() {
  const triggerBtn = document.getElementById('run-pipeline-btn');
  const logBox = document.getElementById('pipeline-log-text');
  const stages = [
    { id: 'stage-git', name: 'Git SCM', time: '0.8s', log: '[INFO] Git checkout origin/main (SHA: 7b84f29 - automated VM orchestrator)' },
    { id: 'stage-lint', name: 'Unit & Lint', time: '3.1s', log: '[INFO] Running PyTest & Groovy pipeline linting... All 28 tests PASSED.' },
    { id: 'stage-build', name: 'Docker Build', time: '12.4s', log: '[INFO] Multi-stage build completed. Stripped image size: 142MB. Tagged dell/vm-orchestrator:v2.4' },
    { id: 'stage-deploy', name: 'K8s Rollout', time: '5.2s', log: '[SUCCESS] Kubernetes cluster rollout completed: 3/3 pods READY. Healthcheck: 200 OK! 🚀' }
  ];

  if (!triggerBtn || !logBox) return;

  // Launch from cards
  document.querySelectorAll('.open-pipeline-sim').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabBtn = document.querySelector('.lab-tab[data-tab="pipeline-tab"]');
      if (tabBtn) tabBtn.click();
      document.getElementById('interactive-lab').scrollIntoView({ behavior: 'smooth' });
    });
  });

  let isRunning = false;

  triggerBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    triggerBtn.disabled = true;
    triggerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing Pipeline...';

    logBox.textContent = `[TRIGGER] Pipeline initiated by user aditya at ${new Date().toLocaleTimeString()}...\n`;

    // Reset stages
    stages.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) {
        el.className = 'stage-node';
        el.querySelector('.stage-status').textContent = 'Pending';
      }
    });

    let currentStep = 0;

    function step() {
      if (currentStep < stages.length) {
        const s = stages[currentStep];
        const el = document.getElementById(s.id);
        if (el) {
          el.className = 'stage-node running';
          el.querySelector('.stage-status').textContent = 'Running...';
        }

        setTimeout(() => {
          if (el) {
            el.className = 'stage-node completed';
            el.querySelector('.stage-status').textContent = 'Passed';
          }
          logBox.textContent += `${s.log}\n`;
          logBox.scrollTop = logBox.scrollHeight;
          currentStep++;
          step();
        }, 900);
      } else {
        isRunning = false;
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = '<i class="fa-solid fa-play"></i> Trigger Pipeline Run';
        logBox.textContent += `[FINISH] Pipeline #249 completed with ZERO ERRORS in 21.5s.\n`;
        logBox.scrollTop = logBox.scrollHeight;
        showToast('Enterprise CI/CD Pipeline executed successfully! 🚀');
      }
    }

    step();
  });
}

/* ==========================================================================
   10. Interactive Developer Terminal (CLI)
   ========================================================================== */
function initInteractiveTerminal() {
  const termInput = document.getElementById('term-input');
  const termOutput = document.getElementById('term-output');
  const termChips = document.querySelectorAll('.term-chip');

  if (!termInput || !termOutput) return;

  const commands = {
    help: `Available commands:
  • <span class="term-highlight">skills</span>       - List technical stack & competencies
  • <span class="term-highlight">projects</span>     - Explore AI & DevOps featured repositories
  • <span class="term-highlight">experience</span>   - View Dell Technologies & KVK internship details
  • <span class="term-highlight">education</span>    - View UPES B.Tech details & CGPA (8.92)
  • <span class="term-highlight">honors</span>       - View Govt. of Uttarakhand award & HackerRank 5★
  • <span class="term-highlight">contact</span>      - Get phone, email, and social coordinates
  • <span class="term-highlight">resume</span>       - Launch printable resume viewer
  • <span class="term-highlight">whoami</span>       - High-level bio & summary
  • <span class="term-highlight">clear</span>        - Clear terminal screen`,

    whoami: `<span class="term-highlight">Aditya Pratap Singh Sisodia</span>
• B.Tech CSE (AI & Machine Learning) @ UPES Dehradun (CGPA: 8.92)
• Ex-Intern @ Dell Technologies (Enterprise DevOps & Cloud Automation)
• Primary Focus: Deep Learning, Computer Vision (YOLOv11), Cloud Orchestration`,

    skills: `<span class="term-highlight">--- Technical Arsenal ---</span>
• Languages: C++, Python, Java, C, Groovy
• AI/ML: PyTorch, Torchvision, YOLOv11, ResNet-18, Pandas, NumPy, Roboflow
• DevOps/Cloud: Jenkins, Docker, Kubernetes, Linux, Git & GitHub
• Core CS: Data Structures & Algorithms, OOP, Operating Systems, SQL`,

    projects: `<span class="term-highlight">--- Featured Projects ---</span>
1. <span class="term-highlight">Underwater Creatures Detection</span> (2025): Real-time YOLOv11 detector on marine dataset.
2. <span class="term-highlight">FlowerVision Classifier</span> (2025): ResNet-18 transfer learning with PyTorch CUDA.
3. <span class="term-highlight">Sony PlayStation Clone</span> (2024): Modern responsive web portal recreation.
4. <span class="term-highlight">Dell VM Cloud Pipeline</span> (2026): Automated Jenkins CI/CD + Docker + K8s.`,

    experience: `<span class="term-highlight">--- Professional Experience ---</span>
• <span class="term-highlight">Dell Technologies</span> (June 2026 - July 2026)
  Role: Undergraduate Intern (Bengaluru)
  Work: Jenkins CI/CD automation for VM provisioning, Docker containerization, Kubernetes orchestration.
• <span class="term-highlight">Krishi Vigyan Kendra</span> (June 2025 - July 2025)
  Role: Data Analyst Intern (Datia MP)
  Work: Agricultural field data modeling in SQL, Pandas & NumPy; visual reporting charts.`,

    education: `<span class="term-highlight">--- Academic Record ---</span>
• B.Tech Computer Science (AI & ML) - UPES Dehradun: <span class="term-highlight">CGPA 8.92</span> (2023 - Present)
• Intermediate (Class XII) - Boston Public School, Agra: <span class="term-highlight">75%</span> (2022 - 2023)
• Matriculation (Class X) - St. Conrad’s Inter College, Agra: <span class="term-highlight">93.4%</span> (2020 - 2021)`,

    honors: `<span class="term-highlight">--- Honors & Achievements ---</span>
• 🏆 Winner – Industry 4.0 Ideation of Creation Programme 2025 (Awarded by Uttarakhand Govt.)
• ⭐ Earned 5 Stars in C, C++ & Python on HackerRank`,

    contact: `<span class="term-highlight">--- Contact Information ---</span>
• Email: adityasisodia010@gmail.com
• Phone: +91 6395428245
• WhatsApp: https://wa.me/916395428245
• Location: Dehradun / Agra / Open to relocation`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo input
    const userLine = document.createElement('p');
    userLine.innerHTML = `<span class="term-prompt">aditya@portfolio:~$</span> ${escapeHtml(rawCmd)}`;
    termOutput.appendChild(userLine);

    if (cmd === 'clear') {
      termOutput.innerHTML = '';
      return;
    }

    if (cmd === 'resume') {
      const resBtn = document.getElementById('resume-btn');
      if (resBtn) resBtn.click();
      const outputLine = document.createElement('div');
      outputLine.innerHTML = `<p style="color:#10b981;">Launching resume viewer...</p>`;
      termOutput.appendChild(outputLine);
      return;
    }

    const outputLine = document.createElement('div');
    if (commands[cmd]) {
      outputLine.innerHTML = `<div style="margin: 0.4rem 0 0.8rem 0; line-height: 1.6;">${commands[cmd]}</div>`;
    } else {
      outputLine.innerHTML = `<p style="color:#f43f5e;">Command not found: '${escapeHtml(cmd)}'. Type <span class="term-highlight">'help'</span> for a list of commands.</p>`;
    }

    termOutput.appendChild(outputLine);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(termInput.value);
      termInput.value = '';
    }
  });

  termChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
  }
}

/* ==========================================================================
   11. Lab Tabs Controller
   ========================================================================== */
const labTabs = document.querySelectorAll('.lab-tab');
const tabPanels = document.querySelectorAll('.tab-panel');

labTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    labTabs.forEach((t) => t.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));

    tab.classList.add('active');
    const targetId = tab.getAttribute('data-tab');
    const panel = document.getElementById(targetId);
    if (panel) panel.classList.add('active');
  });
});

/* ==========================================================================
   12. Contact Form & Clipboard Copy Handlers
   ========================================================================== */
function initContactActions() {
  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
        btn.innerHTML = '<i class="fa-solid fa-check text-green"></i>';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
      });
    });
  });

  // Contact form handler
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value;
      const email = document.getElementById('sender-email').value;
      const subject = document.getElementById('sender-subject').value || 'Portfolio Contact';
      const message = document.getElementById('sender-message').value;

      // Construct mailto fallback
      const mailtoUrl = `mailto:adityasisodia010@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

      window.location.href = mailtoUrl;
      showToast(`Thank you, ${name}! Opening your email client to send message.`);
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   13. Printable Resume Modal
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const resumeBtn = document.getElementById('resume-btn');
  const closeBtn = document.querySelector('.modal-close');
  const printBtn = document.getElementById('print-resume-btn');
  const backdrop = document.querySelector('.modal-backdrop');

  if (!resumeModal || !resumeBtn) return;

  function openModal() {
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  resumeBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   14. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color:var(--accent-cyan);"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

