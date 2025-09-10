import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";


export const Nav = () => {
     

     

  return (
    <nav className="w-full py-2 px-2 border rounded-lg max-w-2xl mx-auto">
      <div className="wrapper flex justify-between items-center">
        <div className="logo ml-2.5">
          <span className=" text-lg font-medium ">Formly.</span>
        </div>
        <div className=" menu flex gap-1 items-center ">
          <Button variant={"ghost"}>Home</Button>
          <Button variant={"ghost"}>About</Button>
          <Button variant={"ghost"}>Pricing</Button>
          <Button variant={"ghost"}>Contact</Button>
        </div>

        <Button asChild className="">
          <Link href={"/auth"}>Get Started</Link>
        </Button>
      </div>
    </nav>
  );
};
