"use client";
import { useState } from "react";
import { clients } from "@/lib/content";
import { ArrowRight } from "./Icons";

const volumes = ["Under 50 kg/day", "50–100 kg/day", "100–250 kg/day", "250–500 kg/day", "500 kg–1 ton/day", "Above 1 ton/day"];
const needs = ["Organic Waste Collection", "SOMYA Bins", "Transportation", "Organic Waste Processing", "Compost Return", "Consultation"];
const frequencies = ["Daily", "Several times a week", "Weekly", "Not sure yet"];
const field = "mt-2 w-full rounded-xl border border-forest-800/10 bg-lime-soft px-4 py-3.5 text-sm outline-none transition focus:border-forest-700 focus:bg-white";
const label = "block text-xs font-semibold text-forest-900";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (n: string) => setSelected((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, serviceNeeds: selected }) });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl bg-lime p-10">
        <h3 className="text-3xl font-semibold tracking-[-0.03em]">Thank you. We've got your request.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-forest-900/80">Our team will review your waste flow and get back to you about the right service approach.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 text-xl font-semibold tracking-[-0.02em]">Personal information</legend>
        <label className={label}>Full name<input name="name" required autoComplete="name" className={field} /></label>
        <label className={label}>Company / property name<input name="company" required autoComplete="organization" className={field} /></label>
        <label className={label}>Email<input name="email" type="email" required autoComplete="email" className={field} /></label>
        <label className={label}>WhatsApp / phone number<input name="phone" type="tel" required autoComplete="tel" className={field} /></label>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 text-xl font-semibold tracking-[-0.02em]">Business information</legend>
        <label className={label}>Business type
          <select name="businessType" required defaultValue="" className={field}>
            <option value="" disabled>Select one</option>
            {clients.map((c) => <option key={c.name}>{c.name}</option>)}
            <option>Other</option>
          </select>
        </label>
        <label className={label}>Location<input name="location" required className={field} /></label>
        <label className={`${label} sm:col-span-2`}>Estimated organic waste per day
          <select name="volume" required defaultValue="" className={field}>
            <option value="" disabled>Select a range</option>
            {volumes.map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend className="mb-5 text-xl font-semibold tracking-[-0.02em]">Service need</legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((n) => {
            const on = selected.includes(n);
            return (
              <button type="button" key={n} onClick={() => toggle(n)} aria-pressed={on} className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${on ? "border-lime bg-lime" : "border-forest-800/15 bg-lime-soft hover:border-forest-700"}`}>{n}</button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="grid gap-5">
        <legend className="mb-5 text-xl font-semibold tracking-[-0.02em]">Additional information</legend>
        <label className={label}>Preferred collection frequency
          <select name="frequency" defaultValue="" className={field}>
            <option value="">Select one</option>
            {frequencies.map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
        <label className={label}>Message / operational notes<textarea name="message" rows={5} className={field} /></label>
      </fieldset>

      {status === "error" && <p role="alert" className="text-sm font-medium text-red-700">Your request didn&apos;t send. Check your connection and try again.</p>}
      <button disabled={status === "sending"} className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-forest-900 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-forest-700 disabled:opacity-60 sm:w-auto">
        {status === "sending" ? "Sending…" : "Request a consultation"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
