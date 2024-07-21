"use client";
// import { useTranslations, useLocale } from "next-intl";
import type { UploadFile } from "antd";

import FileUpload from "./FileUpload";
import VideoLayout from "./VideoLayout";

import withTheme from "@/theme";
import { useState } from "react";

const Page = ({ params }: IPageProps) => {
  const [images, setImages] = useState([""]);
  const [status, setStatus] = useState("IDLE");

  // const [uploading, setUploading] = useState(false);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  console.log(`🚀 ~ fileList:`, fileList);

  // const [file, setFile] = useState(null);
  // const t = useTranslations();
  // const locale = useLocale();

  const [uploadStatus, setUploadStatus] = useState("init");

  return uploadStatus === "done" ? (
    <VideoLayout status={status} fileList={fileList} images={images} />
  ) : (
    <FileUpload
      uploadStatus={uploadStatus}
      setImages={setImages}
      fileList={fileList}
      setStatus={setStatus}
      setUploadStatus={setUploadStatus}
      setFileList={setFileList}
    />
  );
};

const HomePage = (props: IPageProps) => {
  return withTheme(<Page {...props} />);
};

export default HomePage;
