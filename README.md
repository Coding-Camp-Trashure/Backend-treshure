# Trashure Backend

Backend untuk aplikasi **Trashure**, sebuah platform untuk mengelola limbah dengan fitur autentikasi, pemindaian limbah, pengelolaan saldo, dan riwayat pemindaian. Dibangun menggunakan **Node.js**, **Express.js**, dan mendukung unggah gambar untuk pemindaian limbah.

## Fitur

- **Autentikasi Pengguna**: Registrasi dan login pengguna.
- **Pemindaian Limbah**: Unggah gambar untuk mengidentifikasi jenis limbah.
- **Manajemen Saldo**: Melihat saldo pengguna.
- **Riwayat Pemindaian**: Melihat riwayat pemindaian limbah.
- **API Health Check**: Endpoint untuk memeriksa status server.
- **Middleware Autentikasi**: Melindungi endpoint sensitif.

## Prasyarat

Sebelum menjalankan proyek, pastikan Anda memiliki:
- **Node.js** (versi 18 atau lebih baru)
- **npm** (biasanya disertakan dengan Node.js)
- **PostgreSQL** (atau database lain yang digunakan, jika ada)
- File `.env` untuk konfigurasi lingkungan (lihat `.env.example` jika tersedia)

## Menjalankan Backend

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Konfigurasi lingkungan**:
   - Salin file `.env.example` ke `.env` dan sesuaikan variabel seperti:
     ```env
     PORT=9000
     DATABASE_URL=postgresql://postgres@localhost:5432/Trashure
     JWT_SECRET=your_jwt_secret
     ```
   - Pastikan konfigurasi database dan rahasia JWT diatur dengan benar.

4. **Jalankan server dalam mode pengembangan**:
   ```bash
   npm run dev
   ```

5. Server akan berjalan di `http://localhost:<PORT>` (default: `http://localhost:9000`).

## Struktur Folder

```plaintext
trashure-backend/
├── src/
│   ├── app.js                # Entry point aplikasi
│   ├── routes/              # Definisi rute API
│   │   ├── authRouter.js    # Rute untuk autentikasi
│   │   ├── scanRouter.js    # Rute untuk pemindaian limbah
│   │   ├── saldoRouter.js   # Rute untuk manajemen saldo
│   │   └── historyRouter.js # Rute untuk riwayat pemindaian
│   ├── controllers/         # Logika untuk menangani permintaan API
│   ├── Middlewares/         # Middleware, termasuk autentikasi
│   ├── models/             # Skema/model untuk entitas database (opsional)
│   └── utils/              # Fungsi pendukung (opsional)
├── .env                    # File konfigurasi lingkungan
├── package.json            # Dependensi dan skrip proyek
└── README.md               # Dokumentasi proyek
```

## Endpoint API

| Method | Endpoint            | Deskripsi                     | Middleware        |
|--------|---------------------|-------------------------------|-------------------|
| GET    | `/`                 | Health check API              | -                 |
| POST   | `/auth/register`    | Registrasi pengguna baru      | -                 |
| POST   | `/auth/login`       | Login pengguna                | -                 |
| GET    | `/saldo`            | Mendapatkan saldo pengguna    | `authMiddleware`  |
| GET    | `/history`          | Mendapatkan riwayat pemindaian| `authMiddleware`  |
| POST   | `/scan/scan`        | Memindai limbah via gambar    | `authMiddleware`, `multer` |

## Detail Endpoint

- **GET /**: Mengembalikan pesan "Trashure Backend API".
- **POST /auth/register**: Mendaftarkan pengguna baru (dikelola oleh `authController.register`).
- **POST /auth/login**: Mengautentikasi pengguna (dikelola oleh `authController.login`).
- **GET /saldo**: Mengembalikan saldo pengguna (memerlukan autentikasi).
- **GET /history**: Mengembalikan riwayat pemindaian pengguna (memerlukan autentikasi).
- **POST /scan/scan**: Mengunggah gambar untuk memindai limbah (memerlukan autentikasi dan unggah file via `multer`).

## Dependensi Utama

- **express**: Framework untuk membangun API.
- **dotenv**: Mengelola variabel lingkungan.
- **multer**: Menangani unggah file (untuk pemindaian gambar).
- Lihat `package.json` untuk daftar lengkap dependensi.
