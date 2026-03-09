export interface SanityImage {
  asset: { url: string; metadata: Record<string, unknown> };
}

export interface Room {
  name: string;
  slug: string;
  description?: string;
  viewType?: "sea-view" | "mountain-view" | "no-view";
  capacity?: number;
  priceWeekday?: number;
  priceWeekend?: number;
  priceHoliday?: number;
  images?: SanityImage[];
}

export interface PropertyDetail {
  _id: string;
  name: string;
  slug: { current: string };
  category: "heritage" | "mediterranean" | "hotel";
  description?: string;
  featured?: boolean;
  thumbnail?: SanityImage;
  images?: SanityImage[];
  rooms?: Room[];
}

export interface PropertyListItem {
  _id: string;
  name: string;
  slug?: { current: string };
  category: string;
  description?: string;
  featured?: boolean;
  order?: number;
  thumbnail?: SanityImage;
  roomCount: number;
  minPrice: number;
  maxPrice: number;
  maxCapacity: number;
  viewTypes?: string[];
}
