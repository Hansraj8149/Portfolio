import { profile } from "@/content/profile";
import { LogoMark } from "./Logo";

const build = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-6 pb-24 font-mono text-[11px] text-dim lg:pb-6">
      <span className="flex items-center gap-2">
        <LogoMark small className="h-4 w-4 text-muted" />© {new Date().getFullYear()} {profile.name}
      </span>
      <span className="hidden lg:inline">
        Keys: <span className="text-muted">1–5</span> jump · <span className="text-muted">0</span> top
      </span>
      <span className="flex gap-4">
        <a href="/brand" className="hover:text-fg">
          Brand kit
        </a>
        <span>build {build}</span>
      </span>
    </footer>
  );
}
