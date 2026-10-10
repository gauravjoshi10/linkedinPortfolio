/**
 * Gaurav Joshi - Technical Lead & Associate Project Manager
 * Portfolio Interactive Engine & Animation Suite (Inspired by Binod Prasad's animations)
 */

// Enterprise Architecture & Project Data
const projectData = {
  'ey-datafabric': {
    title: 'Enterprise Data Fabric Platform (EY)',
    badge: 'Enterprise Architecture & Big Data',
    image: './assets/project-devpulse.jpg',
    overview: 'Architected scalable multi-source data ingestion and delivery engines within an enterprise Data Fabric platform for global enterprise clients, ensuring seamless data flow, transformation, and 99.95% system availability.',
    challenges: [
      'Engineered high-volume data ingestion pipelines supporting multi-source feeds with sub-second message validation.',
      'Developed RESTful microservices orchestrating end-to-end data cleansing, schema validation, transformation, and automated delivery.',
      'Constructed real-time pipeline telemetry, asynchronous alerting services, and automated CI/CD container deployments via Azure DevOps (ADO).',
      'Preserved 99.95% platform availability while handling multi-tenant enterprise data loads.'
    ],
    tech: ['Java 21', 'Spring Boot 3.x', 'Microservices', 'Azure DevOps', 'Docker', 'PostgreSQL', 'Redis', 'SonarQube'],
    liveUrl: '#',
    repoUrl: 'https://github.com/gauravjoshi10'
  },
  'ibm-banking': {
    title: 'Reactive Digital Banking Platform (IBM / Retail Bank)',
    badge: 'High-Throughput Reactive Architecture',
    overview: 'Architected non-blocking, asynchronous reactive APIs for a leading public sector retail bank to power their instant digital account opening portal under massive peak transactional volumes.',
    challenges: [
      'Implemented fully non-blocking reactive API pipelines using Java Reactive Programming (Spring WebFlux) and Project Reactor.',
      'Scaled Apache Cassandra distributed NoSQL data cluster to sustain 15,000+ peak concurrent users with sub-200ms response latencies.',
      'Integrated circuit-breaker resiliency patterns and graceful degradation mechanisms to prevent system cascading failures.'
    ],
    tech: ['Java 17', 'Spring WebFlux', 'Apache Cassandra', 'Reactive Microservices', 'Docker', 'Red Hat OpenShift'],
    liveUrl: '#',
    repoUrl: 'https://github.com/gauravjoshi10'
  },
  'ibm-automotive': {
    title: 'Connected Vehicle Subscription Lifecycle Engine (IBM / OEM)',
    badge: 'Distributed Microservices & Cloud',
    overview: 'Engineered core subscription lifecycle microservices for a global automotive OEM, automating real-time connected vehicle vehicle telematics provisioning, tier upgrades, renewals, and billing hooks.',
    challenges: [
      'Designed transactional subscription microservices using Java, Spring Boot, and PostgreSQL with Saga pattern choreography.',
      'Optimized database query execution plans, connection pool scaling, and indexing strategies, increasing throughput by 35%.',
      'Ensured strict transactional isolation across distributed microservices with zero subscription state inconsistencies.'
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis Distributed Cache', 'REST APIs', 'JUnit', 'Mockito'],
    liveUrl: '#',
    repoUrl: 'https://github.com/gauravjoshi10'
  },
  'cognizant-wealth': {
    title: 'Batch Reconciliation & Interest Calculation Engine (Cognizant)',
    badge: 'FinTech Batch Processing',
    overview: 'Developed high-throughput financial batch reconciliation services and a modular Interest Calculator Engine for a Tier-1 North American Wealth Management client, processing broker-dealer ledger feeds.',
    challenges: [
      'Engineered an automated modular interest computation engine processing 500,000+ financial records daily with 100% precision.',
      'Built automated unit and integration test suites using JUnit and Mockito, increasing code coverage from 60% to 88%.',
      'Executed 15+ consecutive Agile sprint cycles with zero critical production escapes.'
    ],
    tech: ['Java', 'Spring Boot Batch', 'MySQL', 'Hibernate / JPA', 'JUnit', 'Mockito', 'Jira'],
    liveUrl: '#',
    repoUrl: 'https://github.com/gauravjoshi10'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollProgress();
  initHeaderScroll();
  initNavObserver();
  initMobileMenu();
  initSkillFilters();
  initProjectFilters();
  initProjectModal();
  initCopyEmail();
  initContactForm();
  initBackToTop();
  initStatCounters();
  initTiltEffect();
});

/* ==========================================================================
   1. Interactive 3D Tilt & Cursor Glare (Inspired by Binod Prasad's appTilt)
   ========================================================================== */
function initTiltEffect() {
  // Check if device supports hover / mouse pointers
  if (window.matchMedia('(hover: none)').matches) return;

  const tiltElements = document.querySelectorAll('.tilt-card, .project-card, .hero-card');

  tiltElements.forEach(card => {
    let bounds;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.25s ease';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const leftX = mouseX - bounds.width / 2;
      const topY = mouseY - bounds.height / 2;

      // Calculate tilt angles (limit between -7 and +7 degrees for subtle premium feel)
      const rotateX = (topY / (bounds.height / 2)) * -6;
      const rotateY = (leftX / (bounds.width / 2)) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;

      // Set coordinates for radial spotlight glare
      const percentX = (mouseX / bounds.width) * 100;
      const percentY = (mouseY / bounds.height) * 100;
      card.style.setProperty('--mouse-x', `${percentX.toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${percentY.toFixed(1)}%`);
    }

    function onMouseLeave() {
      bounds = null;
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/* ==========================================================================
   2. Theme Management (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  }
}

/* ==========================================================================
   3. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* ==========================================================================
   4. Sticky Header Shadow on Scroll
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   5. Active Navigation Link on Scroll
   ========================================================================== */
function initNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   6. Mobile Hamburger Menu
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');

  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ==========================================================================
   7. Skills Filtering
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('#skill-filter-tabs .tab-btn');
  const skillCards = document.querySelectorAll('#skills-container .skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      skillCards.forEach(card => {
        const categories = (card.dataset.category || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
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
   8. Projects Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('#project-filter-tabs .tab-btn');
  const projectCards = document.querySelectorAll('#projects-container .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = (card.dataset.category || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
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
   9. Project Details Modal
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-content-body');
  const detailButtons = document.querySelectorAll('.view-details-btn');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.dataset.project;
      const data = projectData[projectId];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="section-tag">${data.badge}</span>
        <h2 style="font-size: 1.5rem; font-weight: 800; margin: 0.5rem 0 1rem; color: var(--text-main);">${data.title}</h2>
        ${data.image ? `<img src="${data.image}" alt="${data.title}" style="width:100%; border-radius: 12px; margin-bottom: 1.25rem; border: 1px solid var(--border-subtle);" />` : ''}
        <p style="color: var(--text-muted); font-size: 0.975rem; line-height: 1.6; margin-bottom: 1.25rem;">${data.overview}</p>
        
        <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text-main);">Architectural & Engineering Highlights:</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
          ${data.challenges.map(item => `<li style="position: relative; padding-left: 1.25rem; color: var(--text-muted); font-size: 0.9rem;"><span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">▹</span>${item}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text-main);">Technology Stack:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.75rem;">
          ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">GitHub Profile</a>
          <button class="btn btn-secondary btn-sm" id="modal-inner-close">Close Details</button>
        </div>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const innerClose = modalBody.querySelector('#modal-inner-close');
      if (innerClose) {
        innerClose.addEventListener('click', closeModal);
      }
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   10. Copy Email to Clipboard
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = 'gauravjoshigj321@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      showToast('Copied email to clipboard: ' + email);
    } catch (err) {
      showToast('Email: gauravjoshigj321@gmail.com');
    }
  });
}

/* ==========================================================================
   11. Contact Form Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill out all fields.');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('Thank you! Your message has been sent successfully.');
    }, 900);
  });
}

/* ==========================================================================
   12. Back to Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   13. Animated Numbers Counters
   ========================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting) && !hasAnimated) {
      hasAnimated = true;
      counters.forEach(counter => {
        const target = parseFloat(counter.dataset.counter);
        const isPercent = counter.dataset.format === 'percent';
        const isComma = counter.dataset.format === 'comma';
        let count = 0;
        const duration = 1200;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const stepIncrement = target / totalSteps;

        const timer = setInterval(() => {
          count += stepIncrement;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          if (isPercent) {
            counter.innerText = `${count.toFixed(2)}%`;
          } else if (isComma) {
            counter.innerText = `${Math.floor(count).toLocaleString()}+`;
          } else {
            counter.innerText = `${Math.floor(count)}+`;
          }
        }, stepTime);
      });
    }
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-ribbon');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   14. Global Toast Notifications
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
