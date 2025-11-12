<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // Pastikan Anda mengimpor model User
use Illuminate\Support\Facades\Hash;

class UserSiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data input (Kolom: username, password, firstname, lastname, email)
        $inputData = [
            ['siswa1', '#Ujicoba001', 'siswa', '1', 'aisarah1@gmail.com'],
            ['siswa2', '#Ujicoba002', 'siswa', '2', 'aisarah2@gmail.com'],
            ['siswa3', '#Ujicoba003', 'siswa', '3', 'aisarah3@gmail.com'],
            ['siswa4', '#Ujicoba004', 'siswa', '4', 'aisarah4@gmail.com'],
            ['siswa5', '#Ujicoba005', 'siswa', '5', 'aisarah5@gmail.com'],
            ['siswa6', '#Ujicoba006', 'siswa', '6', 'aisarah6@gmail.com'],
            ['siswa7', '#Ujicoba007', 'siswa', '7', 'aisarah7@gmail.com'],
            ['siswa8', '#Ujicoba008', 'siswa', '8', 'aisarah8@gmail.com'],
            ['siswa9', '#Ujicoba009', 'siswa', '9', 'aisarah9@gmail.com'],
            ['siswa10', '#Ujicoba010', 'siswa', '10', 'aisarah10@gmail.com'],
            ['siswa11', '#Ujicoba011', 'siswa', '11', 'aisarah11@gmail.com'],
            ['siswa12', '#Ujicoba012', 'siswa', '12', 'aisarah12@gmail.com'],
            ['siswa13', '#Ujicoba013', 'siswa', '13', 'aisarah13@gmail.com'],
            ['siswa14', '#Ujicoba014', 'siswa', '14', 'aisarah14@gmail.com'],
            ['siswa15', '#Ujicoba015', 'siswa', '15', 'aisarah15@gmail.com'],
            ['siswa16', '#Ujicoba016', 'siswa', '16', 'aisarah16@gmail.com'],
            ['siswa17', '#Ujicoba017', 'siswa', '17', 'aisarah17@gmail.com'],
            ['siswa18', '#Ujicoba018', 'siswa', '18', 'aisarah18@gmail.com'],
            ['siswa19', '#Ujicoba019', 'siswa', '19', 'aisarah19@gmail.com'],
            ['siswa20', '#Ujicoba020', 'siswa', '20', 'aisarah20@gmail.com'],
            ['siswa21', '#Ujicoba021', 'siswa', '21', 'aisarah21@gmail.com'],
            ['siswa22', '#Ujicoba022', 'siswa', '22', 'aisarah22@gmail.com'],
            ['siswa23', '#Ujicoba023', 'siswa', '23', 'aisarah23@gmail.com'],
            ['siswa24', '#Ujicoba024', 'siswa', '24', 'aisarah24@gmail.com'],
            ['siswa25', '#Ujicoba025', 'siswa', '25', 'aisarah25@gmail.com'],
            ['siswa26', '#Ujicoba026', 'siswa', '26', 'aisarah26@gmail.com'],
            ['siswa27', '#Ujicoba027', 'siswa', '27', 'aisarah27@gmail.com'],
            ['siswa28', '#Ujicoba028', 'siswa', '28', 'aisarah28@gmail.com'],
            ['siswa29', '#Ujicoba029', 'siswa', '29', 'aisarah29@gmail.com'],
            ['siswa30', '#Ujicoba030', 'siswa', '30', 'aisarah30@gmail.com'],
            ['siswa31', '#Ujicoba031', 'siswa', '31', 'aisarah31@gmail.com'],
            ['siswa32', '#Ujicoba032', 'siswa', '32', 'aisarah32@gmail.com'],
            ['siswa33', '#Ujicoba033', 'siswa', '33', 'aisarah33@gmail.com'],
            ['siswa34', '#Ujicoba034', 'siswa', '34', 'aisarah34@gmail.com'],
            ['siswa35', '#Ujicoba035', 'siswa', '35', 'aisarah35@gmail.com'],
            ['siswa36', '#Ujicoba036', 'siswa', '36', 'aisarah36@gmail.com'],
            ['siswa37', '#Ujicoba037', 'siswa', '37', 'aisarah37@gmail.com'],
            ['siswa38', '#Ujicoba038', 'siswa', '38', 'aisarah38@gmail.com'],
            ['siswa39', '#Ujicoba039', 'siswa', '39', 'aisarah39@gmail.com'],
            ['siswa40', '#Ujicoba040', 'siswa', '40', 'aisarah40@gmail.com'],
            ['siswa41', '#Ujicoba041', 'siswa', '41', 'aisarah41@gmail.com'],
            ['siswa42', '#Ujicoba042', 'siswa', '42', 'aisarah42@gmail.com'],
            ['siswa43', '#Ujicoba043', 'siswa', '43', 'aisarah43@gmail.com'],
            ['siswa44', '#Ujicoba044', 'siswa', '44', 'aisarah44@gmail.com'],
            ['siswa45', '#Ujicoba045', 'siswa', '45', 'aisarah45@gmail.com'],
            ['siswa46', '#Ujicoba046', 'siswa', '46', 'aisarah46@gmail.com'],
            ['siswa47', '#Ujicoba047', 'siswa', '47', 'aisarah47@gmail.com'],
            ['siswa48', '#Ujicoba048', 'siswa', '48', 'aisarah48@gmail.com'],
            ['siswa49', '#Ujicoba049', 'siswa', '49', 'aisarah49@gmail.com'],
            ['siswa50', '#Ujicoba050', 'siswa', '50', 'aisarah50@gmail.com'],
            ['siswa51', '#Ujicoba051', 'siswa', '51', 'aisarah51@gmail.com'],
            ['siswa52', '#Ujicoba052', 'siswa', '52', 'aisarah52@gmail.com'],
            ['siswa53', '#Ujicoba053', 'siswa', '53', 'aisarah53@gmail.com'],
            ['siswa54', '#Ujicoba054', 'siswa', '54', 'aisarah54@gmail.com'],
            ['siswa55', '#Ujicoba055', 'siswa', '55', 'aisarah55@gmail.com'],
            ['siswa56', '#Ujicoba056', 'siswa', '56', 'aisarah56@gmail.com'],
            ['siswa57', '#Ujicoba057', 'siswa', '57', 'aisarah57@gmail.com'],
            ['siswa58', '#Ujicoba058', 'siswa', '58', 'aisarah58@gmail.com'],
            ['siswa59', '#Ujicoba059', 'siswa', '59', 'aisarah59@gmail.com'],
            ['siswa60', '#Ujicoba060', 'siswa', '60', 'aisarah60@gmail.com'],
            ['siswa61', '#Ujicoba061', 'siswa', '61', 'aisarah61@gmail.com'],
            ['siswa62', '#Ujicoba062', 'siswa', '62', 'aisarah62@gmail.com'],
            ['siswa63', '#Ujicoba063', 'siswa', '63', 'aisarah63@gmail.com'],
            ['siswa64', '#Ujicoba064', 'siswa', '64', 'aisarah64@gmail.com'],
            ['siswa65', '#Ujicoba065', 'siswa', '65', 'aisarah65@gmail.com'],
            ['siswa66', '#Ujicoba066', 'siswa', '66', 'aisarah66@gmail.com'],
            ['siswa67', '#Ujicoba067', 'siswa', '67', 'aisarah67@gmail.com'],
            ['siswa68', '#Ujicoba068', 'siswa', '68', 'aisarah68@gmail.com'],
            ['siswa69', '#Ujicoba069', 'siswa', '69', 'aisarah69@gmail.com'],
            ['siswa70', '#Ujicoba070', 'siswa', '70', 'aisarah70@gmail.com'],
            ['siswa71', '#Ujicoba071', 'siswa', '71', 'aisarah71@gmail.com'],
            ['siswa72', '#Ujicoba072', 'siswa', '72', 'aisarah72@gmail.com'],
            ['siswa73', '#Ujicoba073', 'siswa', '73', 'aisarah73@gmail.com'],
            ['siswa74', '#Ujicoba074', 'siswa', '74', 'aisarah74@gmail.com'],
            ['siswa75', '#Ujicoba075', 'siswa', '75', 'aisarah75@gmail.com'],
            ['siswa76', '#Ujicoba076', 'siswa', '76', 'aisarah76@gmail.com'],
            ['siswa77', '#Ujicoba077', 'siswa', '77', 'aisarah77@gmail.com'],
            ['siswa78', '#Ujicoba078', 'siswa', '78', 'aisarah78@gmail.com'],
            ['siswa79', '#Ujicoba079', 'siswa', '79', 'aisarah79@gmail.com'],
            ['siswa80', '#Ujicoba080', 'siswa', '80', 'aisarah80@gmail.com'],
            ['siswa81', '#Ujicoba081', 'siswa', '81', 'aisarah81@gmail.com'],
            ['siswa82', '#Ujicoba082', 'siswa', '82', 'aisarah82@gmail.com'],
            ['siswa83', '#Ujicoba083', 'siswa', '83', 'aisarah83@gmail.com'],
            ['siswa84', '#Ujicoba084', 'siswa', '84', 'aisarah84@gmail.com'],
            ['siswa85', '#Ujicoba085', 'siswa', '85', 'aisarah85@gmail.com'],
            ['siswa86', '#Ujicoba086', 'siswa', '86', 'aisarah86@gmail.com'],
            ['siswa87', '#Ujicoba087', 'siswa', '87', 'aisarah87@gmail.com'],
            ['siswa88', '#Ujicoba088', 'siswa', '88', 'aisarah88@gmail.com'],
            ['siswa89', '#Ujicoba089', 'siswa', '89', 'aisarah89@gmail.com'],
            ['siswa90', '#Ujicoba090', 'siswa', '90', 'aisarah90@gmail.com'],
        ];

        $usersToInsert = [];
        foreach ($inputData as $data) {
            // Mengambil password mentah (index 1) dan email (index 4)
            $password = $data[1];
            $email = $data[4];
            
            // Menggabungkan firstname (index 2) dan lastname (index 3) untuk kolom 'name'
            $fullName = $data[2] . ' ' . $data[3];
            
            $usersToInsert[] = [
                'name'     => $fullName,
                'email'    => $email,
                // Menggunakan Hash::make() untuk berjaga-jaga jika Model Casts tidak berfungsi, 
                // namun jika model menggunakan casts, Eloquent akan me-hash 
                // ini sekali lagi (atau biarkan jika menggunakan mass insert DB::table). 
                // Jika menggunakan User::create(), cukup masukkan password mentah.
                'password' => $password, 
                'role'     => 'siswa', // Sesuai dengan default di migration
            ];
        }

        // --- Menggunakan User::insert() untuk performa lebih baik ---
        // Karena ini adalah mass insert, kita harus memastikan password di-hash secara manual
        // ATAU jika menggunakan User::create() (looping), password mentah bisa langsung masuk.

        // Memilih User::create() agar otomatis memanfaatkan cast 'password' => 'hashed' di Model
        foreach ($usersToInsert as $user) {
             // Password akan otomatis di-hash karena `$casts['password'] = 'hashed'` di model User
            User::create($user);
        }
        
        $this->command->info('✅ Data siswa (90 user) berhasil di-seed ke tabel users.');
    }
}