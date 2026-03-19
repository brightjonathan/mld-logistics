// auth.js  (MODULE FILE)

// Firebase SDK imports (MODULES)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";


// Firebase config
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
//   const auth = getAuth(app);
  const db = getFirestore(app);


    // SENDING MASSEGE FUNCTIONALITY
const SendMsg = document.getElementById("sendMsg");


SendMsg.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const name =  document.getElementById("Name").value.trim();
    const email =  document.getElementById("Email").value.trim();
    const subject =  document.getElementById("subject").value.trim();
    const message =  document.getElementById("message").value.trim();

    // 🔥 Save to Firestore
        await addDoc(collection(db, "MESSAGE"), {
           name,
           email,
           subject,
           message,
          createdAt: serverTimestamp(),
        });

        alert("✅ Message sent successfully!");
        SendMsg.reset();
  } catch (error) {
    console.log("Firestore Error:", error);
    alert("❌ Failed to add user");
    
  }

});