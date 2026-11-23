document.addEventListener('DOMContentLoaded', function () {
  /* -------------------------------------------------------------------
     0. IKON (diisi lewat atribut data-icon)
  -------------------------------------------------------------------- */
  const ICONS = {
    info: ['M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'],
    idcard: ['M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'],
    cap: ['M12 14l9-5-9-5-9 5 9 5z', 'M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'],
    user: ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'],
    users: ['M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'],
    phone: ['M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'],
    mail: ['M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
    lock: ['M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'],
    eye: ['M15 12a3 3 0 11-6 0 3 3 0 016 0z', 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'],
    eyeoff: ['M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'],
    briefcase: ['M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
    send: ['M12 19l9 2-9-18-9 18 9-2zm0 0v-8'],
    check: ['M5 13l4 4L19 7'],
    book: ['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'],
    building: ['M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'],
    cash: ['M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'],
    clipboard: ['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'],
    clipcheck: ['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'],
    chart: ['M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z']
  };

  function iconSvg(name) {
    const paths = ICONS[name];
    if (!paths) return '';
    return '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">' +
      paths.map(function (d) { return '<path stroke-linecap="round" stroke-linejoin="round" d="' + d + '"/>'; }).join('') +
      '</svg>';
  }

  function paintIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
      if (!el.firstElementChild) el.innerHTML = iconSvg(el.getAttribute('data-icon'));
    });
  }

  /* -------------------------------------------------------------------
     1. KONFIGURASI PER PERAN
  -------------------------------------------------------------------- */
  const ROLES = {
    wali: {
      tabLabel: 'Wali Santri',
      heroTitle: 'Akses Informasi Santri',
      heroDesc: 'Dapatkan akses terintegrasi untuk memantau perkembangan tahfidz, kedisiplinan asrama, serta laporan syahriah putra-putri Anda secara aman dan real-time.',
      modTitle: 'Modul terhubung untuk wali santri',
      modules: [
        { icon: 'book', title: "Hafalan Al-Qur'an", desc: "Mutaba'ah & setoran harian" },
        { icon: 'building', title: 'Kehadiran Asrama', desc: 'Izin kepulangan & presensi' },
        { icon: 'cash', title: 'Syahriah & SPP', desc: 'Bukti bayar & transparansi' }
      ],
      notice: 'Halaman ini khusus wali santri yang anaknya telah terdaftar resmi di basis data pondok. Akun memerlukan verifikasi administrator sebelum dapat digunakan.',
      formDesc: 'Isi data berikut untuk mengajukan akses akun wali santri. Pengajuan akan diperiksa dan diverifikasi manual oleh administrator pondok.',
      nameField: 'namaWali',
      stepOne: 'Administrator mencocokkan NISN dan nama santri dengan data pondok.'
    },
    ustadz: {
      tabLabel: 'Ustadz / Ustadzah',
      heroTitle: 'Akses Panel Asatidz',
      heroDesc: 'Kelola setoran halaqah, absensi kelas dan asrama, serta rekap pembinaan santri dalam satu panel terpadu yang aman dan real-time.',
      modTitle: 'Modul terhubung untuk asatidz',
      modules: [
        { icon: 'clipboard', title: 'Setoran Halaqah', desc: "Input hafalan & muraja'ah" },
        { icon: 'clipcheck', title: 'Absensi', desc: 'Kelas & asrama santri' },
        { icon: 'chart', title: 'Rekap Pembinaan', desc: 'Catatan & perkembangan' }
      ],
      notice: 'Halaman ini khusus ustadz/ustadzah yang telah terdaftar di basis data yayasan. Akun memerlukan verifikasi administrator sebelum dapat digunakan.',
      formDesc: 'Isi data berikut untuk mengajukan akses akun asatidz. Pengajuan akan diperiksa dan diverifikasi manual oleh administrator pondok.',
      nameField: 'namaLengkap',
      stepOne: 'Administrator mencocokkan NIY dan nama Anda dengan data kepegawaian yayasan.'
    }
  };

  const TAB_BASE = 'py-3 px-3 rounded-lg text-sm font-bold transition-all cursor-pointer ';
  const TAB_ON = 'bg-ponpes-primary text-white shadow-soft';
  const TAB_OFF = 'text-ponpes-text/75 hover:text-ponpes-text';

  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDesc');
  const modTitle = document.getElementById('modTitle');
  const modGrid = document.getElementById('modGrid');
  const noticeText = document.getElementById('noticeText');
  const formDesc = document.getElementById('formDesc');
  const headingWrap = document.getElementById('headingWrap');
  const tabsWrap = document.getElementById('tabsWrap');
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const forms = Array.from(document.querySelectorAll('form[data-role]'));
  const successPanel = document.getElementById('successPanel');
  const bottomLinks = document.getElementById('bottomLinks');
  const loginLink = document.getElementById('loginLink');
  const successLogin = document.getElementById('successLogin');

  let activeRole = 'wali';

  function setRole(role) {
    if (!ROLES[role]) role = 'wali';
    activeRole = role;
    const cfg = ROLES[role];

    tabs.forEach(function (t) {
      const on = t.getAttribute('data-role') === role;
      t.textContent = ROLES[t.getAttribute('data-role')].tabLabel;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.className = TAB_BASE + (on ? TAB_ON : TAB_OFF);
    });

    forms.forEach(function (f) {
      f.classList.toggle('hidden', f.getAttribute('data-role') !== role);
    });

    heroTitle.textContent = cfg.heroTitle;
    heroDesc.textContent = cfg.heroDesc;
    modTitle.textContent = cfg.modTitle;
    noticeText.textContent = cfg.notice;
    formDesc.textContent = cfg.formDesc;

    modGrid.innerHTML = cfg.modules.map(function (m) {
      return '<div class="bg-ponpes-bg rounded-2xl p-4">' +
        '<div class="w-11 h-11 p-2.5 rounded-xl bg-ponpes-primary text-white mb-3" data-icon="' + m.icon + '"></div>' +
        '<p class="text-[13.5px] font-bold text-ponpes-primary leading-snug">' + m.title + '</p>' +
        '<p class="text-xs text-ponpes-text/80 leading-snug mt-1">' + m.desc + '</p>' +
        '</div>';
    }).join('');
    paintIcons(modGrid);

    loginLink.href = 'index.html?login=' + role;
    successLogin.href = 'index.html?login=' + role;

    showFormMode();

    try {
      history.replaceState(null, '', '?role=' + role);
    } catch (e) { /* abaikan jika dibuka via file:// dan dibatasi browser */ }
  }

  function showFormMode() {
    successPanel.classList.add('hidden');
    headingWrap.classList.remove('hidden');
    tabsWrap.classList.remove('hidden');
    bottomLinks.classList.remove('hidden');
    forms.forEach(function (f) {
      f.classList.toggle('hidden', f.getAttribute('data-role') !== activeRole);
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { setRole(t.getAttribute('data-role')); });
  });

  /* -------------------------------------------------------------------
     2. VALIDASI
  -------------------------------------------------------------------- */
  function messageFor(input) {
    const type = input.getAttribute('data-type');
    const label = input.getAttribute('data-label') || 'Kolom ini';
    const isSecret = type === 'password' || type === 'confirm';
    const v = isSecret ? input.value : input.value.trim();

    if (input.required && !v) {
      return type === 'select' ? 'Pilih salah satu opsi.' : label + ' wajib diisi.';
    }
    if (!v) return '';

    switch (type) {
      case 'digits':
        if (!/^\d{7,10}$/.test(v)) return "Gunakan 7–10 digit angka sesuai kartu pelajar atau buku mutaba'ah.";
        break;
      case 'name':
        if (v.length < 3 || !/^[\p{L}\s.,'’\-]+$/u.test(v)) return 'Masukkan nama lengkap yang valid (huruf saja, minimal 3 karakter).';
        break;
      case 'staffid':
        if (!/^[A-Za-z0-9./-]{4,25}$/.test(v)) return 'NIY hanya boleh huruf, angka, titik, garis miring, atau tanda hubung (4–25 karakter).';
        break;
      case 'phone': {
        const n = v.replace(/[\s-]/g, '');
        if (!/^(\+62|62|0)8\d{8,12}$/.test(n)) return 'Gunakan nomor WhatsApp Indonesia yang aktif, contoh: 081234567890.';
        break;
      }
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Format email belum valid.';
        break;
      case 'password':
        if (v.length < 8 || !/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'Minimal 8 karakter dengan kombinasi huruf dan angka.';
        break;
      case 'confirm': {
        const other = document.getElementById(input.getAttribute('data-match'));
        if (other && other.value !== input.value) return 'Konfirmasi sandi tidak sama.';
        break;
      }
    }
    return '';
  }

  function showError(input, msg) {
    const err = document.getElementById(input.id + '_err');
    input.classList.toggle('is-invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) {
      err.textContent = msg;
      err.classList.toggle('hidden', !msg);
      if (msg) input.setAttribute('aria-describedby', err.id);
      else input.removeAttribute('aria-describedby');
    }
  }

  function validateInput(input) {
    const msg = messageFor(input);
    showError(input, msg);
    return !msg;
  }

  function validateForm(form) {
    let firstInvalid = null;
    form.querySelectorAll('.input').forEach(function (input) {
      if (!validateInput(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  forms.forEach(function (form) {
    form.querySelectorAll('.input').forEach(function (input) {
      input.addEventListener('blur', function () { if (input.value !== '' || input.classList.contains('is-invalid')) validateInput(input); });
      input.addEventListener('input', function () {
        if (input.classList.contains('is-invalid')) validateInput(input);
        // jika sandi diubah, cek ulang konfirmasi yang sudah terisi
        if (input.getAttribute('data-type') === 'password') {
          const confirm = form.querySelector('[data-match="' + input.id + '"]');
          if (confirm && confirm.value) validateInput(confirm);
        }
      });
    });
  });

  // Tampilkan/sembunyikan kata sandi
  document.querySelectorAll('[data-toggle-password]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const input = document.getElementById(btn.getAttribute('data-toggle-password'));
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.innerHTML = iconSvg(show ? 'eyeoff' : 'eye');
      btn.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
    });
  });

  /* -------------------------------------------------------------------
     3. PENGIRIMAN (SIMULASI)
  -------------------------------------------------------------------- */
  function makeRef(role) {
    const d = new Date();
    const pad = function (n) { return String(n).padStart(2, '0'); };
    const stamp = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
    const rand = String(Math.floor(1000 + Math.random() * 9000));
    return 'PA-' + (role === 'wali' ? 'W' : 'U') + '-' + stamp + '-' + rand;
  }

  // TODO: ganti dengan request ke backend, mis.
  // fetch('/api/aktivasi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  // Sandi harus di-hash di sisi server, jangan disimpan sebagai teks biasa.
  function submitActivation(payload) {
    return new Promise(function (resolve) {
      setTimeout(function () { resolve({ ok: true, ref: makeRef(payload.role) }); }, 900);
    });
  }

  function setBusy(form, busy) {
    const btn = form.querySelector('[data-submit]');
    btn.disabled = busy;
    btn.querySelector('.btn-spinner').classList.toggle('hidden', !busy);
    btn.querySelector('.btn-icon').classList.toggle('hidden', busy);
    btn.querySelector('.btn-label').textContent = busy ? 'Mengirim pengajuan...' : 'Ajukan Aktivasi Akun Sekarang';
  }

  function maskPhone(raw) {
    const n = raw.replace(/[\s-]/g, '').replace(/^(\+62|62)/, '0');
    return n.slice(0, 4) + '-••••-' + n.slice(-3);
  }

  function showFormError(form, msg) {
    const box = form.querySelector('.form-error');
    box.textContent = msg;
    box.classList.toggle('hidden', !msg);
  }

  function showSuccess(form, payload, res) {
    document.getElementById('successName').textContent = payload[ROLES[payload.role].nameField];
    document.getElementById('successRef').textContent = res.ref;
    document.getElementById('successPhone').textContent = maskPhone(payload.whatsapp);
    document.getElementById('stepOne').textContent = ROLES[payload.role].stepOne;

    form.reset();
    form.querySelectorAll('.input').forEach(function (i) { showError(i, ''); });

    forms.forEach(function (f) { f.classList.add('hidden'); });
    headingWrap.classList.add('hidden');
    tabsWrap.classList.add('hidden');
    bottomLinks.classList.add('hidden');
    successPanel.classList.remove('hidden');
    successPanel.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      showFormError(form, '');
      if (!validateForm(form)) return;

      const payload = Object.fromEntries(new FormData(form).entries());
      delete payload.konfirmasi;
      payload.role = form.getAttribute('data-role');

      setBusy(form, true);
      submitActivation(payload)
        .then(function (res) { showSuccess(form, payload, res); })
        .catch(function () { showFormError(form, 'Pengajuan gagal dikirim. Periksa koneksi Anda lalu coba lagi.'); })
        .finally(function () { setBusy(form, false); });
    });
  });

  document.getElementById('againBtn').addEventListener('click', function () {
    showFormMode();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------------------------------------
     4. INISIALISASI
  -------------------------------------------------------------------- */
  paintIcons(document);
  const initialRole = new URLSearchParams(window.location.search).get('role');
  setRole(initialRole === 'ustadz' ? 'ustadz' : 'wali');
});