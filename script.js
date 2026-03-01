document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // 1. NAVBAR SCROLL EFFECT
  // ============================================================
  const navbar = document.querySelector('#navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);

  // ============================================================
  // 2. MOBILE HAMBURGER MENU
  // ============================================================
  const hamburger = document.querySelector('#hamburger');
  const navLinks = document.querySelector('.nav-links');

  const closeMenu = () => {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('active');
  };

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('active');
  });

  // Clicking a nav link closes the menu
  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Click outside the menu closes it
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = navLinks?.contains(e.target);
    const isClickOnHamburger = hamburger?.contains(e.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      closeMenu();
    }
  });

  // ============================================================
  // 3. SMOOTH SCROLL
  // ============================================================
  const NAVBAR_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');

      // Ignore bare "#" links
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          NAVBAR_OFFSET;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ============================================================
  // 4. SCROLL ANIMATIONS (Intersection Observer)
  // ============================================================
  const fadeInElements = document.querySelectorAll('.fade-in');

  const fadeInObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeInElements.forEach((el) => {
    fadeInObserver.observe(el);
  });

  // ============================================================
  // 5. FORM HANDLING
  // ============================================================
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thank you for your message. We'll be in touch shortly.");
      form.reset();
    });
  });

  // ============================================================
  // 6. ACTIVE NAV LINK
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

  const highlightActiveNavLink = () => {
    const scrollPosition = window.scrollY + NAVBAR_OFFSET + 1;

    let currentSectionId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinkItems.forEach((link) => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNavLink);

  // Run once on load to set initial state
  handleNavbarScroll();
  highlightActiveNavLink();
});
