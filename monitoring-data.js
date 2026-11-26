/* Data & fungsi bersama modul Monitoring (Kehadiran + Pembelajaran Al-Qur'an).
   Tersimpan di localStorage browser (contoh). Ganti dengan pemanggilan API backend nanti. */
(function () {
    var pad = function (n) { return String(n).padStart(2, '0'); };
    window.isoOf = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
    window.todayIso = function () { return isoOf(new Date()); };
    window.addDays = function (iso, n) { var d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return isoOf(d); };
    function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }

    /* ---------- Kegiatan ---------- */
    window.KEGIATAN = [
        { id: 'subuh', nama: 'Halaqah Subuh', jam: '04:45' },
        { id: 'maghrib', nama: "Halaqah Ba'da Maghrib", jam: '18:30' },
        { id: 'kitab', nama: 'Ngaji Kitab', jam: '20:00' },
        { id: 'lain', nama: 'Kegiatan Pondok Lainnya', jam: '08:00' }
    ];
    window.kegNama = function (id) { var k = KEGIATAN.filter(function (x) { return x.id === id; })[0]; return k ? k.nama : id; };
    window.kegJam = function (id) { var k = KEGIATAN.filter(function (x) { return x.id === id; })[0]; return k ? k.jam : '08:00'; };
    window.STATUS_KH = ['Hadir', 'Izin', 'Sakit', 'Alfa'];
    window.khChip = function (st) { var c = st === 'Izin' ? ' mut' : st === 'Sakit' ? ' sakit' : st === 'Alfa' ? ' off' : ''; return '<span class="chip st' + c + '">' + st + '</span>'; };

    /* ---------- Surah (nama, jumlah ayat, juz awal) ---------- */
    var N = "Al-Fatihah|Al-Baqarah|Ali 'Imran|An-Nisa'|Al-Ma'idah|Al-An'am|Al-A'raf|Al-Anfal|At-Taubah|Yunus|Hud|Yusuf|Ar-Ra'd|Ibrahim|Al-Hijr|An-Nahl|Al-Isra'|Al-Kahf|Maryam|Ta-Ha|Al-Anbiya'|Al-Hajj|Al-Mu'minun|An-Nur|Al-Furqan|Asy-Syu'ara'|An-Naml|Al-Qasas|Al-'Ankabut|Ar-Rum|Luqman|As-Sajdah|Al-Ahzab|Saba'|Fatir|Yasin|As-Saffat|Sad|Az-Zumar|Gafir|Fussilat|Asy-Syura|Az-Zukhruf|Ad-Dukhan|Al-Jasiyah|Al-Ahqaf|Muhammad|Al-Fath|Al-Hujurat|Qaf|Az-Zariyat|At-Tur|An-Najm|Al-Qamar|Ar-Rahman|Al-Waqi'ah|Al-Hadid|Al-Mujadalah|Al-Hasyr|Al-Mumtahanah|As-Saff|Al-Jumu'ah|Al-Munafiqun|At-Tagabun|At-Talaq|At-Tahrim|Al-Mulk|Al-Qalam|Al-Haqqah|Al-Ma'arij|Nuh|Al-Jinn|Al-Muzzammil|Al-Muddassir|Al-Qiyamah|Al-Insan|Al-Mursalat|An-Naba'|An-Nazi'at|'Abasa|At-Takwir|Al-Infitar|Al-Mutaffifin|Al-Insyiqaq|Al-Buruj|At-Tariq|Al-A'la|Al-Gasyiyah|Al-Fajr|Al-Balad|Asy-Syams|Al-Lail|Ad-Duha|Asy-Syarh|At-Tin|Al-'Alaq|Al-Qadr|Al-Bayyinah|Az-Zalzalah|Al-'Adiyat|Al-Qari'ah|At-Takasur|Al-'Asr|Al-Humazah|Al-Fil|Quraisy|Al-Ma'un|Al-Kausar|Al-Kafirun|An-Nasr|Al-Lahab|Al-Ikhlas|Al-Falaq|An-Nas".split('|');
    var A = "7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6".split(',').map(Number);
    var RUNS = [[1, 2, 1], [3, 3, 3], [4, 4, 4], [5, 5, 6], [6, 6, 7], [7, 7, 8], [8, 8, 9], [9, 9, 10], [10, 11, 11], [12, 12, 12], [13, 14, 13], [15, 16, 14], [17, 18, 15], [19, 20, 16], [21, 22, 17], [23, 25, 18], [26, 27, 19], [28, 29, 20], [30, 33, 21], [34, 36, 22], [37, 39, 23], [40, 41, 24], [42, 45, 25], [46, 51, 26], [52, 57, 27], [58, 66, 28], [67, 77, 29], [78, 114, 30]];
    var J = []; RUNS.forEach(function (r) { for (var i = r[0]; i <= r[1]; i++) J[i - 1] = r[2]; });
    window.SURAH = N.map(function (n, i) { return [n, A[i], J[i]]; });
    window.surahNama = function (no) { return SURAH[no - 1] ? SURAH[no - 1][0] : '-'; };

    /* ---------- Penyimpanan ---------- */
    function load(key, seed) { try { var v = localStorage.getItem(key); if (v) return JSON.parse(v); } catch (e) { } return seed(); }
    function store(key, arr) { try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) { } }

    function seedKh() {
        var out = [], t = todayIso();
        var aktif = SANTRI.filter(function (s) { return s.status === 'Aktif'; });
        for (var d = 0; d < 7; d++) {
            var tgl = addDays(t, -d);
            ['subuh', 'maghrib', 'kitab'].forEach(function (k) {
                if (d === 0 && k !== 'subuh') return;          // hari ini baru subuh yang tercatat
                if (k === 'kitab' && d % 2 === 1) return;
                aktif.forEach(function (s) {
                    var h = hash(s.nis + tgl + k) % 100, st = h < 82 ? 'Hadir' : h < 90 ? 'Izin' : h < 96 ? 'Sakit' : 'Alfa', jam = '';
                    if (st === 'Hadir') { var m = parseInt(kegJam(k).slice(3), 10) + (h % 9), hh = parseInt(kegJam(k).slice(0, 2), 10); jam = pad(hh) + ':' + pad(m); }
                    out.push({
                        id: tgl + '|' + k + '|' + s.nis, tgl: tgl, keg: k, nis: s.nis, status: st, jam: jam,
                        ket: st === 'Izin' ? 'Izin keperluan keluarga' : st === 'Sakit' ? 'Sakit, istirahat di asrama' : st === 'Alfa' ? 'Tanpa keterangan' : ''
                    });
                });
            });
        }
        return out;
    }
    function seedPb() {
        var t = todayIso();
        var R = [[0, '2024001', 'Membaca', 2, 52, 75, 1, 'Mengulang', 'Perlu memperbaiki tajwid pada hukum mad.', '19010014'], [0, '2024003', 'Hafalan', 78, 1, 40, 30, 'Lancar', '', '19010014'],
        [0, '2024002', 'Hafalan', 55, 1, 78, 27, 'Mengulang', 'Ayat 60-78 masih tersendat.', '19020021'], [1, '2024004', 'Membaca', 3, 40, 56, 3, 'Lancar', '', '19030007'],
        [1, '2024005', 'Hafalan', 67, 1, 30, 29, 'Lancar', '', '19020021'], [1, '2024001', 'Hafalan', 36, 1, 83, 23, 'Lancar', '', '19010014'],
        [2, '2024002', 'Membaca', 18, 1, 30, 15, 'Lancar', '', '19020021'], [2, '2024003', 'Membaca', 36, 1, 40, 22, 'Lancar', '', '19010014'],
        [3, '2024005', 'Membaca', 2, 1, 40, 1, 'Lancar', '', '19020021'], [3, '2024004', 'Hafalan', 78, 1, 30, 30, 'Mengulang', 'Perlu diulang dari ayat 20.', '19030007'],
        [4, '2024001', 'Membaca', 2, 26, 51, 1, 'Lancar', '', '19010014'], [5, '2024002', 'Hafalan', 67, 1, 15, 29, 'Lancar', '', '19020021'],
        [6, '2024003', 'Hafalan', 78, 1, 20, 30, 'Lancar', '', '19010014'], [8, '2024005', 'Hafalan', 112, 1, 4, 30, 'Lancar', '', '19020021']];
        return R.map(function (r, i) { return { id: i + 1, tgl: addDays(t, -r[0]), nis: r[1], jenis: r[2], surah: r[3], a1: r[4], a2: r[5], juz: r[6], status: r[7], catatan: r[8], niy: r[9] }; });
    }
    var _kh = null, _pb = null;
    window.getKehadiran = function () { if (!_kh) _kh = load('kehadiranData', seedKh); return _kh; };
    window.upsertKehadiran = function (list) { var a = getKehadiran(); list.forEach(function (r) { var i = a.map(function (x) { return x.id; }).indexOf(r.id); if (i > -1) a[i] = r; else a.push(r); }); store('kehadiranData', a); };
    window.getPembelajaran = function () { if (!_pb) _pb = load('pembelajaranData', seedPb); return _pb; };
    window.savePembelajaran = function (rec) {
        var a = getPembelajaran();
        if (rec.id) { var i = a.map(function (x) { return x.id; }).indexOf(rec.id); if (i > -1) a[i] = rec; else a.push(rec); }
        else { rec.id = a.reduce(function (m, x) { return Math.max(m, x.id); }, 0) + 1; a.push(rec); }
        store('pembelajaranData', a); return rec;
    };
    window.deletePembelajaran = function (id) { var a = getPembelajaran().filter(function (x) { return x.id !== id; }); _pb = a; store('pembelajaranData', a); };
    window.santriByNis = function (n) { return SANTRI.filter(function (s) { return s.nis === n; })[0]; };
    window.capaianText = function (r) { return 'Ayat ' + r.a1 + ' - ' + r.a2 + ' • Juz ' + r.juz; };
    window.pencatat = function (niy) { var a = (window.ASATIDZ || []).filter(function (x) { return x.niy === niy; })[0]; return a ? a.nama : '-'; };
})();