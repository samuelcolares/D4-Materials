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
import { UpdateAllForm } from "./form";
import { useAuth } from "@/features/auth/context";

export default function UpdateAllMaterials() {
  const [open, setOpen] = React.useState(false);
  const closeCredenza = () => setOpen(false);
  const { profile } = useAuth();
  if (!profile?.member) return null;
  return (
    <Credenza onOpenChange={(x: boolean) => setOpen(x)} open={open}>
      <CredenzaTrigger asChild>
        <Button>Update</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Update all materials</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <UpdateAllForm closeCredenza={closeCredenza} />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
