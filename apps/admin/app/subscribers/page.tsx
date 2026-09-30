import * as React from "react";
import type { Metadata } from "next";
import { SubscribersView } from "./subscribers-view";

export const metadata: Metadata = {
  title: "Subscriber Intelligence Management | SAMVAD Admin",
  description:
    "Executive subscriber directory, consent verification, and automated RFC 8058 opt-out compliance.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminSubscribersPage() {
  return <SubscribersView />;
}
