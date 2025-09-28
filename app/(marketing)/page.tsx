import { Hero } from "./_components/Hero";
import { Nav } from "./_components/Nav";

export default function Landing() {
  return (
    <main className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
      <Nav />
      <Hero />
    </main>
  );
}
