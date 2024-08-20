import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function signUpWithEmailAndPassword(
  userEmail: string,
  userPassword: string
) {
  return await createUserWithEmailAndPassword(
    auth,
    userEmail,
    userPassword
  ).then((data) => data);
}
