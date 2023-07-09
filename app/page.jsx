import Head from "next/head";
import Link from "next/link";

import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { Logo } from "@/components/Logo";

export default function Login() {
  return (
    <>
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
        <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Login"
            id="login"
            name="login"
            autoComplete="login"
            required
          />
          <TextField
            label="Hasło"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div>
            <Button
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
        </form>
      </AuthLayout>
    </>
  );
}
