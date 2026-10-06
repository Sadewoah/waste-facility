type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", "aria-hidden": true };

export const ArrowRight = ({ className = "h-4 w-4" }: P) => <svg {...base} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ArrowDownRight = ({ className = "h-4 w-4" }: P) => <svg {...base} className={className}><path d="M7 7l10 10M17 8v9H8" /></svg>;
export const Plus = ({ className = "h-4 w-4" }: P) => <svg {...base} className={className}><path d="M12 5v14M5 12h14" /></svg>;
export const Menu = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><path d="M4 8h16M4 16h16" /></svg>;
export const Close = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const Check = ({ className = "h-4 w-4" }: P) => <svg {...base} strokeWidth={2.4} className={className}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
export const Pin = ({ className = "h-4 w-4" }: P) => <svg {...base} className={className}><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.800 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
export const Bin = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><path d="M5 7h14l-1.2 12.2a2 2 0 01-2 1.800H8.200a2 2 0 01-2-1.800L5 7zM9 7V5h6v2M3.500 7h17" /></svg>;
export const Truck = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8" /><circle cx="6.500" cy="17.500" r="1.800" /><circle cx="16.500" cy="17.500" r="1.800" /></svg>;
export const Cog = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><circle cx="12" cy="12" r="3.200" /><path d="M12 3v2.500M12 18.500V21M3 12h2.500M18.500 12H21M5.600 5.600l1.800 1.800M16.600 16.600l1.800 1.800M5.600 18.400l1.800-1.800M16.600 7.400l1.800-1.800" /></svg>;
export const Tag = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.500" cy="8.500" r="1.200" /></svg>;
export const Loop = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><path d="M20 12a8 8 0 01-13.600 5.700M4 12a8 8 0 0113.600-5.700M18 3v4h-4M6 21v-4h4" /></svg>;
export const Eye = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><path d="M2 12s3.600-7 10-7 10 7 10 7-3.600 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>;
export const Chart = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
export const Users = ({ className = "h-5 w-5" }: P) => <svg {...base} className={className}><circle cx="9" cy="8" r="3.200" /><path d="M3 20c.5-3.500 3-5.500 6-5.500s5.500 2 6 5.500M16 5.200a3 3 0 010 5.600M18 14.800c1.800.8 3 2.500 3.300 5.200" /></svg>;
