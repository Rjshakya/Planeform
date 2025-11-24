"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Loader,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  authClient,
  checkout,
  customerPortal,
  signOut,
} from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/axios";
import useSWR from "swr";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Isubscription,
  usePlans,
  useSubscriptions,
} from "@/hooks/use-subscriptions";


export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    customerId: string;
  };
}) {
  const { isMobile } = useSidebar();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const { loadingSubscriptions, subscriptionsData, plan } = useSubscriptions();
  const { plans, loadingPlans } = usePlans();
  const [step, setStep] = useState(0);
  const handleSubmit = async () => {
    if (!address) return;
    if (!user?.email) return;

    const checkoutData = {
      email: user?.email,
      name: user?.name || "No name",
      ...address,
    };

    await checkout(checkoutData);

    setAddress({ city: "", country: "", state: "", street: "", zipcode: "" });
  };

  const checkoutSteps = [
    {
      label: "Plans",
      descriptions: "choose your plan",
      Component: (
        <div key={1} className="grid gap-2">
          <p className="px-1">You have no active subscriptions.</p>
          <p className="px-1 text-2xl font-bold">Plans</p>
          {plans &&
            plans?.length &&
            plans?.map((plan) => {
              return (
                <Card key={plan?.product_id}>
                  <div className="px-6">
                    <Badge>
                      {plan?.price_detail?.payment_frequency_interval}
                    </Badge>
                  </div>

                  <CardHeader className="border-t pt-4">
                    <CardTitle className=" text-2xl font-semibold">
                      {plan?.name}
                    </CardTitle>
                    <CardDescription>{plan?.description}</CardDescription>
                  </CardHeader>
                  <CardContent className=" border-t pt-4">
                    <div className=" text-xl font-medium  flex items-center gap-2">
                      <p>{plan?.price_detail?.currency}</p>
                      <p className="  ">
                        {parseInt(plan?.price_detail?.price) / 100}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      ),
    },
    {
      label: "Address",
      descriptions: "enter your address",
      Component: (
        <div key={2} className="w-full grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full grid gap-4">
              <Label>street</Label>
              <Input
                value={address["street"]}
                onChange={(e) =>
                  setAddress((p) => ({
                    ...p,
                    street: e?.currentTarget?.value,
                  }))
                }
              />
            </div>
            <div className="w-full grid gap-4">
              <Label>city</Label>
              <Input
                value={address["city"]}
                onChange={(e) =>
                  setAddress((p) => ({
                    ...p,
                    city: e?.currentTarget?.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full grid gap-4">
              <Label>state</Label>
              <Input
                value={address["state"]}
                onChange={(e) =>
                  setAddress((p) => ({
                    ...p,
                    state: e?.currentTarget?.value,
                  }))
                }
              />
            </div>
            <div className="w-full grid gap-4">
              <Label>country</Label>
              <Input
                value={address["country"]}
                onChange={(e) =>
                  setAddress((p) => ({
                    ...p,
                    country: e?.currentTarget?.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="w-full grid gap-4">
            <Label>zip code</Label>
            <Input
              type="number"
              value={address["zipcode"]}
              onChange={(e) =>
                setAddress((p) => ({
                  ...p,
                  zipcode: e?.currentTarget?.value,
                }))
              }
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="" asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.avatar || undefined}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              {user && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              )}

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal mb-4">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar || ""} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                {user && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                )}
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={async () => {
                  setOpenDialog(true);
                  // await getActiveSubscription();
                }}
              >
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={customerPortal}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuItem
              variant="destructive"
              onClick={async () => {
                await signOut();
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogHeader>
                <DialogTitle>Subscription</DialogTitle>
                <DialogDescription>Manadge subscription</DialogDescription>
              </DialogHeader>
            </DialogHeader>

            {loadingSubscriptions && (
              <div className="w-full min-h-48 grid place-content-center">
                <Loader className="animate-spin" />
              </div>
            )}

            {loadingSubscriptions ||
              (subscriptionsData &&
                subscriptionsData.length > 0 &&
                subscriptionsData?.map((sub) => {
                  return (
                    <Card
                      key={sub?.subscriptionId}
                      className="w-full grid gap-4"
                    >
                      <CardHeader>
                        <Badge className=" capitalize">{sub?.status} </Badge>
                        <div className="pl-1">
                          <CardTitle className=" text-lg">
                            {sub?.plan}
                          </CardTitle>
                          <CardDescription>
                            {sub?.planDescription}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className=" px-7 border-t pt-4">
                        <div className=" text-xl font-medium  flex items-center gap-2">
                          <p>{sub?.priceDetails?.currency}</p>
                          <p className="  ">
                            {parseInt(sub?.priceDetails?.price) / 100}
                          </p>
                        </div>
                      </CardContent>

                      <CardFooter className=" text-sm grid gap-1 px-7 border-t pt-4">
                        <span className=" flex items-center gap-4">
                          <p> Next billing</p>
                          <p> {format(sub?.nextBillingDate, "PPP")}</p>
                        </span>
                      </CardFooter>
                    </Card>
                  );
                }))}

            {loadingSubscriptions ||
              (subscriptionsData &&
                subscriptionsData?.length === 0 &&
                checkoutSteps?.map((chk, i) => {
                  if (step === i) {
                    return chk?.Component;
                  }
                }))}

            <DialogFooter>
              <Button
                onClick={() => {
                  setStep(0);
                  setOpenDialog(false);
                }}
                variant={"secondary"}
              >
                Close
              </Button>
              {subscriptionsData?.length === 0 && (
                <Button
                  onClick={() => {
                    if (step === checkoutSteps.length - 1) {
                      handleSubmit();
                    } else {
                      setStep((p) => p + 1);
                    }
                  }}
                >
                  {step === checkoutSteps?.length - 1 ? "Checkout" : "Next"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {plan && (
          <Badge
            variant={"outline"}
            className=" absolute -top-2 right-8 px-3 rounded-sm dark:bg-amber-600 bg-amber-400"
          >
            {plan}
          </Badge>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
