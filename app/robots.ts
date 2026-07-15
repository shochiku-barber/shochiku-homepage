import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://shochiku-barber.com/sitemap.xml",
    host: "https://shochiku-barber.com",
  };
}
