import { createRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { rootRoute } from "../../app/_router";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/shared/lib/firebaseConfig";
import { Button } from "@/shared/ui/button";

export const authRoute: any = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});

export function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div>
      <h1>Authentication</h1>
      {user ? (
        <div>
          <p>Signed in as {user.email}</p>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              signOut(auth);
            }}
          >
            Log out
          </Button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={signUp}>Sign Up</button>
          <button onClick={signIn}>Sign In</button>
        </div>
      )}
    </div>
  );
}
