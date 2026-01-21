import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from "@builder.io/sdk-react";
import { customComponents } from "@/components/builderRegistry";

const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

export default async function FooterPreviewPage(props) {
  const searchParams = await props.searchParams;

  // Fetch the footer section content
  const content = await fetchOneEntry({
    options: getBuilderSearchParams(searchParams),
    apiKey: PUBLIC_API_KEY,
    model: "footer",
  });

  const canShowContent = content || isPreviewing(searchParams);

  if (!canShowContent) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Footer Section Preview</h1>
        <p className="text-gray-600">
          No footer content found. Create a footer entry in Builder.io.
        </p>
      </div>
    );
  }

  return (
    <Content
      content={content}
      apiKey={PUBLIC_API_KEY}
      model="footer"
      customComponents={customComponents}
    />
  );
}
