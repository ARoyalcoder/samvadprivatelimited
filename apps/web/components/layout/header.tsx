"use client";

import * as React from "react";
import Link from "next/link";
import { GlobalNavbar } from "@samvad/ui";

export function Header() {
  return (
    <GlobalNavbar
      ctaText="Let's Talk"
      ctaHref="/#contact"
      enableScrollAwareHide={true}
      linkComponent={Link}
    />
  );
}
