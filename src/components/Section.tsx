import { Reveal } from "./Reveal";

export function SectionHead({ title, copy, className = "" }: { title: React.ReactNode; copy?: React.ReactNode; className?: string }) {
  return (
    <div className={`grid items-end gap-6 md:grid-cols-[1.5fr_1fr] md:gap-16 ${className}`}>
      <Reveal><h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{title}</h2></Reveal>
      {copy && <Reveal delay={100}><div className="max-w-md text-sm leading-relaxed text-mute">{copy}</div></Reveal>}
    </div>
  );
}

export const wrap = "mx-auto w-full max-w-[1200px] px-5 md:px-10";
