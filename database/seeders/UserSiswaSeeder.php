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
            ['siswa1', 'siswa001', 'siswa', '1', 'aisarah1@gmail.com'],
            ['siswa2', 'siswa002', 'siswa', '2', 'aisarah2@gmail.com'],
            ['siswa3', 'siswa003', 'siswa', '3', 'aisarah3@gmail.com'],
            ['siswa4', 'siswa004', 'siswa', '4', 'aisarah4@gmail.com'],
            ['siswa5', 'siswa005', 'siswa', '5', 'aisarah5@gmail.com'],
            ['siswa6', 'siswa006', 'siswa', '6', 'aisarah6@gmail.com'],
            ['siswa7', 'siswa007', 'siswa', '7', 'aisarah7@gmail.com'],
            ['siswa8', 'siswa008', 'siswa', '8', 'aisarah8@gmail.com'],
            ['siswa9', 'siswa009', 'siswa', '9', 'aisarah9@gmail.com'],
            ['siswa10', 'siswa010', 'siswa', '10', 'aisarah10@gmail.com'],
            ['siswa11', 'siswa011', 'siswa', '11', 'aisarah11@gmail.com'],
            ['siswa12', 'siswa012', 'siswa', '12', 'aisarah12@gmail.com'],
            ['siswa13', 'siswa013', 'siswa', '13', 'aisarah13@gmail.com'],
            ['siswa14', 'siswa014', 'siswa', '14', 'aisarah14@gmail.com'],
            ['siswa15', 'siswa015', 'siswa', '15', 'aisarah15@gmail.com'],
            ['siswa16', 'siswa016', 'siswa', '16', 'aisarah16@gmail.com'],
            ['siswa17', 'siswa017', 'siswa', '17', 'aisarah17@gmail.com'],
            ['siswa18', 'siswa018', 'siswa', '18', 'aisarah18@gmail.com'],
            ['siswa19', 'siswa019', 'siswa', '19', 'aisarah19@gmail.com'],
            ['siswa20', 'siswa020', 'siswa', '20', 'aisarah20@gmail.com'],
            ['siswa21', 'siswa021', 'siswa', '21', 'aisarah21@gmail.com'],
            ['siswa22', 'siswa022', 'siswa', '22', 'aisarah22@gmail.com'],
            ['siswa23', 'siswa023', 'siswa', '23', 'aisarah23@gmail.com'],
            ['siswa24', 'siswa024', 'siswa', '24', 'aisarah24@gmail.com'],
            ['siswa25', 'siswa025', 'siswa', '25', 'aisarah25@gmail.com'],
            ['siswa26', 'siswa026', 'siswa', '26', 'aisarah26@gmail.com'],
            ['siswa27', 'siswa027', 'siswa', '27', 'aisarah27@gmail.com'],
            ['siswa28', 'siswa028', 'siswa', '28', 'aisarah28@gmail.com'],
            ['siswa29', 'siswa029', 'siswa', '29', 'aisarah29@gmail.com'],
            ['siswa30', 'siswa030', 'siswa', '30', 'aisarah30@gmail.com'],
            ['siswa31', 'siswa031', 'siswa', '31', 'aisarah31@gmail.com'],
            ['siswa32', 'siswa032', 'siswa', '32', 'aisarah32@gmail.com'],
            ['siswa33', 'siswa033', 'siswa', '33', 'aisarah33@gmail.com'],
            ['siswa34', 'siswa034', 'siswa', '34', 'aisarah34@gmail.com'],
            ['siswa35', 'siswa035', 'siswa', '35', 'aisarah35@gmail.com'],
            ['siswa36', 'siswa036', 'siswa', '36', 'aisarah36@gmail.com'],
            ['siswa37', 'siswa037', 'siswa', '37', 'aisarah37@gmail.com'],
            ['siswa38', 'siswa038', 'siswa', '38', 'aisarah38@gmail.com'],
            ['siswa39', 'siswa039', 'siswa', '39', 'aisarah39@gmail.com'],
            ['siswa40', 'siswa040', 'siswa', '40', 'aisarah40@gmail.com'],
            ['siswa41', 'siswa041', 'siswa', '41', 'aisarah41@gmail.com'],
            ['siswa42', 'siswa042', 'siswa', '42', 'aisarah42@gmail.com'],
            ['siswa43', 'siswa043', 'siswa', '43', 'aisarah43@gmail.com'],
            ['siswa44', 'siswa044', 'siswa', '44', 'aisarah44@gmail.com'],
            ['siswa45', 'siswa045', 'siswa', '45', 'aisarah45@gmail.com'],
            ['siswa46', 'siswa046', 'siswa', '46', 'aisarah46@gmail.com'],
            ['siswa47', 'siswa047', 'siswa', '47', 'aisarah47@gmail.com'],
            ['siswa48', 'siswa048', 'siswa', '48', 'aisarah48@gmail.com'],
            ['siswa49', 'siswa049', 'siswa', '49', 'aisarah49@gmail.com'],
            ['siswa50', 'siswa050', 'siswa', '50', 'aisarah50@gmail.com'],
            ['siswa51', 'siswa051', 'siswa', '51', 'aisarah51@gmail.com'],
            ['siswa52', 'siswa052', 'siswa', '52', 'aisarah52@gmail.com'],
            ['siswa53', 'siswa053', 'siswa', '53', 'aisarah53@gmail.com'],
            ['siswa54', 'siswa054', 'siswa', '54', 'aisarah54@gmail.com'],
            ['siswa55', 'siswa055', 'siswa', '55', 'aisarah55@gmail.com'],
            ['siswa56', 'siswa056', 'siswa', '56', 'aisarah56@gmail.com'],
            ['siswa57', 'siswa057', 'siswa', '57', 'aisarah57@gmail.com'],
            ['siswa58', 'siswa058', 'siswa', '58', 'aisarah58@gmail.com'],
            ['siswa59', 'siswa059', 'siswa', '59', 'aisarah59@gmail.com'],
            ['siswa60', 'siswa060', 'siswa', '60', 'aisarah60@gmail.com'],
            ['siswa61', 'siswa061', 'siswa', '61', 'aisarah61@gmail.com'],
            ['siswa62', 'siswa062', 'siswa', '62', 'aisarah62@gmail.com'],
            ['siswa63', 'siswa063', 'siswa', '63', 'aisarah63@gmail.com'],
            ['siswa64', 'siswa064', 'siswa', '64', 'aisarah64@gmail.com'],
            ['siswa65', 'siswa065', 'siswa', '65', 'aisarah65@gmail.com'],
            ['siswa66', 'siswa066', 'siswa', '66', 'aisarah66@gmail.com'],
            ['siswa67', 'siswa067', 'siswa', '67', 'aisarah67@gmail.com'],
            ['siswa68', 'siswa068', 'siswa', '68', 'aisarah68@gmail.com'],
            ['siswa69', 'siswa069', 'siswa', '69', 'aisarah69@gmail.com'],
            ['siswa70', 'siswa070', 'siswa', '70', 'aisarah70@gmail.com'],
            ['siswa71', 'siswa071', 'siswa', '71', 'aisarah71@gmail.com'],
            ['siswa72', 'siswa072', 'siswa', '72', 'aisarah72@gmail.com'],
            ['siswa73', 'siswa073', 'siswa', '73', 'aisarah73@gmail.com'],
            ['siswa74', 'siswa074', 'siswa', '74', 'aisarah74@gmail.com'],
            ['siswa75', 'siswa075', 'siswa', '75', 'aisarah75@gmail.com'],
            ['siswa76', 'siswa076', 'siswa', '76', 'aisarah76@gmail.com'],
            ['siswa77', 'siswa077', 'siswa', '77', 'aisarah77@gmail.com'],
            ['siswa78', 'siswa078', 'siswa', '78', 'aisarah78@gmail.com'],
            ['siswa79', 'siswa079', 'siswa', '79', 'aisarah79@gmail.com'],
            ['siswa80', 'siswa080', 'siswa', '80', 'aisarah80@gmail.com'],
            ['siswa81', 'siswa081', 'siswa', '81', 'aisarah81@gmail.com'],
            ['siswa82', 'siswa082', 'siswa', '82', 'aisarah82@gmail.com'],
            ['siswa83', 'siswa083', 'siswa', '83', 'aisarah83@gmail.com'],
            ['siswa84', 'siswa084', 'siswa', '84', 'aisarah84@gmail.com'],
            ['siswa85', 'siswa085', 'siswa', '85', 'aisarah85@gmail.com'],
            ['siswa86', 'siswa086', 'siswa', '86', 'aisarah86@gmail.com'],
            ['siswa87', 'siswa087', 'siswa', '87', 'aisarah87@gmail.com'],
            ['siswa88', 'siswa088', 'siswa', '88', 'aisarah88@gmail.com'],
            ['siswa89', 'siswa089', 'siswa', '89', 'aisarah89@gmail.com'],
            ['siswa90', 'siswa090', 'siswa', '90', 'aisarah90@gmail.com'],
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
                'username' => $data[0],
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