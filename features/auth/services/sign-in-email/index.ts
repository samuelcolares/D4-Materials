import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function signInWithEmailAndPasswordAccount(
  userEmail: string,
  userPassword: string
) {
  return await signInWithEmailAndPassword(auth, userEmail, userPassword);
}
