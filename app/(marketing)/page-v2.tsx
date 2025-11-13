import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";
import { HeroV2 } from "./_components/Hero-v2";
import { NavV2 } from "./_components/Nav-v2";
import { TestimonialsV2 } from "./_components/Testimonials-v2";
import { IntegrationsV2 } from "./_components/Integrations-v2";
import { FAQV2 } from "./_components/FAQ-v2";
import { CTAV2 } from "./_components/CTA-v2";
import { StatsV2 } from "./_components/Stats-v2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRight, Eye, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const featureHighlights = [
  {
    title: "Block-based editor",
    description:
      "Assemble entire experiences with reusable blocks, and inline rich text editing.",
  },
  {
    title: "Rich Insights",
    description:
      "Not just receive submission , receive real information about them to really understand your submissions.",
  },
  {
    title: "Branded experiences",
    description:
      "Deliver fully responsive, on-brand forms with custom typography, theming, and media embeds.",
  },
  {
    title: "Integrations",
    description:
      "Connect your form with your favorite tools , such as google sheet , notion , custom webhook , and many more.",
  },
];

const comparisonRows = [
  {
    feature: "Visual editor depth",
    planetform: "Advanced block layout, logic, and styling controls.",
    typeform: "Linear question flow with limited layout options.",
    google: "Single-column form builder with minimal styling.",
  },
  {
    feature: "Collaboration",
    planetform: "Live co-editing, roles, and comment threads.",
    typeform: "Basic sharing; no real-time presence.",
    google: "Simple link sharing; no roles or presence.",
  },
  {
    feature: "Brand customization",
    planetform: "Custom themes, fonts, animations, and embeds.",
    typeform: "Preset themes and restricted layout changes.",
    google: "Light theme edits; no advanced design options.",
  },
  {
    feature: "Automation",
    planetform: "Native CRM sync, webhook triggers, Zapier, Make.",
    typeform: "Zapier & Make integrations on higher tiers.",
    google: "Manual exports or Apps Script required.",
  },
  {
    feature: "Analytics & insights",
    planetform: "Conversion funnels, drop-off heatmaps, exports.",
    typeform: "Basic completion metrics, reports.",
    google: "Response list and charts; no funnel insights.",
  },
];

export default function LandingV2() {
  return (
    <>
      <main className="relative min-h-screen bg-input/40 overflow-hidden">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-70 " />

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Label */}
          <div className="absolute top-20 left-8 md:left-16 text-xs text-muted-foreground/40 font-mono">
            [ CONVERT OK ]
          </div>

          {/* Top Right Label */}
          <div className="absolute top-20 right-8 md:right-16 text-xs text-muted-foreground/40 font-mono">
            [ FORM ]
          </div>

          {/* Bottom Left Label */}
          <div className="absolute bottom-32 left-8 md:left-16 text-xs text-muted-foreground/40 font-mono">
            [.SUBMIT ]
          </div>

          {/* Bottom Right Label */}
          <div className="absolute bottom-32 right-8 md:right-16 text-xs text-muted-foreground/40 font-mono">
            [.USER]
          </div>

          {/* Decorative Crosshair Icons */}
          <div className="absolute top-1/4 left-1/4 text-primary/20">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2V22M2 12H22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="absolute top-1/4 right-1/4 text-primary/20">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2V22M2 12H22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Abstract Data Patterns */}
          <div className="absolute top-1/3 left-1/3 text-muted-foreground/10">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-current rounded-sm"
                  style={{ opacity: Math.random() * 0.5 + 0.2 }}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-1/3 right-1/3 text-muted-foreground/10">
            <div className="flex flex-col gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 bg-current rounded"
                  style={{
                    width: `${20 + i * 10}px`,
                    opacity: Math.random() * 0.5 + 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className=" z-50 w-full fixed  px-2 pt-2">
          <NavV2 />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 px-2 ">
          <HeroV2 />
          {/* <div className=" max-w-5xl mx-auto border-x   h-full">
            <div className="h-20 bg-input/90 "></div>
          </div> */}

          <div className=" max-w-5xl mx-auto border-x pt-24">
            {/* Floating Action Buttons - Firecrawl style */}
            <div className="grid grid-cols-2 md:grid-cols-4  border-t ">
              <div className=" flex  justify-center border-b border-r py-14">
                <Link
                  href="/templates"
                  className=" flex items-center text-sm gap-2 font-medium"
                >
                  <Sparkles className="size-4" />
                  <span>Try Templates</span>
                </Link>
              </div>
              <div className=" flex justify-center border-b py-14">
                <Link
                  href="#analytics"
                  className=" flex items-center text-sm gap-2 font-medium"
                >
                  <TrendingUp className="size-4" />
                  <span>View Analytics</span>
                </Link>
              </div>
              <div className="flex justify-center border-b border-l py-14">
                <Link
                  href="#integrations"
                  className=" flex items-center text-sm gap-2 font-medium"
                >
                  <Zap className="size-4" />
                  <span>See Integrations</span>
                </Link>
              </div>
              <div className=" flex justify-center border-b border-l py-14">
                <Link
                  href="/auth"
                  className=" flex items-center text-sm gap-2 font-medium"
                >
                  <span className="pl-2">Get Started</span>
                  <ArrowRight className="size-5" />
                </Link>
              </div>
            </div>

            {/* Unlimited Stats or Features - Firecrawl inspired */}
            <div className="grid grid-cols-2 md:grid-cols-3  border-b">
              <div className="text-center group border-b col-span-2 md:col-span-1 sm:border-r py-14">
                <div className="text-lg md:text-xl  opacity-90  mb-1 group-hover:scale-95 transition-transform  ease-in">
                  UNLIMITED
                </div>
                <div className="text-sm  font-mono text-primary">[ FORMS ]</div>
              </div>
              <div className="text-center group border-b col-span-1  md:col-span-1 border-r py-14">
                <div className="text-lg md:text-xl  opacity-90  mb-1 group-hover:scale-95 transition-transform  ease-in">
                  UNLIMITED
                </div>
                <div className="text-sm  font-mono text-primary">
                  [ INSIGHTS ]
                </div>
              </div>
              <div className="text-center group border-b col-span-1 md:col-span-1 sm:border-l py-14">
                <div className="text-lg md:text-xl  opacity-90  mb-1 group-hover:scale-95 transition-transform  ease-in">
                  UNLIMITED
                </div>
                <div className="text-sm  font-mono text-primary">
                  [ SUBMITS ]
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section
            id="features"
            className="relative z-10 border-x max-w-5xl mx-auto pt-36 "
          >
            <div className="">
              <div className="text-left w-full space-y-4 px-4 ">
                <Badge className=" outline-1" variant={"outline"}>
                  Product highlights
                </Badge>
                <h2
                  style={{ fontFamily: "var(--font-insturment-serif)" }}
                  className="max-w-lg  text-3xl md:text-4xl "
                >
                  Everything you need in form
                </h2>
                <p className="max-w-lg  text-sm md:text-base text-muted-foreground">
                  Planetform gives your team a single canvas to design, launch,
                  and analyze form experiences—without wrestling code or rigid
                  templates.
                </p>
              </div>
              <div className="mt-36 grid md:grid-cols-2 border-y border-r ">
                {featureHighlights.map((feature, i) => (
                  <div
                    key={feature.title}
                    className={`group relative border-l ${
                      i !== 0 && "border-t , sm:border-t-0"
                    }  p-10  transition hover:border-primary/40`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <StatsV2 />

          {/* Integrations Section */}
          <IntegrationsV2 />

          {/* Comparison Section */}
          <section
            id="comparison"
            className="max-w-5xl mx-auto h-full  px-2 md:px-6 border-x pt-36 pb-12 "
          >
            <div className="">
              <div className="space-y-4 max-w-lg">
                <Badge className="outline-1" variant={"outline"}>
                  Comparison
                </Badge>
                <h2
                  style={{ fontFamily: "var(--font-insturment-serif)" }}
                  className="text-3xl md:text-4xl"
                >
                  Built for teams that outgrow Typeform and Google Forms
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  See how Planetform stacks up when you need flexibility,
                  automation, and insight at scale.
                </p>
              </div>

              <div className="overflow-x-auto mt-36">
                <div className="min-w-[720px] border">
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

                  <div className="grid grid-cols-4 border-b">
                    <div className="p-4 text-sm text-muted-foreground">
                      Price
                    </div>
                    <div className="p-4 text-sm font-medium">
                      Free • Cheap at scale
                    </div>
                    <div className="p-4 text-sm">Paid, higher at scale</div>
                    <div className="p-4 text-sm">Free (limited features)</div>
                  </div>

                  <div className="grid grid-cols-4 border-b">
                    <div className="p-4 text-sm text-muted-foreground">
                      Design
                    </div>
                    <div className="p-4 text-sm font-medium">
                      Clean • modern
                    </div>
                    <div className="p-4 text-sm">Polished</div>
                    <div className="p-4 text-sm">Basic</div>
                  </div>

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

          {/* Testimonials Section */}
          <TestimonialsV2 />

          {/* FAQ Section */}
          <FAQV2 />

          {/* CTA Section */}
          <CTAV2 />
        </div>

        {/* Theme Toggle */}
        <div className="fixed bottom-4 right-4 z-30">
          <ThemeToggle />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 md:px-6  bg-foreground text-background">
        <div className="w-full border-t border-border/20 pt-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="md:col-span-2 flex flex-col justify-end gap-3">
              <div className="flex items-center gap-2">
                {/* <div className="size-5 text-background">
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
                <p className="text-lg font-bold">Planetform</p> */}
                <Logo className="" svgClassName="fill-background" />
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Build beautiful, modern forms with an intuitive block-based
                editor.
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Planetform. All rights reserved.
              </p>
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

          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 max-w-6xl mx-auto">
            <div className="flex sm:hidden items-center gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-background">
                Privacy
              </a>
              <a href="#" className="hover:text-background">
                Terms
              </a>
              <a href="#" className="hover:text-background">
                Status
              </a>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <Button asChild size="sm" variant="secondary">
                  <Link href="/auth">Get started</Link>
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
        </div>
      </footer>
    </>
  );
}
