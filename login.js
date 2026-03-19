import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAboX9JZXxNpHzHDDepCYcQgLeQcC3j0a8",
  authDomain: "mldlogistic.firebaseapp.com",
  projectId: "mldlogistic",
  storageBucket: "mldlogistic.firebasestorage.app",
  messagingSenderId: "234347877453",
  appId: "1:234347877453:web:f3691aee2d934c1bcbf804"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ---------- LOGIN ---------- */
window.loginBtn = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful ✅");
      window.location.href = "Admin/index.html"; // optional redirect
    })
    .catch((error) => {
      alert("invalid email or password ❌");
    });
};