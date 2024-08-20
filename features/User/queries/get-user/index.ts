import getRegister from '@/firebase/services/get-register';
import { throwError } from '@/lib/utils';
import { TypeUser } from '@/types/index.type';
import { DocumentSnapshot } from 'firebase/firestore';


export default async function getUser(
  userId: string,
): Promise<TypeUser | void> {
  return await getRegister({
    collection: 'Users',
    document: userId,
    onSuccess,
    onError: throwError,
  });
}

function onSuccess(documentSnapshot: DocumentSnapshot) {
  return documentSnapshot.data();
}