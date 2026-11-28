/* Data contoh Pengumuman. Disimpan di localStorage 'pengumumanData'. Ganti dengan backend nanti. */
(function () {
    var KEY = 'pengumumanData';
    window.KATEGORI_PGM = ['Umum', 'Akademik', 'Kegiatan', 'Keuangan'];
    window.TARGET_PGM = ['Semua', 'Santri', 'Wali Santri', 'Asatidz'];
    function seed() {
        return [
            { id: 1, judul: 'Jadwal Ujian Tahfidz Semester Ganjil', isi: 'Ujian tahfidz semester ganjil dilaksanakan pada 8–12 Desember 2026 di aula utama. Santri diharapkan mempersiapkan setoran hafalan sesuai target halaqah masing-masing.', kategori: 'Akademik', target: 'Santri', tgl: '2026-11-20', status: 'Terbit', penting: true },
            { id: 2, judul: 'Pengingat Pembayaran SPP November', isi: 'Mohon wali santri melunasi SPP bulan November 2026 paling lambat tanggal 10 Desember 2026 melalui bendahara atau transfer bank pondok.', kategori: 'Keuangan', target: 'Wali Santri', tgl: '2026-11-18', status: 'Terbit', penting: true },
            { id: 3, judul: 'Kajian Kitab Ba\'da Subuh Diperpanjang', isi: 'Kajian kitab ba\'da subuh kini berlangsung hingga pukul 06.15 WIB. Seluruh santri wajib hadir tepat waktu.', kategori: 'Kegiatan', target: 'Santri', tgl: '2026-11-12', status: 'Terbit', penting: false },
            { id: 4, judul: 'Rapat Koordinasi Asatidz Bulanan', isi: 'Rapat koordinasi asatidz dilaksanakan Sabtu, 28 November 2026 pukul 13.00 WIB di ruang pertemuan. Mohon membawa laporan perkembangan halaqah.', kategori: 'Umum', target: 'Asatidz', tgl: '2026-11-10', status: 'Terbit', penting: false },
            { id: 5, judul: 'Libur Akhir Semester', isi: 'Draf: libur akhir semester direncanakan mulai 20 Desember 2026. Menunggu keputusan pengasuh.', kategori: 'Umum', target: 'Semua', tgl: '2026-11-22', status: 'Draft', penting: false }
        ];
    }
    window.getPengumuman = function () {
        try { var r = JSON.parse(localStorage.getItem(KEY)); if (r) return r; } catch (e) { }
        var s = seed(); try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { } return s;
    };
    window.savePengumumanAll = function (a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) { } };
    window.savePengumuman = function (o) {
        var a = getPengumuman();
        if (o.id) { a = a.map(function (r) { return r.id === o.id ? o : r; }); }
        else { o.id = a.reduce(function (m, r) { return Math.max(m, r.id); }, 0) + 1; a.push(o); }
        savePengumumanAll(a); return o;
    };
    window.deletePengumuman = function (id) { savePengumumanAll(getPengumuman().filter(function (r) { return r.id !== id; })); };
    window.pgmChip = function (st) { return '<span class="chip st' + (st === 'Draft' ? ' wait' : '') + '">' + st + '</span>'; };
})();