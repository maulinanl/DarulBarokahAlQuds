/* Data contoh Pembayaran SPP (pencatatan manual: Tunai / Transfer). Disimpan di localStorage.
   Semua santri aktif membayar nominal yang sama setiap bulan. Ganti dengan API backend nanti. */
(function () {
    var KEY = 'pembayaranData_v3', NOM = 'sppNominal', BLN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    window.METODE = ['Tunai', 'Transfer Bank'];
    /* Isi sesuai rekening pondok; tampil di cetak tagihan */
    window.REKENING = { bank: '[Nama Bank]', no: '[Nomor Rekening]', an: 'Pondok Pesantren Darul Barokah Al-Quds' };
    window.SPP_DEFAULT = 350000;
    window.getNominal = function () { var v = 0; try { v = +localStorage.getItem(NOM); } catch (e) { } return v > 0 ? v : SPP_DEFAULT; };
    window.rupiah = function (n) { return 'Rp ' + Number(n || 0).toLocaleString('id-ID'); };
    window.bulanLabel = function (ym) { var p = ym.split('-'); return BLN[+p[1] - 1] + ' ' + p[0]; };
    window.bulanIni = function () { return todayIso().slice(0, 7); };
    window.noKuitansi = function (r) { return 'KW/' + r.tglBayar.slice(0, 4) + '/' + String(r.id).padStart(4, '0'); };
    window.terbilang = function (n) {
        var s = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
        function t(n) {
            n = Math.floor(n);
            if (n < 12) return s[n]; if (n < 20) return t(n - 10) + ' belas';
            if (n < 100) return t(n / 10) + ' puluh' + (n % 10 ? ' ' + t(n % 10) : '');
            if (n < 200) return 'seratus' + (n > 100 ? ' ' + t(n - 100) : '');
            if (n < 1000) return t(n / 100) + ' ratus' + (n % 100 ? ' ' + t(n % 100) : '');
            if (n < 2000) return 'seribu' + (n > 1000 ? ' ' + t(n - 1000) : '');
            if (n < 1e6) return t(n / 1000) + ' ribu' + (n % 1000 ? ' ' + t(n % 1000) : '');
            if (n < 1e9) return t(n / 1e6) + ' juta' + (n % 1e6 ? ' ' + t(n % 1e6) : '');
            return t(n / 1e9) + ' miliar' + (n % 1e9 ? ' ' + t(n % 1e9) : '');
        }
        return n ? t(n) : 'nol';
    };
    function seed() {
        var out = [], id = 1, bulan = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11'], akt = SANTRI.filter(function (s) { return s.status === 'Aktif'; });
        akt.forEach(function (s, i) {
            bulan.forEach(function (b, j) {
                /* Zaidan (i=3) menunggak sejak September; Rizky & Fatimah belum bayar bulan ini */
                var lunas = !((i === 3 && j >= 8) || (j === 10 && i >= 2));
                out.push({
                    id: id++, nis: s.nis, bulan: b, jenis: 'SPP', nominal: SPP_DEFAULT, status: lunas ? 'Lunas' : 'Belum Bayar',
                    tglBayar: lunas ? b + '-' + String(5 + i * 3).padStart(2, '0') : '', metode: lunas ? METODE[(i + j) % 2] : '', catatan: ''
                });
            });
        });
        return out;
    }
    window.getPembayaran = function () {
        try { var r = JSON.parse(localStorage.getItem(KEY)); if (r) return r; } catch (e) { }
        var s = seed(); try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { } return s;
    };
    window.savePembayaranAll = function (a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) { } };
    window.statusBayar = function (r) { return r.status === 'Lunas' ? 'Lunas' : (r.bulan < bulanIni() ? 'Menunggak' : 'Belum Bayar'); };
    window.bayarChip = function (st) { return '<span class="chip st' + (st === 'Menunggak' ? ' off' : st === 'Belum Bayar' ? ' wait' : '') + '">' + st + '</span>'; };
    window.catatBayar = function (id, tgl, metode, catatan) {
        var a = getPembayaran(); a.forEach(function (r) { if (r.id === id) { r.status = 'Lunas'; r.tglBayar = tgl; r.metode = metode; r.catatan = catatan || ''; } }); savePembayaranAll(a);
    };
    window.batalkanBayar = function (id) {
        var a = getPembayaran(); a.forEach(function (r) { if (r.id === id) { r.status = 'Belum Bayar'; r.tglBayar = ''; r.metode = ''; r.catatan = ''; } }); savePembayaranAll(a);
    };
    /* Ubah nominal SPP: dipakai untuk tagihan baru, dan untuk tagihan BELUM LUNAS mulai bulan tertentu. Yang sudah lunas tidak berubah. */
    window.ubahNominal = function (nominal, dariBulan) {
        try { localStorage.setItem(NOM, String(nominal)); } catch (e) { }
        var a = getPembayaran(), n = 0; a.forEach(function (r) { if (r.status !== 'Lunas' && r.bulan >= dariBulan && r.nominal !== nominal) { r.nominal = nominal; n++; } });
        savePembayaranAll(a); return n;
    };
    window.buatTagihan = function (bulan) {
        var a = getPembayaran(), nid = a.reduce(function (m, r) { return Math.max(m, r.id); }, 0), n = 0, nom = getNominal();
        SANTRI.filter(function (s) { return s.status === 'Aktif'; }).forEach(function (s) {
            if (a.some(function (r) { return r.nis === s.nis && r.bulan === bulan; })) return;
            a.push({ id: ++nid, nis: s.nis, bulan: bulan, jenis: 'SPP', nominal: nom, status: 'Belum Bayar', tglBayar: '', metode: '', catatan: '' }); n++;
        });
        savePembayaranAll(a); return n;
    };
    /* Ringkasan satu santri: semua tagihan, yang belum lunas, dan status keseluruhan */
    window.rekapSantri = function (nis) {
        var all = getPembayaran().filter(function (r) { return r.nis === nis; }).sort(function (a, b) { return a.bulan < b.bulan ? -1 : 1; });
        var unpaid = all.filter(function (r) { return r.status !== 'Lunas'; }), past = unpaid.filter(function (r) { return r.bulan < bulanIni(); });
        var total = unpaid.reduce(function (t, r) { return t + r.nominal; }, 0);
        return { all: all, unpaid: unpaid, past: past, total: total, status: past.length ? 'Menunggak' : unpaid.length ? 'Belum Bayar' : 'Lunas' };
    };
})();