import { db } from "@/firebase/firebase";
import {
  QuerySnapshot,
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export default function listenMaterials(
  onNext: (querySnapshot: QuerySnapshot) => void
) {
  const q = query(
    collectionGroup(db, "boss_materials"),
    orderBy("createdAt", "asc")
  );
  const unsubscribe = onSnapshot(q, onNext);
  return unsubscribe;
}
