import createRegisterWithSpecificId from "@/firebase/services/create-register-with-id";
import { throwError } from "@/lib/utils";
import { TypeUser } from "@/types/index.type";
import { User } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";

type createProfileType = {
  user: User;
  formEmail: string;
};

export default async function createProfile({
  user,
  formEmail,
}: createProfileType) {
  const content = generateProfile(user, formEmail);

  const params = {
    collection: "Users",
    id: user.uid,
    content,
  };

  try {
    const userId = await createRegisterWithSpecificId(params);
    if (!userId) throw Error("No userId");
    return onSuccessAddUserId(userId, content);
  } catch (error) {
    throwError(error);
  }
}

function generateProfile(user: User, formEmail: string): TypeUser {
  const { uid, photoURL, email } = user;
  return {
    userId: uid,
    member: false,
    username: formEmail,
    lowercaseUsername: formEmail,
    email: email ?? formEmail,
    admin: false,
    profilePictureUrl: photoURL ?? "https://i.imgur.com/e8KF0zl.png",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

function onSuccessAddUserId(userId: string, content: TypeUser) {
  return { ...content, userId } as TypeUser;
}
