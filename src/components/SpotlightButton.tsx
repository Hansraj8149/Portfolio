"use client";

import clsx from "clsx";
import Link from "next/link";

interface ButtonProps {
  text: string;
  link: string;
  target?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
}


const SpotlightButton = ({text, link, target, icon, variant = "secondary"}: ButtonProps) => {
  const isPrimary = variant === "primary";
  return (
    <div style={{transform: "none"}}>
      <Link href={link} target={target} className="group relative inline-block cursor-pointer rounded-xl bg-background-light p-px font-semibold leading-6 text-text no-underline">
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className={clsx("absolute inset-0 rounded-xl", isPrimary ? "bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_75%)]" :
            "bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(20,184,166,0.6)_0%,rgba(20,184,166,0)_75%)]", "opacity-0 transition-opacity duration-500 group-hover:opacity-100")}>
            {" "}
          </span>{" "}
        </span>
        <div className={clsx("relative z-10 flex items-center gap-2 rounded bg-background px-4 py-2 lg:px-6 lg:py-3 ring-1", isPrimary ? "ring-primary/20" : "ring-white/10")}>
          <span className={clsx(isPrimary ? "text-primary" : "text-white", "lg:text-sm text-xs")}>{text}</span>
          {icon && <span className={clsx(isPrimary ? "text-primary" : "text-white")}>{icon}</span>}
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-fuchsia-400/0 via-gray-400/90 to-fuchsia-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </Link>
    </div>
  );
}
export default SpotlightButton;