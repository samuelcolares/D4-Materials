import { TypeMaterials } from "@/types/index.type";

export function VarshanOrGregoireMaterials(material: number) {
  const normal = (material / 5).toFixed(1);
  const tormented = (material / 15).toFixed(1);
  const upToNext = 15 - (material % 15);
  const decimalGTE5 = firstDecimalGTE5(tormented);

  return {
    normal: `${normal}x`,
    tormented: decimalGTE5
      ? `${tormented}x (up to next: ${upToNext})`
      : `${tormented}x`,
  };
}

export function ZirOrBeastOfIceMaterials(material: number) {
  const normal = (material / 9).toFixed(1);
  const tormented = (material / 27).toFixed(1);
  const upToNext = 27 - (material % 27);
  const decimalGTE5 = firstDecimalGTE5(tormented);

  return {
    normal: `${normal}x`,
    tormented: decimalGTE5
      ? `${tormented}x (up to next: ${upToNext})`
      : `${tormented}x`,
  };
}

export function firstDecimalGTE5(x: string) {
  const [_, decimal] = x.split(".");
  const decimalNumber = Number(decimal);
  return decimalNumber >= 5;
}

export function DurielOrAndarielMaterials(
  material1: number,
  material2: number
) {
  const compareNormal = Math.floor(
    Math.max(0, Math.min(material1, material2) / 2)
  );
  const compareTormented = Math.floor(
    Math.max(0, Math.min(material1, material2) / 6)
  );
  return {
    normal: `${compareNormal}x`,
    tormented: `${compareTormented}x`,
  };
}

export const bosses = {
  varshan: {
    img: "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/varshan.webp?alt=media&token=e4df5068-cb69-4096-a16c-a27d013b536e",
    name: "Varshan",
  },
  gregoire: {
    img: "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/gregoire.png?alt=media&token=fa84baab-3a4c-462c-a78d-7e5d226e57e8",
    name: "Gregoire",
  },
  zir: {
    img: "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/zir.png?alt=media&token=736e8123-327b-424a-9964-7471ccb1ef61",
    name: "Zir",
  },
  beastOfIce: {
    img: "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/ice_beast.png?alt=media&token=c325e696-78fb-49d0-b89d-33b43d11ee34",
    name: "Beast of Ice",
  },
  duriel: {
    img: "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/duriel.png?alt=media&token=6e2706d5-ef7e-411a-aeb8-2451583f7b28",
    name: "Duriel",
  },
  andariel: {
    img: "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/varshan.webp?alt=media&token=e4df5068-cb69-4096-a16c-a27d013b536e",
    name: "Andariel",
  },
};

export const bosses_materials = [
  "stygianStone",
  "malignantHeart",
  "livingSteel",
  "exquisiteBlood",
  "distilledFear",
  "mucusSlickEgg",
  "shardsOfAgony",
  "sandscorchedShackles",
  "pincushionedDolls",
] as const;

export const materialsImg: Record<TypeMaterials, string> = {
  malignantHeart:
    "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/malignant-heart-160x160.webp?alt=media&token=2b34db14-b817-430b-b7a6-8cb1d418d47e",
  livingSteel:
    "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/living-steel-160x160.webp?alt=media&token=2b8188a5-8daa-43ea-a36f-fd7a3dae803c",
  exquisiteBlood:
    "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/exquisite-blood-160x160.webp?alt=media&token=b8e77a21-14fb-4f11-9dbb-f2b8b0bd138b",
  distilledFear:
    "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/distilled-fear-160x160.webp?alt=media&token=2cc3641b-d917-46c5-b0d6-8514ea409089",
  mucusSlickEgg:
    "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/mucus-slick-egg-160x160.webp?alt=media&token=d963eebc-222e-4f25-96e6-814801a5b391",
  shardsOfAgony:
    "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/shard-of-agony-160x160.webp?alt=media&token=f5721ef9-c53e-4b60-8c13-a460304d4b01",
  sandscorchedShackles:
    "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/sandscorched-shackles-160x160.webp?alt=media&token=09306eaa-164b-40b3-a1a7-79dcbafb8d4f",
  pincushionedDolls:
    "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/pincushioned-doll-160x160.webp?alt=media&token=4d14a01d-344f-4e2a-95f3-1ab7e20c2944",
  stygianStone:
    "https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/stygian-stone-160x160.webp?alt=media&token=7312beef-e1c4-402d-8369-0dea41f22022",
};
