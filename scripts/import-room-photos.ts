/**
 * Import room photos from local directory into Sanity CMS.
 * Maps folder names to properties/rooms and uploads images as gallery.
 *
 * Usage: npx tsx scripts/import-room-photos.ts
 */
import { createClient } from "next-sanity";
import fs from "fs";
import path from "path";

const PHOTOS_DIR = "/Users/fix/Downloads/Phòng La Mer";

const client = createClient({
  projectId: "o2kvv3c9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);

function isImage(f: string) {
  return IMAGE_EXTS.has(path.extname(f).toLowerCase());
}

function findImagesRecursive(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findImagesRecursive(full));
    } else if (isImage(entry.name)) {
      results.push(full);
    }
  }
  return results.sort();
}

async function getImages(dir: string) {
  return findImagesRecursive(dir);
}

async function uploadImage(filePath: string) {
  const data = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";
  const asset = await client.assets.upload("image", data, {
    filename: path.basename(filePath),
    contentType,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

// ── Mapping definitions ──

interface RoomMapping {
  propertySlug: string;
  roomSlug: string; // empty = property-level images
  folder: string;
}

interface SharedMapping {
  folder: string;
  targets: { propertySlug: string; roomSlug: string }[];
}

// Direct 1:1 mappings
const directMappings: RoomMapping[] = [
  // LC rooms
  ...[
    "101",
    "102",
    "201",
    "203",
    "204",
    "205",
    "206",
    "207",
    "208",
    "209",
    "210",
    "211",
    "212",
  ].map((n) => ({
    propertySlug: "homestay-lang-chai",
    roomSlug: `p${n}`,
    folder: `LC - P${n}`,
  })),
  // LC property-level
  {
    propertySlug: "homestay-lang-chai",
    roomSlug: "",
    folder: "LC - LÀNG CHÀI",
  },
  // XL Tầng 2
  { propertySlug: "xom-luoi-tang-2", roomSlug: "oc", folder: "XL - ỐC" },
  { propertySlug: "xom-luoi-tang-2", roomSlug: "so", folder: "XL - SÒ" },
  { propertySlug: "xom-luoi-tang-2", roomSlug: "cua", folder: "XL - CUA" },
  { propertySlug: "xom-luoi-tang-2", roomSlug: "ghe", folder: "XL - GHẸ" },
  { propertySlug: "xom-luoi-tang-2", roomSlug: "tom", folder: "XL - TÔM" },
  { propertySlug: "xom-luoi-tang-2", roomSlug: "nhum", folder: "XL - NHUM" },
  { propertySlug: "xom-luoi-tang-2", roomSlug: "muc", folder: "XL - MỰC" },
  // XL Tầng 3
  { propertySlug: "xom-luoi-tang-3", roomSlug: "ca-co", folder: "XL - Cá Cờ" },
  {
    propertySlug: "xom-luoi-tang-3",
    roomSlug: "ca-thu",
    folder: "XL - Cá Thu",
  },
  {
    propertySlug: "xom-luoi-tang-3",
    roomSlug: "ca-nuc",
    folder: "XL - Cá Nục",
  },
  {
    propertySlug: "xom-luoi-tang-3",
    roomSlug: "ca-chim",
    folder: "XL - Cá Chim",
  },
  {
    propertySlug: "xom-luoi-tang-3",
    roomSlug: "ca-bop",
    folder: "XL - Cá Bóp",
  },
  { propertySlug: "xom-luoi-tang-3", roomSlug: "ca-mu", folder: "XL - Cá Mú" },
  {
    propertySlug: "xom-luoi-tang-3",
    roomSlug: "ca-nhong",
    folder: "XL - Cá Nhồng",
  },
  {
    propertySlug: "xom-luoi-tang-3",
    roomSlug: "ca-trich",
    folder: "XL - Cá Trích",
  },
  // XL Tầng 4
  {
    propertySlug: "xom-luoi-tang-4",
    roomSlug: "bao-ngu",
    folder: "XL - Bào Ngư",
  },
  {
    propertySlug: "xom-luoi-tang-4",
    roomSlug: "sao-bien",
    folder: "XL - Sao Biển",
  },
  {
    propertySlug: "xom-luoi-tang-4",
    roomSlug: "bach-tuoc",
    folder: "XL - Bạch Tuộc",
  },
  {
    propertySlug: "xom-luoi-tang-4",
    roomSlug: "ngoc-trai",
    folder: "XL - Ngọc Trai",
  },
  // Heritage Villas
  {
    propertySlug: "villa-bien",
    roomSlug: "villa-bien",
    folder: "VILLA - BIỂN",
  },
  {
    propertySlug: "villa-chai",
    roomSlug: "villa-chai",
    folder: "VILLA - CHÀI",
  },
  { propertySlug: "villa-gio", roomSlug: "villa-gio", folder: "VILLA - GIÓ" },
  { propertySlug: "villa-hoa", roomSlug: "villa-hoa", folder: "VILLA - HOA" },
  {
    propertySlug: "villa-luoi",
    roomSlug: "villa-luoi",
    folder: "VILLA - LƯỚI",
  },
  { propertySlug: "villa-may", roomSlug: "villa-may", folder: "VILLA - MÂY" },
  {
    propertySlug: "villa-nang",
    roomSlug: "villa-nang",
    folder: "VILLA - NẮNG",
  },
  {
    propertySlug: "villa-song",
    roomSlug: "villa-song",
    folder: "VILLA - SÓNG",
  },
  {
    propertySlug: "villa-thuyen",
    roomSlug: "villa-thuyen",
    folder: "VILLA - THUYỀN",
  },
  {
    propertySlug: "villa-thung",
    roomSlug: "villa-thung",
    folder: "VILLA - THÚNG",
  },
  {
    propertySlug: "nha-ba-huong",
    roomSlug: "nha-ba-huong",
    folder: "VILLA - NHÀ BÀ HƯƠNG",
  },
  {
    propertySlug: "nha-ba-ngoai",
    roomSlug: "nha-ba-ngoai",
    folder: "VILLA - NHÀ BÀ NGOẠI",
  },
  { propertySlug: "nha-ca", roomSlug: "nha-ca", folder: "VILLA - NHÀ CÁ" },
  {
    propertySlug: "nha-nhu-y",
    roomSlug: "nha-nhu-y",
    folder: "VILLA - NHÀ NHƯ Ý",
  },
  {
    propertySlug: "nha-ong-ngoai",
    roomSlug: "nha-ong-ngoai",
    folder: "VILLA - NHÀ ÔNG NGOẠI",
  },
  {
    propertySlug: "nha-hoa-dao",
    roomSlug: "nha-hoa-dao",
    folder: "Nhà Hoa Đào",
  },
  // Santo individual
  { propertySlug: "santo-ri", roomSlug: "santo-ri", folder: "ST - SANTORI" },
  { propertySlug: "santo-li", roomSlug: "santo-li", folder: "ST - SANTOLI" },
  { propertySlug: "santo-di", roomSlug: "santo-di", folder: "ST - SANTODI" },
  { propertySlug: "santo-si", roomSlug: "santo-si", folder: "ST - SANTOSI" },
  { propertySlug: "santo-vi", roomSlug: "santo-vi", folder: "ST - SANTOVI" },
  { propertySlug: "santo-san", roomSlug: "santo-san", folder: "ST - SANTOSAN" },
];

// Shared mappings (1 folder → multiple properties/rooms)
const sharedMappings: SharedMapping[] = [
  {
    folder: "LÀNG EM ",
    targets: [
      { propertySlug: "lang-em-1", roomSlug: "lang-em-1" },
      { propertySlug: "lang-em-2", roomSlug: "lang-em-2" },
    ],
  },
  {
    folder: "XC - C1,2,3,4",
    targets: [
      { propertySlug: "xom-chai", roomSlug: "c1" },
      { propertySlug: "xom-chai", roomSlug: "c2" },
      { propertySlug: "xom-chai", roomSlug: "c3" },
      { propertySlug: "xom-chai", roomSlug: "c4" },
    ],
  },
  {
    folder: "XC - C5,6,7,8,9,10",
    targets: [
      { propertySlug: "xom-chai", roomSlug: "c5" },
      { propertySlug: "xom-chai", roomSlug: "c6" },
      { propertySlug: "xom-chai", roomSlug: "c7" },
      { propertySlug: "xom-chai", roomSlug: "c8" },
      { propertySlug: "xom-chai", roomSlug: "c9" },
      { propertySlug: "xom-chai", roomSlug: "c10" },
    ],
  },
  {
    folder: "XC - SỎI, CÁT, ĐÁ, SAN HÔ",
    targets: [
      { propertySlug: "soi", roomSlug: "soi" },
      { propertySlug: "cat", roomSlug: "cat" },
      { propertySlug: "da", roomSlug: "da" },
      { propertySlug: "san-ho", roomSlug: "san-ho" },
    ],
  },
  {
    folder: "ST - SANTO7,8,9,10",
    targets: [
      { propertySlug: "santo-7", roomSlug: "santo-7" },
      { propertySlug: "santo-8", roomSlug: "santo-8" },
      { propertySlug: "santo-9", roomSlug: "santo-9" },
      { propertySlug: "santo-10", roomSlug: "santo-10" },
    ],
  },
];

// ── Main logic ──

async function updatePropertyImages(propertySlug: string, images: any[]) {
  const prop = await client.fetch(
    `*[_type == "property" && slug.current == $slug][0]{ _id }`,
    { slug: propertySlug },
  );
  if (!prop) {
    console.error(`  ❌ Property not found: ${propertySlug}`);
    return;
  }
  await client.patch(prop._id).set({ images }).commit();
  console.log(`  ✅ Property ${propertySlug}: ${images.length} images`);
}

async function updateRoomImages(
  propertySlug: string,
  roomSlug: string,
  images: any[],
) {
  const prop = await client.fetch(
    `*[_type == "property" && slug.current == $slug][0]{ _id, rooms }`,
    { slug: propertySlug },
  );
  if (!prop) {
    console.error(`  ❌ Property not found: ${propertySlug}`);
    return;
  }
  const rooms = prop.rooms || [];
  const roomIdx = rooms.findIndex((r: any) => r.slug === roomSlug);
  if (roomIdx === -1) {
    console.error(`  ❌ Room not found: ${roomSlug} in ${propertySlug}`);
    return;
  }
  rooms[roomIdx].images = images;
  await client.patch(prop._id).set({ rooms }).commit();
  console.log(
    `  ✅ Room ${roomSlug} @ ${propertySlug}: ${images.length} images`,
  );
}

async function processFolder(folder: string): Promise<any[]> {
  const dir = path.join(PHOTOS_DIR, folder);
  if (!fs.existsSync(dir)) {
    console.error(`  ⚠️ Folder not found: ${folder}`);
    return [];
  }
  const files = await getImages(dir);
  if (files.length === 0) {
    console.error(`  ⚠️ No images in: ${folder}`);
    return [];
  }
  console.log(`  📁 Uploading ${files.length} images from "${folder}"...`);
  const images = [];
  for (const file of files) {
    try {
      const img = await uploadImage(file);
      images.push(img);
      process.stdout.write(".");
    } catch (e: any) {
      console.error(`\n  ⚠️ Failed: ${path.basename(file)}: ${e.message}`);
    }
  }
  console.log();
  return images;
}

async function main() {
  console.log("🏠 Import room photos into Sanity CMS\n");

  // Process direct mappings
  for (const m of directMappings) {
    console.log(`\n📂 ${m.folder}`);
    const images = await processFolder(m.folder);
    if (images.length === 0) continue;

    if (m.roomSlug === "") {
      // Property-level images
      await updatePropertyImages(m.propertySlug, images);
    } else {
      await updateRoomImages(m.propertySlug, m.roomSlug, images);
    }
  }

  // Process shared mappings (upload once, assign to multiple)
  for (const sm of sharedMappings) {
    console.log(`\n📂 ${sm.folder} (shared → ${sm.targets.length} targets)`);
    const images = await processFolder(sm.folder);
    if (images.length === 0) continue;

    for (const t of sm.targets) {
      await updateRoomImages(t.propertySlug, t.roomSlug, images);
    }
  }

  console.log("\n✅ Done!");
}

main().catch(console.error);
