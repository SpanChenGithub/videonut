"use client";
// import { useTranslations, useLocale } from "next-intl";

import FileUpload from "./FileUpload";
import VideoLayout from "./VideoLayout";

import { Layout } from "antd";
import withTheme from "@/theme";
import { useState } from "react";

const Page = ({ params }: IPageProps) => {
  const [file, setFile] = useState(null);
  // const t = useTranslations();
  // const locale = useLocale();

  return file ? <VideoLayout file={file} /> : <FileUpload setFile={setFile} />;
};

const HomePage = (props: IPageProps) => {
  return withTheme(<Page {...props} />);
};

export default HomePage;
