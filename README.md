# Sufa – Sustainable Fashion Mobile Application
**"From waste to wardrobe"**

**Sufa** is a mobile app built with Expo & React Native that helps you give your clothes a second life, reduce waste, and make more eco-friendly decisions about your wardrobe. Fully integrated with Firebase Auth and Firestore, Sufa offers personalized recommendations, upcycling ideas, and local recycling & donation locations lookup.

---

## 🚀 Features

- **User Authentication**  
  Sign up / log in with email & password, securely manage sessions, and log out when you’re done.

- **Product Analysis & Recommendations**  
  For each item you add, answer a few quick questions (sentiment, usage, material, price, infrastructure) and Sufa’s decision engine calculates scores to recommend one of:  
  - ♻️ *Recycle*  
  - 🎁 *Donate*  
  - 🎨 *Upcycle*

- **Persistent Analysis Reports**  
  Every analysis is saved to Firestore under your user account. You can view and revisit only *your* past reports.

- **Guided Upcycling Ideas**  
  Browse quick “DIY” ideas per garment category (tops, bottoms, undergarments) or launch a Pinterest search for deeper inspiration.

- **Recycling & Donation Locations Map**  
  Automatically fetch recycling, donation and upcycling locations from Firestore, then tap “Open in Maps” to navigate via Apple Maps or Google Maps.

- **Daily Sustainability Tip**  
  A rotating eco-tip fetched from a public API to inspire you toward greener habits.

- **Smooth Animations & Consistent Design**  
  Subtle fade/slide animations on the dashboard and welcome screen, along with a unified, friendly UI across all screens.

---

## 📦 Tech Stack

- **Expo & React Native** – Unified iOS & Android development  
- **React Navigation (Stack Navigator)** – Screen routing & headerless navigation  
- **Firebase Auth & Firestore** – Secure user accounts & real-time database  
- **Context API** – Global state management for analysis entries  
- **Animated API** – On-load transitions for a polished feel  
- **Expo ImagePicker** – Choose or change product photos  

---

## 🛠 Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/dogacangogusoglu/sufa-app.git
   cd sufa-app

2. **Install dependencies**
   npm install
   # or
   yarn install

3. **Configure database**
   Copy your firebaseConfig into ./firebase.js.
   Enable Email/Password sign-in in Firebase Auth.
   Create Cloud Firestore collections:
                                      analysis_reports
                                      recycling_locations
                                      donation_locations
                                      upcycle_locations
                                      user

 4. Run in development
      expo start
      (Please run with expo dev.)

 ---

## 🤝 Contributing

Fork the repo

Create a feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m "Add YourFeature")

Push to your branch (git push origin feature/YourFeature)

Open a Pull Request!

 ---
 
Sustainability starts with small daily choices—Sufa makes them stylish and simple. 
