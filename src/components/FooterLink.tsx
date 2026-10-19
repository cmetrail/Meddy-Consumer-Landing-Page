"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { scrollTo } from "@/lib/lenis";

export default function FooterLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const anchor = event.currentTarget;
        if (anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
        const destination = new URL(anchor.href);
        const current = new URL(window.location.href);
        const path = (value: string) => value.replace(/\/+$/, "") || "/";
        if (destination.origin === current.origin && path(destination.pathname) === path(current.pathname) && destination.search === current.search && !destination.hash) {
          event.preventDefault();
          scrollTo(0);
        }
      }}
    />
  );
}
