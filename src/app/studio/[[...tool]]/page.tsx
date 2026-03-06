"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/** Sanity Studio embedded route */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
