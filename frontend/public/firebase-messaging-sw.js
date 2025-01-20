importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDF9c7DGTp5kS2QscpkI-Yyv5XPq5_A704",
    authDomain: "push-notification-97a83.firebaseapp.com",
    projectId: "push-notification-97a83",
    storageBucket: "push-notification-97a83.firebasestorage.app",
    messagingSenderId: "864707232579",
    appId: "1:864707232579:web:0763af578f08dade6a25f6",
    measurementId: "G-BV97JJT06Z"
  };

  console.log("Firebase messaging service worker loaded!");
  
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || '/default-icon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});