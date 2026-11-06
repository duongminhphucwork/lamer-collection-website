import { createClient } from "next-sanity";

const client = createClient({
  projectId: "o2kvv3c9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  // Find properties without thumbnails but with room images
  const props = await client.fetch(`
    *[_type == "property"] {
      _id, name,
      "hasThumbnail": defined(thumbnail.asset),
      "firstRoomImage": rooms[0].images[0]
    }
  `);

  let updated = 0;
  for (const p of props) {
    if (p.hasThumbnail || !p.firstRoomImage) {
      console.log(`⏭️  ${p.name}: ${p.hasThumbnail ? "has thumbnail" : "no room images"}`);
      continue;
    }
    await client.patch(p._id).set({ thumbnail: p.firstRoomImage }).commit();
    console.log(`✅ ${p.name}: set thumbnail from first room image`);
    updated++;
  }
  console.log(`\nDone! Updated ${updated} properties.`);
}

main().catch(console.error);
