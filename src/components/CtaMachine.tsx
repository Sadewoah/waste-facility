"use client";
import { useState } from "react";
import { useT } from "@/lib/i18n/client";
import { MachineView } from "./MachineView";

const FRONT = -0.5;
const BACK = FRONT + Math.PI;

/** Desktop-only 3D machine for the CTA, with a Front / Back switch so people can see the rear of the Rapid Digester. */
export function CtaMachine() {
  const t = useT();
  const [side, setSide] = useState<"front" | "back">("front");
  const btn = (on: boolean) =>
    `rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300 ${on ? "bg-lime text-forest-950" : "text-white/80 hover:bg-white/10 hover:text-white"}`;
  return (
    <div className="relative h-[340px] w-full sm:h-[420px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[42%]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <MachineView pose="controlled" yaw={FRONT} yawTarget={side === "front" ? FRONT : BACK} fill={0.74} />
      </div>
      <div role="group" aria-label={t("Machine view")} className="absolute inset-x-0 bottom-7 flex justify-center">
        <div className="flex gap-1 rounded-full border border-white/20 bg-forest-950/50 p-1 backdrop-blur-md">
          <button type="button" aria-pressed={side === "front"} aria-label={t("Show the front of the machine")} onClick={() => setSide("front")} className={btn(side === "front")}>{t("Front")}</button>
          <button type="button" aria-pressed={side === "back"} aria-label={t("Show the back of the machine")} onClick={() => setSide("back")} className={btn(side === "back")}>{t("Back")}</button>
        </div>
      </div>
    </div>
  );
}
