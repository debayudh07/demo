"use client";

import { useState } from "react";
import { SITE, waLink } from "@/lib/site";
import { ArrowIcon } from "./Icons";

function CopyRow({ label, value, copy }: { label: string; value: string; copy: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const val = e.currentTarget.parentElement?.querySelector(".val");
    try {
      await navigator.clipboard.writeText(copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard refused: select the text so it can be copied by hand.
      if (!val) return;
      const range = document.createRange();
      range.selectNodeContents(val);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  };
  return (
    <div className="row">
      <div>
        <div className="label">{label}</div>
        <div className="val">{value}</div>
      </div>
      <button className="copy" onClick={onCopy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact">
      <div className="cta">
        <div>
          <div className="eyebrow">Find your pair</div>
          <h2>Your next pair is one message away.</h2>
          <a className="btn" href={waLink("Hi Sneakers Planet! I'd like to order a pair.")} target="_blank" rel="noopener">
            Chat on WhatsApp <ArrowIcon />
          </a>
        </div>
        <div className="contact">
          <CopyRow label="WhatsApp" value={SITE.whatsappDisplay} copy={`+${SITE.whatsapp}`} />
          <CopyRow label="Instagram" value={`@${SITE.handle}`} copy={SITE.instagram} />
        </div>
      </div>
    </section>
  );
}
