"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, createScope, onScroll, stagger, type Scope } from "animejs";
import { CATEGORIES, PINS, categoryLabel, type Category, type ProductPin } from "@/data/pins";
import { prefersReducedMotion } from "@/lib/site";
import PinModal from "./PinModal";

type Filter = Category | "all";

export default function Board() {
  const grid = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<{ pin: ProductPin; from: DOMRect } | null>(null);
  const lastPin = useRef<HTMLButtonElement | null>(null);

  // Stagger the board in the first time it scrolls into view.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    scope.current = createScope({ root: grid }).add(() => {
      animate(".pin", {
        opacity: [0, 1],
        y: [40, 0],
        duration: 900,
        delay: stagger(60),
        ease: "outExpo",
        autoplay: onScroll({ target: grid.current!, enter: "bottom top" }),
      });
    });
    return () => scope.current?.revert();
  }, []);

  // Pins stay mounted; visibility is toggled on the DOM so anime.js can fade them out first.
  const applyFilter = (next: Filter) => {
    if (next === filter || !grid.current) return;
    setFilter(next);
    const pins = Array.from(grid.current.children) as HTMLElement[];
    const show = (el: HTMLElement) => next === "all" || el.dataset.cat === next;
    const swap = () => {
      pins.forEach((el) => (el.hidden = !show(el)));
      if (prefersReducedMotion()) return;
      animate(pins.filter((el) => !el.hidden), {
        opacity: [0, 1],
        y: [24, 0],
        scale: [0.96, 1],
        duration: 650,
        delay: stagger(50),
        ease: "outCubic",
      });
    };
    if (prefersReducedMotion()) return swap();
    animate(pins.filter((el) => !el.hidden), {
      opacity: 0,
      scale: 0.96,
      duration: 220,
      ease: "inQuad",
      onComplete: swap,
    });
  };

  return (
    <section id="board">
      <div className="sec-head">
        <div>
          <div className="eyebrow">The Board</div>
          <h2>Save a pair. Send it to us.</h2>
        </div>
        <div className="chips" role="group" aria-label="Filter the board">
          {CATEGORIES.map((c) => (
            <button key={c.id} className="chip" aria-pressed={filter === c.id} onClick={() => applyFilter(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="board" ref={grid}>
        {PINS.map((pin) =>
          pin.kind === "text" ? (
            <div key={pin.id} className={`pin text ${pin.tone}`} data-cat="text">
              {pin.tone === "stat" ? <div className="num">{pin.title}</div> : <div className="big">{pin.title}</div>}
              <div className="small">{pin.body}</div>
            </div>
          ) : (
            <button
              key={pin.id}
              className="pin"
              data-cat={pin.category}
              aria-label={`${pin.name}, ${pin.colorway}. Open details`}
              onClick={(e) => {
                lastPin.current = e.currentTarget;
                setOpen({ pin, from: e.currentTarget.getBoundingClientRect() });
              }}
            >
              <div className="plate">
                <Image
                  src={pin.image.src}
                  alt={`${pin.name} in ${pin.colorway}`}
                  width={pin.image.width}
                  height={pin.image.height}
                  sizes="(max-width: 480px) 50vw, (max-width: 1240px) 33vw, 300px"
                />
                <span className="tag">{categoryLabel(pin.category)}</span>
                <span className="save">Order</span>
              </div>
              <div className="meta">
                <span className="name">{pin.name}</span>
                <span className="sub">
                  <span>{pin.colorway}</span>
                  <span>DM for price</span>
                </span>
              </div>
            </button>
          ),
        )}
      </div>

      {open && (
        <PinModal
          pin={open.pin}
          from={open.from}
          onClose={() => {
            setOpen(null);
            lastPin.current?.focus();
          }}
        />
      )}
    </section>
  );
}
