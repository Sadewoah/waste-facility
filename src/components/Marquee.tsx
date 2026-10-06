import { clients } from "@/lib/content";

export function Marquee() {
  const items = clients.map((c) => c.name);
  return (
    <section aria-label="Who we serve" className="mt-14">
      <p className="text-center text-xs text-mute">Built for businesses that generate organic waste</p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-12 pr-12">
          {[...items, ...items].map((n, i) => (
            <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-forest-800">
              <span className="h-2 w-2 rounded-full bg-lime ring-2 ring-forest-800/20" />{n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
