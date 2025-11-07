import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";
import { Hero } from "./_components/Hero";
import { Nav } from "./_components/Nav";
import bg from "@/public/grad-1.jpg";
import Image from "next/image";
import {
  Autonio,
  Chart21,
  ChartSuccess,
  LinkSquare,
  TextBlock,
} from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <main className="grid grid-cols-1 px-3 md:px-1 relative bg-background z-10 mb-[500px]  sm:mb-[400px] pb-28  border-b-2 dark:border-b-0 ">
        <div className=" col-span-full relative grid grid-cols-1 z-10 h-full">
          {/* <div className=" absolute top-0 inset-x-0 w-full h-full  -z-0">
          <Image src={bg} alt="bg" className=" relative h-full " />
        </div> */}
          <div className="w-full  px-2 fixed top-0 z-50 inset-x-0 overflow-hidden ">
            <Nav />
          </div>

          <Hero />
        </div>

        {/* Features section */}
        <section id="features" className="w-full h-full  px-2 md:px-6 mt-48 ">
          <div className="max-w-3xl mx-auto">
            <div className="text-left mb-10 md:mb-14 px-1">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter">
                Features
              </h2>
              <p className="text-muted-foreground mt-2 max-w-4xl mx-auto font-medium">
                Everything you need to build, share, and analyze high‑converting
                forms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 ">
              <div className=" border text-card-foreground p-6 grid gap-4">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="my-1 size-12"
                >
                  <TextBlock variant="Bold" className="size-8" />
                </Button>
                <div className="pl-1">
                  <div className="text-lg font-medium">Block based Editor</div>
                  <p className="text-sm text-muted-foreground ">
                    Compose forms quickly with an intuitive, flexible editor.
                  </p>
                </div>
              </div>

              <div className=" border text-card-foreground p-6 grid gap-4">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="my-1 size-12"
                >
                  <Chart21 className="size-8" variant="Bold" />
                </Button>
                <div className="pl-1">
                  <div className="text-lg font-medium">Analytics</div>
                  <p className="text-sm text-muted-foreground">
                    Track views, completions, and drop‑offs to optimize
                    conversions.
                  </p>
                </div>
              </div>

              <div className=" border text-card-foreground p-6 grid gap-4">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="my-1 size-12"
                >
                  <LinkSquare className="size-8" variant="Bold" />
                </Button>
                <div className="pl-1">
                  <div className="text-lg font-medium">Embeds & sharing</div>
                  <p className="text-sm text-muted-foreground">
                    Share links or embed anywhere with responsive, accessible
                    UI.
                  </p>
                </div>
              </div>

              <div className=" border text-card-foreground p-6 grid gap-4">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="my-1 size-12"
                >
                  <Autonio className="size-8" variant="Bold" />
                </Button>
                <div className="pl-1">
                  <div className="text-lg font-medium">Integrations</div>
                  <p className="text-sm text-muted-foreground">
                    Connect with your stack using webhooks and native
                    integrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Comparison section */}
        <section id="comparison" className="w-full h-full  px-2 md:px-6 mt-32 ">
          <div className="max-w-3xl mx-auto">
            <div className="text-left mb-10 md:mb-14 px-1">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter">
                Planetform vs alternatives
              </h2>
              <p className="text-muted-foreground mt-2 max-w-4xl  font-medium">
                See how Planetform stacks up against Typeform and Google Forms.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[720px] border">
                {/* Header */}
                <div className="grid grid-cols-4 border-b">
                  <div className="p-4 text-sm font-medium" />

                  <div className="p-4 text-sm font-medium flex items-center gap-2">
                    <div className="size-5 text-primary">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Planetform
                  </div>
                  <div className="p-4 text-sm font-medium">Typeform</div>
                  <div className="p-4 text-sm font-medium">Google Forms</div>
                </div>

                {/* Price */}
                <div className="grid grid-cols-4 border-b">
                  <div className="p-4 text-sm text-muted-foreground">Price</div>
                  <div className="p-4 text-sm font-medium">
                    Free • Cheap at scale
                  </div>
                  <div className="p-4 text-sm">Paid, higher at scale</div>
                  <div className="p-4 text-sm">Free (limited features)</div>
                </div>

                {/* Design */}
                <div className="grid grid-cols-4 border-b">
                  <div className="p-4 text-sm text-muted-foreground">
                    Design
                  </div>
                  <div className="p-4 text-sm font-medium">Clean • modern</div>
                  <div className="p-4 text-sm">Polished</div>
                  <div className="p-4 text-sm">Basic</div>
                </div>

                {/* Ease of use */}
                <div className="grid grid-cols-4 border-b">
                  <div className="p-4 text-sm text-muted-foreground">
                    Ease of use
                  </div>
                  <div className="p-4 text-sm font-medium">
                    Intuitive • minimal UI
                  </div>
                  <div className="p-4 text-sm">Easy</div>
                  <div className="p-4 text-sm">Easy</div>
                </div>

                {/* Builder */}
                <div className="grid grid-cols-4 border-b">
                  <div className="p-4 text-sm text-muted-foreground">
                    Builder
                  </div>
                  <div className="p-4 text-sm font-medium">
                    Block‑based • drag & drop
                  </div>
                  <div className="p-4 text-sm">Traditional form builder</div>
                  <div className="p-4 text-sm">Basic question list</div>
                </div>

                {/* Customization */}
                <div className="grid grid-cols-4 border-b">
                  <div className="p-4 text-sm text-muted-foreground">
                    Customization
                  </div>
                  <div className="p-4 text-sm font-medium">
                    High • flexible controls
                  </div>
                  <div className="p-4 text-sm">Moderate</div>
                  <div className="p-4 text-sm">Limited</div>
                </div>

                {/* Value */}
                <div className="grid grid-cols-4">
                  <div className="p-4 text-sm text-muted-foreground">
                    Overall value
                  </div>
                  <div className="p-4 text-sm font-medium">
                    Best value for most teams
                  </div>
                  <div className="p-4 text-sm">Good, but pricey</div>
                  <div className="p-4 text-sm">Okay for basics</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className=" w-16 h-16 fixed bottom-1 right-1 z-30">
          <ThemeToggle />
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full px-2 md:px-6 mt-24 fixed bottom-0 -z-0 bg-foreground text-background ">
        <div className="w-full border-t pt-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 flex flex-col justify-end gap-3">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Build beautiful, modern forms with an intuitive block-based
                editor.
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Planetform. All rights reserved.
              </p>
              {/* <div className="flex items-center gap-3 mt-1">
                <Button asChild size="sm">
                  <Link className="" href="/auth">Get started</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link className="" href="#comparison">Compare</Link>
                </Button>
              </div> */}
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">Product</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:opacity-70">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#comparison" className="hover:opacity-70">
                    Comparison
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-70">
                    Templates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">Company</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:opacity-70">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-70">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-70">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex sm:hidden items-center gap-4 pl-1 md:pl-0 mt-2 md:mt-0 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Status
              </a>
            </div>

            <div className="flex flex-col items-center gap-3 mt-2 md:mt-1">
              <div className="flex items-center gap-3 mt-1">
                <Button asChild size="sm">
                  <Link className="" href="/auth">
                    Get started
                  </Link>
                </Button>
              </div>
            </div>

            <div className="sm:flex items-center gap-4 hidden text-xs text-muted-foreground">
              <a href="#" className="hover:opacity-70">
                Privacy
              </a>
              <a href="#" className="hover:opacity-70">
                Terms
              </a>
              <a href="#" className="hover:opacity-70">
                Status
              </a>
            </div>
          </div>
          <div className="w-full mt-10">
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter ">
              Planetform
            </h1>
          </div>
        </div>
      </footer>
    </>
  );
}
