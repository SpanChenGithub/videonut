import type { Metadata } from "next";
import Layout from "./layout";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  return {
    title: `Create Amazing Images with AI: Unleash Your Imagination! - Media Modify`,
    description: `Get creative with our AI image tool! Generate attention-grabbing visuals effortlessly, perfect for any project.`,
  };
}

export default function Page(props: Props) {
  console.log(`🚀 ~ file: page.tsx:convert  ~ props:`, props);
  return <Layout {...props} />;
}
