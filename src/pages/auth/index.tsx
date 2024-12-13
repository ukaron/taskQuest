import { createRoute, useNavigate } from "@tanstack/react-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect } from "react";
import { rootRoute } from "../../app/_router";

import { auth } from "@/shared/lib/firebaseConfig";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const authRoute: any = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function AuthPage() {
  const navigator = useNavigate();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { handleSubmit, control, getValues } = form;

  const signUp = async () => {
    try {
      const { email, password } = getValues();
      if (!email.length || !password.length) return;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      navigator({ to: "../" });
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    email,
    password,
  }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      navigator({ to: "../" });
    } catch (error) {
      console.dir("Error signing in: ", error);
      toast.error("unknown user");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) navigator({ to: `/` });

    onAuthStateChanged(auth, () => {
      navigator({ to: "../" });
    });
  }, []);

  return (
    <div>
      <Card className="w-full max-w-sm">
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-white p-8 rounded shadow-md flex flex-col gap-2"
          >
            <CardHeader>
              <CardTitle className="text-2xl">Вход</CardTitle>
              <CardDescription>
                Введите свой адрес электронной почты ниже, чтобы войти в свою
                учетную запись.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="grid gap-3">
                          <Input
                            {...field}
                            id="Emanil"
                            autoComplete="email"
                            type="text"
                            required
                            className="w-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <div className="grid gap-3">
                          <Input
                            {...field}
                            id="Emanil"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Войти
              </Button>
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={signUp}
              >
                Зарегистрироваться
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
