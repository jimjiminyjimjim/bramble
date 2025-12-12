import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from "@builder.io/sdk-react";
import { customComponents } from "@/components/builderRegistry";
import Layout from "@/components/Layout";

const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY


export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const awaitedSearchParams = await searchParams;

  const urlPath = "/" + (slug?.join("/") || "");


  const content = await fetchOneEntry({
    // options: {...getBuilderSearchParams(asyncSearchParams), enrich: true},
    apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY,
    model: "page",
    userAttributes: { urlPath },
  });

  const title = content?.data?.title;
  const description = content?.data?.description;

  console.log("title", title, description);

  return {
    title,
    description
  };
}


export default async function Page(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const urlPath = "/" + (params.slug?.join("/") || "");

  console.log("urlPath", urlPath);

  console.log("searchParams", searchParams);
  
  const content = await fetchOneEntry({
    options: {...getBuilderSearchParams(searchParams), enrich: true},
    apiKey: PUBLIC_API_KEY,
    model: "page",
    userAttributes: { urlPath },
  });

  const siteData = await fetchOneEntry({
    apiKey: PUBLIC_API_KEY,
    model: "site-data"
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
    <Layout siteData={siteData?.data}>
      <Content
        content={content}
        apiKey={PUBLIC_API_KEY}
        model="page"
        customComponents={customComponents}
        context={siteData?.data}
      />
    </Layout>
  );
}
