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
import { TypeBossMaterials, TypeMaterials } from "@/types/index.type";
import { updateUserSubcollection } from "@/firebase/queries/update-user-subcollection";
import { useAuth } from "@/features/auth/context";
import toast from "react-hot-toast";
import { createUserSubcollection } from "@/firebase/queries/create-user-subcollection";
import ImageComponent from "@/components/ui/image-component";
import { materialsImg } from "../../utils";

const ErrorMessage = "Min value is 0";

const UpdateAllMaterialsSchema = z.object({
  material: z.coerce.number().gte(0, { message: ErrorMessage }),
});

export const UpdateSingleForm = ({
  closeCredenza,
  materialDefaultValue,
  title,
  material,
}: {
  materialDefaultValue: number;
  closeCredenza: () => void;
  title: string;
  material: TypeMaterials;
}) => {
  const { profile } = useAuth();
  const form = useForm<z.infer<typeof UpdateAllMaterialsSchema>>({
    resolver: zodResolver(UpdateAllMaterialsSchema),
    defaultValues: {
      material: materialDefaultValue,
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateAllMaterialsSchema>) {
    try {
      if (!profile) throw Error("Profile not found");
      const content: Partial<TypeBossMaterials> = {
        [material]: values.material,
      };

      toast.promise(
        updateUserSubcollection({
          content,
          subcollection: "boss_materials",
          userId: profile.userId,
          docId: "materials",
        }),
        {
          error: "Error to update",
          loading: "Updating...",
          success: `${title} updated`,
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
        <FormField
          control={form.control}
          name="material"
          render={({ field }) => (
            <FormItem className="grid gap-0">
              <FormLabel asChild>
                <ImageComponent src={materialsImg[material]} alt={material} />
              </FormLabel>
              <FormControl>
                <Input {...field} step={1} id="material" type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Update {title}
        </Button>
      </form>
    </Form>
  );
};
