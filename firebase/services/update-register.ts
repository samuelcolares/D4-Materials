import { throwError } from "@/lib/utils";
import { db } from "../firebase";

import {
  collection as firebaseCollection,
  updateDoc,
  doc as firebaseDocument,
} from "firebase/firestore";

export default async function updateRegister({
  collection,
  doc,
  content,
}: {
  collection: string;
  doc: string;
  content: object;
}): Promise<void> {
  try {
    const docRef = await updateDoc(
      firebaseDocument(firebaseCollection(db, collection), doc),
      content
    );
    return docRef;
  } catch (error) {
    throwError(error);
  }
}
