import { bosses_materials } from "@/features/bosses/utils";

export type TypeUser = {
  admin: boolean;
  email: string;
  member: boolean;
  username: string;
  lowercaseUsername: string;
  profilePictureUrl: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
};

export type TypeBossMaterials = {
  id: string;
  userId: string;
  username: string;
  profilePictureUrl: string;
  stygianStone: number;
  malignantHeart: number;
  livingSteel: number;
  exquisiteBlood: number;
  distilledFear: number;
  mucusSlickEgg: number;
  shardsOfAgony: number;
  sandscorchedShackles: number;
  pincushionedDolls: number;
  createdAt: any;
};

export type TypeListenerStatus = "loading" | "error" | "success" | "empty";
export type TypeBossMaterialsName = Omit<
  TypeBossMaterials,
  "id" | "userId" | "username" | "createdAt" | "updatedAt" | "profilePictureUrl"
>;

export type TypeMaterials = (typeof bosses_materials)[number];
