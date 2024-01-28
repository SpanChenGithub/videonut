"use client";
// import { useTranslations, useLocale } from "next-intl";

import FileUpload from "./FileUpload";
import VideoLayout from "./VideoLayout";

import { Layout } from "antd";
import withTheme from "@/theme";
import { useState } from "react";

const Page = ({ params }: IPageProps) => {
  const [hasFile, setHasFile] = useState(true);
  // const t = useTranslations();
  // const locale = useLocale();

  return hasFile ? <VideoLayout /> : <FileUpload setHasFile={setHasFile} />;
};

const HomePage = (props: IPageProps) => {
  return withTheme(<Page {...props} />);
};

export default HomePage;
