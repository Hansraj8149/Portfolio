"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const orderTypes = ["Full-time role", "Contract / project", "Just saying hi"];

type State = "idle" | "sending" | "filled" | "rejected";

const field =
  "w-full border border-line-2 bg-bg px-3 py-2.5 text-fg placeholder:text-dim transition-colors focus:border-up focus:outline-none";
const label = "mb-1.5 block font-mono text-[10px] tracking-wider text-dim uppercase";

export default function OrderTicket() {
  const [type, setType] = useState(orderTypes[0]);
  const [state, setState] = useState<State>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const message = `[${type}] ${data.message}`;
    const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const user = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

    if (!service || !template || !user) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        `${type} — ${data.name}`
      )}&body=${encodeURIComponent(data.message)}`;
      return;
    }

    setState("sending");
    try {
      // Loaded on submit so the form costs nothing until it's used.
      const emailjs = (await import("emailjs-com")).default;
      // Common variable names are all sent so the existing EmailJS template keeps working.
      await emailjs.send(
        service,
        template,
        {
          name: data.name,
          email: data.email,
          message,
          from_name: data.name,
          from_email: data.email,
          reply_to: data.email,
          user_name: data.name,
          user_email: data.email,
        },
        user
      );
      setState("filled");
    } catch (err) {
      console.error(err);
      setState("rejected");
    }
  };

  if (state === "filled") {
    return (
      <div className="panel">
        <div className="panel-head">
          <span className="text-up">● Order filled</span>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-2xl font-semibold tracking-tight">Message received.</p>
          <p className="mt-2 text-muted">I&apos;ll get back to you soon — usually within a day.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel">
      <div className="panel-head">
        <span>
          <span className="text-fg">Order ticket</span> · {profile.symbol}
        </span>
        <span>Limit · GTC</span>
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        <fieldset>
          <legend className={label}>Order type</legend>
          <div className="grid grid-cols-1 gap-px border border-line-2 bg-line-2 sm:grid-cols-3">
            {orderTypes.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => setType(t)}
                className={cn(
                  "px-3 py-2.5 font-mono text-xs transition-colors",
                  type === t ? "bg-fg font-semibold text-bg" : "bg-bg text-muted hover:text-fg"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>
              Name
            </label>
            <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              className={field}
              placeholder="you@company.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className={label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={cn(field, "resize-y")}
            placeholder="What are you building?"
          />
        </div>

        {state === "rejected" && (
          <p className="font-mono text-xs text-down" role="alert">
            Order rejected — something went wrong. Email me directly at {profile.email}.
          </p>
        )}

        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full bg-up py-3 font-mono text-sm font-semibold text-bg transition-[filter] hover:brightness-110 disabled:opacity-60"
        >
          {state === "sending" ? "Routing order…" : "Submit order →"}
        </button>
      </div>
    </form>
  );
}
