import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import React from "react";

import { useAuth } from "@/features/auth/context";
import { UpdateSingleForm } from "./form";
import ImageComponent from "@/components/ui/image-component";
import { TypeMaterials } from "@/types/index.type";
import { materialsImg } from "../../utils";
import usePersonalBossesMaterials from "../../hooks/use-personal-boss-materials";
import { cn } from "@/lib/utils";

export default function UpdateSingleMaterial({
  material,
  title,
}: {
  material: TypeMaterials;
  title: string;
}) {
  const [open, setOpen] = React.useState(false);
  const closeCredenza = () => setOpen(false);
  const { profile } = useAuth();
  const { personalMaterials } = usePersonalBossesMaterials();
  const disabled = !personalMaterials || !profile?.member;
  return (
    <Credenza onOpenChange={(x: boolean) => setOpen(x)} open={open}>
      <CredenzaTrigger asChild>
        <Button
          disabled={disabled}
          variant={"ghost"}
          className={cn(
            "p-0 hover:bg-transparent w-full h-full mx-auto items-center",
            !disabled && "cursor-pointer"
          )}
        >
          <ImageComponent src={materialsImg[material]} alt={material} />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="lg:min-w-60 lg:max-w-72">
        <CredenzaHeader>
          <CredenzaTitle>Update {title}</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <UpdateSingleForm
            title={title}
            closeCredenza={closeCredenza}
            materialDefaultValue={
              personalMaterials ? personalMaterials[material] : 0
            }
            material={material}
          />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
