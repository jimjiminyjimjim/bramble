import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from "@builder.io/sdk-react";
import { customComponents } from "@/components/builderRegistry";

const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

export async function BuilderSection({ model, searchParams = {} }) {
  const content = await fetchOneEntry({
    options: getBuilderSearchParams(searchParams),
    apiKey: PUBLIC_API_KEY,
    model: model,
  });

  const canShowContent = content || isPreviewing(searchParams);

  if (!canShowContent) {
    return null;
  }

  return (
    <Content
      content={content}
      apiKey={PUBLIC_API_KEY}
      model={model}
      customComponents={customComponents}
    />
  );
}
