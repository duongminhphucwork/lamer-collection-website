import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "o2kvv3c9",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function run() {
  const docs = await client.fetch<
    {
      _id: string;
      name: string;
      category: string;
      rooms: { name: string; _key: string; _type: string }[];
    }[]
  >('*[_type == "property"]{_id, name, category, rooms}');

  const tx = client.transaction();
  const medNames = ["Sỏi", "Cát", "Đá", "San hô"];

  for (const doc of docs) {
    if (doc._id === "property-villa") {
      tx.patch(doc._id, { set: { category: "heritage" } });
    } else if (doc._id === "property-santo-villa") {
      tx.patch(doc._id, { set: { category: "mediterranean" } });
    } else if (doc._id === "property-xom-chai") {
      const medRooms = doc.rooms.filter((r) => medNames.includes(r.name));
      const hotelRooms = doc.rooms.filter(
        (r) => medNames.indexOf(r.name) === -1,
      );
      tx.patch(doc._id, { set: { rooms: hotelRooms } });
      tx.createOrReplace({
        _id: "property-xom-chai-villa",
        _type: "property",
        name: "Xóm Chài Villa",
        slug: { _type: "slug", current: "xom-chai-villa" },
        category: "mediterranean",
        order: 9,
        rooms: medRooms,
      });
    }
  }

  await tx.commit();
  console.log("Categories updated.");

  // Verify
  const verify = await client.fetch<
    { name: string; category: string; rc: number }[]
  >(
    '*[_type == "property"]{"name": name, "category": category, "rc": count(rooms)} | order(order asc)',
  );
  for (const v of verify) {
    console.log(`${v.name} - ${v.category} - ${v.rc} rooms`);
  }
}

run().catch(console.error);
