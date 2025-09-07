import Image from "next/image";
import SignIn from "./_components/SignIn";
import { FileSpreadsheet } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Auth() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session?.session?.id) {
    redirect("/dashboard")
  }

  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className=" hidden  lg:flex items-center justify-center">
        <div className=" w-[400px] h-[400px] relative ">

          <Image
            src={"/auth-image.jpg"}
            alt="Image"
            fill
            className=" rounded-2xl"
          />

        </div>

      </div>
      <div className="flex flex-col gap-4 p-6 md:px-8">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <FileSpreadsheet className="size-3.5" />
            </div>
            <p className=" tracking-tight">Formly .</p>
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
