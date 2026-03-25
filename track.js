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
    // const origin = `${data.shipper.state}, ${data.shipper.country}`;

    //TRANSIT MAP
    const origin2 = `${data.shipper.country}`;
    const transit = `${data.shipment.TrasitCountry}`;
    const destination = `${data.receiver.country}`;


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
            <h4>Sender Details</h4>
            <p>${data.shipper.name}</p>
            <p>${data.shipper.phone}</p>
            <p>${data.shipper.country}</p>
            <p>${data.shipper.email}</p>
            <p>${data.shipper.address || ""}</p>
          </div>

          <div>
            <h4>Receiver Details</h4>
            <p>${data.receiver.name}</p>
            <p>${data.receiver.phone}</p>
            <p>${data.receiver.country}</p>
            <p>${data.receiver.email}</p>
            <p>${data.receiver.address || ""}</p>
          </div>

          <div>
            <h4>Shipment Details</h4>
            <p>Type: ${data.shipment.type}</p>
            <p>Product: ${data.shipment.product}</p>
            <p>Weight: ${data.shipment.weight}kg</p>
            <p>Quantity: ${data.shipment.quantity}</p>
            <p>Courier: ${data.shipment.courier}</p>
            <p>Width: ${data.packageDetails.width}cm</p>
            <h3 style="color: #2c541dea;">Transit country: ${data.shipment.TrasitCountry}</h3>
          </div>

          


          <div>
            <h4> Package Details</h4>
            Description: ${data.packageDetails.description}<br>
            Departure Date: ${data.moreDetails.pickupDate}<br>
            Expected Delivery: ${data.packageDetails.expectedDelivery}<br>
            <h5 style="color: #c24d17ea;">Payment Transit Status: ${data.moreDetails.paymentTransitStatus}</h5>
          </div>
        </div>

        <div>
          <h4>Payment Details</h4>
          <h5>Payment Method: ${data.moreDetails.paymentMethod}<br></h5>
          payment number: ${data.packageDetails.btc}<br>
          Tax/Clearance charge: $${Number(data.packageDetails.shippingFee).toLocaleString()}<br>
          <h3 style="color: #356922ea;">TOTAL AMOUNT: $${(Number(data.packageDetails.shippingFee)).toLocaleString()}</h3>
          Status: <b>${data.packageDetails.paymetStatus}</b>
           <iframe
            src="https://www.google.com/maps?q=${encodeURIComponent(origin2 + " to " + transit + " to " + destination)}&output=embed"
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

