import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

export const Integrations = () => {
  return (
    <div className=" w-full grid gap-4">
      <Card className=" header w-full grid gap-2 p-0 px-2 py-2">
        <CardHeader className=" px-4 pt-2">
          <p className=" text-lg font-medium tracking-tight">
            Live connections
          </p>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-between gap-1 px-4 pb-2">
          <div>url</div>

          <Button
            variant={"secondary"}
            size={"sm"}
            className="bg-emerald-400 dark:bg-emerald-600 r"
          >
            sync
          </Button>
        </CardContent>
      </Card>

      <div className=" grid md:grid-cols-3 gap-2">
        <Card
          // onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
          className=" py-2.5 px-2 cursor-pointer"
        >
          <CardHeader className=" px-0.5 flex items-center justify-between gap-1">
            <span>
              <p>Google</p>
            </span>
            <Button variant={"ghost"} size={"sm"}>
              connect
            </Button>
          </CardHeader>
          <CardContent className=" px-0 ">
            <div className=" bg-background w-full h-44 relative overflow-hidden rounded-2xl">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-95 mix-blend-overlay"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <filter id="noiseFilter">
                    {/* fractalNoise produces the grain */}
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.9" /* tweak for grain size */
                      numOctaves="2" /* tweak for complexity */
                      stitchTiles="stitch"
                    />
                    {/* desaturate (make it grayscale) */}
                    <feColorMatrix type="saturate" values="0" />
                    {/* control alpha so noise is translucent */}
                    <feComponentTransfer>
                      <feFuncA type="table" tableValues="0 0.35" />
                    </feComponentTransfer>
                  </filter>
                </defs>

                {/* the rect gets the noise filter applied */}
                <rect
                  width="100%"
                  height="100%"
                  filter="url(#noiseFilter)"
                  fill="#000"
                />
              </svg>

              <div className="relative z-10 w-full h-full">
                <p className="w-full absolute bottom-12 right-4 leading-24 opacity-25 text-9xl font-bold tracking-[-0.10em] capitalize -rotate-6  ">
                  Google
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
