import useBossMaterials from "@/features/bosses/hooks/use-boss-materials";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  bosses,
  DurielOrAndarielMaterials,
  VarshanOrGregoireMaterials,
  ZirOrBeastOfIceMaterials,
} from "@/features/bosses/utils";
import { TypeListenerStatus } from "@/types/index.type";
import { Loader2 } from "lucide-react";

export default function BossCards() {
  const { total, status } = useBossMaterials();
  const varshan = VarshanOrGregoireMaterials(total.malignantHeart);
  const gregoire = VarshanOrGregoireMaterials(total.livingSteel);
  const zir = ZirOrBeastOfIceMaterials(total.exquisiteBlood);
  const beastOfIce = ZirOrBeastOfIceMaterials(total.distilledFear);
  const duriel = DurielOrAndarielMaterials(
    total.mucusSlickEgg,
    total.shardsOfAgony
  );
  const andariel = DurielOrAndarielMaterials(
    total.sandscorchedShackles,
    total.pincushionedDolls
  );
  return (
    <div className="container grid grid-cols-3 gap-y-36 place-items-center px-32">
      <BossCard
        normal={varshan.normal}
        tormented={varshan.tormented}
        src={bosses.varshan.img}
        title={bosses.varshan.name}
        status={status}
      />
      <BossCard
        normal={gregoire.normal}
        tormented={gregoire.tormented}
        src={bosses.gregoire.img}
        title={bosses.gregoire.name}
        status={status}
      />
      <BossCard
        normal={zir.normal}
        tormented={zir.tormented}
        src={bosses.zir.img}
        title={bosses.zir.name}
        status={status}
      />
      <BossCard
        normal={beastOfIce.normal}
        tormented={beastOfIce.tormented}
        src={bosses.beastOfIce.img}
        title={bosses.beastOfIce.name}
        status={status}
      />
      <BossCard
        normal={duriel.normal}
        tormented={duriel.tormented}
        src={bosses.duriel.img}
        title={bosses.duriel.name}
        status={status}
      />
      <BossCard
        normal={andariel.normal}
        tormented={andariel.tormented}
        src={bosses.andariel.img}
        title={bosses.andariel.name}
        status={status}
      />
    </div>
  );
}

function BossCard({
  normal,
  tormented,
  src,
  title,
  status,
}: {
  normal: string;
  tormented: string;
  src: string;
  title: string;
  status: TypeListenerStatus;
}) {
  const loadingNormal = status === 'loading' ? <Loader2 className="animate-spin text-white"/> : normal
  const loadingTormented = status === 'loading' ? <Loader2 className="animate-spin text-white"/> : tormented

  return (
    <Card className="bg-tertiary/70 text-white relative border-0 min-w-80">
      <Image
        src={src}
        alt="Varshan"
        width={320}
        height={320}
        className="absolute -top-[70%] -left-[30%] opacity-70"
      />
      <CardContent className="flex flex-col">
        <CardHeader className="px-0">
          <CardTitle className="text-3xl font-bold text-end relative z-10 drop-shadow-md">
            {title}
          </CardTitle>
        </CardHeader>
        <div className="mt-8">
          <p className="text-lg flex gap-2 items-center">Normal: {loadingNormal}</p>
          <p className="text-lg flex gap-2 items-center">Tormented: {loadingTormented}</p>
        </div>
      </CardContent>
    </Card>
  );
}
