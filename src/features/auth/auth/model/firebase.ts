import { auth } from "@/shared/lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { TelegramAuthResult } from "../hooks/useTelegramAuth";

export async function authorizeOrRegisterFirebaseUser(
  user: TelegramAuthResult
) {
  const email = `${user.id}@telegram-user.com`;
  const password = `tg_${user.id}`;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("token", await userCredential.user?.getIdToken?.());
    return userCredential;
  } catch (error: any) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    updateProfile(userCredential.user, {
      displayName: user.first_name,
      photoURL: user.photo_url,
    });
    localStorage.setItem("token", await userCredential.user.getIdToken());
    await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  }
}
