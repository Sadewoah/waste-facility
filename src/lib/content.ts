import type { MediaKind } from "@/components/Media";

export const services = [
  { title: "Collection", icon: "bin", kind: "bins" as MediaKind, text: "Dedicated SOMYA Bins and scheduled collection designed around the client's organic waste volume.", bullets: ["Dedicated SOMYA Bins", "Scheduled collection", "Sized to your organic waste volume"] },
  { title: "Transportation", icon: "truck", kind: "pads" as MediaKind, text: "Collected organic waste is transported to the SOMYA Waste Facility in Denpasar.", bullets: ["SOMYA Pickup logistics", "Straight to the Denpasar facility", "Clean bins replace filled ones"] },
  { title: "Processing", icon: "cog", kind: "windrows" as MediaKind, text: "Organic waste is processed through the Rapid Digester and downstream processing system.", bullets: ["Rapid Digester, approximately 8 hours", "Output is Pre-Compost", "Downstream processing follows"] },
  { title: "Traceability & Finishing", icon: "tag", kind: "soil" as MediaKind, text: "Waste and output are identified by client, followed by curing, bio-activator treatment, and packaging.", bullets: ["Identified by client", "Curing and bio-activator treatment", "Packaged to agreed specification"] },
  { title: "Return & Utilization", icon: "loop", kind: "canopy" as MediaKind, text: "Finished compost can be returned to the client or allocated for landscaping, farmers, government programs, or CSR initiatives according to the applicable arrangement.", bullets: ["Returned to the client", "Landscaping, farmers, government, CSR", "According to the applicable arrangement"] },
];

export const steps = [
  { t: "Organic Waste Generation", d: "Source-separated at your business." },
  { t: "SOMYA Bins", d: "Provided to match your volume." },
  { t: "Daily Collection", d: "Filled bins collected on the agreed schedule." },
  { t: "Bin Replacement", d: "Clean SOMYA Bins swapped in." },
  { t: "Transportation", d: "SOMYA Pickup to the Denpasar facility." },
  { t: "Rapid Digester", d: "Organic waste is processed.", time: "≈ 8 hours" },
  { t: "Pre-Compost", d: "The Rapid Digester output, not yet finished compost." },
  { t: "Client Labeling", d: "Identified by client for traceability." },
  { t: "Curing", d: "Pre-Compost matures.", time: "≈ 1 week" },
  { t: "Bio-Activator Treatment", d: "Finishing treatment for the compost material.", time: "≈ 1 week" },
  { t: "Packaging", d: "Packed to the agreed specification." },
  { t: "Compost Ready", d: "Prepared for delivery or handover." },
  { t: "Utilization", d: "Gardens, farmers, government programs, CSR." },
];

export const clients = [
  { name: "Hotels & Resorts", line: "Kitchen and garden waste from daily guest operations.", kind: "pads" as MediaKind },
  { name: "Restaurants & Cafés", line: "Food prep and plate waste, collected on a schedule.", kind: "bins" as MediaKind },
  { name: "Beach Clubs", line: "High-volume food and beverage waste, handled cleanly.", kind: "canopy" as MediaKind },
  { name: "Villas & Villa Management", line: "One organic waste routine across managed properties.", kind: "soil" as MediaKind },
  { name: "Events & Catering", line: "Structured organic waste handling for peak days.", kind: "pile" as MediaKind },
  { name: "Landscaping & Garden Maintenance", line: "Green waste from gardens and grounds.", kind: "windrows" as MediaKind },
  { name: "Commercial Properties", line: "Organic waste from offices, malls and business facilities.", kind: "pads" as MediaKind },
  { name: "Public / Community / Government Programs", line: "Organic waste programs for villages and communities.", kind: "canopy" as MediaKind },
  { name: "Agricultural / Farming Partners", line: "A route for compost to return to productive land.", kind: "soil" as MediaKind },
];

export const benefits = [
  { icon: "truck", t: "Reliable Collection", d: "Scheduled collection and clean-bin replacement." },
  { icon: "users", t: "Operational Support", d: "Designed to integrate into the client's daily waste-handling workflow." },
  { icon: "eye", t: "Traceability", d: "Client identification helps maintain visibility from collection to compost output." },
  { icon: "cog", t: "Integrated Processing", d: "Collection, transportation, rapid digestion, curing, treatment, and packaging are connected in one system." },
  { icon: "loop", t: "Circular Output", d: "Organic waste becomes a usable resource instead of ending its journey at disposal." },
  { icon: "chart", t: "Reporting Potential", d: "The system can support transparent data reporting for clients, partners, and relevant stakeholders." },
];

export const loop = ["Business", "Organic waste", "SOMYA Bins", "Collection", "SOMYA Waste Facility", "Processing", "Pre-Compost", "Curing + finishing", "Compost", "Gardens, landscaping, farmers, CSR"];

export const impact = [
  { label: "Organic Waste Processed", unit: "kg", value: null as number | null },
  { label: "Business Partners", unit: "", value: null as number | null },
  { label: "Collections Completed", unit: "", value: null as number | null },
  { label: "Compost Returned / Recovered", unit: "kg", value: null as number | null },
];
