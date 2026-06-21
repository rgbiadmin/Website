/* ============================================================
   RGBI — main.js
   Nav toggle · Smooth scroll · Active nav state
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile nav toggle ──────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      // Animate burger bars
      const bars = toggle.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        const bars = toggle.querySelectorAll('span');
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
      });
    });
  }

  /* ── Active nav link ────────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Nav background on scroll ───────────────────────────── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        nav.style.backgroundColor = 'rgba(7, 13, 26, 0.98)';
      } else {
        nav.style.backgroundColor = '';
      }
    }, { passive: true });
  }

  /* ── Smooth scroll for anchor links ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Formspree AJAX submission ──────────────────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.style.display = 'none';
          const success = document.getElementById('form-success');
          if (success) success.style.display = 'block';
        } else {
          btn.disabled = false;
          btn.textContent = 'Send Enquiry';
          alert('Something went wrong. Please email rayglass@rgbusinessintel.com directly.');
        }
      } catch (_) {
        btn.disabled = false;
        btn.textContent = 'Send Enquiry';
        alert('Something went wrong. Please email rayglass@rgbusinessintel.com directly.');
      }
    });
  }

})();
