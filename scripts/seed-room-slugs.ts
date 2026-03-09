import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "o2kvv3c9",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

/** Strip Vietnamese diacritics and convert to kebab-case slug */
function toSlug(name: string): string {
  const diacriticMap: Record<string, string> = {
    à: "a",
    á: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    ă: "a",
    ằ: "a",
    ắ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    â: "a",
    ầ: "a",
    ấ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    è: "e",
    é: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ề: "e",
    ế: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    ì: "i",
    í: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ò: "o",
    ó: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ồ: "o",
    ố: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ờ: "o",
    ớ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ù: "u",
    ú: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ư: "u",
    ừ: "u",
    ứ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ỳ: "y",
    ý: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
    đ: "d",
  };

  return name
    .toLowerCase()
    .split("")
    .map((char) => diacriticMap[char] || char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function seedRoomSlugs() {
  const properties = await client.fetch<
    {
      _id: string;
      name: string;
      rooms?: { _key: string; name: string; slug?: string }[];
    }[]
  >(`*[_type == "property"]{ _id, name, rooms[]{ _key, name, slug } }`);

  let totalUpdated = 0;

  for (const property of properties) {
    if (!property.rooms?.length) continue;

    const usedSlugs = new Set<string>();
    const patches: { _key: string; slug: string }[] = [];

    for (const room of property.rooms) {
      if (room.slug) {
        usedSlugs.add(room.slug);
        continue;
      }

      let slug = toSlug(room.name);
      let suffix = 2;
      while (usedSlugs.has(slug)) {
        slug = `${toSlug(room.name)}-${suffix}`;
        suffix++;
      }
      usedSlugs.add(slug);
      patches.push({ _key: room._key, slug });
    }

    if (patches.length === 0) continue;

    // Build patch operations for each room
    const patch = client.patch(property._id);
    for (const { _key, slug } of patches) {
      patch.set({ [`rooms[_key=="${_key}"].slug`]: slug });
    }

    await patch.commit();
    totalUpdated += patches.length;
    console.log(
      `${property.name}: updated ${patches.length} rooms → ${patches.map((p) => p.slug).join(", ")}`,
    );
  }

  console.log(`\nDone! Updated ${totalUpdated} room slugs.`);
}

seedRoomSlugs().catch(console.error);
