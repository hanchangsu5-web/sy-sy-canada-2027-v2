// Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-storage.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCSS50Jqvxn8wKR5XkCudvHQPq7xPzFWo4",
  authDomain: "travel-tools-2027.firebaseapp.com",
  projectId: "travel-tools-2027",
  storageBucket: "travel-tools-2027.firebasestorage.app",
  messagingSenderId: "603079737957",
  appId: "1:603079737957:web:e0a532278d7b0e908afc8c"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 연결
const db = getFirestore(app);

// Storage 연결
const storage = getStorage(app);

// 다른 파일에서 사용할 수 있도록 내보내기
export { app, db, storage };