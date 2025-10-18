import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="col-span-1 border rounded-lg my-2 mx-2 py-2">
      <div className="wrapper flex justify-between items-center">
        <div className="logo ml-2.5 pt-1 pl-2">
          <span className=" font-bold flex items-start gap-2 ">
            <p className="text-3xl text-primary">*</p>
            <p className=" text-lg">Formly</p>
          </span>
        </div>

        <div className=" menu flex gap-3 items-center px-2">
          <Button variant={"ghost"}>Pricing</Button>
          <Button asChild className="">
            <Link href={"/auth"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
