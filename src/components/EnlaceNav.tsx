"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Enlace de navegación que marca la página actual con aria-current. */
export default function EnlaceNav({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const ruta = usePathname();
  const actual = href === "/" ? ruta === "/" : ruta.startsWith(href);
  return (
    <Link href={href} className={className} aria-current={actual ? "page" : undefined}>
      {children}
    </Link>
  );
}
