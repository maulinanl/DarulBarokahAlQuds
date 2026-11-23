document.addEventListener('DOMContentLoaded', function () {
  let activeRole = 'wali';

  const siteHeader = document.getElementById('siteHeader');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const loginModal = document.getElementById('loginModal');
  const psbModal = document.getElementById('psbModal');
  const redirectStatusBox = document.getElementById('redirectStatusBox');
  const tabWali = document.getElementById('tabWali');
  const tabUstadz = document.getElementById('tabUstadz');
  const identifierLabel = document.getElementById('identifierLabel');
  const identifierInput = document.getElementById('identifierInput');
  const passwordInput = document.getElementById('passwordInput');
  const loginForm = document.getElementById('loginForm');
  const backToTop = document.getElementById('backToTop');
  const activationLink = document.getElementById('activationLink');

  /* -------------------------------------------------------------------
     1. CAROUSEL SLIDER HALUS (FASILITAS & CERITA ALUMNI)
  -------------------------------------------------------------------- */
  function initCarouselSlider(options) {
    const viewport = document.getElementById(options.viewportId);
    const track = document.getElementById(options.trackId);
    const prevBtn = document.getElementById(options.prevId);
    const nextBtn = document.getElementById(options.nextId);
    const dotsContainer = document.getElementById(options.dotsId);
    const slides = track ? Array.from(track.querySelectorAll(options.slideSelector)) : [];

    if (!viewport || !track || !prevBtn || !nextBtn || slides.length === 0) return;

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let baseTranslate = 0;
    let currentTranslate = 0;

    function getStepWidth() {
      if (slides.length > 1) {
        return slides[1].offsetLeft - slides[0].offsetLeft;
      }
      return slides[0].offsetWidth + 16;
    }

    function getMaxIndex() {
      const step = getStepWidth();
      if (step <= 0) return 0;
      const visibleCount = Math.max(1, Math.round((viewport.clientWidth + 16) / step));
      return Math.max(0, slides.length - visibleCount);
    }

    function updateDots() {
      if (!dotsContainer) return;
      const totalDots = getMaxIndex() + 1;
      dotsContainer.innerHTML = '';

      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.className = i === currentIndex
          ? 'h-2 w-7 rounded-full bg-ponpes-primary transition-all duration-300 cursor-pointer'
          : 'h-2 w-2 rounded-full bg-ponpes-primary/30 hover:bg-ponpes-primary/60 transition-all duration-300 cursor-pointer';
        dot.addEventListener('click', function () {
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      const maxIndex = getMaxIndex();
      if (index < 0) {
        currentIndex = maxIndex;
      } else if (index > maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      baseTranslate = -(currentIndex * getStepWidth());
      currentTranslate = baseTranslate;
      track.style.transform = 'translateX(' + baseTranslate + 'px)';
      updateDots();
    }

    prevBtn.addEventListener('click', function () { goToSlide(currentIndex - 1); });
    nextBtn.addEventListener('click', function () { goToSlide(currentIndex + 1); });

    viewport.addEventListener('dragstart', function (e) { e.preventDefault(); });

    function finishDrag() {
      if (!isDragging) return;
      isDragging = false;
      viewport.classList.remove('is-dragging');

      const movedBy = currentTranslate - baseTranslate;
      if (movedBy < -40) {
        goToSlide(currentIndex + 1);
      } else if (movedBy > 40) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(currentIndex);
      }
    }

    viewport.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
      viewport.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      currentTranslate = baseTranslate + (e.clientX - startX);
      track.style.transform = 'translateX(' + currentTranslate + 'px)';
    });

    window.addEventListener('mouseup', finishDrag);

    viewport.addEventListener('touchstart', function (e) {
      if (!e.touches || e.touches.length === 0) return;
      isDragging = true;
      startX = e.touches[0].clientX;
      viewport.classList.add('is-dragging');
    }, { passive: true });

    viewport.addEventListener('touchmove', function (e) {
      if (!isDragging || !e.touches || e.touches.length === 0) return;
      currentTranslate = baseTranslate + (e.touches[0].clientX - startX);
      track.style.transform = 'translateX(' + currentTranslate + 'px)';
    }, { passive: true });

    viewport.addEventListener('touchend', finishDrag);
    viewport.addEventListener('touchcancel', finishDrag);

    // Geser horizontal lewat trackpad
    let wheelLocked = false;
    viewport.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 12) {
        e.preventDefault();
        if (wheelLocked) return;
        wheelLocked = true;
        goToSlide(e.deltaX > 0 ? currentIndex + 1 : currentIndex - 1);
        setTimeout(function () { wheelLocked = false; }, 350);
      }
    }, { passive: false });

    window.addEventListener('resize', function () {
      goToSlide(Math.min(currentIndex, getMaxIndex()));
    });

    // Hitung ulang setelah gambar & font termuat agar lebar langkah akurat
    window.addEventListener('load', function () {
      goToSlide(Math.min(currentIndex, getMaxIndex()));
    });

    updateDots();
  }

  initCarouselSlider({
    viewportId: 'fasilitasViewport',
    trackId: 'fasilitasTrack',
    prevId: 'fasilitasPrev',
    nextId: 'fasilitasNext',
    dotsId: 'fasilitasDots',
    slideSelector: '.fasilitas-slide'
  });

  initCarouselSlider({
    viewportId: 'alumniViewport',
    trackId: 'alumniTrack',
    prevId: 'alumniPrev',
    nextId: 'alumniNext',
    dotsId: 'alumniDots',
    slideSelector: '.alumni-slide'
  });

  /* -------------------------------------------------------------------
     2. NAVIGASI: MENU MOBILE, SCROLLSPY, HEADER SHADOW, BACK-TO-TOP
  -------------------------------------------------------------------- */
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
    });
  });

  const spyLinks = Array.from(document.querySelectorAll('.nav-link[data-spy]'));
  const spyTargets = spyLinks
    .map(function (l) { return document.getElementById(l.getAttribute('data-spy')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          spyLinks.forEach(function (l) {
            l.classList.toggle('is-active', l.getAttribute('data-spy') === entry.target.id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });
    spyTargets.forEach(function (t) { spyObserver.observe(t); });
  }

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    siteHeader.classList.toggle('shadow-soft', y > 20);
    if (y > 600) {
      backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
    } else {
      backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------------------------------------
     3. ANIMASI MUNCUL SAAT SCROLL
  -------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------------------------------------------------------------------
     4. MODAL LOGIN PORTAL & ROLE-BASED REDIRECT
  -------------------------------------------------------------------- */
  function lockScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  function openModal(modal) {
    modal.classList.remove('hidden');
    lockScroll(true);
  }

  function closeModal(modal) {
    modal.classList.add('hidden');
    if (loginModal.classList.contains('hidden') && psbModal.classList.contains('hidden')) {
      lockScroll(false);
    }
  }

  document.querySelectorAll('[data-open-login]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(loginModal);
      redirectStatusBox.classList.add('hidden');
      mobileMenu.classList.add('hidden');
    });
  });

  document.getElementById('closeLoginBtn').addEventListener('click', function () {
    closeModal(loginModal);
  });

  document.querySelectorAll('[data-open-psb]').forEach(function (btn) {
    btn.addEventListener('click', function () { openModal(psbModal); });
  });

  document.querySelectorAll('[data-close-psb]').forEach(function (btn) {
    btn.addEventListener('click', function () { closeModal(psbModal); });
  });

  function switchRole(role) {
    activeRole = role;
    activationLink.href = 'aktivasi.html?role=' + role;
    redirectStatusBox.classList.add('hidden');
    identifierInput.value = '';
    passwordInput.value = '';

    if (role === 'wali') {
      tabWali.className = 'py-2.5 px-3 rounded-lg text-sm font-bold bg-ponpes-primary text-white transition-all cursor-pointer';
      tabUstadz.className = 'py-2.5 px-3 rounded-lg text-sm font-bold text-ponpes-text/75 hover:text-ponpes-text transition-all cursor-pointer';
      identifierLabel.textContent = 'Nomor Induk Santri (NIS) / No. WhatsApp Wali';
      identifierInput.placeholder = 'Contoh: 20260145 atau 08123456789';
    } else {
      tabUstadz.className = 'py-2.5 px-3 rounded-lg text-sm font-bold bg-ponpes-primary text-white transition-all cursor-pointer';
      tabWali.className = 'py-2.5 px-3 rounded-lg text-sm font-bold text-ponpes-text/75 hover:text-ponpes-text transition-all cursor-pointer';
      identifierLabel.textContent = 'NIY (Nomor Induk Yayasan) / Email Asatidz';
      identifierInput.placeholder = 'Contoh: ustadz.ahmad@darulbarokahalquds.sch.id';
    }
  }

  tabWali.addEventListener('click', function () { switchRole('wali'); });
  tabUstadz.addEventListener('click', function () { switchRole('ustadz'); });

//   document.getElementById('fillDemoBtn').addEventListener('click', function () {
//     if (activeRole === 'wali') {
//       identifierInput.value = '20260145 (Wali Ananda Muhammad Al-Fatih)';
//       passwordInput.value = '••••••••••••';
//     } else {
//       identifierInput.value = 'ustadz.fauzan@darulbarokahalquds.sch.id';
//       passwordInput.value = '••••••••••••';
//     }
//   });

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const redirectTitle = document.getElementById('redirectTitle');
    const redirectDesc = document.getElementById('redirectDesc');

    redirectStatusBox.classList.remove('hidden');

    if (activeRole === 'wali') {
      redirectTitle.textContent = 'Akses Wali Santri Terverifikasi ✓';
      redirectDesc.innerHTML =
        'Meneruskan sesi ke <strong>monitoring.darulbarokahalquds.sch.id/wali</strong> — Menampilkan laporan tahfidz harian, presensi shalat, nilai akademik, dan administrasi santri.';
    } else {
      redirectTitle.textContent = 'Akses Ustadz / Ustadzah Terverifikasi ✓';
      redirectDesc.innerHTML =
        'Meneruskan sesi ke <strong>monitoring.darulbarokahalquds.sch.id/asatidz</strong> — Menampilkan panel input setoran halaqah, absensi kelas/asrama, dan rekap pembinaan santri.';
    }
  });

  window.addEventListener('click', function (e) {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === psbModal) closeModal(psbModal);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal(loginModal);
      closeModal(psbModal);
    }
  });

  // Buka modal login jika datang dari halaman aktivasi (index.html?login=wali / ustadz)
  const loginParam = new URLSearchParams(window.location.search).get('login');
  if (loginParam) {
    switchRole(loginParam === 'ustadz' ? 'ustadz' : 'wali');
    openModal(loginModal);
  }
});