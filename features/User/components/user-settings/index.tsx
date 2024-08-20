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
import { SettingsForm } from "./form";

export default function Settings() {
  const [open, setOpen] = React.useState(false);
  const closeCredenza = () => setOpen(false);
  const { profile } = useAuth();
  const disabled = !profile;
  return (
    <Credenza onOpenChange={(x: boolean) => setOpen(x)} open={open}>
      <CredenzaTrigger asChild>
        <Button
          variant={"ghost"}
          className="cursor-pointer w-full h-auto justify-start px-1"
          disabled={disabled}
        >
          Settings
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="lg:min-w-60 lg:max-w-72">
        <CredenzaHeader>
          <CredenzaTitle>Settings</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <SettingsForm closeCredenza={closeCredenza} />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
