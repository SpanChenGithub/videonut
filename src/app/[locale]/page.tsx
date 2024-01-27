"use client";
// import { useTranslations, useLocale } from "next-intl";

import FileUpload from "./FileUpload";

import { Layout } from "antd";
import withTheme from "@/theme";
import { useState } from "react";

const Page = ({ params }: IPageProps) => {
  const [hasFile, setHasFile] = useState(false);
  // const t = useTranslations();
  // const locale = useLocale();

  return (
    <Layout className="h-full">
      {hasFile ? <>file</> : <FileUpload setHasFile={setHasFile} />}
    </Layout>
  );
};

const HomePage = (props: IPageProps) => {
  return withTheme(<Page {...props} />);
};

export default HomePage;
