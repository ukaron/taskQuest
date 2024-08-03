import { db, auth } from "@/shared/lib/firebaseConfig";
import { query, collection, where, getDocs } from "firebase/firestore";
import { ISettings } from "../models/setting.models";

export const getSettings = async () => {
  try {
    const q = query(
      collection(db, "settings"),
      where("ownerId", "==", auth.currentUser?.uid || "")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))[0] as ISettings;
  } catch (e) {
    console.error("Error querying projects: ", e);
  }
};
