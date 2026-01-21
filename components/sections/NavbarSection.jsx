import {
  Content,
  fetchOneEntry,
} from "@builder.io/sdk-react";
import { customComponents } from "@/components/builderRegistry";

const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

/**
 * NavbarSection - Fetches and renders the navbar section from Builder.io
 *
 * This component fetches the "navbar" model from Builder.io and renders it.
 * Use this on any page to include the shared navbar.
 *
 * Usage:
 * ```jsx
 * import { NavbarSection } from "@/components/sections/NavbarSection";
 *
 * export default async function Page() {
 *   return (
 *     <>
 *       <NavbarSection />
 *       {/* rest of page content *\/}
 *     </>
 *   );
 * }
 * ```
 *
 * To edit the navbar:
 * 1. Go to Builder.io
 * 2. Select the "navbar" model
 * 3. Edit the content
 * 4. Preview at: /navbar
 */
export async function NavbarSection() {
  const content = await fetchOneEntry({
    apiKey: PUBLIC_API_KEY,
    model: "navbar",
    options: { enrich: true },
    cacheSeconds: 0,
    fetchOptions: { next: { revalidate: 0 } },
  });

  if (!content) {
    return null;
  }

  return (
    <Content
      content={content}
      apiKey={PUBLIC_API_KEY}
      model="navbar"
      customComponents={customComponents}
    />
  );
}
