/* ===========================
   Navbar — scroll effect
   =========================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ===========================
   Navbar — active link
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

/* ===========================
   Mobile menu
   =========================== */
const menuToggle = document.getElementById('menu-toggle');
const navMobile = document.getElementById('nav-mobile');

menuToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close on link click
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===========================
   Contact form validation
   =========================== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function showError(fieldId, message) {
  document.getElementById(`${fieldId}-error`).textContent = message;
  document.getElementById(fieldId).setAttribute('aria-invalid', 'true');
}

function clearError(fieldId) {
  document.getElementById(`${fieldId}-error`).textContent = '';
  document.getElementById(fieldId).removeAttribute('aria-invalid');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm && contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.classList.remove('visible');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;

  if (!name) {
    showError('name', 'Please enter your name.');
    valid = false;
  } else {
    clearError('name');
  }

  if (!email) {
    showError('email', 'Please enter your email.');
    valid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError('email');
  }

  if (!message) {
    showError('message', 'Please enter a message.');
    valid = false;
  } else if (message.length < 10) {
    showError('message', 'Message must be at least 10 characters.');
    valid = false;
  } else {
    clearError('message');
  }

  if (valid) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send →';
      formSuccess.classList.add('visible');
    }, 800);
  }
});

// Clear errors on input
if (contactForm) {
  ['name', 'email', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearError(id));
  });
}

/* ===========================
   Carousels
   =========================== */
function initCarousel(container) {
  const slides = container.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  const prevBtn = container.querySelector('.carousel-prev');
  const nextBtn = container.querySelector('.carousel-next');
  let current = 0;

  function show(index) {
    slides[current].classList.remove('active');
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides[current].classList.add('active');
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === slides.length - 1;
  }

  prevBtn.disabled = true;
  nextBtn.disabled = slides.length <= 1;

  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));
}

document.querySelectorAll('.img-carousel').forEach(initCarousel);
