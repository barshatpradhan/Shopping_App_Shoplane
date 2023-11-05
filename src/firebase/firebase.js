import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBkTIQoPBvKVvuGenloYVMLZ3on6zkJq0c",
  authDomain: "shoplane-app-9d6c1.firebaseapp.com",
  projectId: "shoplane-app-9d6c1",
  storageBucket: "shoplane-app-9d6c1.appspot.com",
  messagingSenderId: "821037868810",
  appId: "1:821037868810:web:dd6f756aa9d0225dcd7cf3",
  measurementId: "G-M903FMKQVX",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
