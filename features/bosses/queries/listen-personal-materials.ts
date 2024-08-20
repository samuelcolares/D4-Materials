import { db } from "@/firebase/firebase";
import {
  QuerySnapshot,
  collection,
  collectionGroup,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export default function listenPersonalMaterials(
  userId: string,
  onNext: (querySnapshot: QuerySnapshot) => void
) {
  const q = query(
    collection(db, `Users/${userId}/boss_materials`),
    where("userId", "==", userId),
    limit(1),
  );
  const unsubscribe = onSnapshot(q, onNext);
  return unsubscribe;
}
