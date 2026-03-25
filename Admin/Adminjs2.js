// auth.js  (MODULE FILE)

// Firebase SDK imports (MODULES)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
  getCountFromServer,
  updateDoc
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
  const auth = getAuth(app);
  const db = getFirestore(app);


/* 🔐 PROTECT PAGE */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../login.html";
  }
});


/* 🚪 LOGOUT FUNCTION */
  window.logout = async function () {
    const confirmed = confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    try {
      await signOut(auth);
      window.location.href = "../login.html";
    } catch (err) {
      console.error("Sign-out error:", err);
      alert("Unable to sign out. Please try again.");
    }
  };


  //ADD USER FUNCTIONALITY
  // 📦 ADD USER TO FIRESTORE
const form = document.getElementById("userForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const street = document.getElementById("street").value.trim();
    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const postalCode = document.getElementById("postalCode").value.trim();

    const gender = document.querySelector(
      'input[name="gender"]:checked'
    ).value;

    // 🔥 Save to Firestore
    await addDoc(collection(db, "ADDUSERS"), {
       author: { 
        name: 'ADMIN', 
        id: auth.currentUser.uid, 
        email: auth.currentUser.email 
      },
      fullName,
      email,
      phone,
      gender,
      address: {
        street,
        city,
        country,
        postalCode
      },
      createdAt: serverTimestamp(),
    });

    alert("✅ User added successfully!");
    form.reset();

  } catch (error) {
    console.error("Firestore Error:", error);
    alert("❌ Failed to add user");
  }
});




// ADD SHIPMENT FUNCTIONALITY
// GET THE FORM
const shipmentForm = document.getElementById('addshipmentform');

shipmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    // Shipper Info
    const shipperName = document.getElementById("shipperName").value.trim();
    const shipperPhone = document.getElementById("shipperPhone").value.trim();
    const shipperEmail = document.getElementById("shipperEmail").value.trim();
    const shipperAddress = document.getElementById("shipperAddress").value.trim();
    const shipperState = document.getElementById("shipperState").value.trim();
    const shipperCountry = document.getElementById("shipperCountry").value.trim();

    // Receiver Info
    const receiverName = document.getElementById("receiverName").value.trim();
    const receiverPhone = document.getElementById("receiverPhone").value.trim();
    const receiverEmail = document.getElementById("receiverEmail").value.trim();
    const receiverAddress = document.getElementById("receiverAddress").value.trim();
    const receiverState = document.getElementById("receiverState").value.trim();
    const receiverCountry = document.getElementById("receiverCountry").value.trim();

    // Shipment Info
    const shipmentType = document.getElementById("shipmentType").value;
    const weight = document.getElementById("weight").value.trim();
    const courier = document.getElementById("courier").value.trim();
    // const packageCount = document.getElementById("packageCount").value;
    const product = document.getElementById("product").value.trim();
    const quantity = document.getElementById("quantity").value;
    const TrasitCountry = document.getElementById('shipmentTransitCountryStatus').value.trim()

    // More Details
    const paymentMethod = document.getElementById("paymentMethod").value;
    // const totalFreight = document.getElementById("totalFreight").value;
    const carrier = document.getElementById("carrier").value;
    const carrierRef = document.getElementById("carrierRef").value;
    const departureTime = document.getElementById("departureTime").value;
    const pickupDate = document.getElementById("pickupDate").value;
    const paymentTransitStatus = document.getElementById('paymentTransitStatus').value.trim();

    // Package Details
    const pickupTime = document.getElementById("pickupTime").value;
    const expectedDelivery = document.getElementById("expectedDelivery").value;
    // const packageQuantity = document.getElementById("packageQuantity").value;
    const description = document.getElementById("description").value.trim();
    // const length = document.getElementById("length").value;
    // const height = document.getElementById("height").value;
    // const weight2 = document.getElementById("weight2").value;
    const width = document.getElementById("width2").value;
    // const packageValue = document.getElementById("packageValue").value;
    const shippingFee = document.getElementById("shippingFee").value;
    const paymetStatus = document.getElementById("paymentStatus").value;
    const btc = document.getElementById("btc").value;

    // SAVE TO FIRESTORE
    await addDoc(collection(db, "SHIPMENT"), {
      author: {
        name: 'ADMIN',
        id: auth.currentUser.uid,
        email: auth.currentUser.email,
      },
      shipper: {
        name: shipperName,
        phone: shipperPhone,
        email: shipperEmail,
        address: shipperAddress,
        state: shipperState,
        country: shipperCountry,
      },
      receiver: {
        name: receiverName,
        phone: receiverPhone,
        email: receiverEmail,
        address: receiverAddress,
        state: receiverState,
        country: receiverCountry,
      },
      shipment: {
        type: shipmentType,
        weight,
        courier,
        // packageCount,
        product,
        quantity,
        TrasitCountry
      },
      moreDetails: {
        paymentMethod,
        // totalFreight,
        carrier,
        carrierRef,
        departureTime,
        pickupDate,
        paymentTransitStatus
      },
      packageDetails: {
        pickupTime,
        expectedDelivery,
        // packageQuantity,
        description,
        // length,
        // height,
        // weight2,
        width,
        // packageValue,
        shippingFee,
        paymetStatus,
        btc
      },
      createdAt: serverTimestamp(),
    });

    alert("✅ Shipment added successfully!");
    shipmentForm.reset();

  } catch (err) {
    console.error("Firestore Error:", err);
    alert("❌ Failed to add shipment");
  }
});



// displaying the total number of users, shipments, messages

// USERS COUNT
onSnapshot(collection(db, "ADDUSERS"), (snapshot) => {
  document.getElementById("totalUsers").textContent = snapshot.size;
});

// MESSAGES COUNT
onSnapshot(collection(db, "MESSAGE"), (snapshot) => {
  document.getElementById("totalMessages").textContent = snapshot.size;
});

// SHIPMENTS COUNT
onSnapshot(collection(db, "SHIPMENT"), (snapshot) => {
  document.getElementById("totalShipments").textContent = snapshot.size;
});




//GET ALL MESSAGES AND DISPLAY FUNCTIONALITY

const messagesList = document.getElementById("messagesList");

async function loadMessages() {
  messagesList.innerHTML = "Loading messages...";

  try {
    const q = query(
      collection(db, "MESSAGE"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    messagesList.innerHTML = "";

    if (querySnapshot.empty) {
      messagesList.innerHTML = "<p>No messages found.</p>";
      return;
    }

    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      const messageId = docSnap.id;
      

      const div = document.createElement("div");
      div.classList.add("message-card");

      div.innerHTML = `
      <h2>${data.subject || "No subject"}</h2>
      <p>${data.message}</p>
      <h4>${data.name || "Anonymous"}</h4>
        <small>${data.email || "No email"}</small> <br/>
        <small>
          ${data.createdAt?.toDate().toLocaleString() || ""}
        </small>
        <br><br>
        <button class="delete-btn">Delete</button>
      `;

      // DELETE HANDLER
      div.querySelector(".delete-btn").addEventListener("click", async () => {
        const confirmDelete = confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return;

        try {
          await deleteDoc(doc(db, "MESSAGE", messageId));
          div.remove(); // remove from UI
          alert("✅ Message deleted");
        } catch (error) {
          console.error("Delete error:", error);
          alert("❌ Failed to delete message");
        }
      });

      messagesList.appendChild(div);
    });

  } catch (error) {
    console.error("Error loading messages:", error);
    messagesList.innerHTML = "<p>Error loading messages</p>";
  }
}

// Load messages on page load
loadMessages();


// ===============================
// GET ALL USERS FUNCTIONALITY (DASHBOARD)
// ===============================
// GET ALL USERS AND DISPLAY FUNCTIONALITY
// 🔹 GET ALL USERS & DISPLAY
const usersGrid = document.getElementById("usersGrid");

async function loadUsers() {
  usersGrid.innerHTML = "Loading users...";

  try {
    const q = query(
      collection(db, "ADDUSERS"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    usersGrid.innerHTML = "";

    if (snapshot.empty) {
      usersGrid.innerHTML = "<p>No users found.</p>";
      return;
    }

    snapshot.forEach((docSnap) => {
      const user = docSnap.data();
      const userId = docSnap.id;

      const div = document.createElement("div");
      div.classList.add("user-card");

      div.innerHTML = `
        <h3>${user.fullName}</h3>
        <small><b>Email:</b> ${user.email}</small><br>
        <small><b>Phone:</b> ${user.phone}</small><br>
        <small><b>Gender:</b> ${user.gender}</small><br><br>

        <small><b>Address:</b></small><br>
        <small>
          ${user.address.street}, ${user.address.city},
          ${user.address.country} - ${user.address.postalCode}
        </small><br><br>

        <small>
          <b>Added:</b>
          ${user.createdAt?.toDate().toLocaleString() || ""}
        </small>

        <br><br>
        <button class="delete-user-btn">Delete User</button>
      `;

      // 🗑️ DELETE USER
      div.querySelector(".delete-user-btn").addEventListener("click", async () => {
        const confirmDelete = confirm(
          "Are you sure you want to delete this user permanently?"
        );
        if (!confirmDelete) return;

        try {
          await deleteDoc(doc(db, "ADDUSERS", userId));
          div.remove();
          alert("✅ User deleted successfully");
        } catch (err) {
          console.error("Delete error:", err);
          alert("❌ Failed to delete user");
        }
      });

      usersGrid.appendChild(div);
    });

  } catch (error) {
    console.error("Error loading users:", error);
    usersGrid.innerHTML = "<p>Error loading users</p>";
  }
}

// 🚀 LOAD USERS ON PAGE LOAD
loadUsers();



// ===============================
// GET ALL SHIPMENTS FUNCTIONALITY (DASHBOARD)
// ===============================
const shipmentsContainer = document.getElementById("shipmentsContainer");
let allShipments = [];  // store all shipments

// 🔹 LOAD SHIPMENTS
async function loadShipments() {
  shipmentsContainer.innerHTML = "Loading shipments...";

  const q = query(collection(db, "SHIPMENT"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  shipmentsContainer.innerHTML = "";
  allShipments = [];

  if (snapshot.empty) {
    shipmentsContainer.innerHTML = "<p>No shipments found.</p>";
    return;
  }

  snapshot.forEach((docSnap) => {
    allShipments.push({ id: docSnap.id, ...docSnap.data() });
  });

  renderShipments(allShipments);
}

// 🔹 RENDER SHIPMENTS (INVOICE STYLE)
function renderShipments(shipments) {
  shipmentsContainer.innerHTML = "";

  shipments.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("shipment-invoice");

    div.innerHTML = `
      <div class="invoice-header">
        <div>
          <strong>Tracking ID:</strong>
          <span class="tracking-id"
            onclick="navigator.clipboard.writeText('${data.id}')"
            title="Click to copy">
            ${data.id}
          </span>
        </div>
        <div>
          <small>${data.createdAt?.toDate().toLocaleString() || ""}</small>
        </div>
      </div>

      <div class="section invoice-grid">
        <div>
          <h4>Sender Details</h4>
          ${data.shipper.name}<br>
          ${data.shipper.phone}<br>
          ${data.shipper.country} <br>
          ${data.shipper.state}<br>
          ${data.shipper.email} 
          ${data.shipper.address ? `<br>${data.shipper.address}` : ""}
        </div>
        <div>
          <h4>Receiver Details</h4>
          ${data.receiver.name}<br>
          ${data.receiver.phone}<br>
          ${data.receiver.state}<br>
          ${data.receiver.country} <br>
          ${data.receiver.email}
          ${data.receiver.address ? `<br>${data.receiver.address}` : ""}
        </div>
      </div>

      <div class="section invoice-grid">
        <div>
          <h4>Shipment Details</h4>
          Type: ${data.shipment.type}<br>
          Product: ${data.shipment.product}<br>
          weight: ${data.shipment.weight}kg<br>
          Quantity: ${data.shipment.quantity}<br>
          Courier: ${data.shipment.courier} <br>
          Width: ${data.packageDetails.width}cm
          <h3 style="color: #2c541dea;">Transit country: ${data.shipment.TrasitCountry}</h3>
        </div>

        

        <div>
          <h4> Package Details</h4>
          Description: ${data.packageDetails.description}<br>
          carrier Reference: ${data.moreDetails.carrierRef}<br>
          carrier: ${data.moreDetails.carrier}<br>
          Pickup Date: ${data.moreDetails.pickupDate}<br>
          Departure Time: ${data.moreDetails.departureTime}<br>
          Expected Delivery: ${data.packageDetails.expectedDelivery}<br>
          <h3 style="color: #c24d17ea;">Transit Status: ${data.moreDetails.paymentTransitStatus}</h3>
        </div>
      </div>

      <div class="section">
        <h4>Payment Details</h4>
        <h5>Payment Method: ${data.moreDetails.paymentMethod}<br></h5>
       payment number: <span style="word-break: break-all; overflow-wrap: anywhere; display:inline-block; max-width:100%;">
          ${data.packageDetails.btc}
        </span><br>
        Tax/Clearance charge: $${Number(data.packageDetails.shippingFee).toLocaleString()}<br>
        <h3 style="color: #356922ea;">TOTAL AMOUNT: $${(Number(data.packageDetails.shippingFee)).toLocaleString()}</h3>
        Status: <b>${data.packageDetails.paymetStatus}</b>
      </div>

      <div class="invoice-actions">
      <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        <button class="pdf-btn">PDF</button>
      </div>
    `;


    // ✏️ EDIT SHIPMENT
    div.querySelector(".edit-btn").addEventListener("click", () => {
      openEditForm(data);
    });

    // 🗑 DELETE SHIPMENT
    div.querySelector(".delete-btn").addEventListener("click", async () => {
      if (!confirm("Delete this shipment permanently?")) return;
      await deleteDoc(doc(db, "SHIPMENT", data.id));
      alert("Shipment deleted");
      loadShipments();
    });

    // 📄 DOWNLOAD PDF
    div.querySelector(".pdf-btn").addEventListener("click", () => {
      downloadPDF(div, data.id);
    });

    async function downloadPDF(element, id) {
  // Clone element so we don't affect UI
  const clone = element.cloneNode(true);

  // Remove buttons
  const actions = clone.querySelector(".invoice-actions");
  if (actions) actions.remove();

  // Add styling
  clone.style.background = "#fff";
  clone.style.padding = "20px";
  clone.style.width = "800px";
  clone.style.position = "relative";

  // =========================
  // ✅ ADD LOGO
  // =========================
  const logo = document.createElement("img");
  logo.src = "https://i.ibb.co/v4s35hxr/favicon.png";
  //USING https://imgbb.com/
  // 👉 Replace with your real logo URL

  logo.style.width = "120px";
  logo.style.marginBottom = "10px";

  clone.prepend(logo);

  // =========================
  // ✅ ADD COMPANY HEADER
  // =========================
  const header = document.createElement("div");
  header.innerHTML = `
    <h2 style="margin:0;">MLD LOGISTICS LIMITED</h2>
    <small>Official Shipment Receipt</small>
    <hr/>
  `;
  clone.prepend(header);

  // =========================
  // ✅ ADD QR CODE
  // =========================
  const qrContainer = document.createElement("div");
  qrContainer.style.position = "absolute";
  qrContainer.style.top = "20px";
  qrContainer.style.right = "20px";

  clone.appendChild(qrContainer);

  // Generate QR (Tracking link or ID)
  new QRCode(qrContainer, {
    text: `Tracking ID: ${id}`, // 👉 you can change to a URL
    width: 80,
    height: 80
  });

  // Add to DOM temporarily
  document.body.appendChild(clone);

  // Wait a bit for QR to render
  await new Promise(resolve => setTimeout(resolve, 500));

  // Convert to canvas
  const canvas = await html2canvas(clone, {
    scale: 2
  });

  const imgData = canvas.toDataURL("image/png");

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 190;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

  // Save
  pdf.save(`MLD-Receipt-${id}.pdf`);

  // Clean up
  document.body.removeChild(clone);
}

// end of downloadPDF function


    shipmentsContainer.appendChild(div);


  });
}

// 🚀 LOAD ON PAGE LOAD
loadShipments();


 function openEditForm(data) {
  document.getElementById("editModal").style.display = "block";

  document.getElementById("editTrackingId").value = data.id;

  //EDIT SHIPPER DETAILS
  document.getElementById("editShipperName").value = data.shipper.name;
  document.getElementById("editShipperPhone").value = data.shipper.phone;
  document.getElementById("editShipperEmail").value = data.shipper.email;
  document.getElementById("editShipperAddress").value = data.shipper.address;
  document.getElementById("editShipperState").value = data.shipper.state;
  document.getElementById("editShipperCountry").value = data.shipper.country;

  //EDIT RECEIVER DETAILS
  document.getElementById("editReceiverName").value = data.receiver.name;
  document.getElementById("editReceiverPhone").value = data.receiver.phone;
  document.getElementById("editReceiverEmail").value = data.receiver.email;
  document.getElementById("editReceiverAddress").value = data.receiver.address;
  document.getElementById("editReceiverState").value = data.receiver.state;
  document.getElementById("editReceiverCountry").value = data.receiver.country;


  // EDIT SHIPMENT DETAILS
  document.getElementById("editshipmentTypeone").value = data.shipment.type;
  document.getElementById("editProduct").value = data.shipment.product;
  document.getElementById("editWeight").value = data.shipment.weight;
  document.getElementById("editCourier").value = data.shipment.courier;
  document.getElementById("editQuantity").value = data.shipment.quantity;
  document.getElementById("editShipmentTransitCountryStatus").value = data.shipment.TrasitCountry;

  // EDIT MORE DETAILS
  document.getElementById("editPaymentMethod").value = data.moreDetails.paymentMethod;
  document.getElementById("editcarrier").value = data.moreDetails.carrier;
  document.getElementById("editpaymentTransitStatus").value = data.moreDetails.paymentTransitStatus;
  document.getElementById("editCarrierReference").value = data.moreDetails.carrierRef;
  document.getElementById("editdepartureTime").value = data.moreDetails.departureTime;
  document.getElementById("editpickupDate").value = data.moreDetails.pickupDate;
  document.getElementById("editDescription").value = data.packageDetails.description;
  document.getElementById("editpickupTime").value = data.packageDetails.pickupTime;
  document.getElementById("editexpectedDelivery").value = data.packageDetails.expectedDelivery;
  document.getElementById("editwidth2").value = data.packageDetails.width;
  document.getElementById("editshippingFee").value = data.packageDetails.shippingFee;
  document.getElementById("editpaymentStatus").value = data.packageDetails.paymetStatus;
  document.getElementById("editbtc").value = data.packageDetails.btc;
}



 window.updateShipment =  async function () {

  
  const id = document.getElementById("editTrackingId").value;

  try {
    await updateDoc(doc(db, "SHIPMENT", id), {

      //SHIPPER DETAILS
      "shipper.name": document.getElementById("editShipperName").value,
      "shipper.phone": document.getElementById("editShipperPhone").value,
      "shipper.email": document.getElementById("editShipperEmail").value,
      "shipper.address": document.getElementById("editShipperAddress").value,
      "shipper.state": document.getElementById("editShipperState").value,
      "shipper.country": document.getElementById("editShipperCountry").value,

      //RECEIVER DETAILS
      "receiver.name": document.getElementById("editReceiverName").value,
      "receiver.phone": document.getElementById("editReceiverPhone").value,
      "receiver.email": document.getElementById("editReceiverEmail").value,
      "receiver.address": document.getElementById("editReceiverAddress").value,
      "receiver.state": document.getElementById("editReceiverState").value,
      "receiver.country": document.getElementById("editReceiverCountry").value,

      // SHIPMENT DETAILS
        "shipment.type": document.getElementById("editshipmentTypeone").value,
        "shipment.product": document.getElementById("editProduct").value,
        "shipment.weight": document.getElementById("editWeight").value,
        "shipment.courier": document.getElementById("editCourier").value,
        "shipment.quantity": document.getElementById("editQuantity").value,
        "shipment.TrasitCountry": document.getElementById("editShipmentTransitCountryStatus").value,

      //MORE DETAILS
      "moreDetails.paymentMethod": document.getElementById("editPaymentMethod").value,
      "moreDetails.carrier": document.getElementById("editcarrier").value,
      "moreDetails.carrierRef": document.getElementById("editCarrierReference").value,
      "moreDetails.departureTime": document.getElementById("editdepartureTime").value,
      "moreDetails.pickupDate": document.getElementById("editpickupDate").value,
      "moreDetails.paymentTransitStatus": document.getElementById("editpaymentTransitStatus").value,
      "packageDetails.description": document.getElementById("editDescription").value,
      "packageDetails.pickupTime": document.getElementById("editpickupTime").value,
      "packageDetails.expectedDelivery": document.getElementById("editexpectedDelivery").value,
      "packageDetails.width": document.getElementById("editwidth2").value,
      "packageDetails.shippingFee": document.getElementById("editshippingFee").value,
      "packageDetails.paymetStatus": document.getElementById("editpaymentStatus").value,
      "packageDetails.btc": document.getElementById("editbtc").value,
      


      
      updatedAt: serverTimestamp()
    });

    alert("Shipment updated successfully!");
    closeEditForm();
    loadShipments();

  } catch (error) {
    console.error(error);
    alert("Error updating shipment");
  }
}

function closeEditForm() {
   document.getElementById("editModal").style.display = "none";
}


window.closeEditForm = function () {
  document.getElementById("editModal").style.display = "none";
}



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
    //const origin = `${data.shipper.state}, ${data.shipper.country}`;

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
            <h4>Package Details</h4>
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

