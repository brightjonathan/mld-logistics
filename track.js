// auth.js  (MODULE FILE)

// Firebase SDK imports (MODULES)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
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
  const db = getFirestore(app);


// ===============================
// TRACKING AND SEARCH FUNCTIONALITY
// ===============================
// TRACKING SEARCH FUNCTIONALITY


const trackingInput = document.getElementById("trackingSearch");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const trackingResult = document.getElementById("trackingResult");

// 🔍 SEARCH SHIPMENT
searchBtn.addEventListener("click", async () => {
  const trackingId = trackingInput.value.trim();

  if (!trackingId) {
    alert("Enter a tracking ID");
    return;
  }

  trackingResult.innerHTML = "Searching...";

  try {
    const ref = doc(db, "SHIPMENT", trackingId);
    const snap = await getDoc(ref); // ✅ FIX

    if (!snap.exists()) {
      trackingResult.innerHTML = "<p>No shipment found.</p>";
      return;
    }

    const data = snap.data();
    const origin = `${data.shipper.state}, ${data.shipper.country}`;
    const destination = `${data.receiver.state}, ${data.receiver.country}`;

//     const mapUrl = `
// https://maps.googleapis.com/maps/api/staticmap
// ?size=800x400
// &maptype=roadmap
// &markers=color:green|label:S|${encodeURIComponent(origin)}
// &markers=color:red|label:R|${encodeURIComponent(destination)}
// &path=color:0xff0000ff|weight:4|${encodeURIComponent(origin)}|${encodeURIComponent(destination)}
// &key=YOUR_GOOGLE_MAPS_API_KEY
// `;


        //   <img
        //     src="${mapUrl}"
        //     alt="Shipment Route"
        //     style="width:100%; border-radius:12px; margin-top:15px"
        //     />
    

    trackingResult.innerHTML = `
      <div class="invoice">
        <div class="invoice-header">
          <div>
            <h3>Shipment Invoice</h3>
            <span>${trackingId}</span>
          </div>
          <div>
            <small>${data.createdAt?.toDate().toLocaleString()}</small>
          </div>
        </div>

        <div class="invoice-grid">
          <div>
            <h4>Shipper</h4>
            <p>${data.shipper.name}</p>
            <p>${data.shipper.phone}</p>
            <p>${data.shipper.country}</p>
            <p>${data.shipper.email}</p>
          </div>

          <div>
            <h4>Receiver</h4>
            <p>${data.receiver.name}</p>
            <p>${data.receiver.phone}</p>
            <p>${data.receiver.country}</p>
            <p>${data.receiver.email}</p>
          </div>

          <div>
            <h4>Shipment</h4>
            <p>Type: ${data.shipment.type}</p>
            <p>Product: ${data.shipment.product}</p>
            <p>Courier: ${data.shipment.courier}</p>
          </div>

          <div>
            <h4>Package</h4>
            <p>Weight: ${data.packageDetails.weight2}kg</p>
            <p>Size: ${data.packageDetails.length} × ${data.packageDetails.width} × ${data.packageDetails.height}</p>
            <p>Delivery: ${data.packageDetails.expectedDelivery}</p>
          </div>
        </div>

        <div>
          <h4>Payment</h4>
          <p>Method: ${data.moreDetails.paymentMethod}</p>
          <p>BTC: ${data.packageDetails.btc}</p>
          <p>Shipping Fee: $${data.packageDetails.shippingFee.toLocaleString()}</p>
          <p>Value: $${data.packageDetails.packageValue.toLocaleString()}</p>
          <h2>TOTAL AMOUNT: $${(Number(data.packageDetails.packageValue) + Number(data.packageDetails.shippingFee)).toLocaleString()}</h2>
          <p>Status: <span class="status">${data.packageDetails.paymetStatus}</span></p>
           <iframe
            src="https://www.google.com/maps?q=${encodeURIComponent(origin)}&z=12&output=embed"
            width="100%"
            height="400"
            style="border-radius:12px;border:0">
        </iframe>
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    trackingResult.innerHTML = "<p>Error fetching shipment.</p>";
  }
});

// 🔄 RESET
// resetBtn.addEventListener("click", () => {
//   trackingInput.value = "";
//   trackingResult.innerHTML = "";
// });

