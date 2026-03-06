/**
 * Seed content items (activities, community, highlights, transport, collection cards)
 * into existing pageContent documents.
 * Run: bunx tsx scripts/seed-page-items.ts
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o2kvv3c9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

function item(data: Record<string, string | undefined>) {
  return {
    _key: crypto.randomUUID().slice(0, 8),
    _type: "contentItem",
    ...data,
  };
}

const patches: {
  docId: string;
  sectionKey: string;
  items: Record<string, string | undefined>[];
}[] = [
  {
    docId: "pageContent-home",
    sectionKey: "collection",
    items: [
      {
        title: "Heritage Villa",
        extraField: "Villa Di Sản",
        description: "Kiến trúc truyền thống Việt Nam, hồn cốt Vĩnh Hy",
        gradient: "linear-gradient(180deg, #1a4a63 0%, #0d2b3e 100%)",
      },
      {
        title: "Mediterranean Villa",
        extraField: "Villa Địa Trung Hải",
        description: "Phong cách Địa Trung Hải giữa lòng vịnh biển",
        gradient: "linear-gradient(180deg, #c9a87c 0%, #b8945a 100%)",
      },
      {
        title: "Ocean View Room",
        extraField: "Phòng Khách Sạn",
        description: "Tầm nhìn trọn vẹn ra đại dương xanh thẳm",
        gradient: "linear-gradient(180deg, #2c5f7a 0%, #1a4a63 100%)",
      },
    ],
  },
  {
    docId: "pageContent-experience",
    sectionKey: "activities",
    items: [
      {
        title: "Chèo Kayak",
        description: "Khám phá vịnh trên thuyền kayak",
        gradient: "linear-gradient(180deg, #2c8fa0 0%, #1a4a63 100%)",
        iconPath: "M3 17l2-2h14l2 2M5 15V9a7 7 0 0114 0v6",
      },
      {
        title: "Lặn Ngắm San Hô",
        description: "Thế giới dưới đáy biển Vĩnh Hy",
        gradient: "linear-gradient(180deg, #1a6a8a 0%, #0d2b3e 100%)",
        iconPath: "M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0M12 16V4m-4 4l4-4 4 4",
      },
      {
        title: "Câu Cá",
        description: "Câu cá cùng ngư dân địa phương",
        gradient: "linear-gradient(180deg, #3a7a5a 0%, #1a4a3a 100%)",
        iconPath: "M18 4l-4 8h6l-4 8M6 4v16M6 12c3 0 5-2 5-4S9 4 6 4",
      },
      {
        title: "Du Thuyền Hoàng Hôn",
        description: "Ngắm hoàng hôn trên thuyền gỗ",
        gradient: "linear-gradient(180deg, #c97a4a 0%, #8a4a2a 100%)",
        iconCircle: "12,12,4",
        iconPath:
          "M3 20h18M12 2v2m7.07 2.93l-1.41 1.41M22 12h-2M4 12H2m3.34-5.66L3.93 4.93",
      },
    ],
  },
  {
    docId: "pageContent-story",
    sectionKey: "community",
    items: [
      {
        title: "Ngư Dân",
        description:
          "Cùng ngư dân ra khơi đánh bắt mỗi sáng sớm, tìm hiểu nghề biển truyền thống đã tồn tại hàng trăm năm tại Vĩnh Hy.",
        gradient: "linear-gradient(180deg, #2c8fa0 0%, #1a4a63 100%)",
        iconPath: "M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0M5 17V9a7 7 0 0114 0v8",
      },
      {
        title: "Ẩm Thực",
        description:
          "Hải sản tươi sống từ biển Vĩnh Hy, chế biến theo công thức gia truyền của những gia đình ngư dân lâu đời tại vịnh.",
        gradient: "linear-gradient(180deg, #c97a4a 0%, #8a4a2a 100%)",
        iconPath:
          "M3 12h18M5 12a7 7 0 0114 0M5 12v4a7 7 0 0014 0v-4M12 8V5m-3 3V6m6 2V6",
      },
      {
        title: "Văn Hóa",
        description:
          "Trải nghiệm văn hóa Chăm Pa và Raglai bản địa qua lễ hội, âm nhạc và những câu chuyện kể từ cộng đồng địa phương.",
        gradient: "linear-gradient(180deg, #3a7a5a 0%, #1a4a3a 100%)",
        iconPath:
          "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z",
      },
    ],
  },
  {
    docId: "pageContent-vinh-hy",
    sectionKey: "highlights",
    items: [
      {
        title: "Biển Xanh",
        description:
          "Làn nước trong vắt nhìn thấy đáy, thích hợp bơi lội và lặn ngắm",
        gradient: "linear-gradient(180deg, #2c8fa0 0%, #1a4a63 100%)",
      },
      {
        title: "Rạn San Hô",
        description:
          "Hệ sinh thái san hô phong phú với hàng trăm loài cá nhiệt đới",
        gradient: "linear-gradient(180deg, #1a6a8a 0%, #0d2b3e 100%)",
      },
      {
        title: "Làng Chài",
        description: "Làng chài truyền thống với cuộc sống bình dị bên bờ vịnh",
        gradient: "linear-gradient(180deg, #c97a4a 0%, #8a4a2a 100%)",
      },
      {
        title: "Núi Rừng",
        description:
          "Rừng nguyên sinh bao quanh vịnh, tuyệt đẹp khi nhìn từ biển",
        gradient: "linear-gradient(180deg, #3a7a5a 0%, #1a4a3a 100%)",
      },
    ],
  },
  {
    docId: "pageContent-vinh-hy",
    sectionKey: "transport",
    items: [
      {
        title: "Sân Bay Cam Ranh",
        extraField: "~60 km",
        description: "Khoảng 1.5 giờ lái xe qua cung đường biển tuyệt đẹp",
      },
      {
        title: "TP. Phan Rang",
        extraField: "~40 km",
        description: "Khoảng 45 phút lái xe từ trung tâm thành phố Phan Rang",
      },
      {
        title: "Đón Tận Nơi",
        extraField: "La Mer",
        description: "Dịch vụ đưa đón từ sân bay hoặc ga tàu với xe riêng",
      },
    ],
  },
];

async function seed() {
  for (const { docId, sectionKey, items: rawItems } of patches) {
    console.log(`Patching ${docId} → section "${sectionKey}"...`);

    const doc = await client.fetch(`*[_id == $id][0]{ sections }`, {
      id: docId,
    });

    if (!doc) {
      console.log(`  Document ${docId} not found, skipping.`);
      continue;
    }

    const sections = (doc.sections || []) as { _key: string; key: string }[];
    const idx = sections.findIndex((s) => s.key === sectionKey);

    if (idx === -1) {
      console.log(`  Section "${sectionKey}" not found, skipping.`);
      continue;
    }

    await client
      .patch(docId)
      .set({
        [`sections[_key=="${sections[idx]._key}"].items`]: rawItems.map(item),
      })
      .commit();

    console.log(`  Added ${rawItems.length} items.`);
  }

  console.log("Done!");
}

seed().catch(console.error);
