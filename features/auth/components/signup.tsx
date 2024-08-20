"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useRouter } from "next/navigation";
import createProfile from "@/features/User/queries/create-profile";
import toast from "react-hot-toast";
import { useAuth } from "../context";
import signUpWithEmailAndPassword from "../services/sign-up-email";
import { Loader } from "lucide-react";

export const SignupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(500),
});

export function SignupForm() {
  const router = useRouter();
  const { setProfile } = useAuth();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    try {
      const { user } = await signUpWithEmailAndPassword(
        values.email,
        values.password
      );

      const profile = await toast.promise(
        createProfile({ user, formEmail: values.email }),
        {
          error: "Erro ao criar conta",
          loading: "Criando sua conta...",
          success: "Conta criada!",
        }
      );
      if (profile) setProfile(profile);
      router.push("/");
    } catch (error) {}
  }

  return (
    <Card className="min-w-96 relative z-10 bg-white/30 border-0">
      <CardHeader>
        <CardTitle className="text-2xl">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin w-4 h-4" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Create"
              )}
            </Button>

            {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
