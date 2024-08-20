"use client";
import useBossMaterials from "@/features/bosses/hooks/use-boss-materials";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "../ui/button";
import { useAuth } from "@/features/auth/context";
import UpdateAllMaterials from "@/features/bosses/components/update-all";

export default function Materials() {
  const { profile } = useAuth();
  const { materials, status } = useBossMaterials();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={materials} />
      <div className="flex justify-end mt-2">
        <UpdateAllMaterials />
      </div>
    </div>
  );
}
