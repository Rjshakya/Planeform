import { Hero } from "./_components/Hero";
import { Nav } from "./_components/Nav";

export default function Landing() {
    return (
        <main className=" w-full grid gap-1 py-2 px-2">
            <Nav />
            <Hero />
        </main>
    );
}
