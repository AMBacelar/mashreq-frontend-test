/* eslint-disable react/no-children-prop */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useForm } from "@tanstack/react-form";
import { yupValidator } from "@tanstack/yup-form-adapter";
import { Language, strings, validators } from "@repo/shared";

const country = 'UK';
const language: Language = 'en';

export const Register = () => {
  const MyForm = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      country,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      alert(strings[language].formSubmitted);
    },
    validatorAdapter: yupValidator(),
  });
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-balance text-muted-foreground">
                Enter your username below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <MyForm.Field
                name="username"
                validators={{
                  onChange: validators.loginUsernameValidator(language),
                }}
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor="username">{strings[language].usernameLabel}</Label>
                    <Input
                      id="username"
                      type="username"
                      required
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                    />
                  </div>
                )}
              />
              <MyForm.Field
                name="password"
                validators={{
                  onChange: validators.loginPasswordValidator(language),
                }}
                children={(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">{strings[language].passwordLabel}</Label>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                    />
                  </div>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/" className="underline">
                register now
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="https://placeholder.pics/svg/300"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </main>
  )
}

export default Register
