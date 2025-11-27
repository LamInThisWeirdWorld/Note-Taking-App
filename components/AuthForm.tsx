"use client";

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction, sendMagicLink } from "@/app/action/user";

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    console.log("handleSubmit called aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      console.log("Form Data:", { email, password });

      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        console.log(email);
        title = "Logged in";
        description = "You have successfully logged in.";
      } else {
        errorMessage = (await signUpAction(email, password)).errorMessage;
        console.log(email);
        title = "Signed up";
        description = "Check your email for confirmation link.";
      }

      if (!errorMessage) {
        toast.success(title!, { description });
        router.replace("/");
      } else {
        toast.error("Error: " + errorMessage);
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>

      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>

      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>

        <p>
          {isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
