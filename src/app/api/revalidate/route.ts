import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/** Map Sanity document types to page paths for revalidation */
const TYPE_TO_PATHS: Record<string, string[]> = {
  property: ["/", "/collection"],
  experience: ["/", "/experience"],
  galleryItem: ["/gallery"],
  siteSettings: ["/", "/lien-he"],
  pageContent: [
    "/",
    "/collection",
    "/experience",
    "/story",
    "/vinh-hy",
    "/gallery",
    "/lien-he",
  ],
};

/** Sanity webhook handler for on-demand ISR revalidation */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad request", { status: 400 });
    }

    // Revalidate affected paths based on document type
    const paths = TYPE_TO_PATHS[body._type] || ["/"];
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths });
  } catch {
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
