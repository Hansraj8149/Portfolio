"use client";

import Link from "next/link";
import {cn} from "@/lib/utils";
import React, {MouseEvent, useEffect, useState} from "react";

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
  link?: string;
  target?: string;
  icon?: React.ReactNode;
  text: string;
}

export const RippleButton = React.forwardRef<
  HTMLButtonElement,
  RippleButtonProps
>(
  (
    {
      className,
      rippleColor = "#ffffff",
      duration = "600ms",
      onClick,
      link,
      target,
      icon,
      text,
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{x: number; y: number; size: number; key: number}>
    >([]);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    };

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = {x, y, size, key: Date.now()};
      setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };

    useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1];
        const timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          );
        }, parseInt(duration));
        return () => clearTimeout(timeout);
      }
    }, [buttonRipples, duration]);

    const ButtonContent = (
      <div className="relative flex items-center justify-center gap-2">
        {icon && <span className="text-white">{icon}</span>}
        <span>{text}</span>
      </div>
    );

    return link ? (
      <Link
        href={link}
        target={target}
        className={cn(
          "relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-background px-4 py-2 text-primary transition-all duration-300 hover:bg-background-light",
          className
        )}
      >
        {ButtonContent}
      </Link>
    ) : (
      <button
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-background px-4 py-2 text-primary",
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <div className="relative z-10">{ButtonContent}</div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className="absolute animate-rippling rounded-full bg-background opacity-30"
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: `scale(0)`,
              }}
            />
          ))}
        </span>
      </button>
    );
  }
);

RippleButton.displayName = "RippleButton";
