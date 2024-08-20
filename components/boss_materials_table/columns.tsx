"use client";

import { TypeBossMaterials } from "@/types/index.type";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ImageComponent from "../ui/image-component";
import UpdateSingleMaterial from "@/features/bosses/components/update-single/update-single";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<TypeBossMaterials>[] = [
  {
    accessorKey: "username",
    header: () => <p></p>,
    cell: ({ row }) => {
      const user = row.original.username;
      const profilePictureUrl = row.original.profilePictureUrl;
      return (
        <div className="flex flex-col items-center justify-center gap-1">
          {user !== "Total" && (
            <Avatar className="h-12 w-12">
              <AvatarFallback>{user[0]}</AvatarFallback>
              <AvatarImage
                src={profilePictureUrl}
                alt={user}
                className="object-cover"
              />
            </Avatar>
          )}
          <p className="text-">{user}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "Malignant Heart",
    header: () => (
      <UpdateSingleMaterial material="malignantHeart" title="Malignant Heart" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-center text-lg">{row.original.malignantHeart}</p>
      );
    },
  },
  {
    accessorKey: "Living Steel",
    header: () => (
      <UpdateSingleMaterial material="livingSteel" title="Living Steel" />
    ),
    cell: ({ row }) => {
      return <p className="text-center text-lg">{row.original.livingSteel}</p>;
    },
  },
  {
    accessorKey: "Exquisite Blood",
    header: () => (
      <UpdateSingleMaterial material="exquisiteBlood" title="Exquisite Blood" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-center text-lg">{row.original.exquisiteBlood}</p>
      );
    },
  },
  {
    accessorKey: "Distilled Fear",
    header: () => (
      <UpdateSingleMaterial material="distilledFear" title="Distilled Fear" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-center text-lg">{row.original.distilledFear}</p>
      );
    },
  },
  {
    accessorKey: "Mucus-Slick Egg",
    header: () => (
      <UpdateSingleMaterial material="mucusSlickEgg" title="Mucus-Slick Egg" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-center text-lg">{row.original.mucusSlickEgg}</p>
      );
    },
  },
  {
    accessorKey: "Shards Of Agony",
    header: () => (
      <UpdateSingleMaterial material="shardsOfAgony" title="Shards Of Agony" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-center text-lg">{row.original.shardsOfAgony}</p>
      );
    },
  },
  {
    accessorKey: "Sandscorched Shackles",
    header: () => (
      <UpdateSingleMaterial
        material="sandscorchedShackles"
        title="Sandscorched Shackles"
      />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-center text-lg">
          {row.original.sandscorchedShackles}
        </p>
      );
    },
  },
  {
    accessorKey: "pincushionedDolls",
    header: () => (
      <UpdateSingleMaterial
        material="pincushionedDolls"
        title="Pincushioned Dolls"
      />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-center text-lg">{row.original.pincushionedDolls}</p>
      );
    },
  },
  {
    accessorKey: "stygianStone",
    header: () => (
      <UpdateSingleMaterial material="stygianStone" title="Stygian Stone" />
    ),
    cell: ({ row }) => {
      return <p className="text-center text-lg">{row.original.stygianStone}</p>;
    },
  },
];
