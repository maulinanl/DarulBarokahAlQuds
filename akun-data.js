/* Data contoh modul Pengelolaan Akun. Ganti dengan data dari backend nanti. */
(function () {
    window.ASATIDZ = [
        { niy: '19010014', nama: 'Ustadz Ridwan Hakim', jk: 'L', email: 'ridwan.hakim@darulbarokah.id', wa: '0812-2200-3311', jabatan: 'Pengampu Tahfidz', halaqah: 'Halaqah Ustadz Ridwan', status: 'Aktif', daftar: '2023-07-10' },
        { niy: '19020021', nama: 'Ustadzah Salma Nur', jk: 'P', email: 'salma.nur@darulbarokah.id', wa: '0813-4400-5522', jabatan: 'Pengampu Tahsin', halaqah: 'Halaqah Ustadzah Salma', status: 'Aktif', daftar: '2023-07-10' },
        { niy: '19030007', nama: 'Ustadz Hasan Mahfudz', jk: 'L', email: 'hasan.mahfudz@darulbarokah.id', wa: '0857-6600-7788', jabatan: 'Pengampu Kajian Kitab', halaqah: 'Halaqah Ustadz Hasan', status: 'Aktif', daftar: '2023-08-01' },
        { niy: '19040012', nama: 'Ustadz Maftuh Amin', jk: 'L', email: 'maftuh.amin@darulbarokah.id', wa: '0821-9900-1100', jabatan: 'Pengampu Tahfidz', halaqah: 'Halaqah Ustadz Hasan', status: 'Nonaktif', daftar: '2023-09-15' },
        { niy: '20010021', nama: 'Ustadzah Laila Rahma', jk: 'P', email: 'laila.rahma@darulbarokah.id', wa: '0813-9000-2200', jabatan: 'Pengampu Tahsin', halaqah: 'Halaqah Ustadzah Salma', status: 'Menunggu', daftar: '2026-10-28' }
    ];
    // Akun wali aktif/nonaktif. Santri 2024005 & 2024007 belum punya akun wali (menunggu pengajuan).
    window.WALI = [2024001, 2024002, 2024003, 2024004, 2024006].map(function (n) {
        var s = SANTRI.filter(function (x) { return x.nis === String(n); })[0];
        return { nis: s.nis, nama: s.wali, hub: s.hub, wa: s.wa, santri: s.nama, status: s.nis === '2024006' ? 'Nonaktif' : 'Aktif', aktivasi: s.nis === '2024001' ? '2024-01-14' : s.daftar };
    });
    window.PENGAJUAN = [
        { ref: 'PA-W-20261102-4821', tipe: 'wali', nama: 'Ahmad Fauzi', hub: 'Ayah Kandung', wa: '0812-3456-7891', nisn: '0009321238', waktu: '2026-11-02T10:15', status: 'Menunggu Verifikasi' },
        { ref: 'PA-W-20261102-3307', tipe: 'wali', nama: 'Nur Hidayah', hub: 'Ibu Kandung', wa: '0821-4455-6677', nisn: '0009321238', waktu: '2026-11-02T09:40', status: 'Menunggu Verifikasi' },
        { ref: 'PA-W-20261101-1180', tipe: 'wali', nama: 'Siti Aminah', hub: 'Ibu Kandung', wa: '0813-2200-1144', nisn: '0009321235', waktu: '2026-11-01T14:05', status: 'Disetujui', putus: { waktu: '2026-11-01T16:20', catatan: 'Data sesuai dengan dokumen pendaftaran.' } },
        { ref: 'PA-W-20261031-5542', tipe: 'wali', nama: 'Rizal Hidayat', hub: 'Ayah Kandung', wa: '0812-7788-9012', nisn: '0009321236', waktu: '2026-10-31T08:30', status: 'Disetujui', putus: { waktu: '2026-10-31T10:00', catatan: '' } },
        { ref: 'PA-W-20261030-7719', tipe: 'wali', nama: 'Ali Mustofa', hub: 'Ayah Kandung', wa: '0857-1100-2233', nisn: '0009321237', waktu: '2026-10-30T19:12', status: 'Disetujui', putus: { waktu: '2026-10-31T07:45', catatan: '' } },
        { ref: 'PA-W-20261029-2064', tipe: 'wali', nama: 'Budi Santoso', hub: 'Wali / Kerabat', wa: '0838-1234-5566', nisn: '0009999999', waktu: '2026-10-29T11:48', status: 'Ditolak', putus: { waktu: '2026-10-29T13:10', catatan: 'NISN tidak ditemukan di database santri. Wali diminta menghubungi admin pondok.' } },
        { ref: 'PA-U-20261028-9031', tipe: 'asatidz', nama: 'Ustadzah Laila Rahma', hub: 'Asatidz', wa: '0813-9000-2200', niy: '20010021', email: 'laila.rahma@darulbarokah.id', waktu: '2026-10-28T08:05', status: 'Menunggu Verifikasi' },
        { ref: 'PA-W-20261027-6650', tipe: 'wali', nama: 'Abdillah', hub: 'Ayah Kandung', wa: '0852-3300-1122', nisn: '0009321239', waktu: '2026-10-27T15:22', status: 'Disetujui', putus: { waktu: '2026-10-27T17:00', catatan: '' } }
    ];
    function ov() { try { return JSON.parse(localStorage.getItem('pengajuanKeputusan') || '{}'); } catch (e) { return {}; } }
    window.getPengajuan = function () { var o = ov(); return PENGAJUAN.map(function (p) { return o[p.ref] ? Object.assign({}, p, o[p.ref]) : p; }); };
    window.savePutusan = function (ref, data) { var o = ov(); o[ref] = data; try { localStorage.setItem('pengajuanKeputusan', JSON.stringify(o)); } catch (e) { } };
    window.findPengajuan = function (ref) { var l = getPengajuan(); return l.filter(function (p) { return p.ref === ref; })[0] || l[0]; };
    window.akunChip = function (st) { var c = st === 'Nonaktif' || st === 'Ditolak' ? ' off' : st === 'Menunggu' || st === 'Menunggu Verifikasi' ? ' wait' : ''; return '<span class="chip st' + c + '">' + st + '</span>'; };
    window.jam = function (iso) { return iso.slice(11) + ' WIB'; };
    window.santriByNisn = function (n) { return SANTRI.filter(function (s) { return s.nisn === n; })[0]; };
    window.asatidzByNiy = function (n) { return ASATIDZ.filter(function (a) { return a.niy === n; })[0]; };
    // Pemeriksaan otomatis untuk pengajuan -> [{s:'ok|warn|fail', t, d}]
    window.periksa = function (p) {
        var r = [];
        if (p.tipe === 'wali') {
            var s = santriByNisn(p.nisn);
            r.push(s ? { s: 'ok', t: 'NISN ditemukan di database santri', d: s.nama + ' • NIS ' + s.nis } : { s: 'fail', t: 'NISN tidak ditemukan di database santri', d: 'Periksa kembali NISN yang diajukan atau hubungi wali.' });
            if (s) {
                r.push(s.status === 'Aktif' ? { s: 'ok', t: 'Santri berstatus aktif', d: 'Terdaftar dan mengikuti kegiatan pondok.' } : { s: 'fail', t: 'Santri tidak berstatus aktif', d: 'Status santri saat ini: ' + s.status + '.' });
                var dup = WALI.filter(function (w) { return w.nis === s.nis && w.hub === p.hub && w.status === 'Aktif'; })[0];
                r.push(dup ? { s: 'fail', t: 'Sudah ada akun ' + p.hub + ' yang aktif', d: 'Atas nama ' + dup.nama + ' untuk santri ini.' } : { s: 'ok', t: 'Belum ada akun dengan hubungan yang sama', d: 'Hubungan: ' + p.hub + '.' });
            }
            var wa = WALI.filter(function (w) { return w.wa === p.wa; })[0];
            r.push(wa ? { s: 'warn', t: 'Nomor WhatsApp sudah dipakai akun lain', d: 'Dipakai oleh ' + wa.nama + '. Pastikan nomor ini memang milik pemohon.' } : { s: 'ok', t: 'Nomor WhatsApp belum dipakai akun lain', d: p.wa });
        } else {
            var a = asatidzByNiy(p.niy);
            r.push(a ? { s: 'ok', t: 'NIY ditemukan di data asatidz', d: a.nama + ' • ' + a.jabatan } : { s: 'fail', t: 'NIY tidak ditemukan di data asatidz', d: 'Pastikan NIY sudah didaftarkan oleh admin.' });
            if (a) r.push(a.status !== 'Nonaktif' ? { s: 'ok', t: 'Asatidz berstatus aktif mengajar', d: a.halaqah } : { s: 'fail', t: 'Asatidz berstatus nonaktif', d: 'Aktifkan data asatidz terlebih dahulu.' });
            var em = ASATIDZ.filter(function (x) { return x.email === p.email && x.niy !== p.niy; })[0];
            r.push(em ? { s: 'warn', t: 'Email sudah dipakai akun lain', d: em.nama } : { s: 'ok', t: 'Email belum dipakai akun lain', d: p.email });
            var w2 = ASATIDZ.filter(function (x) { return x.wa === p.wa && x.niy !== p.niy; })[0];
            r.push(w2 ? { s: 'warn', t: 'Nomor WhatsApp sudah dipakai akun lain', d: w2.nama } : { s: 'ok', t: 'Nomor WhatsApp belum dipakai akun lain', d: p.wa });
        }
        return r;
    };
})();