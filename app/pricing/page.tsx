"use client";

import { usePlans } from "@/hooks/use-subscriptions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavV2 } from "../(marketing)/_components/Nav-v2";
import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";
import Link from "next/link";
import { Check, Loader2, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const { plans, loadingPlans } = usePlans();

  return (
    <>
      <main className="relative min-h-screen bg-input/40 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Label */}
          <div className="absolute top-20 left-8 md:left-16 text-xs text-muted-foreground/40 font-mono">
            [ PRICING ]
          </div>

          {/* Top Right Label */}
          <div className="absolute top-20 right-8 md:right-16 text-xs text-muted-foreground/40 font-mono">
            [ PLANS ]
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
        </div>

        {/* Navigation */}
        <div className="z-30 w-full fixed px-2 pt-2">
          <NavV2 />
        </div>

        {/* Content Section */}
        <div className="relative z-0 px-2 pt-24">
          <div className="max-w-5xl mx-auto border-x pt-12 pb-24">
            {/* Header */}
            <div className="px-4 md:px-6 space-y-4 mb-16">
              <Badge className="outline-1" variant={"outline"}>
                Pricing
              </Badge>
              <h1
                style={{ fontFamily: "var(--font-insturment-serif)" }}
                className="text-3xl md:text-5xl font-bold max-w-2xl"
              >
                Simple, transparent pricing
              </h1>
              <p className="max-w-2xl text-sm md:text-base text-muted-foreground">
                Choose the plan that works best for you. All plans include unlimited forms, submissions, and insights.
              </p>
            </div>

            {/* Pricing Cards */}
            {loadingPlans ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            ) : plans && plans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6">
                {plans.map((plan, index) => {
                  const price = parseInt(plan.price_detail?.price || "0") / 100;
                  const currency = plan.price_detail?.currency || "$";
                  const interval = plan.price_detail?.payment_frequency_interval || "month";
                  const isPopular = index === 1; // Mark middle plan as popular

                  return (
                    <Card
                      key={plan.product_id}
                      className={`relative flex flex-col ${
                        isPopular
                          ? "border-primary ring-2 ring-primary/20 scale-105 md:scale-110"
                          : ""
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground">
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-2xl font-bold">
                            {plan.name}
                          </CardTitle>
                          <Badge variant="outline">
                            {interval}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          {plan.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex-1 pt-6">
                        <div className="mb-6">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">
                              {currency}
                            </span>
                            <span className="text-5xl font-bold">
                              {price}
                            </span>
                            <span className="text-muted-foreground">
                              /{interval}
                            </span>
                          </div>
                          {plan.price_detail?.trial_period_days && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {plan.price_detail.trial_period_days} days free trial
                            </p>
                          )}
                        </div>

                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">Unlimited forms</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">Unlimited submissions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">Advanced analytics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">Custom integrations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">Priority support</span>
                          </li>
                        </ul>
                      </CardContent>

                      <CardFooter className="border-t pt-6">
                        <Button
                          asChild
                          className="w-full"
                          variant={isPopular ? "default" : "outline"}
                          size="lg"
                        >
                          <Link href="/auth">
                            Get Started
                            <ArrowRight className="size-4 ml-2" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 px-4">
                <p className="text-muted-foreground">
                  No plans available at the moment. Please check back later.
                </p>
              </div>
            )}

            {/* FAQ Section */}
            <div className="mt-24 px-4 md:px-6">
              <div className="space-y-4 mb-12">
                <Badge className="outline-1" variant={"outline"}>
                  FAQ
                </Badge>
                <h2
                  style={{ fontFamily: "var(--font-insturment-serif)" }}
                  className="text-2xl md:text-3xl font-bold"
                >
                  Frequently asked questions
                </h2>
              </div>

              <div className="grid gap-6 border-y">
                <div className="py-6 border-b first:border-t-0">
                  <h3 className="font-semibold mb-2">Can I change plans later?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                  </p>
                </div>
                <div className="py-6 border-b">
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards and debit cards. All payments are processed securely.
                  </p>
                </div>
                <div className="py-6 border-b">
                  <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                  <p className="text-sm text-muted-foreground">
                    Most plans include a free trial period. Check the plan details above for specific trial information.
                  </p>
                </div>
                <div className="py-6">
                  <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                  <p className="text-sm text-muted-foreground">
                    {`We offer a 30-day money-back guarantee. If you're not satisfied, contact us within 30 days for a full refund.`}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-24 px-4 md:px-6 text-center">
              <div className="border rounded-xl p-12 space-y-6">
                <h2
                  style={{ fontFamily: "var(--font-insturment-serif)" }}
                  className="text-2xl md:text-3xl font-bold"
                >
                  Ready to get started?
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Start building beautiful forms today. No credit card required for the free trial.
                </p>
                <Button asChild size="lg" className="mt-4">
                  <Link href="/auth">
                    Get Started
                    <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ThemeToggle />
        </div>
      </main>
    </>
  );
}

