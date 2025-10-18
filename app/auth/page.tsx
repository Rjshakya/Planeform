"use client";
import Image from "next/image";
import SignIn from "./_components/SignIn";
import { FileSpreadsheet } from "lucide-react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import authImg from "@/public/auth-image.jpg";

export default function Auth() {
  const { data } = authClient.useSession();

  if (data?.session?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className=" hidden  lg:flex items-center justify-center">
        <div className="w-full h-full relative p-7">
          <Image
            src={authImg}
            alt="Image"
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:px-8">
        <div className="flex gap-2 justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="logo ml-2.5 pt-1 ">
              <span className=" font-bold flex items-start gap-2 ">
                <p className="text-3xl text-primary">*</p>
                <p className=" text-lg">Formly</p>
              </span>
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignIn />
          </div>
        </div>
      </div>
    </main>
  );
}
