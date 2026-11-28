/* Shell dashboard bersama: sidebar + topbar. Dipakai semua halaman admin.
   Setiap halaman cukup mengisi <body data-page="..." data-title="..." data-crumb="...">. */
(function () {
    /* Pengecekan sesi admin (lihat auth.js). Bila belum login, alihkan ke halaman login. [BACKEND] ganti dengan cek ke server */
    var sesi = null;
    try { sesi = JSON.parse(localStorage.getItem('adminSesi') || 'null'); } catch (e) { }
    if (!sesi || !sesi.user || sesi.user.role !== 'admin' || !(sesi.exp > Date.now())) {
        document.documentElement.style.visibility = 'hidden';
        location.replace('admin-login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search));
        return;
    }
    var I = {
        menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
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
    var store = {};
    try { store = JSON.parse(localStorage.getItem('navOpen') || '{}'); } catch (e) { }
    nav.forEach(function (g, gi) {
        var hasActive = g[1].some(function (n) { return n[0] === page; });
        var open = hasActive || store[g[0]] !== false;
        side += '<div class="nav-group' + (open ? ' open' : '') + '" data-group="' + g[0] + '">' +
            '<button type="button" class="nav-title" aria-expanded="' + open + '"><span>' + g[0] + '</span>' + icon('chev') + '</button>' +
            '<div class="nav-items"><div class="nav-items-inner">';
        g[1].forEach(function (n, ni) {
            side += '<a class="nav-item' + (n[0] === page ? ' active' : '') + '" style="--d:' + (gi * 90 + ni * 60) + 'ms" href="' + n[2] + '">' + icon(n[3]) + n[1] + '</a>';
        });
        side += '</div></div></div>';
    });
    side += '<div class="nav-bottom"><a class="nav-item' + (page === 'pengaturan' ? ' active' : '') + '" href="pengaturan-profil.html">' + icon('setting') + 'Pengaturan Profil</a><a class="nav-item logout" data-logout href="admin-login.html">' + icon('out') + 'Keluar</a></div></aside>';

    var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var bln = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var d = new Date();
    var tgl = hari[d.getDay()] + ', ' + String(d.getDate()).padStart(2, '0') + ' ' + bln[d.getMonth()] + ' ' + d.getFullYear();
    window.todayLabel = tgl;

    var crumb = (b.dataset.crumb || '').split('/').map(function (s) { return s.trim(); });
    var crumbHtml = crumb.map(function (c, i) { return i === crumb.length - 1 ? '<b>' + c + '</b>' : c; }).join(' / ');

    /* profil administrator (disimpan di localStorage 'adminProfil'; ganti dengan backend nanti) */
    var PROFIL0 = { nama: 'Administrator', email: 'admin@darulbarokah.id', hp: '0812-0000-0000', jabatan: 'Administrator' };
    window.getProfil = function () { var p = {}; try { p = JSON.parse(localStorage.getItem('adminProfil') || '{}'); } catch (e) { } return Object.assign({}, PROFIL0, p); };
    window.saveProfil = function (p) { try { localStorage.setItem('adminProfil', JSON.stringify(p)); } catch (e) { } paintProfil(); };
    function ini(n) { var w = (n || 'A').trim().split(/\s+/); return (w.length > 1 ? w[0][0] + w[1][0] : w[0].slice(0, 2)).toUpperCase(); }
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    var pf = window.getProfil();

    var top = '<header class="topbar"><div class="top-left"><button type="button" class="side-toggle" aria-label="Buka/tutup menu samping" title="Buka/tutup menu">' + icon('menu') + '</button><div><h1>Dashboard Administrator</h1><div class="crumb">' + crumbHtml + '</div></div></div>' +
        '<div class="topbar-right"><span class="date-pill">' + icon('cal') + tgl + '</span>' +
        '<div class="dd-wrap"><button type="button" class="bell" aria-label="Notifikasi" aria-haspopup="true" aria-expanded="false">' + icon('bell') + '</button>' +
        '<div class="dd notif" id="ddNotif" hidden></div></div>' +
        '<div class="dd-wrap"><button type="button" class="user" aria-haspopup="true" aria-expanded="false"><div class="avatar" id="tbAv">' + esc(ini(pf.nama)) + '</div><div><b id="tbNm">' + esc(pf.nama) + '</b><span id="tbRole">' + esc(pf.jabatan) + '</span></div>' + icon('chev') + '</button>' +
        '<div class="dd menu" id="ddUser" hidden><div class="dd-head"><div class="avatar" id="ddAv">' + esc(ini(pf.nama)) + '</div><div><b id="ddNm">' + esc(pf.nama) + '</b><span id="ddEm">' + esc(pf.email) + '</span></div></div>' +
        '<a class="dd-item" href="pengaturan-profil.html">' + icon('setting') + 'Pengaturan Profil</a>' +
        '<a class="dd-item danger" data-logout href="admin-login.html">' + icon('out') + 'Keluar</a></div></div></div></header>';
    function paintProfil() {
        var p = window.getProfil(), set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
        set('tbAv', ini(p.nama)); set('ddAv', ini(p.nama)); set('tbNm', p.nama); set('ddNm', p.nama); set('tbRole', p.jabatan); set('ddEm', p.email);
    }

    var main = document.getElementById('app');
    var wrap = document.createElement('div');
    wrap.innerHTML = side;
    b.insertBefore(wrap.firstChild, b.firstChild);
    document.querySelectorAll('.nav-group .nav-title').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var grp = btn.parentNode, open = !grp.classList.contains('open');
            grp.classList.toggle('open', open);
            btn.setAttribute('aria-expanded', open);
            store[grp.dataset.group] = open;
            try { localStorage.setItem('navOpen', JSON.stringify(store)); } catch (e) { }
        });
    });
    document.body.classList.add('anim-ready');

    var mainEl = document.createElement('div');
    mainEl.className = 'main';
    mainEl.innerHTML = top;
    main.parentNode.insertBefore(mainEl, main);
    mainEl.appendChild(main);

    /* tutup/buka seluruh sidebar ke kiri */
    var sideKey = 'sideHidden';
    function setSide(hidden) {
        b.classList.toggle('side-hidden', hidden);
        try { localStorage.setItem(sideKey, hidden ? '1' : '0'); } catch (e) { }
    }
    var saved = null;
    try { saved = localStorage.getItem(sideKey); } catch (e) { }
    if (saved === '1') {
        b.classList.add('side-hidden');
    }
    mainEl.querySelector('.side-toggle').addEventListener('click', function () {
        setSide(!b.classList.contains('side-hidden'));
    });

    document.addEventListener('click', function (e) { if (e.target.closest('[data-logout]')) { try { localStorage.removeItem('adminSesi'); } catch (x) { } } });

    /* dropdown notifikasi + profil */
    var bell = mainEl.querySelector('.bell'), usr = mainEl.querySelector('.user'), ddN = document.getElementById('ddNotif'), ddU = document.getElementById('ddUser');
    function closeDD() { [[bell, ddN], [usr, ddU]].forEach(function (x) { x[1].hidden = true; x[0].setAttribute('aria-expanded', 'false'); }); }
    function toggleDD(btn, dd) { var open = dd.hidden; closeDD(); if (open) { dd.hidden = false; btn.setAttribute('aria-expanded', 'true'); } }
    usr.addEventListener('click', function (e) { e.stopPropagation(); toggleDD(usr, ddU); });
    bell.addEventListener('click', function (e) { e.stopPropagation(); toggleDD(bell, ddN); renderNotif(); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.dd-wrap')) closeDD(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDD(); });

    /* notifikasi dihitung dari data contoh; skrip data dimuat otomatis bila halaman belum memuatnya */
    var DEPS = [['SANTRI', 'santri-data.js'], ['PENGAJUAN', 'akun-data.js'], ['getKehadiran', 'monitoring-data.js'], ['getPembayaran', 'pembayaran-data.js'], ['getPengumuman', 'pengumuman-data.js']];
    function loadDeps(cb) {
        var i = 0;
        (function next() {
            if (i >= DEPS.length) return cb();
            var d = DEPS[i++]; if (window[d[0]]) return next();
            var s = document.createElement('script'); s.src = d[1]; s.onload = next; s.onerror = next; document.head.appendChild(s);
        })();
    }
    function readSet() { try { return JSON.parse(localStorage.getItem('notifRead') || '[]'); } catch (e) { return []; } }
    function notifs() {
        var out = [];
        try { var pj = getPengajuan().filter(function (p) { return p.status === 'Menunggu Verifikasi'; }).length; if (pj) out.push({ k: 'pj' + pj, ic: 'hourglass', t: pj + ' pengajuan aktivasi menunggu verifikasi', s: 'Tinjau dan setujui atau tolak pengajuan', h: 'pengajuan-aktivasi.html' }); } catch (e) { }
        try { var tg = getPembayaran().filter(function (r) { return statusBayar(r) === 'Menunggak'; }).length; if (tg) out.push({ k: 'tg' + tg, ic: 'bayar', t: tg + ' tagihan SPP menunggak', s: 'Tagihan bulan lalu belum lunas', h: 'pembayaran.html' }); } catch (e) { }
        try { var af = getKehadiran().filter(function (r) { return r.tgl === todayIso() && r.status === 'Alfa'; }).length; if (af) out.push({ k: 'af' + af + todayIso(), ic: 'warn', t: af + ' santri alfa hari ini', s: 'Lihat rekap kehadiran hari ini', h: 'kehadiran.html' }); } catch (e) { }
        try { var dr = getPengumuman().filter(function (r) { return r.status === 'Draft'; }).length; if (dr) out.push({ k: 'dr' + dr, ic: 'umum', t: dr + ' pengumuman masih draft', s: 'Terbitkan agar dibaca penerima', h: 'pengumuman.html' }); } catch (e) { }
        return out;
    }
    function badge() { var r = readSet(); bell.classList.toggle('has-new', notifs().some(function (n) { return r.indexOf(n.k) < 0; })); }
    function renderNotif() {
        var l = notifs(), r = readSet(), h = '<div class="dd-title"><b>Notifikasi</b>' + (l.length ? '<button type="button" class="dd-link" id="readAll">Tandai semua dibaca</button>' : '') + '</div>';
        if (!l.length) h += '<div class="dd-empty">Tidak ada notifikasi baru.</div>';
        l.forEach(function (n) { h += '<a class="dd-note' + (r.indexOf(n.k) < 0 ? ' unread' : '') + '" href="' + n.h + '" data-k="' + n.k + '"><span class="ni">' + icon(n.ic) + '</span><span><b>' + n.t + '</b><small>' + n.s + '</small></span></a>'; });
        ddN.innerHTML = h;
        var ra = document.getElementById('readAll');
        if (ra) ra.addEventListener('click', function (e) { e.stopPropagation(); try { localStorage.setItem('notifRead', JSON.stringify(l.map(function (n) { return n.k; }))); } catch (x) { } badge(); renderNotif(); });
        ddN.querySelectorAll('.dd-note').forEach(function (a) { a.addEventListener('click', function () { var s = readSet(); if (s.indexOf(a.dataset.k) < 0) s.push(a.dataset.k); try { localStorage.setItem('notifRead', JSON.stringify(s)); } catch (x) { } }); });
    }
    loadDeps(function () { badge(); });

    window.fillIcons = function (root) { (root || document).querySelectorAll('[data-i]').forEach(function (e) { e.innerHTML = icon(e.dataset.i); }); };
    window.fillIcons();

    window.toast = function (msg) {
        var t = document.querySelector('.toast');
        if (!t) { t = document.createElement('div'); t.className = 'toast'; b.appendChild(t); }
        t.textContent = msg; t.classList.add('show');
        clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2400);
    };
})();