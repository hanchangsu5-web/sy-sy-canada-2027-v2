// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

// Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Storage
import { getStorage } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

// Firebase 설정

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3UezyQoyN79aac3DJj9H555pmwFlC3d8",
  authDomain: "travel-gallery-f35b2.firebaseapp.com",
  projectId: "travel-gallery-f35b2",
  storageBucket: "travel-gallery-f35b2.firebasestorage.app",
  messagingSenderId: "326298445035",
  appId: "1:326298445035:web:fde65d3beaa36ec10d8aae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Storage
const storage = getStorage(app);

// export
export { app, db, storage };

