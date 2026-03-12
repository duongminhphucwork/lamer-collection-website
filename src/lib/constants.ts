export const SITE = {
  name: "La Mer Collection",
  tagline: "Sống Trong Lòng Vịnh",
  description:
    "La Mer Collection - Sống Trong Lòng Vịnh. Bộ sưu tập nghỉ dưỡng tại Vĩnh Hy, Ninh Thuận.",
  url: "https://lamercollection.com",
  locale: "vi_VN",
  phone: "+84 259 123 456",
  email: "hello@lamercollection.vn",
  address: "Vĩnh Hy, Ninh Hải, Ninh Thuận, Việt Nam",
  zalo: "0259 123 456",
  hours: "Thứ Hai \u2013 Chủ Nhật: 07:00 \u2013 22:00",
};

export const NAV_LINKS = [
  { href: "/", label: "Trang Chủ" },
  { href: "/collection", label: "Bộ Sưu Tập" },
  { href: "/experience", label: "Trải Nghiệm" },
  { href: "/story", label: "Câu Chuyện" },
  { href: "/vinh-hy", label: "Vĩnh Hy" },
  { href: "/gallery", label: "Thư Viện" },
  { href: "/lien-he", label: "Liên Hệ" },
] as const;

export const FOOTER_LINKS = [
  { href: "/", label: "Trang Chủ" },
  { href: "/collection", label: "Bộ Sưu Tập" },
  { href: "/experience", label: "Trải Nghiệm" },
  { href: "/story", label: "Câu Chuyện" },
  { href: "/vinh-hy", label: "Vĩnh Hy" },
  { href: "/lien-he", label: "Liên Hệ" },
] as const;

export type PropertyCategory =
  | "heritage"
  | "mediterranean"
  | "vietnamese"
  | "hotel";

export const PROPERTIES = [
  {
    title: "Heritage Grand Villa",
    category: "heritage" as PropertyCategory,
    categoryLabel: "Villa Di Sản",
    description: "Không gian 200m\u00B2, kiến trúc cổ Chăm Pa",
    guests: 4,
    area: "200m\u00B2",
    featured: true,
    gradient: "linear-gradient(180deg, #1a4a63 0%, #0d2b3e 80%)",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  },
  {
    title: "Azure Villa",
    category: "mediterranean" as PropertyCategory,
    categoryLabel: "Villa Địa Trung Hải",
    description: "Phong cách Santorini bên bờ vịnh",
    guests: 2,
    area: "120m\u00B2",
    gradient: "linear-gradient(180deg, #c9a87c 0%, #b8945a 100%)",
  },
  {
    title: "Nhà Vườn Villa",
    category: "vietnamese" as PropertyCategory,
    categoryLabel: "Villa Việt Nam",
    description: "Nhà vườn truyền thống giữa rừng dừa",
    guests: 4,
    area: "150m\u00B2",
    gradient: "linear-gradient(180deg, #2c5f7a 0%, #1a4a63 100%)",
  },
  {
    title: "Ocean Suite",
    category: "hotel" as PropertyCategory,
    categoryLabel: "Phòng Khách Sạn",
    description: "Phòng suite hướng biển, ban công riêng",
    guests: 2,
    area: "65m\u00B2",
    gradient: "linear-gradient(180deg, #3a6b82 0%, #0d2b3e 100%)",
  },
  {
    title: "Heritage Pool Villa",
    category: "heritage" as PropertyCategory,
    categoryLabel: "Villa Di Sản",
    description: "Villa với hồ bơi riêng, view núi rừng",
    guests: 6,
    area: "250m\u00B2",
    gradient: "linear-gradient(180deg, #1a3a4f 0%, #0d2b3e 100%)",
  },
  {
    title: "C\u00F4te d'Azur Suite",
    category: "mediterranean" as PropertyCategory,
    categoryLabel: "Villa Địa Trung Hải",
    description: "Thiết kế Pháp hiện đại, hồ bơi chung",
    guests: 2,
    area: "90m\u00B2",
    gradient: "linear-gradient(180deg, #d4b088 0%, #c9a87c 100%)",
  },
  {
    title: "Bamboo House",
    category: "vietnamese" as PropertyCategory,
    categoryLabel: "Villa Việt Nam",
    description: "Nhà tre sinh thái, hòa mình cùng thiên nhiên",
    guests: 2,
    area: "80m\u00B2",
    gradient: "linear-gradient(180deg, #4a8a6a 0%, #2c5f4a 100%)",
  },
  {
    title: "Garden Room",
    category: "hotel" as PropertyCategory,
    categoryLabel: "Phòng Khách Sạn",
    description: "Phòng vườn yên tĩnh, gần spa",
    guests: 2,
    area: "45m\u00B2",
    gradient: "linear-gradient(180deg, #2a5570 0%, #1a4a63 100%)",
  },
];

export const COLLECTION_FILTERS = [
  { value: "all", label: "Tất Cả" },
  { value: "heritage", label: "Villa Di Sản" },
  { value: "mediterranean", label: "Villa Địa Trung Hải" },
  { value: "hotel", label: "Phòng Khách Sạn" },
] as const;

export const GALLERY_FILTERS = [
  { value: "all", label: "Tất Cả" },
  { value: "villa", label: "Villa" },
  { value: "experience", label: "Trải Nghiệm" },
  { value: "vinh-hy", label: "Vĩnh Hy" },
  { value: "cuisine", label: "Ẩm Thực" },
] as const;

export const GALLERY_ITEMS = [
  {
    title: "Heritage Grand Villa",
    category: "villa",
    variant: "tall",
    gradient: "linear-gradient(180deg, #1a4a63 0%, #0d2b3e 100%)",
  },
  {
    title: "Vịnh Lúc Bình Minh",
    category: "vinh-hy",
    gradient: "linear-gradient(180deg, #2c8fa0 0%, #1a6a8a 100%)",
  },
  {
    title: "Hải Sản Tươi Sống",
    category: "cuisine",
    gradient: "linear-gradient(180deg, #c97a4a 0%, #8a4a2a 100%)",
  },
  {
    title: "Chèo Kayak",
    category: "experience",
    gradient: "linear-gradient(180deg, #3a7a5a 0%, #1a4a3a 100%)",
  },
  {
    title: "Mediterranean Villa",
    category: "villa",
    variant: "tall",
    gradient: "linear-gradient(180deg, #c9a87c 0%, #b8945a 100%)",
  },
  {
    title: "Hoàng Hôn Vĩnh Hy",
    category: "vinh-hy",
    gradient: "linear-gradient(180deg, #1a4a63 0%, #2c5f7a 100%)",
  },
  {
    title: "Lặn Ngắm San Hô",
    category: "experience",
    gradient: "linear-gradient(180deg, #1a6a8a 0%, #0d2b3e 100%)",
  },
  {
    title: "Bữa Tối Bên Biển",
    category: "cuisine",
    gradient: "linear-gradient(180deg, #d4b088 0%, #c9a87c 100%)",
  },
  {
    title: "Toàn Cảnh Vĩnh Hy Bay",
    category: "vinh-hy",
    variant: "wide",
    gradient: "linear-gradient(180deg, #0d2b3e 0%, #2c8fa0 100%)",
  },
  {
    title: "Nhà Vườn Villa",
    category: "villa",
    gradient: "linear-gradient(180deg, #2c5f7a 0%, #1a4a63 100%)",
  },
  {
    title: "Du Thuyền Hoàng Hôn",
    category: "experience",
    gradient: "linear-gradient(180deg, #c97a4a 0%, #b8945a 100%)",
  },
  {
    title: "Cà Phê Sáng",
    category: "cuisine",
    gradient: "linear-gradient(180deg, #8a4a2a 0%, #5a3020 100%)",
  },
] as const;

export const ROOM_TYPE_OPTIONS = [
  { value: "", label: "-- Chọn loại phòng --" },
  { value: "heritage", label: "Villa Di Sản" },
  { value: "mediterranean", label: "Villa Địa Trung Hải" },
  { value: "hotel", label: "Phòng Khách Sạn" },
] as const;
