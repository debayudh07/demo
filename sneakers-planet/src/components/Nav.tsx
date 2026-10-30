import Image from "next/image";
import { waLink } from "@/lib/site";

export default function Nav() {
  return (
    <nav className="nav">
      <a className="brand" href="#top" aria-label="Sneakers Planet home">
        <Image src="/pins/logo.png" alt="" width={38} height={38} priority />
        <span className="brand-name">
          SNEAKERS <span>PLANET</span>
        </span>
      </a>
      <div className="nav-links">
        <a href="#board">The Board</a>
        <a href="#order">How to order</a>
        <a href="#contact">Contact</a>
      </div>
      <a className="btn" href={waLink("Hi Sneakers Planet! I'd like to order a pair.")} target="_blank" rel="noopener">
        Order on WhatsApp
      </a>
    </nav>
  );
}
