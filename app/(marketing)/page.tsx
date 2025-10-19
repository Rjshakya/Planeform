import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";
import { Hero } from "./_components/Hero";
import { Nav } from "./_components/Nav";

export default function Landing() {
  return (
    <main className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
      <Nav />
      <Hero />
      <div className=" w-16 h-16 fixed bottom-1 right-1">
        <ThemeToggle />
      </div>
    </main>
  );
}
