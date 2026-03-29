// ============================================
// Marco Angioli - Portfolio Scripts
// ============================================

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section, .hero');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // --- Active nav link on scroll ---
  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // --- Mobile menu ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // --- Stat counter animation ---
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;

      const rect = counter.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      counter.dataset.animated = 'true';
      const target = parseInt(counter.dataset.target);
      const duration = 1500;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(eased * target);
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      requestAnimationFrame(update);
    });
  }

  // --- Fade-in on scroll ---
  function setupFadeAnimations() {
    const fadeElements = document.querySelectorAll(
      '.research-card, .pub-item, .detail-card, .result-item, .skill-category, .timeline-item, .featured-project, .contact-card, .training-item'
    );
    fadeElements.forEach(el => el.classList.add('fade-up'));
  }

  function checkFadeElements() {
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  // --- Publication filters ---
  const pubFilters = document.querySelectorAll('.pub-filter');
  const pubItems = document.querySelectorAll('.pub-item');

  pubFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      pubFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      pubItems.forEach(item => {
        if (filter === 'all' || item.dataset.type === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Scroll handler ---
  function onScroll() {
    updateNavbar();
    updateActiveLink();
    animateCounters();
    checkFadeElements();
  }

  // --- Init ---
  setupFadeAnimations();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
