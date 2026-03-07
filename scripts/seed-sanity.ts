/**
 * Seed initial page content into Sanity CMS.
 * Run: bunx tsx scripts/seed-sanity.ts
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o2kvv3c9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const pages = [
  {
    _type: "pageContent",
    _id: "pageContent-home",
    pageSlug: "home",
    heroTitle: "La Mer Collection",
    heroSubtitle: "Sống Trong Lòng Vịnh",
    sections: [
      {
        _key: "intro",
        key: "intro",
        body: "Một tập hợp những không gian nghỉ dưỡng hoà quyện với đời sống và di sản của Vĩnh Hy \u2014 không phải một khu resort biệt lập, mà là một bộ sưu tập trải nghiệm sống.",
      },
      {
        _key: "collection",
        key: "collection",
        subtitle: "Bộ Sưu Tập",
        title: "Những Không Gian Đặc Biệt",
      },
      {
        _key: "experience",
        key: "experience",
        subtitle: "Trải Nghiệm",
        title: "Ẩm Thực & Nghỉ Dưỡng",
        body: "Từ nhà hàng hải sản tươi sống bên bờ vịnh đến spa thư giãn với liệu pháp truyền thống \u2014 mỗi khoảnh khắc tại La Mer đều là một trải nghiệm đáng nhớ.",
      },
      {
        _key: "location",
        key: "location",
        subtitle: "Vĩnh Hy Bay",
        title: "Viên Ngọc Ẩn Mình Của Ninh Thuận",
        body: "Nằm giữa những ngọn núi và biển xanh, Vĩnh Hy là một trong bốn vịnh đẹp nhất Việt Nam \u2014 nơi thiên nhiên còn giữ nguyên vẻ hoang sơ và quyến rũ.",
      },
    ],
  },
  {
    _type: "pageContent",
    _id: "pageContent-collection",
    pageSlug: "collection",
    heroTitle: "Bộ Sưu Tập",
    heroSubtitle: "The Collection",
  },
  {
    _type: "pageContent",
    _id: "pageContent-experience",
    pageSlug: "experience",
    heroTitle: "Trải Nghiệm",
    heroSubtitle: "Experiences",
    sections: [
      {
        _key: "dining",
        key: "dining",
        subtitle: "Ẩm Thực",
        title: "Hương Vị Vĩnh Hy",
        body: "Nhà hàng và quán cà phê của La Mer mang đến những hương vị tươi ngon nhất từ biển cả \u2014 hải sản đánh bắt mỗi sáng, rau xanh từ vườn địa phương, và cà phê rang xay thủ công.",
      },
      {
        _key: "spa",
        key: "spa",
        subtitle: "Spa & Wellness",
        title: "Thư Giãn Toàn Diện",
        body: "Spa tại La Mer kết hợp liệu pháp truyền thống Việt Nam với kỹ thuật hiện đại. Hãy để cơ thể hòa mình vào nhịp thở của sóng biển và hương thảo mộc tự nhiên.",
      },
      {
        _key: "activities",
        key: "activities",
        subtitle: "Hoạt Động",
        title: "Khám Phá Vĩnh Hy",
      },
    ],
  },
  {
    _type: "pageContent",
    _id: "pageContent-story",
    pageSlug: "story",
    heroTitle: "Câu Chuyện",
    heroSubtitle: "Our Story",
    sections: [
      {
        _key: "origin",
        key: "origin",
        subtitle: "Khởi Nguồn",
        title: "Nơi Tất Cả Bắt Đầu",
      },
      {
        _key: "heritage",
        key: "heritage",
        subtitle: "Di Sản",
        title: "Bảo Tồn Kiến Trúc Bản Địa",
        body: "Mỗi căn villa trong bộ sưu tập đều mang dấu ấn thời gian. Những ngôi nhà cổ của cư dân địa phương được trùng tu tỉ mỉ, giữ nguyên kết cấu gỗ, mái ngói và khoảng sân vườn \u2014 đồng thời nâng cấp tiện nghi đạt chuẩn quốc tế.",
      },
      {
        _key: "community",
        key: "community",
        subtitle: "Cộng Đồng",
        title: "Sống Cùng Vĩnh Hy",
      },
      {
        _key: "philosophy",
        key: "philosophy",
        body: "Chúng tôi tin rằng du lịch bền vững không phải là cách ly du khách khỏi cộng đồng, mà là kết nối họ \u2014 để mỗi chuyến đi đều để lại giá trị cho cả hai phía.",
      },
    ],
  },
  {
    _type: "pageContent",
    _id: "pageContent-vinh-hy",
    pageSlug: "vinh-hy",
    heroTitle: "Vĩnh Hy Bay",
    heroSubtitle: "Destination",
    sections: [
      {
        _key: "intro",
        key: "intro",
        title: "Viên Ngọc Của Ninh Thuận",
        body: "Vĩnh Hy là một trong bốn vịnh đẹp nhất Việt Nam, nơi núi rừng ôm trọn lấy biển xanh. Với vẻ đẹp hoang sơ chưa bị thương mại hóa, Vĩnh Hy mang đến sự yên bình hiếm có giữa thiên nhiên hùng vĩ.",
      },
      {
        _key: "highlights",
        key: "highlights",
        subtitle: "Điểm Nổi Bật",
        title: "Thiên Nhiên Vĩnh Hy",
      },
      {
        _key: "transport",
        key: "transport",
        subtitle: "Di Chuyển",
        title: "Đường Đến Vĩnh Hy",
      },
      {
        _key: "cuisine",
        key: "cuisine",
        subtitle: "Ẩm Thực Địa Phương",
        title: "Hương Vị Ninh Thuận",
        body: "Ninh Thuận nổi tiếng với hải sản tươi sống từ biển Vĩnh Hy, nho Ninh Thuận ngọt thanh, thịt cừu Ninh Thuận thơm nức \u2014 và vô số đặc sản khác chỉ có thể thưởng thức tại vùng đất đầy nắng gió này.",
      },
    ],
  },
  {
    _type: "pageContent",
    _id: "pageContent-gallery",
    pageSlug: "gallery",
    heroTitle: "Thư Viện",
    heroSubtitle: "Gallery",
  },
  {
    _type: "pageContent",
    _id: "pageContent-lien-he",
    pageSlug: "lien-he",
    heroTitle: "Liên Hệ",
    heroSubtitle: "Contact",
  },
];

async function seed() {
  console.log("Seeding page content into Sanity...");

  const transaction = client.transaction();
  for (const page of pages) {
    transaction.createOrReplace(page);
  }

  const result = await transaction.commit();
  console.log(`Seeded ${pages.length} page content documents.`);
  console.log("Transaction ID:", result.transactionId);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
