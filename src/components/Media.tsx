import { photos } from "@/lib/images";

export type MediaKind = "hills" | "windrows" | "canopy" | "pile" | "bins" | "soil" | "pads";

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = <T,>(r: () => number, arr: T[]) => arr[Math.floor(r() * arr.length)];
const f = (n: number) => Math.round(n * 10) / 10;

function Grain({ id, w, h, opacity = 0.14 }: { id: string; w: number; h: number; opacity?: number }) {
  return (
    <>
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${opacity} 0`} />
      </filter>
      <rect width={w} height={h} filter={`url(#${id})`} />
    </>
  );
}

function Hills({ seed, id }: { seed: number; id: string }) {
  const r = rng(seed);
  const W = 1600, H = 900;
  const ridge = (base: number, amp: number, step: number) => {
    let d = `M0 ${H} L0 ${base}`;
    for (let x = 0; x <= W + step; x += step) d += ` L${x} ${f(base - r() * amp)}`;
    return d + ` L${W} ${H} Z`;
  };
  const trees = Array.from({ length: 1700 }, () => {
    const y = 478 + Math.pow(r(), 0.9) * 430;
    const depth = (y - 478) / 430;
    return { x: r() * W, y, r: 4 + depth * 14 + r() * 4, c: pick(r, ["#244d29", "#2f5e2f", "#3a7036", "#1d4223", "#477a3a"]) };
  });
  // windrow pad in perspective
  const A = [250, 560], B = [1480, 470], C = [1560, 700], D = [380, 860];
  const lerp = (p: number[], q: number[], t: number) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const N = 22;
  const stripes = Array.from({ length: N }, (_, i) => {
    const t0 = i / N, t1 = (i + 0.62) / N;
    const a = lerp(A, D, t0), b = lerp(B, C, t0), c = lerp(B, C, t1), d = lerp(A, D, t1);
    return { pts: [a, b, c, d].map((p) => p.map(f).join(",")).join(" "), light: i % 2 === 0 };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f6f1" /><stop offset="1" stopColor="#c9d4c6" />
        </linearGradient>
        <linearGradient id={`${id}-fog`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.75" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-pad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <path d={ridge(360, 120, 70)} fill="#9fb09b" />
      <path d={ridge(420, 90, 50)} fill="#6f8a69" />
      <rect y="330" width={W} height="140" fill={`url(#${id}-fog)`} />
      <path d={ridge(480, 50, 40)} fill="#3f6a3d" />
      <rect y="470" width={W} height={H - 470} fill="#34602f" />
      {trees.map((t, i) => <circle key={i} cx={f(t.x)} cy={f(t.y)} r={f(t.r)} fill={t.c} opacity="0.9" />)}
      <polygon points={[A, B, C, D].map((p) => p.join(",")).join(" ")} fill="#2c2a24" />
      {stripes.map((s, i) => <polygon key={i} points={s.pts} fill={s.light ? "#5b5342" : "#443e31"} />)}
      <polygon points={[A, B, C, D].map((p) => p.join(",")).join(" ")} fill={`url(#${id}-pad)`} />
      <polygon points="0,780 240,700 330,900 0,900" fill="#8fbf3f" opacity="0.85" />
      <polygon points="0,720 180,650 240,700 0,780" fill="#6fa233" opacity="0.9" />
      <Grain id={`${id}-g`} w={W} h={H} />
    </svg>
  );
}

function Windrows({ seed, id }: { seed: number; id: string }) {
  const r = rng(seed);
  const W = 400, H = 500;
  const rows = Array.from({ length: 16 }, (_, i) => ({ y: i * 36 - 40, w: 520, c: i % 2 ? "#4f3d29" : "#5f4a31", off: r() * 20 }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6c8f3f" /><stop offset="1" stopColor="#4f7a2e" /></linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      <g transform="rotate(-14 200 250)">
        {rows.map((o, i) => (
          <g key={i}>
            <rect x={-60 + o.off} y={o.y} width={o.w} height="26" rx="13" fill={o.c} />
            <rect x={-60 + o.off} y={o.y + 4} width={o.w} height="5" rx="2.5" fill="#fff" opacity="0.18" />
          </g>
        ))}
      </g>
      <Grain id={`${id}-g`} w={W} h={H} />
    </svg>
  );
}

function Canopy({ seed, id }: { seed: number; id: string }) {
  const r = rng(seed);
  const W = 400, H = 500;
  const pads = Array.from({ length: 12 }, (_, i) => ({ x: (i % 3) * 112 - 10, y: Math.floor(i / 3) * 118 - 10 }));
  const trees = Array.from({ length: 150 }, () => ({ x: r() * W, y: r() * H, r: 9 + r() * 20, c: pick(r, ["#2d5d2c", "#3b7436", "#255226", "#4a8540", "#1f4a24"]) }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width={W} height={H} fill="#2a5a2c" />
      <g transform="rotate(-22 200 250)">
        {pads.map((p, i) => <rect key={i} x={p.x + 20} y={p.y + 30} width="100" height="108" rx="3" fill={i % 2 ? "#cddfe6" : "#b6cdd8"} stroke="#e8f1f4" strokeWidth="2" />)}
      </g>
      {trees.map((t, i) => <circle key={i} cx={f(t.x)} cy={f(t.y)} r={f(t.r)} fill={t.c} opacity={0.55 + (i % 3) * 0.15} />)}
      <Grain id={`${id}-g`} w={W} h={H} />
    </svg>
  );
}

function Pile({ seed, id }: { seed: number; id: string }) {
  const r = rng(seed);
  const W = 400, H = 500;
  const blobs = Array.from({ length: 70 }, () => {
    const cx = 80 + r() * 240, cy = 120 + r() * 300, rr = 8 + r() * 34;
    const pts = Array.from({ length: 9 }, (_, k) => {
      const a = (k / 9) * Math.PI * 2, rad = rr * (0.65 + r() * 0.6);
      return `${f(cx + Math.cos(a) * rad)},${f(cy + Math.sin(a) * rad)}`;
    }).join(" ");
    return { pts, c: pick(r, ["#4a3a26", "#5d4a2e", "#3a4a26", "#6b5a38", "#2e2619", "#7b6a45"]) };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width={W} height={H} fill="#8c8c78" />
      <rect y="0" width={W} height="90" fill="#7a7a68" />
      {[0, 1, 2].map((i) => <rect key={i} x={30 + i * 120} y={20} width="86" height="70" rx="10" fill="#3b403c" transform={`rotate(${(i - 1) * 9} ${73 + i * 120} 55)`} />)}
      {blobs.map((b, i) => <polygon key={i} points={b.pts} fill={b.c} opacity="0.9" />)}
      <Grain id={`${id}-g`} w={W} h={H} opacity={0.2} />
    </svg>
  );
}

function Bins({ seed, id }: { seed: number; id: string }) {
  const W = 400, H = 500;
  const cells = Array.from({ length: 12 }, (_, i) => ({ x: 70 + (i % 3) * 130 + (Math.floor(i / 3) % 2) * 20, y: 70 + Math.floor(i / 3) * 120 }));
  void seed;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width={W} height={H} fill="#e4ead8" />
      {Array.from({ length: 9 }, (_, i) => <line key={i} x1="0" x2={W} y1={i * 60} y2={i * 60} stroke="#d3dbc4" strokeWidth="2" />)}
      {cells.map((c, i) => (
        <g key={i}>
          <circle cx={c.x + 5} cy={c.y + 8} r="46" fill="#000" opacity="0.1" />
          <circle cx={c.x} cy={c.y} r="46" fill="#0f4030" />
          <circle cx={c.x} cy={c.y} r="34" fill="#165a43" />
          <circle cx={c.x} cy={c.y} r="9" fill="#c9f245" />
        </g>
      ))}
      <Grain id={`${id}-g`} w={W} h={H} opacity={0.1} />
    </svg>
  );
}

function Soil({ seed, id }: { seed: number; id: string }) {
  const r = rng(seed);
  const W = 400, H = 500;
  const specks = Array.from({ length: 420 }, () => ({ x: r() * W, y: r() * H, r: 0.8 + r() * 3, c: pick(r, ["#2a1d12", "#5a4129", "#6e5333", "#1f150d", "#7f6540"]) }));
  const sprouts = Array.from({ length: 26 }, () => ({ x: 30 + r() * 340, y: 40 + r() * 420, r: 4 + r() * 9 }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width={W} height={H} fill="#3d2c1c" />
      {specks.map((s, i) => <circle key={i} cx={f(s.x)} cy={f(s.y)} r={f(s.r)} fill={s.c} />)}
      {sprouts.map((s, i) => (
        <g key={i}>
          <circle cx={f(s.x)} cy={f(s.y)} r={f(s.r)} fill="#8fcf3a" opacity="0.9" />
          <circle cx={f(s.x + s.r * 0.6)} cy={f(s.y - s.r * 0.4)} r={f(s.r * 0.7)} fill="#c9f245" opacity="0.9" />
        </g>
      ))}
      <Grain id={`${id}-g`} w={W} h={H} opacity={0.18} />
    </svg>
  );
}

function Pads({ seed, id }: { seed: number; id: string }) {
  const r = rng(seed);
  const W = 400, H = 500;
  const roofs = [
    { x: 40, y: 50, w: 150, h: 100 }, { x: 210, y: 50, w: 150, h: 100 },
    { x: 40, y: 190, w: 320, h: 90 }, { x: 40, y: 320, w: 100, h: 130 }, { x: 160, y: 320, w: 200, h: 130 },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width={W} height={H} fill="#cdd5c3" />
      <rect x="0" y="150" width={W} height="40" fill="#b3bba9" />
      <rect x="0" y="280" width={W} height="40" fill="#b3bba9" />
      {roofs.map((o, i) => (
        <g key={i}>
          <rect x={o.x + 5} y={o.y + 7} width={o.w} height={o.h} fill="#000" opacity="0.12" />
          <rect x={o.x} y={o.y} width={o.w} height={o.h} rx="4" fill={i === 4 ? "#1b5c42" : "#124632"} />
          {Array.from({ length: Math.floor(o.w / 14) }, (_, k) => <line key={k} x1={o.x + 7 + k * 14} x2={o.x + 7 + k * 14} y1={o.y} y2={o.y + o.h} stroke="#fff" strokeOpacity="0.12" strokeWidth="2" />)}
        </g>
      ))}
      {Array.from({ length: 4 }, (_, i) => <rect key={i} x={60 + i * 80 + r() * 8} y={162} width="38" height="14" rx="3" fill="#c9f245" />)}
      <Grain id={`${id}-g`} w={W} h={H} opacity={0.1} />
    </svg>
  );
}

export function Media({ kind, seed = 1, name, alt = "", className = "" }: { kind: MediaKind; seed?: number; name?: string; alt?: string; className?: string }) {
  const src = name ? photos[name] : undefined;
  const id = `${kind}-${seed}`;
  return (
    <div className={`${/\b(absolute|relative|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0" role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
          {kind === "hills" && <Hills seed={seed} id={id} />}
          {kind === "windrows" && <Windrows seed={seed} id={id} />}
          {kind === "canopy" && <Canopy seed={seed} id={id} />}
          {kind === "pile" && <Pile seed={seed} id={id} />}
          {kind === "bins" && <Bins seed={seed} id={id} />}
          {kind === "soil" && <Soil seed={seed} id={id} />}
          {kind === "pads" && <Pads seed={seed} id={id} />}
        </div>
      )}
    </div>
  );
}
