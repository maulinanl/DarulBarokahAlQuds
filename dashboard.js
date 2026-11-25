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
        chev: '<path d="M6 9l6 6 6-6"/>',
        print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
        reset: '<path d="M3 12a9 9 0 109-9 9.7 9.7 0 00-6.7 2.8L3 8M3 3v5h5"/>',
        edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
        cap: '<path d="M22 10L12 5 2 10l10 5zM6 12v5c3 3 9 3 12 0v-5"/>',
        room: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 15h3"/>',
        hist: '<path d="M3 12a9 9 0 109-9 9.7 9.7 0 00-6.7 2.8L3 8M3 3v5h5M12 7v5l4 2"/>',
        save: '<path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8"/>',
        idcard: '<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5.5 17a4 4 0 017 0M15 9h4M15 13h4"/>',
        user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
        gender: '<circle cx="7" cy="5" r="2"/><circle cx="17" cy="5" r="2"/><path d="M4 21v-7H3l2-5h4l2 5h-1v7M14 21v-5h-1l2-6h4l2 6h-1v5"/>',
        back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
        arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
        search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
        check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
        chat: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
        usercheck: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0114 0M16 11l2 2 4-4"/>',
        userx: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0114 0M17 8l5 5M22 8l-5 5"/>',
        users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0114 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14a5 5 0 015 5v2"/>',
        money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
        shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
        hourglass: '<path d="M6 2h12M6 22h12"/><path d="M8 2v4.5a4 4 0 001.6 3.2L12 12l-2.4 2.3A4 4 0 008 17.5V22M16 2v4.5a4 4 0 01-1.6 3.2L12 12l2.4 2.3a4 4 0 011.6 3.2V22"/>',
        folder: '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><circle cx="12" cy="13" r="2"/>',
        xcircle: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>',
        eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
        close: '<path d="M18 6L6 18M6 6l12 12"/>',
        mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
        key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
        warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>'
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

    window.fillIcons = function (root) { (root || document).querySelectorAll('[data-i]').forEach(function (e) { e.innerHTML = icon(e.dataset.i); }); };
    window.fillIcons();

    window.toast = function (msg) {
        var t = document.querySelector('.toast');
        if (!t) { t = document.createElement('div'); t.className = 'toast'; b.appendChild(t); }
        t.textContent = msg; t.classList.add('show');
        clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2400);
    };
})();