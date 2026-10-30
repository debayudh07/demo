"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, createScope, eases, stagger, type Scope } from "animejs";
import { categoryLabel, type ProductPin } from "@/data/pins";
import { prefersReducedMotion, waLink } from "@/lib/site";
import { ArrowIcon } from "./Icons";

type Props = { pin: ProductPin; from: DOMRect; onClose: () => void };

export default function PinModal({ pin, from, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope>(null);
  const closing = useRef(false);
  const [size, setSize] = useState<string | null>(pin.sizes.length === 1 ? pin.sizes[0] : null);

  // Zoom the card out of the pin that was clicked.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    card.current?.querySelector<HTMLButtonElement>(".close")?.focus();

    if (!prefersReducedMotion() && card.current) {
      const to = card.current.getBoundingClientRect();
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      scope.current = createScope({ root }).add(() => {
        animate(".modal-bg", { opacity: [0, 1], duration: 300, ease: "linear" });
        animate(".modal-card", {
          x: [dx, 0],
          y: [dy, 0],
          scale: [from.width / to.width, 1],
          opacity: [0.4, 1],
          duration: 650,
          ease: "outExpo",
        });
        animate(".modal-card .plate img", { scale: [1.25, 1], duration: 1100, ease: eases.outElastic(1, 0.7) });
        animate(".modal-info > *", {
          opacity: [0, 1],
          y: [12, 0],
          duration: 500,
          delay: stagger(50, { start: 200 }),
          ease: "outCubic",
        });
      });
    }

    return () => {
      document.body.style.overflow = "";
      scope.current?.revert();
    };
  }, [from]);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    if (prefersReducedMotion() || !card.current || !root.current) return onClose();
    animate(card.current, { scale: 0.92, opacity: 0, duration: 220, ease: "inQuad" });
    animate(root.current.querySelector(".modal-bg")!, { opacity: 0, duration: 260, ease: "linear", onComplete: onClose });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const message = `Hi Sneakers Planet! I want the ${pin.name} (${pin.colorway})${
    size && size !== "One size" ? `, UK ${size}` : ""
  }. Is it available?`;

  return (
    <div className="modal" ref={root}>
      <div className="modal-bg" onClick={close} />
      <div className="modal-card" ref={card} role="dialog" aria-modal="true" aria-labelledby="pin-title">
        <button className="close" onClick={close} aria-label="Close">
          ×
        </button>
        <div className="plate">
          <Image
            src={pin.image.src}
            alt={`${pin.name} in ${pin.colorway}`}
            width={pin.image.width}
            height={pin.image.height}
            sizes="(max-width: 900px) 100vw, 460px"
          />
        </div>
        <div className="modal-info">
          <span className="eyebrow">
            {categoryLabel(pin.category)} · {pin.colorway}
          </span>
          <h3 id="pin-title">{pin.name}</h3>
          <p>{pin.description}</p>
          <div>
            <div className="note" style={{ marginBottom: 8 }}>
              {pin.sizes.length > 1 ? "Pick a size (UK)" : "Size"}
            </div>
            <div className="sizes">
              {pin.sizes.map((s) => (
                <button key={s} className="size" aria-pressed={size === s} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <a className="btn" href={waLink(message)} target="_blank" rel="noopener">
            Order on WhatsApp <ArrowIcon />
          </a>
          <div className="note">
            {size ? "Opens WhatsApp with your pair and size typed in." : "No size yet? We'll help you pick on chat."}
            <br />
            COD available · Delivery all over India
          </div>
        </div>
      </div>
    </div>
  );
}
