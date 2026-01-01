# 📚 LearnLingo - Online Language Tutor Booking Platform

LearnLingo is a specialized web application designed to connect students with professional language tutors. The platform offers a seamless experience for browsing teacher profiles, utilizing advanced filtering, and managing personalized trial lesson bookings.

## 🚀 Live Demo
[Insert your Netlify/Vercel/GitHub Pages link here]

## 📋 Project Overview
This project was developed according to a professional technical specification for a modern language learning service. It demonstrates a robust integration of React frontend with Firebase backend services, focusing on secure authentication and real-time data management.

### Key Features
- **Secure Authentication:** Full registration, login, and session persistence powered by Firebase Auth.
- **Real-time Teacher Directory:** Dynamic profile cards with data fetched directly from Firebase Realtime Database.
- **Advanced Multi-Criteria Filtering:** Users can filter tutors by Language, Knowledge Level (A1 to C2), and Price per Hour.
- **Personalized Favorites:** Authorized users can save tutors to a dedicated Favorites page, with data synced across devices via Firebase.
- **Expandable Teacher Profiles:** "Read More" functionality to view detailed experience and student testimonials.
- **Trial Lesson Booking:** Interactive booking system using specialized forms and modal windows.
- **Optimized Pagination:** "Load More" system that fetches data in segments of 4 cards to ensure high performance.

## 🛠️ Tech Stack
- **Core:** React.js (Vite)
- **Routing:** React Router v6
- **Backend:** Firebase Realtime Database & Firebase Auth
- **Form Management:** React Hook Form & Yup Validation
- **Icons:** React Icons
- **Styling:** CSS3 (Strictly following Figma mockups)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   git clone https://github.com/your-username/learn-lingo.git

2. **Install dependencies:**
   npm install

3. **Configure Firebase:**
   Create a .env file in the root directory and add your Firebase credentials:
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

4. **Run the application:**
   npm run dev

## 📄 Technical Specification Compliance
- **Validation:** All forms include mandatory field validation using React Hook Form and Yup.
- **Interactive Modals:** Support for closing via backdrop click, close icon, and the Escape (Esc) key.
- **State Persistence:** User login status and favorite selections are maintained upon page refresh.
- **Semantic HTML:** Code is structured using valid, semantic HTML tags for accessibility and SEO.

## 🎨 Design Reference
The UI/UX design is built based on professional Figma mockups, ensuring a clean, modern, and user-friendly interface that aligns with industry standards.