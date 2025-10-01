(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Tahun footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Preferensi tema
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const initialDark = saved ? saved === 'dark' : prefersDark;
  setTheme(initialDark ? 'dark' : 'light');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = root.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  function setTheme(mode) {
    if (mode === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeBtn?.setAttribute('aria-pressed', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      themeBtn?.setAttribute('aria-pressed', 'false');
    }
  }

  // Mobile nav
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target instanceof HTMLAnchorElement) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
})();
