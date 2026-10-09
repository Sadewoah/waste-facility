"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const WORD = "SOMYA";
const type = "text-[min(24vw,26rem)] font-bold leading-none tracking-[-0.04em] whitespace-nowrap";

/**
 * The giant hero word. On scroll it shrinks and flies into the navbar logo slot
 * (#nav-slot), while the nav list (#nav-list) slides from the left edge to its place.
 * Header renders those ids; this component only drives them.
 */
export function HeroDock() {
  const spacer = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const T = title.current!, S = spacer.current!;
    const slot = document.getElementById("nav-slot");
    const brand = document.getElementById("nav-brand");
    const list = document.getElementById("nav-list");
    if (!slot) return;
    let W = 1, H = 1, SX = 0, SY = 0, D = 300, dx = 0;

    const dock = () => {
      const p = Math.min(1, Math.max(0, scrollY / D));
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const r = slot.getBoundingClientRect();
      const s1 = r.width / W;
      const ey = r.top + (r.height - H * s1) / 2;
      T.style.transform = `translate3d(${SX + (r.left - SX) * e}px,${SY + (ey - SY) * e}px,0) scale(${1 + (s1 - 1) * e})`;
      T.style.zIndex = p > 0.7 ? "60" : "5"; // under the 3D canvas first, above the navbar once docked
      T.style.setProperty("--k", String(e));
      T.classList.remove("invisible");
      if (brand) brand.style.opacity = String(Math.max(0, (e - 0.6) / 0.4));
      if (list && list.offsetParent) list.style.transform = `translateX(${-dx * (1 - e)}px)`;
    };
    const measure = () => {
      W = T.offsetWidth; H = T.offsetHeight;
      const r = S.getBoundingClientRect();
      SX = r.left + scrollX; SY = r.top + scrollY;
      D = Math.max(260, innerHeight * 0.5);
      const nav = list?.closest("nav");
      dx = list && nav && list.offsetParent ? list.offsetLeft - nav.clientLeft - parseFloat(getComputedStyle(nav).paddingLeft) : 0;
      dock();
    };

    measure();
    document.fonts?.ready.then(measure);
    addEventListener("scroll", dock, { passive: true });
    addEventListener("resize", measure);
    const ctx = gsap.context(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.from(T.children, { yPercent: 110, duration: 1.1, stagger: 0.06, ease: "power4.out", delay: 0.1 });
    });
    return () => {
      ctx.revert();
      removeEventListener("scroll", dock);
      removeEventListener("resize", measure);
      if (brand) brand.style.opacity = "";
      if (list) list.style.transform = "";
    };
  }, []);

  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 flex select-none justify-center">
        <span ref={spacer} className={`invisible ${type}`}>{WORD}</span>
      </div>
      <p ref={title} aria-hidden className={`dock-title invisible pointer-events-none fixed left-0 top-0 z-[5] origin-top-left select-none overflow-hidden will-change-transform ${type}`}>
        {[...WORD].map((c, i) => <span key={i} className="inline-block">{c}</span>)}
      </p>
    </>
  );
}
