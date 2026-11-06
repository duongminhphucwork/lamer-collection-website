import { createClient } from "next-sanity";

const client = createClient({
  projectId: "o2kvv3c9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  // Test read
  const count = await client.fetch('count(*[_type == "property"])');
  console.log("Read OK, properties:", count);

  // Test write
  try {
    const prop = await client.fetch('*[_type == "property"][0]{ _id }');
    await client.patch(prop._id).set({ _type: "property" }).commit();
    console.log("Write OK");
  } catch (e: any) {
    console.error("Write FAILED:", e.message);
  }

  // Test upload with real image
  try {
    const fs = await import("fs");
    const { execSync } = await import("child_process");
    const firstFile = execSync(
      'find "/Users/fix/Downloads/Phòng La Mer/XL - ỐC" -type f -iname "*.jpg" | head -1',
    )
      .toString()
      .trim();
    const data = fs.readFileSync(firstFile);
    const fname = firstFile.split("/").pop() || "test.jpg";
    console.log(
      "Uploading test:",
      fname,
      `(${(data.length / 1024).toFixed(0)}KB)`,
    );
    const asset = await client.assets.upload("image", data, {
      filename: fname,
      contentType: "image/jpeg",
    });
    console.log("Upload OK, asset:", asset._id);
    await client.delete(asset._id);
    console.log("Delete OK");
  } catch (e: any) {
    console.error("Upload FAILED:", e.message);
  }
}

main().catch(console.error);
