import z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/context";
import { useEffect } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypeUser } from "@/types/index.type";
import toast from "react-hot-toast";
import { updateUser } from "@/firebase/queries/update-user";

const updateProfileSchema = z.object({
  username: z.string().min(3),
  profilePictureUrl: z.string().url(),
});

export const SettingsForm = ({
  closeCredenza,
}: {
  closeCredenza: () => void;
}) => {
  const { profile, setProfile } = useAuth();
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
  });

  const { setValue, watch } = form;
  const imgUrl = watch("profilePictureUrl");

  useEffect(() => {
    if (!profile) return;
    setValue("profilePictureUrl", profile.profilePictureUrl);
    setValue("username", profile.username);
  }, [profile, setValue]);

  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    try {
      if (!profile) throw Error("Profile not found");
      const content: Pick<TypeUser, "username" | "profilePictureUrl"> = {
        username: values.username.trim(),
        profilePictureUrl: values.profilePictureUrl,
      };

      toast.promise(
        updateUser({
          content,
          userId: profile.userId,
        }),
        {
          error: "Error to update",
          loading: "Updating...",
          success: `Profile updated`,
        }
      );

      setProfile({
        ...profile,
        ...content,
      });
      return closeCredenza();
    } catch (error) {
      console.log("Erro ao atualizar materiais", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="profilePictureUrl"
          render={({ field }) => (
            <FormItem className="grid gap-0">
              <div className="flex justify-center flex-col gap-1 items-center">
                <Avatar className="object-cover w-32 h-32">
                  <AvatarFallback>U</AvatarFallback>
                  <AvatarImage src={imgUrl} className="object-cover" />
                </Avatar>
                <FormLabel>Profile Picture</FormLabel>
              </div>
              <FormControl>
                <Input {...field} id="profilePictureUrl" />
              </FormControl>
              <FormDescription className="!mt-0 px-1">
                Paste a url from imgur.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grid gap-0">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} id="username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Update
        </Button>
      </form>
    </Form>
  );
};
