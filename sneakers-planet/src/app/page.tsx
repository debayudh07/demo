import Board from "@/components/Board";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Steps from "@/components/Steps";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="wrap">
        <Nav />
        <Hero />
        <Marquee />
        <Board />
        <Steps />
        <Contact />
        <footer className="footer">
          <span>© {SITE.name} · Premium sneaker store</span>
          <span>Concept design by Stellar Code</span>
        </footer>
      </div>
    </>
  );
}
