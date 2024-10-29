import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from "@builder.io/sdk-react";
import { customComponents } from "@/components/builderRegistry";
import Layout from "@/components/Layout";

const PUBLIC_API_KEY =
  "a42db2ee068342eda145f280f84fd130"; /* Put your Public API Key here */

export default async function Page(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const urlPath = "/" + (params.slug?.join("/") || "");

  console.log("urlPath", urlPath);

  const content = await fetchOneEntry({
    options: getBuilderSearchParams(searchParams),
    apiKey: PUBLIC_API_KEY,
    model: "page",
    userAttributes: { urlPath },
  });

  const siteData = await fetchOneEntry({
    apiKey: PUBLIC_API_KEY,
    model: "site-data",
  });

  const canShowContent = content || isPreviewing(searchParams);

  if (!canShowContent) {
    return (
      <>
        <h1>404</h1>
        <p>Make sure you have your content published at Builder.io.</p>
      </>
    );
  }

  return (
    <Layout siteData={siteData.data}>
      <Content
        content={content}
        apiKey={PUBLIC_API_KEY}
        model="page"
        customComponents={customComponents}
      />
    </Layout>
  );
}
