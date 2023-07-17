"use client";
import { AuthLayout } from "@/app/components/AuthLayout";
import { Button } from "@/app/components/Button";
import { TextField } from "@/app/components/Fields";
import { Logo } from "@/app/components/Logo";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";

export default function SignIn() {
  const username = useRef("");
  const password = useRef("");
  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: "",
    });
  };

  return (
    <AuthLayout>
      <div className="flex flex-col">
        <Logo />
        <div className="mt-20">
          <h2 className="text-lg font-semibold text-gray-900">
            Zaloguj się na swoje konto
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Nie masz konta? Skontaktuj się z administratorem.
          </p>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-y-8">
        <TextField
          label="Nazwa użykownika"
          id="username"
          name="username"
          autoComplete="username"
          required
          onChange={(e) => (username.current = e.target.value)}
        />
        <TextField
          label="Hasło"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          onChange={(e) => (password.current = e.target.value)}
        />
        <div>
          <Button
            onClick={onSubmit}
            type="submit"
            variant="solid"
            color="blue"
            className="w-full"
          >
            <span>
              Zaloguj się <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
