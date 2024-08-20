import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";

export function generateBossesMaterialsFromFirestore(querySnapshot: QuerySnapshot) {
  const materials: TypeBossMaterials[] = [];
  querySnapshot.docs.forEach((doc) => {
    const data = generateMaterialsFromFirestore(doc);
    materials.push(data);
  });
  return materials;
}

export function generateMaterialsFromFirestore(
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
) {
  const data = doc.data();

  return {
    id: doc.id,
    userId: data.userId,
    username: data.username,
    profilePictureUrl: data.profilePictureUrl,
    distilledFear: data.distilledFear,
    exquisiteBlood: data.exquisiteBlood,
    livingSteel: data.livingSteel,
    malignantHeart: data.malignantHeart,
    mucusSlickEgg: data.mucusSlickEgg,
    pincushionedDolls: data.pincushionedDolls,
    sandscorchedShackles: data.sandscorchedShackles,
    shardsOfAgony: data.shardsOfAgony,
    stygianStone: data.stygianStone,
    createdAt: data.createdAt,
  };
}