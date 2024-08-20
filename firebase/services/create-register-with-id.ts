import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { throwError } from "@/lib/utils";

type createRegisterType = {
  collection: string;
  id: string;
  content: object;
};

export default async function createRegisterWithSpecificId({
  collection,
  id,
  content,
}: createRegisterType){
  return await setDoc(doc(db, collection, id), content)
    .then(onSuccess)
    .catch(throwError);

  function onSuccess() {
    return id;
  }
}
