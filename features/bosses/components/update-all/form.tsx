import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePersonalBossesMaterials from "../../hooks/use-personal-boss-materials";
import { useEffect } from "react";
import { TypeBossMaterials } from "@/types/index.type";
import { updateUserSubcollection } from "@/firebase/queries/update-user-subcollection";
import { useAuth } from "@/features/auth/context";
import toast from "react-hot-toast";
import { createUserSubcollection } from "@/firebase/queries/create-user-subcollection";
import ImageComponent from "@/components/ui/image-component";

const ErrorMessage = "Min value is 0";

const UpdateAllMaterialsSchema = z.object({
  stygianStone: z.coerce.number().gte(0, { message: ErrorMessage }),
  malignantHeart: z.coerce.number().gte(0, { message: ErrorMessage }),
  livingSteel: z.coerce.number().gte(0, { message: ErrorMessage }),
  exquisiteBlood: z.coerce.number().gte(0, { message: ErrorMessage }),
  distilledFear: z.coerce.number().gte(0, { message: ErrorMessage }),
  mucusSlickEgg: z.coerce.number().gte(0, { message: ErrorMessage }),
  shardsOfAgony: z.coerce.number().gte(0, { message: ErrorMessage }),
  sandscorchedShackles: z.coerce.number().gte(0, { message: ErrorMessage }),
  pincushionedDolls: z.coerce.number().gte(0, { message: ErrorMessage }),
});

export const UpdateAllForm = ({
  closeCredenza,
}: {
  closeCredenza: () => void;
}) => {
  const { personalMaterials } = usePersonalBossesMaterials();
  const { profile } = useAuth();
  const form = useForm<z.infer<typeof UpdateAllMaterialsSchema>>({
    resolver: zodResolver(UpdateAllMaterialsSchema),
    defaultValues: {
      stygianStone: personalMaterials?.stygianStone ?? 0,
      malignantHeart: personalMaterials?.malignantHeart ?? 0,
      livingSteel: personalMaterials?.livingSteel ?? 0,
      exquisiteBlood: personalMaterials?.exquisiteBlood ?? 0,
      distilledFear: personalMaterials?.distilledFear ?? 0,
      mucusSlickEgg: personalMaterials?.mucusSlickEgg ?? 0,
      shardsOfAgony: personalMaterials?.shardsOfAgony ?? 0,
      sandscorchedShackles: personalMaterials?.sandscorchedShackles ?? 0,
      pincushionedDolls: personalMaterials?.pincushionedDolls ?? 0,
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (!personalMaterials) return;
    setValue("stygianStone", personalMaterials.stygianStone);
    setValue("malignantHeart", personalMaterials.malignantHeart);
    setValue("livingSteel", personalMaterials.livingSteel);
    setValue("exquisiteBlood", personalMaterials.exquisiteBlood);
    setValue("distilledFear", personalMaterials.distilledFear);
    setValue("mucusSlickEgg", personalMaterials.mucusSlickEgg);
    setValue("shardsOfAgony", personalMaterials.shardsOfAgony);
    setValue("sandscorchedShackles", personalMaterials.sandscorchedShackles);
    setValue("pincushionedDolls", personalMaterials.pincushionedDolls);
  }, [personalMaterials, setValue]);

  async function onSubmit(values: z.infer<typeof UpdateAllMaterialsSchema>) {
    try {
      if (!profile) throw Error("Profile not found");
      const content: Partial<TypeBossMaterials> = {
        ...values,
      };

      if (!personalMaterials) {
        return toast.promise(
          createUserSubcollection({
            content: {
              ...content,
              username: profile.username,
              profilePictureUrl: profile.profilePictureUrl,
              userId: profile.userId,
            },
            subcollection: "boss_materials",
            subcollectionId: "materials",
            userId: profile.userId,
          }),
          {
            error: "Erro ao atualizar materiais",
            loading: "Atualizando materiais...",
            success: "Materiais atualizados!",
          }
        );
      }

      toast.promise(
        updateUserSubcollection({
          content,
          subcollection: "boss_materials",
          userId: profile.userId,
          docId: personalMaterials.id,
        }),
        {
          error: "Erro ao atualizar materiais",
          loading: "Atualizando materiais...",
          success: "Materiais atualizados!",
        }
      );
      return closeCredenza();
    } catch (error) {
      console.log("Erro ao atualizar materiais", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-3 items-end">
          <FormField
            control={form.control}
            name="stygianStone"
            render={({ field }) => (
              <FormItem className="grid gap-0">
                <FormLabel asChild>
                  <ImageComponent
                    src="https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/stygian-stone-160x160.webp?alt=media&token=7312beef-e1c4-402d-8369-0dea41f22022"
                    alt="stygian stone"
                  />
                </FormLabel>
                <FormControl>
                  <Input {...field} step={1} id="stygianStone" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="malignantHeart"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel asChild>
                  <ImageComponent
                    src="https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/malignant-heart-160x160.webp?alt=media&token=2b34db14-b817-430b-b7a6-8cb1d418d47e"
                    alt="Malignant Heart"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    step={1}
                    id="malignantHeart"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="livingSteel"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel asChild>
                  <ImageComponent
                    src="https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/living-steel-160x160.webp?alt=media&token=2b8188a5-8daa-43ea-a36f-fd7a3dae803c"
                    alt="Living Steel"
                  />
                </FormLabel>
                <FormControl>
                  <Input {...field} step={1} id="livingSteel" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3 items-end">
          <FormField
            control={form.control}
            name="exquisiteBlood"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel asChild>
                  <ImageComponent
                    src="https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/exquisite-blood-160x160.webp?alt=media&token=b8e77a21-14fb-4f11-9dbb-f2b8b0bd138b"
                    alt="Exquisite Blood"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    step={1}
                    id="exquisiteBlood"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="distilledFear"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel asChild>
                  <ImageComponent
                    src="https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/distilled-fear-160x160.webp?alt=media&token=2cc3641b-d917-46c5-b0d6-8514ea409089"
                    alt="Distilled Fear"
                  />
                </FormLabel>
                <FormControl>
                  <Input {...field} step={1} id="distilledFear" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mucusSlickEgg"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel asChild>
                  <ImageComponent
                    src="https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/mucus-slick-egg-160x160.webp?alt=media&token=d963eebc-222e-4f25-96e6-814801a5b391"
                    alt="Mucus-Slick Egg"
                  />
                </FormLabel>
                <FormControl>
                  <Input {...field} step={1} id="mucusSlickEgg" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3 items-end">
          <FormField
            control={form.control}
            name="shardsOfAgony"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel asChild>
                  <ImageComponent
                    src="https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/shard-of-agony-160x160.webp?alt=media&token=f5721ef9-c53e-4b60-8c13-a460304d4b01"
                    alt="Shards Of Agony"
                  />
                </FormLabel>
                <FormControl>
                  <Input {...field} step={1} id="shardsOfAgony" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sandscorchedShackles"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel asChild>
                  <ImageComponent
                    src="https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/sandscorched-shackles-160x160.webp?alt=media&token=09306eaa-164b-40b3-a1a7-79dcbafb8d4f"
                    alt="Sandscorched Shackles"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    step={1}
                    id="sandscorchedShackles"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincushionedDolls"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel asChild>
                  <ImageComponent
                    src="https://firebasestorage.googleapis.com/v0/b/cmd4-18f0e.appspot.com/o/pincushioned-doll-160x160.webp?alt=media&token=4d14a01d-344f-4e2a-95f3-1ab7e20c2944"
                    alt="Pincushioned Dolls"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    step={1}
                    id="pincushionedDolls"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Update all
        </Button>
      </form>
    </Form>
  );
};
