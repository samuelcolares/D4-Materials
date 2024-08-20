import {
  getDoc,
  doc,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

type TypeGetRegister = {
  collection: string;
  document: string;
  onSuccess: (data: DocumentSnapshot | QueryDocumentSnapshot) => any;
  onError: (error: Error) => void;
};

export default async function getRegister({
  collection,
  document,
  onSuccess,
  onError,
}: TypeGetRegister) {
  const docRef = doc(db, collection, document);
  const docSnap = getDoc(docRef);

  return await docSnap.then(onSuccess).catch(onError);
}
