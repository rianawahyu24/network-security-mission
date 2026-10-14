NETWORK SECURITY MISSION (ATP 10.5.7)

Isi folder:
- index.html : halaman utama (buka file ini)
- style.css  : tampilan (palet 0A2947, F3E4C9, D3D4C0, 8B5E3C)
- script.js  : dashboard, logika misi, suara, confetti, penilaian alasan, pembuat PDF

Cara publish:
1. GitHub Pages / Netlify / hosting statis: unggah ketiga file (index.html, style.css, script.js) dalam satu folder.
2. Tidak perlu build atau server khusus. Untuk uji lokal, cukup klik dua kali index.html.

Catatan:
- PDF dibuat dengan jsPDF dari cdnjs, jadi perangkat perlu terhubung internet saat pertama membuka halaman.
- Suara dibuat dari Web Audio (tanpa file audio). Tombol "Suara" ada di sidebar.
- Alur: Dashboard > tombol "Mulai Simulasi" > isi nama dan kelas > Mission 01-03 > Final Report.
- Progres murid tersimpan otomatis di localStorage browser pada perangkat yang digunakan.


AUTOSAVE PROGRES
- Tersimpan: nama/kelas, posisi misi dan submisi, komponen yang diperiksa,
  pilihan risiko, pasangan kartu, urutan soal/kartu acak, jawaban, skor,
  jumlah percobaan, alasan yang dikirim, dan draf alasan yang masih diketik.
- Setelah refresh atau membuka kembali URL yang sama di browser dan profil
  yang sama, siswa otomatis kembali ke bagian terakhir.
- Status penyimpanan tampil di sidebar. Jika browser memblokir penyimpanan
  atau ruangnya penuh, web memberi peringatan dan tetap bisa digunakan.
- Satu progres aktif per URL pada browser/profil tersebut. Pada komputer lab,
  gunakan tombol "Siswa baru / Mulai ulang" ketika berganti siswa.
  Tombol meminta konfirmasi sebelum mengganti progres.
- Hindari membuka misi yang sama di beberapa tab sekaligus: penyimpanan
  terakhir akan menjadi progres yang dipulihkan.
- Data tidak dikirim ke server. Tidak bisa pindah perangkat atau dipantau
  guru secara terpusat. Untuk kebutuhan itu perlu backend/database dan
  identitas atau kode unik siswa (misalnya Firebase atau Supabase).
- Menghapus data situs/browser akan menghapus progres. Dalam mode privat,
  data umumnya dihapus saat sesi privat ditutup.
- Gunakan URL HTTP/HTTPS yang tetap (GitHub Pages/Netlify/hosting statis).
  localStorage untuk file yang dibuka langsung lewat file:// berbeda-beda
  antarbrowser sehingga tidak bisa dijamin. Berpindah domain, protokol,
  profil browser, atau path halaman tidak membawa progres lama.

PENERAPAN
1. Ekstrak ZIP ini.
2. Ganti index.html, style.css, dan script.js di hosting proyek dengan versi ini.
3. Refresh sekali agar versi baru termuat. Progres yang sudah hilang sebelum
   versi ini digunakan tidak dapat dipulihkan.
4. Isi sebagian misi, ketik alasan tanpa mengirimnya, lalu refresh untuk
   mencoba pemulihan progres dan draf.
