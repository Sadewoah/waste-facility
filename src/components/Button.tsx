import Link from "next/link";
import { ArrowRight } from "./Icons";

type Variant = "lime" | "dark" | "ghost";
const styles: Record<Variant, string> = {
  lime: "bg-lime text-forest-950 hover:bg-white",
  dark: "bg-forest-900 text-white hover:bg-forest-700",
  ghost: "border border-white/40 text-white hover:bg-white/15",
};

export function ButtonLink({ href, children, variant = "lime", external = false, className = "" }: { href: string; children: React.ReactNode; variant?: Variant; external?: boolean; className?: string }) {
  const cls = `group inline-flex items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors duration-300 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}
