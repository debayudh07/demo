"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, createScope, createTimeline, stagger, type Scope } from "animejs";
import { ArrowIcon } from "./Icons";
import { SITE, prefersReducedMotion } from "@/lib/site";

const HEADLINE = ["The", "right", "shoe", "can", "make", "everything", "different."];
const ORBIT = "SNEAKERS PLANET ✦ COD AVAILABLE ✦ DELIVERY ALL OVER INDIA ✦ PREMIUM PAIRS ✦ SNEAKERS PLANET ✦ COD AVAILABLE ✦";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const scope = useRef<Scope>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    scope.current = createScope({ root }).add(() => {
      createTimeline({ defaults: { ease: "outExpo" } })
        .add(".hero h1 .w > span", { translateY: ["105%", "0%"], duration: 1100, delay: stagger(55) })
        .add(".hero-copy .intro", { opacity: [0, 1], translateY: [14, 0], duration: 800, delay: stagger(70) }, 250)
        .add(".planet", { opacity: [0, 1], scale: [0.55, 1], duration: 1400 }, 100)
        .add(".ring, .orbit-text", { opacity: [0, 1], duration: 1200 }, 500)
        .add(".float-pin", { opacity: [0, 1], translateY: [60, 0], duration: 1000, delay: stagger(140) }, 700);

      animate(".orbit-text", { rotate: 360, duration: 40000, ease: "linear", loop: true });
      animate(".planet", { rotate: [-4, 4], duration: 5200, ease: "inOutSine", loop: true, alternate: true, delay: 1500 });
      animate(".fp1", { y: [-6, 6], duration: 3200, ease: "inOutSine", loop: true, alternate: true, delay: 1800 });
      animate(".fp2", { y: [6, -6], duration: 3600, ease: "inOutSine", loop: true, alternate: true, delay: 1800 });

      const stage = root.current?.querySelector(".planet-stage");
      const onMove = (e: PointerEvent) => {
        if (!stage) return;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        animate(stage, { rotateY: x * 12, rotateX: -y * 12, duration: 900, ease: "outQuad" });
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <header className="hero" id="top" ref={root}>
      <div className="hero-copy">
        <div className="eyebrow intro">Premium sneaker store · India</div>
        <h1 aria-label={`${SITE.tagline}.`}>
          {HEADLINE.map((word, i) => (
            <span key={i} aria-hidden="true">
              <span className="w">
                <span className={word === "everything" ? "chrome" : undefined}>{word}</span>
              </span>{" "}
            </span>
          ))}
        </h1>
        <p className="lede intro">
          Dunks, Air Force 1s and statement watches, picked one pair at a time. Pay cash on delivery,
          anywhere in India.
        </p>
        <div className="hero-cta intro">
          <a className="btn" href="#board">
            Browse the board <ArrowIcon />
          </a>
          <a className="btn ghost" href="#order">
            How ordering works
          </a>
        </div>
        <div className="perks intro">
          <span className="perk">COD available</span>
          <span className="perk">Delivery all over India</span>
          <span className="perk">{SITE.posts} drops posted</span>
        </div>
      </div>

      <div className="planet-stage" aria-hidden="true">
        <div className="planet intro">
          <Image src="/pins/logo.png" alt="" width={360} height={360} priority />
        </div>
        <div className="ring intro">
          <div className="ring-inner" />
        </div>
        <svg className="orbit-text intro" viewBox="0 0 400 400">
          <defs>
            <path id="orbit-path" d="M200 200 m-188 0 a188 188 0 1 1 376 0 a188 188 0 1 1 -376 0" />
          </defs>
          <text>
            <textPath href="#orbit-path">{ORBIT}</textPath>
          </text>
        </svg>
        <div className="float-pin fp1 intro">
          <Image src="/pins/dunk-blue.jpg" alt="" width={694} height={848} sizes="180px" />
          <div className="cap">SB Dunk Low · Denim</div>
        </div>
        <div className="float-pin fp2 intro">
          <Image src="/pins/af1-brown.jpg" alt="" width={694} height={848} sizes="160px" />
          <div className="cap">AF1 · Brown suede</div>
        </div>
      </div>
    </header>
  );
}
