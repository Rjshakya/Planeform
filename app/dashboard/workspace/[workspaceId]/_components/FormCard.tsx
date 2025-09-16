"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRightIcon, Ellipsis } from "lucide-react";
import {
  ArrowCircleUp,
  ArrowCircleUp2,
  ArrowUp,
  Chart2,
  Edit,
  Trash,
} from "iconsax-reactjs";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface formProps {
  shortId: string;
  name: string;
}

export default function FormCard(props: formProps) {
  const router = useRouter();
  const { workspaceId: workspace } = useParams();

  return (
    <Card
      // onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
      className=" py-2.5 px-2 cursor-pointer"
    >
      <CardHeader className=" px-0.5 flex items-center justify-between gap-1">
        <Link
          className=" hover:underline-offset-2 hover:underline"
          href={`/dashboard/${workspace}/form/view/${props.shortId}`}
        >
          <p className=" capitalize">{props?.name || "workspace"}</p>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuItem
              onClick={() => router.push(`/${props.shortId}`)}
              className="w-full flex items-center gap-2"
            >
              <span className=" ">
                <ArrowCircleUp2
                  // size={"60"}
                  variant="Bulk"
                  className=" rotate-45 size-5 "
                />
              </span>

              <span>Go to</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/dashboard/${workspace}/form/view/${props.shortId}`
                )
              }
              className="w-full flex items-center gap-2"
            >
              <span className=" ">
                <Chart2 className=" size-5 " variant="Bulk" />
              </span>

              <span>Analytics</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/dashboard/${workspace}/form/edit/${props.shortId}?name=${props.name}`
                )
              }
              className="w-full flex items-center gap-2"
            >
              <span>
                <Edit className=" size-5" variant="Bulk" />
              </span>
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full flex items-center gap-2">
              <Trash variant="Bulk" className=" size-5" />
              <p>Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

          <span className="relative z-10">
            <p className=" leading-24 opacity-25 text-9xl font-bold tracking-[-0.10em] capitalize -rotate-6 pr-10  ">
              {props.name}
            </p>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
