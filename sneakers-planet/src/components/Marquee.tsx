"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "@/lib/site";

const WORDS = ["SB DUNK", "AIR FORCE 1", "JORDAN", "WATCHES"];

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !track.current) return;
    const anim = animate(track.current, { x: ["0%", "-50%"], duration: 26000, ease: "linear", loop: true });
    return () => {
      anim.revert();
    };
  }, []);

  // Two copies so the -50% loop is seamless.
  const words = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track" ref={track}>
        {words.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}
