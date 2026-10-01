import * as React from "react";
import type { Metadata } from "next";
import { CmsPageView } from "./cms-view";

export const metadata: Metadata = {
  title: "Content Management Studio (CMS) | SAMVAD Admin",
  description:
    "Multi-domain content lifecycle governance across Pages, Services, Industries, Case Studies, Insights, Newsroom, Leadership, and Media Assets.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminCmsPage() {
  return <CmsPageView />;
}
