import { ArrowUpRight, CodeXml, FileText, Mail } from "lucide-react";
import { profile } from "@/content/profile";

type IconProps = { className?: string };

// Brand marks (Lucide ships no brand icons).
const GitHub = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);
const LinkedIn = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const XLogo = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z" />
  </svg>
);

const socialIcon: Record<string, React.ComponentType<IconProps>> = {
  GitHub,
  LinkedIn,
  X: XLogo,
  LeetCode: CodeXml,
};

/** Handle shown next to each profile: the last path segment of its URL. */
const handle = (href: string) => {
  const last = new URL(href).pathname.split("/").filter(Boolean).pop() ?? "";
  return last.startsWith("@") ? last : `@${last}`;
};

export default function ContactCard() {
  const rows = [
    ...profile.socials.map((s) => ({ name: s.name, href: s.href, sub: handle(s.href), Icon: socialIcon[s.name] ?? CodeXml })),
    { name: "Resume", href: profile.resume, sub: "PDF · Google Drive", Icon: FileText },
  ];

  return (
    <aside className="panel flex flex-col">
      <div className="panel-head">
        <span className="text-fg">Direct line</span>
        <span className="flex items-center gap-1.5 text-up normal-case">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-up" /> Open to roles
        </span>
      </div>

      <a href={`mailto:${profile.email}`} className="group block border-b border-line p-5 transition-colors hover:bg-panel-2">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-dim uppercase">
          <Mail className="h-3.5 w-3.5" /> Email — fastest reply
        </span>
        <span className="mt-2 block text-[15px] font-medium break-all text-fg group-hover:text-up">{profile.email}</span>
      </a>

      <ul className="divide-y divide-line">
        {rows.map(({ name, href, sub, Icon }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-panel-2"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center border border-line-2 text-muted transition-colors group-hover:border-up group-hover:text-up">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-fg">{name}</span>
                <span className="block truncate font-mono text-[11px] text-dim">{sub}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-dim transition-colors group-hover:text-up" />
            </a>
          </li>
        ))}
      </ul>

      <figure className="mt-auto border-t border-line p-5">
        <blockquote className="font-serif text-2xl leading-snug text-fg italic">
          <span className="mr-1 text-up not-italic">“</span>
          {profile.quote.text}
        </blockquote>
        <figcaption className="mt-3 font-mono text-[10px] tracking-wider text-dim uppercase">— {profile.quote.by}</figcaption>
      </figure>
    </aside>
  );
}
