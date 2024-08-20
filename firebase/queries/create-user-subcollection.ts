import { TypeBossMaterials } from "@/types/index.type";
import { serverTimestamp } from "firebase/firestore";
import createRegisterWithSpecificId from "../services/create-register-with-id";
import { throwError } from "@/lib/utils";

export async function createUserSubcollection({
  subcollection,
  userId,
  content,
  subcollectionId,
}: {
  subcollection: "boss_materials";
  userId: string;
  content: Partial<TypeBossMaterials>;
  subcollectionId: "materials";
}) {
  try {
    const document = {
      ...content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    return await createRegisterWithSpecificId({
      collection: `Users/${userId}/${subcollection}`,
      id: subcollectionId,
      content: document,
    });
  } catch (error) {
    throwError(error);
  }
}
