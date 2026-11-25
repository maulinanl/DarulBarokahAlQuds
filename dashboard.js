/* Shell dashboard bersama: sidebar + topbar. Dipakai semua halaman admin.
   Setiap halaman cukup mengisi <body data-page="..." data-title="..." data-crumb="...">. */
(function () {
    var I = {
        dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
        santri: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
        akun: '<circle cx="10" cy="8" r="4"/><path d="M2 21a8 8 0 0116 0"/><circle cx="19" cy="17" r="2"/>',
        hadir: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l2 2 3-3M14 10h4M7 15l2 2 3-3M14 16h4"/>',
        quran: '<path d="M2 4h6a4 4 0 014 4v13a3 3 0 00-3-3H2z"/><path d="M22 4h-6a4 4 0 00-4 4v13a3 3 0 013-3h7z"/>',
        bayar: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
        umum: '<path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zM15 9a4 4 0 010 6M18 6a8 8 0 010 12"/>',
        setting: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
        out: '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>',
        cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
        bell: '<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>',
        chev: '<path d="M6 9l6 6 6-6"/>'
    };
    window.icon = function (n) { return '<svg class="i" viewBox="0 0 24 24">' + I[n] + '</svg>'; };

    var nav = [
        ['MENU UTAMA', [['dashboard', 'Dashboard', 'dashboard.html', 'dashboard'], ['santri', 'Data Santri', 'data-santri.html', 'santri'], ['akun', 'Pengelolaan Akun', 'pengelolaan-akun.html', 'akun']]],
        ['MONITORING SANTRI', [['kehadiran', 'Kehadiran', 'kehadiran.html', 'hadir'], ['pembelajaran', 'Pembelajaran Al-Qur\'an', 'pembelajaran.html', 'quran']]],
        ['ADMINISTRASI', [['pembayaran', 'Pembayaran', 'pembayaran.html', 'bayar'], ['pengumuman', 'Pengumuman', 'pengumuman.html', 'umum']]]
    ];

    var b = document.body, page = b.dataset.page || '';
    var side = '<aside class="sidebar"><div class="brand"><img src="assets/logo.png" alt="Logo"><div><small>Pondok Pesantren</small><strong>DARUL BAROKAH AL - QUDS</strong></div></div>';
    nav.forEach(function (g) {
        side += '<div class="nav-group"><div class="nav-title">' + g[0] + '</div>';
        g[1].forEach(function (n) {
            side += '<a class="nav-item' + (n[0] === page ? ' active' : '') + '" href="' + n[2] + '">' + icon(n[3]) + n[1] + '</a>';
        });
        side += '</div>';
    });
    side += '<div class="nav-bottom"><a class="nav-item" href="pengaturan-profil.html">' + icon('setting') + 'Pengaturan Profil</a><a class="nav-item logout" href="index.html">' + icon('out') + 'Keluar</a></div></aside>';

    var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var bln = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var d = new Date();
    var tgl = hari[d.getDay()] + ', ' + String(d.getDate()).padStart(2, '0') + ' ' + bln[d.getMonth()] + ' ' + d.getFullYear();
    window.todayLabel = tgl;

    var crumb = (b.dataset.crumb || '').split('/').map(function (s) { return s.trim(); });
    var crumbHtml = crumb.map(function (c, i) { return i === crumb.length - 1 ? '<b>' + c + '</b>' : c; }).join(' / ');

    var top = '<header class="topbar"><div><h1>Dashboard Administrator</h1><div class="crumb">' + crumbHtml + '</div></div>' +
        '<div class="topbar-right"><span class="date-pill">' + icon('cal') + tgl + '</span>' +
        '<button class="bell" aria-label="Notifikasi">' + icon('bell') + '</button>' +
        '<div class="user"><div class="avatar">AD</div><div><b>Administrator</b><span>Administrator</span></div>' + icon('chev') + '</div></div></header>';

    var main = document.getElementById('app');
    var wrap = document.createElement('div');
    wrap.innerHTML = side;
    b.insertBefore(wrap.firstChild, b.firstChild);
    var mainEl = document.createElement('div');
    mainEl.className = 'main';
    mainEl.innerHTML = top;
    main.parentNode.insertBefore(mainEl, main);
    mainEl.appendChild(main);

    window.toast = function (msg) {
        var t = document.querySelector('.toast');
        if (!t) { t = document.createElement('div'); t.className = 'toast'; b.appendChild(t); }
        t.textContent = msg; t.classList.add('show');
        clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2400);
    };
})();