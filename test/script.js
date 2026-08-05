import { app } from "../firebase.js";

const status = document.getElementById("status");

status.textContent = "✅ Firebase 연결 성공!";

console.log("Firebase App :", app);