import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const fetcher = (url: string) => apiClient.get(url);
export const Integrations = () => {
  const { workspaceId, formId } = useParams();
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

  const [sheetTitle, setSheetTitle] = useState("");
  const { data, error, isLoading } = useSWR(
    `/api/integration/${formId}`,
    fetcher
  );
  const {
    data: d2,
    error: e2,
    isLoading: l2,
  } = useSWR(`/api/integration/sheet/isConnected`, fetcher);

  const linkGoogleSheet = async () => {
    if (d2?.data?.isConnected) return;
    try {
      await authClient.linkSocial({
        provider: "google",
        scopes: [
          "https://www.googleapis.com/auth/spreadsheets",
          "https://www.googleapis.com/auth/drive.file",
        ],
        callbackURL: `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const linkNotion = async () => {
    await authClient.linkSocial({
      provider: "notion",
      callbackURL: `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`,
    });
  };

  const createSheet = async (title: string) => {
    try {
      if (!title) return;
      const metaData = JSON.stringify({ title });
      const res = await apiClient.post(`/api/integration/sheet`, {
        type: "google",
        formId,
        metaData,
      });

      console.log(res?.data?.data);
    } catch (e) {
      toast("failed to create sheet");
    }
  };

  if (error || e2) {
    return <div className=" text-red-500">failed to load</div>;
  }
  if (isLoading || l2) {
    return <div className=" text-gray-500">loading...</div>;
  }

  return (
    <div className=" w-full grid gap-4">
      {data?.data?.integrations &&
        data?.data?.integrations?.length > 0 &&
        data?.data?.integrations?.map((i: any, index: number) => {
          const metaData = JSON.parse(i?.metaData || "");
          return (
            <Card
              key={index}
              className=" header w-full grid gap-2 p-0 px-2 py-2"
            >
              <CardHeader className=" px-4 pt-2">
                <p className=" text-lg font-medium tracking-tight">
                  Live connections
                </p>
              </CardHeader>
              <CardContent className="p-0 flex items-center justify-between gap-1 px-4 pb-2">
                <div>{metaData?.spreadSheetUrl || "url"}</div>

                <Button
                  variant={"secondary"}
                  size={"sm"}
                  className="bg-emerald-400 dark:bg-emerald-600 r"
                >
                  sync
                </Button>
              </CardContent>
            </Card>
          );
        })}

      <div className=" grid md:grid-cols-3 gap-2">
        <Card
          // onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
          className=" py-2.5 px-2 cursor-pointer"
        >
          <CardHeader className=" px-0.5 flex items-center justify-between gap-1">
            <span>
              <p>Google</p>
            </span>

            <div className=" flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"ghost"} size={"sm"}>
                    + sheet
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Sheet</DialogTitle>
                  <DialogDescription>create new google sheet</DialogDescription>
                  <div className=" grid gap-2">
                    <Label>Title</Label>
                    <Input
                      value={sheetTitle}
                      onChange={(e) => setSheetTitle(e.currentTarget.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={() => createSheet(sheetTitle)} size={"sm"}>
                      create
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button onClick={linkGoogleSheet} variant={"ghost"} size={"sm"}>
                {d2?.data?.isConnected ? "connected" : "connect"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className=" px-0 ">
            <div className=" bg-muted w-full h-44 relative overflow-hidden rounded-2xl">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-100 mix-blend-overlay"
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
                      baseFrequency="1" /* tweak for grain size */
                      numOctaves="10" /* tweak for complexity */
                      stitchTiles="stitch"
                    />
                    {/* desaturate (make it grayscale) */}
                    <feColorMatrix type="saturate" values="0" />
                    {/* control alpha so noise is translucent */}
                    <feComponentTransfer>
                      <feFuncA type="table" tableValues="0 0.75" />
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
                <p className=" w-full absolute bottom-12 right-4 leading-24 opacity-35 text-9xl font-bold tracking-[-0.10em] capitalize -rotate-6  ">
                  Google
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className=" py-2.5 px-2 cursor-pointer"
        >
          <CardHeader className=" px-0.5 flex items-center justify-between gap-1">
            <span>
              <p>Notion</p>
            </span>

            <div className=" flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"ghost"} size={"sm"}>
                    + sheet
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Sheet</DialogTitle>
                  <DialogDescription>create new google sheet</DialogDescription>
                  <div className=" grid gap-2">
                    <Label>Title</Label>
                    <Input
                      value={sheetTitle}
                      onChange={(e) => setSheetTitle(e.currentTarget.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={() => createSheet(sheetTitle)} size={"sm"}>
                      create
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button onClick={linkNotion} variant={"ghost"} size={"sm"}>
                {"connect"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className=" px-0 ">
            <div className=" bg-muted w-full h-44 relative overflow-hidden rounded-2xl">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-100 mix-blend-overlay"
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
                      baseFrequency="1" /* tweak for grain size */
                      numOctaves="10" /* tweak for complexity */
                      stitchTiles="stitch"
                    />
                    {/* desaturate (make it grayscale) */}
                    <feColorMatrix type="saturate" values="0" />
                    {/* control alpha so noise is translucent */}
                    <feComponentTransfer>
                      <feFuncA type="table" tableValues="0 0.75" />
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
                <p className=" w-full absolute bottom-12 right-4 leading-24 opacity-35 text-9xl font-bold tracking-[-0.10em] capitalize -rotate-6  ">
                  Notion
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
