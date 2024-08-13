/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "../../components/ui/button"

export const Login = () => {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-balance text-muted-foreground">
                You should be logged in now with your details available
              </p>
            </div>
            <Button type="submit" className="w-full">
              Log out
            </Button>
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

export default Login
