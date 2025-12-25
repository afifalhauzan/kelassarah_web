# 🤖 Kak Sarah — AI-Powered Socratic Tutor Platform

**Top 20 National Finalist @ LIDM 2025** (Digital Learning Innovation Competition)

[Live Demo](https://kelassarah.id/) | [Design File (Figma)](https://www.figma.com/design/MKpr8cjd89l4G3eqPsCYmD/KAK-SARAH?node-id=0-1&t=pwHcmT7VuPe7c7D2-1)

**Kak Sarah** is an AI-integrated Learning Management System (LMS) designed to foster critical thinking. Unlike traditional chatbots that provide direct answers, Kak Sarah utilizes the **Socratic Method**, guiding students through complex topics by asking targeted, scaffolding questions to encourage independent problem-solving.

---

## 🚀 Key Technical Highlights

* **AI Orchestration:** Integrated OpenAI API with structured prompt constraints to ensure the tutor remains in a "Socratic" persona, providing hints and guidance rather than direct solutions.
* **Seamless Fullstack Architecture:** Built with **Laravel** and **React** via **Inertia.js**, delivering a Single Page Application (SPA) experience with robust server-side routing and authentication.
* **Progressive Web App (PWA):** Implemented PWA features to ensure accessibility for students in low-bandwidth environments (3T regions), prioritizing inclusive education.
* **Accessibility Integration:** Leveraged ElevenLabs API to implement a voice-assisted interface, enhancing platform accessibility for students with visual impairments and diverse learning needs
* **Role-Based Access Control (RBAC):** Developed dedicated dashboards for Students (interactive learning) and Admins (curriculum management).
* **Production Deployment:** Deployed on a private VPS
---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Inertia.js |
| **Backend** | Laravel 12 (PHP 8.x) |
| **AI** | OpenAI API (GPT-4o) |
| **Database** | MySQL + Redis (Queues) |
| **State Management** | React Context API (Conversation flows & loading states) |

---

## 👥 The Team

This project involves 6 members, which I managed as the **Tech Lead**.

| Name | Role | Responsibility |
| :--- | :--- | :--- |
| **Afiif Al Hauzaan Alfian** | Tech Lead & DevOps | System architecture, design-to-code fidelity, and VPS deployment |
| **Arif Ammar Sya’bani** | Frontend Developer | Translating high-fidelity designs into responsive React components |
| **Achmad Hasbil Wafi R.** | Backend Developer | API endpoint development and database schema management |
| **Naila Rahma Ningrum** | UI/UX Designer | User research and wireframing for the Socratic interaction flow |
| **Ghefira Addien M. M.** | UI/UX Designer | High-fidelity design systems and component consistency |
| **Shananda Putri Aisyah** | UI/UX Designer | Usability testing and visual branding assets |

---

## 🏆 Achievement

* **Top 20 National Finalist** at the Digital Learning Innovation Competition (**LIDM 2025**) organized by Kemendikbudristek.
* Evaluated among **150+ submissions** for technical feasibility, educational impact, and UI/UX excellence.

### 📈 Real-World Testing
Kak Sarah has been tested in an active classroom environment:

* Successfully handled simultaneous access for **35+ concurrent students** during a live instructional session.
* With 0% errors, zero rate-limiting issues, and no server constraints.

---


## 🛠️ Local Development Setup (Linux)

This project is containerized using **Laravel Sail**. Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed before proceeding.

### 1. Clone the Repository
```bash
git clone [https://github.com/afifalhauzan/kelassarah_web.git](https://github.com/afifalhauzan/kelassarah_web.git)
cd kelassarah_web
```

### 2. Environment Configuration
Copy the example environment file and update your credentials.
```bash
cp .env.example .env
```

### 3. Install Dependencies
Since the project runs in Docker, use a temporary container to install Composer dependencies:
```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs
```

### 4. Start the Application
Launch the development environment in the background:
```bash
./vendor/bin/sail up -d
```

### 5. Environment Configuration
Generate the application key, run database migrations (with seeders), and compile assets:
```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```
The application will be available at http://localhost.

---

> "Managing this project required bridging the gap between pedagogical theory and technical execution. By using Inertia.js, we were able to maintain a high development velocity while ensuring that the Socratic AI felt like a natural, responsive conversation rather than a static form."
