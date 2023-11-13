import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaUWjN2StIrrxEi36JQjyApurjp9MjdHc",
  authDomain: "gymspace-d93d8.firebaseapp.com",
  projectId: "gymspace-d93d8",
  storageBucket: "gymspace-d93d8.appspot.com",
  messagingSenderId: "837443003129",
  appId: "1:837443003129:web:1a248a148aa4fd973d7828",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage, app as default };
