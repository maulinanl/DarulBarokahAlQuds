/* Autentikasi admin (CONTOH tanpa backend).
   Saat backend siap, ganti isi tiga fungsi bertanda [BACKEND] saja; halaman lain tidak perlu diubah.
   Kunci sesi 'adminSesi' juga dibaca oleh pengecekan di dashboard.js. */
(function () {
    var KEY = 'adminSesi', FAIL = 'loginGagal', TTL = 8 * 60 * 60 * 1000, MAX = 5, LOCK = 60 * 1000;
    /* [BACKEND] akun contoh, HAPUS saat memakai API sungguhan (kata sandi tidak boleh ada di kode) */
    var AKUN = [{ email: 'admin@darulbarokah.id', password: 'Admin12345', nama: 'Administrator', role: 'admin' }];

    function read(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
    function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }

    window.Auth = {
        /* [BACKEND] ganti dengan GET /auth/me (cookie sesi HttpOnly); kembalikan user atau null */
        getUser: function () { var s = read(KEY); return s && s.exp > Date.now() && s.user && s.user.role === 'admin' ? s.user : null; },
        cekSesi: function () { return !!this.getUser(); },
        /* [BACKEND] ganti dengan POST /auth/admin/login {email, password}; batas percobaan WAJIB juga di server */
        login: function (email, password) {
            return new Promise(function (ok, no) {
                var f = read(FAIL) || { n: 0, until: 0 };
                if (f.until > Date.now()) return no({ kode: 'LOCK', sisa: Math.ceil((f.until - Date.now()) / 1000) });
                setTimeout(function () {
                    var a = AKUN.filter(function (x) { return x.email === String(email).trim().toLowerCase() && x.password === password; })[0];
                    if (!a) { f.n++; if (f.n >= MAX) { f = { n: 0, until: Date.now() + LOCK }; } write(FAIL, f); return no({ kode: f.until ? 'LOCK' : 'SALAH', sisa: f.until ? Math.ceil(LOCK / 1000) : 0, sisaCoba: MAX - f.n }); }
                    try { localStorage.removeItem(FAIL); } catch (e) { }
                    write(KEY, { user: { nama: a.nama, email: a.email, role: a.role }, exp: Date.now() + TTL });
                    ok(a);
                }, 400);
            });
        },
        /* [BACKEND] ganti dengan POST /auth/logout */
        logout: function () { try { localStorage.removeItem(KEY); } catch (e) { } }
    };
})();