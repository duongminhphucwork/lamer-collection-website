import { createClient } from "next-sanity";

const c = createClient({
  projectId: "o2kvv3c9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  // Raw room images
  const p = await c.fetch(
    `*[_type == "property" && slug.current == "villa-chai"][0]{ name, "rawImg": rooms[0].images[0..1] }`,
  );
  console.log("Raw:", JSON.stringify(p, null, 2));

  // Expanded via GROQ
  const p2 = await c.fetch(
    `*[_type == "property" && slug.current == "villa-chai"][0]{ name, rooms[]{ name, images[]{ asset->{ url } } } }`,
  );
  console.log(
    "\nExpanded:",
    JSON.stringify(p2?.rooms?.[0]?.images?.slice(0, 2), null, 2),
  );
}

main().catch(console.error);
