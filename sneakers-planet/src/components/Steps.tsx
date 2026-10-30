"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, onScroll, stagger, type Scope } from "animejs";
import { prefersReducedMotion } from "@/lib/site";

const STEPS = [
  { title: "Send the pin", body: "Tap Order on any pair. WhatsApp opens with the shoe name and your size already typed in." },
  { title: "Confirm your size", body: "We reply with the price, size availability and real photos of the exact pair." },
  { title: "Pay on delivery", body: "Shipped anywhere in India. You pay cash when the box is in your hands." },
];

export default function Steps() {
  const root = useRef<HTMLElement>(null);
  const scope = useRef<Scope>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    scope.current = createScope({ root }).add(() => {
      animate(".step", {
        opacity: [0, 1],
        y: [50, 0],
        rotate: [-2, 0],
        duration: 1000,
        delay: stagger(120),
        ease: "outExpo",
        autoplay: onScroll({ target: root.current!, enter: "bottom top" }),
      });
    });
    return () => scope.current?.revert();
  }, []);

  return (
    <section id="order" ref={root}>
      <div className="sec-head">
        <div>
          <div className="eyebrow">How to order</div>
          <h2>Three messages from screen to doorstep.</h2>
        </div>
      </div>
      <div className="steps">
        {STEPS.map((s, i) => (
          <div className="step" key={s.title}>
            <div className="n">STEP {i + 1}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
