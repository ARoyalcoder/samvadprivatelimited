"use client";

import * as React from "react";
import Link from "next/link";
import { GlobalNavbar } from "@samvad/ui";
import { useSearch } from "@/lib/search/search-context";

export function Header() {
  const { openSearch } = useSearch();

  return (
    <GlobalNavbar
      ctaText="Let's Talk"
      ctaHref="/#contact"
      enableScrollAwareHide={true}
      linkComponent={Link}
      onSearchClick={() => openSearch()}
    />
  );
}
