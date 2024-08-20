import { serverTimestamp } from "firebase/firestore";
import updateRegister from "../services/update-register";
import { throwError } from "@/lib/utils";
import { TypeUser } from "@/types/index.type";

export async function updateUser({
  userId,
  content,
}: {
  userId: string;
  content: Pick<TypeUser, "username" | "profilePictureUrl">;
}): Promise<void> {
  try {
    await updateRegister({
      collection: `Users/${userId}/boss_materials`,
      doc: "materials",
      content: { ...content, updatedAt: serverTimestamp() },
    });
    await updateRegister({
      collection: `Users`,
      doc: userId,
      content: {
        ...content,
        updatedAt: serverTimestamp(),
        lowercaseUsername: content.username.toLowerCase(),
      },
    });
    return;
  } catch (error) {
    console.log(error);
    throwError(error);
  }
}
