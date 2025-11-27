"use client";

import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager, TechCorp",
    content:
      "Planetform transformed how we collect user feedback. The block-based editor makes it so easy to create beautiful forms that actually get responses.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Founder, StartupXYZ",
    content:
      "The analytics and insights are incredible. We finally understand where users drop off and can optimize our forms in real-time.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Marketing Director, GrowthCo",
    content:
      "The integrations are seamless. Connecting to our CRM and automation tools was a breeze. This is the form builder we've been waiting for.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Operations Lead, ScaleUp",
    content:
      "Unlimited forms and submissions at this price point? It's a no-brainer. We've replaced three different tools with Planetform.",
    rating: 5,
  },
];

export const TestimonialsV2 = () => {
  return (
    <section
      id="testimonials"
      className="relative z-10 border-x max-w-5xl mx-auto pt-36 pb-24"
    >
      <div className="">
        <div className="text-left w-full space-y-4 mb-16 px-4 md:px-6">
          <Badge className="outline-1" variant={"outline"}>
            Testimonials
          </Badge>
          <h2
            style={{ fontFamily: "var(--font-insturment-serif)" }}
            className="max-w-lg text-3xl md:text-4xl"
          >
            Loved by teams building better forms
          </h2>
          <p className="max-w-lg text-sm md:text-base text-muted-foreground">
            {`See what teams are saying about Planetform and how it's helping them
            create better form experiences.`}
          </p>
        </div>

        <div className="grid md:grid-cols-2  border-y">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`group relative border-l p-8 transition hover:border-primary/40 ${
                i !== 0 && "border-t"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="size-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {`"${testimonial.content}"`}
                </p>
                <div className="space-y-1">
                  <div className="text-sm font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
