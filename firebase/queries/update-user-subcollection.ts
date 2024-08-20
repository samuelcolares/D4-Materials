import { serverTimestamp } from "firebase/firestore";
import updateRegister from "../services/update-register";
import { throwError } from "@/lib/utils";
import { TypeBossMaterials } from "@/types/index.type";

export async function updateUserSubcollection({
  docId,
  userId,
  content,
  subcollection,
}: {
  docId: string;
  userId: string;
  content: Partial<TypeBossMaterials>;
  subcollection: "boss_materials";
}): Promise<void> {
  return await updateRegister({
    collection: `Users/${userId}/${subcollection}`,
    doc: docId,
    content: { ...content, updatedAt: serverTimestamp() },
  }).catch(throwError);
}
