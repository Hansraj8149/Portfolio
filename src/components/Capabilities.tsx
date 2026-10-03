import {
  CreditCard,
  Database,
  Globe,
  RadioTower,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { capabilities, type Capability } from "@/content/profile";

const icons: Record<Capability["icon"], typeof Globe> = {
  smartphone: Smartphone,
  globe: Globe,
  server: Server,
  database: Database,
  sparkles: Sparkles,
  workflow: Workflow,
  card: CreditCard,
  rocket: Rocket,
  radio: RadioTower,
};

export default function Capabilities() {
  return (
    <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c) => {
          const Icon = icons[c.icon];
          return (
            <li key={c.title} className="group flex flex-col bg-panel p-5 transition-colors hover:bg-panel-2 sm:p-6">
              <span className="grid h-11 w-11 place-items-center border border-line-2 text-fg transition-colors group-hover:border-up group-hover:text-up">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.proof}</p>
              <p className="mt-4 font-mono text-[10px] tracking-wider text-dim uppercase">
                Shipped in <span className="text-up">{c.usedIn}</span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {c.tools.map((t) => (
                  <li key={t} className="bg-panel-2 px-2 py-0.5 font-mono text-[11px] text-muted ring-1 ring-line-2">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
    </ul>
  );
}
