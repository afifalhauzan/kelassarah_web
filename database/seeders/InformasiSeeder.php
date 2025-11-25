<?php

namespace Database\Seeders;

use App\Models\Informasi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InformasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $informasiData = [
            [
                'title' => 'Bahan Ajar',
                'description' => 'Dokumen bahan ajar untuk pembelajaran',
                'type' => 'bahan_ajar',
                'file_url' => '/pdf/BahanAjar.pdf',
                'order' => 1,
                'is_published' => true,
                'access' => null,
            ],
            [
                'title' => 'Guidebook',
                'description' => 'Panduan penggunaan sistem pembelajaran',
                'type' => 'guidebook',
                'file_url' => '/pdf/Guidebook.pdf',
                'order' => 2,
                'is_published' => true,
                'access' => null,
            ],
            [
                'title' => 'Instrumen Evaluasi',
                'description' => 'Instrumen untuk evaluasi pembelajaran',
                'type' => 'instrumen_evaluasi',
                'file_url' => '/pdf/InstrumenEvaluasi.pdf',
                'order' => 3,
                'is_published' => true,
                'access' => 'guru',
            ],
            [
                'title' => 'LKPD',
                'description' => 'Lembar Kerja Peserta Didik',
                'type' => 'lkpd',
                'file_url' => '/pdf/LKPD.pdf',
                'order' => 4,
                'is_published' => true,
                'access' => null,
            ],
            [
                'title' => 'Modul Ajar',
                'description' => 'Modul pembelajaran untuk guru',
                'type' => 'modul_ajar',
                'file_url' => '/pdf/ModulAjar.pdf',
                'order' => 5,
                'is_published' => true,
                'access' => 'guru',
            ],
        ];

        foreach ($informasiData as $data) {
            Informasi::create($data);
        }
    }
}
