import { TypeBossMaterials, TypeListenerStatus } from "@/types/index.type";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context";
import listenPersonalMaterials from "../queries/listen-personal-materials";
import { generateMaterialsFromFirestore } from "../service/generators/firestore-generators";

const usePersonalBossesMaterials = () => {
  const [materials, setMaterials] = useState<TypeBossMaterials | undefined>(
    undefined
  );
  const [status, setStatus] = useState<TypeListenerStatus>("loading");
  const { profile } = useAuth();
  useEffect(() => {
    if (!profile) return;
    const unsubscribe = listenPersonalMaterials(profile.userId, (data) => {
      try {
        const changes = generateMaterialsFromFirestore(data.docs[0]);
        if (!!changes) setStatus("success");
        setMaterials(changes);
      } catch (error) {
        setStatus("error");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [profile]);

  return { personalMaterials: materials, status };
};

export default usePersonalBossesMaterials;
