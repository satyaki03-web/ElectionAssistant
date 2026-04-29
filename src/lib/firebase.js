import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB9RL8cWVVhcOhCNjvV-g_ndBAz_BNWPIg",
  authDomain: "election-assistant-03ss26.firebaseapp.com",
  projectId: "election-assistant-03ss26",
  storageBucket: "election-assistant-03ss26.firebasestorage.app",
  messagingSenderId: "281073607572",
  appId: "1:281073607572:web:1286d1d46a3839cc2ee581",
  measurementId: "G-P13N9SM79M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
