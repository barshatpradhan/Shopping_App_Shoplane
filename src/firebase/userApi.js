import { Firestore, collection, doc, getDoc } from "firebase/firestore";

export async function fetchUserData(uid) {
  try {
    const userDocRef = doc(Firestore, "users", uid); 
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("User document not found.");
      return null; 
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

