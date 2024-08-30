import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAGhXv14A0-J1N3MbUA0_XIox6W0lmJ0ro",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "echessa-98596",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "com.testapp"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };