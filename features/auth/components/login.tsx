"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import toast from "react-hot-toast";
import signInWithEmailAndPasswordAccount from "../services/sign-in-email";
import { Loader } from "lucide-react";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(500),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    try {
      await signInWithEmailAndPasswordAccount(values.email, values.password);
      router.push("/");
    } catch (error) {
      toast.error("Erro ao logar na conta");
    }
  }

  return (
    <Card className="min-w-96 relative z-10 bg-white/30 border-0">
      <CardHeader className="p-2 px-4">
        <CardTitle className="text-xl">Login</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-2">
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
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      {/* <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >

                      </Link> */}
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="*******"
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
                "Login"
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
