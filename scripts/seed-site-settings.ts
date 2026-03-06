/**
 * Seed siteSettings singleton into Sanity CMS.
 * Run: bunx tsx scripts/seed-site-settings.ts
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o2kvv3c9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const siteSettingsDoc = {
  _type: "siteSettings",
  _id: "siteSettings",
  siteName: "La Mer Collection",
  tagline: { _type: "localizedString", vi: "Sống Trong Lòng Vịnh" },
  phone: "+84 259 123 456",
  email: "hello@lamercollection.vn",
  zaloUrl: "https://zalo.me/0259123456",
  address: {
    _type: "localizedText",
    vi: "Vĩnh Hy, Ninh Hải, Ninh Thuận, Việt Nam",
  },
  hours: "Thứ Hai \u2013 Chủ Nhật: 07:00 \u2013 22:00",
};

async function seed() {
  console.log("Seeding siteSettings...");
  await client.createOrReplace(siteSettingsDoc);
  console.log("Done! siteSettings created.");
}

seed().catch(console.error);
