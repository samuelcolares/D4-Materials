import {
  TypeBossMaterials,
  TypeBossMaterialsName,
  TypeListenerStatus,
} from "@/types/index.type";
import { useEffect, useMemo, useState } from "react";
import listenMaterials from "../queries/listen-materials";
import { QuerySnapshot } from "firebase/firestore";
import { generateBossesMaterialsFromFirestore } from "../service/generators/firestore-generators";
import { bosses_materials } from "../utils";

const useBossMaterials = () => {
  const [materials, setMaterials] = useState<TypeBossMaterials[]>([]);
  const [status, setStatus] = useState<TypeListenerStatus>("loading");

  useEffect(() => {
    const unsubscribe = listenMaterials((data) => {
      try {
        const changes = generateBossesMaterialsFromFirestore(data);
        if (changes.length === 0) setStatus("empty");
        if (changes.length > 0) setStatus("success");
        setMaterials(changes);
      } catch (error) {
        setStatus("error");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const sum = useMemo(() => {
    return calcTotalForDataProps(materials, MATERIALS) as TypeBossMaterialsName;
  }, [materials]);

  const withTotal = useMemo(() => {
    const total = {
      id: "total",
      userId: "total",
      username: "Total",
      profilePictureUrl: "",
      createdAt: { seconds: 999999999999999, nanoseconds: 0 },
      ...sum,
    } as TypeBossMaterials;

    return [...materials, total];
  }, [materials, sum]);

  return { materials: withTotal, status, total: sum };
};

export default useBossMaterials;

const MATERIALS: (keyof TypeBossMaterials)[] = [...bosses_materials]

function calcTotalForDataProps(
  data: TypeBossMaterials[],
  props: (keyof TypeBossMaterials)[]
) {
  return data.reduce(
    (acc, curr) =>
      Object.fromEntries(props.map((k) => [k, (acc[k] || 0) + curr[k]])),
    {} as Partial<Record<keyof TypeBossMaterials, number>>
  );
}
