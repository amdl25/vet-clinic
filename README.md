# VitaVet – Veterinary Clinic Web App

Web application for a veterinary clinic. Visitors can browse the clinic's services and contact the clinic. Registered users can book and manage appointments for their pets.

## Features
- Services catalog grouped by category (stored in Firestore)
- User registration, login and logout with Firebase Authentication
- Appointments: booking works with or without an account, while listing, editing and deleting appointments require login (the API verifies the Firebase ID token)
- Contact form that sends an email to the clinic
- Single-page app with client-side routing and a 404 page

## Tech stack

| Part | Technologies |
|---|---|
| Frontend | Vue 3, Vite, Vue Router, Vuex, Axios |
| Backend | Node.js (ES modules), Express, Morgan, Nodemailer |
| Data and auth | Firebase Authentication, Cloud Firestore, Firebase Admin SDK |

## Project structure

```
frontend/              Vue app (views: Home, Services, Appointments, Contact, Login, Register, Logout)
backend/
  controllers/         services, appointments, users, contact
  middleware/          Firebase token verification
  routes/
db_config/             Firebase web config and Admin SDK initialization
populateServices.js    seeds the services collection in Firestore
```

## Getting started

### Prerequisites
- Node.js 18 or newer
- A Firebase project with Authentication (email and password) and Cloud Firestore enabled
- An SMTP account for the contact form (for example Gmail with an app password)

### Firebase setup
1. Put your project's web configuration in `db_config/firebaseConfig.js`.
2. In the Firebase console, go to Project settings, then Service accounts, and generate a private key. Save it as `db_config/serviceAccountKey.json`.

### Install and seed

```bash
npm install                 # root: Firebase SDKs used by db_config and the seed script
node populateServices.js    # adds the clinic services to Firestore
```

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=3000
USER_EMAIL=you@example.com
EMAIL_PASS=your-app-password
```

```bash
node index.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:3000`.

## Notes
- The UI and service names are in Romanian.
