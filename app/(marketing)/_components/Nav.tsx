import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="col-span-1 border rounded-lg my-2 mx-2 py-2">
      <div className="wrapper flex justify-between items-center">
        <div className="logo ml-2.5">
          <span className=" text-lg font-medium ">Formly.</span>
        </div>

        <div className=" menu flex gap-3 items-center ">
          <Button variant={"ghost"}>Pricing</Button>
          <Button asChild className="">
            <Link href={"/auth"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
