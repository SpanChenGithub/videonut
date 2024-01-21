"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import type { UploadProps } from "antd";
import Icons from "@/components/Icons";

import { Layout, message, Flex, Typography, Upload, Button, Space } from "antd";
import withTheme from "@/theme";
// import Icons from "@/components/Icons";

const { Dragger } = Upload;

const { Header, Sider, Content, Footer } = Layout;
const { Text, Paragraph, Title } = Typography;

const uploadProps: UploadProps = {
  name: "file",
  // multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const Page = ({ params }: IPageProps) => {
  const t = useTranslations();

  const locale = useLocale();

  return (
    <Flex vertical align="center" className="bg-[#E6F3FF] h-full">
      <Layout className="max-w-7xl w-full items-center">
        <Flex vertical align="center" className="w-full h-full bg-[#E6F3FF]">
          <article className="py-[48px] text-center">
            <h1 className="text-5xl font-black">Online Video Converter</h1>
            <Text className="!text-gray-900 font-medium text-xl">
              Use the free online video converter to change your video file
              format.
            </Text>
          </article>

          <Flex
            justify="center"
            className="bg-white rounded-2xl p-[24px] h-[360px] w-[1040px]"
          >
            <Dragger className="w-full" {...uploadProps}>
              <Paragraph className="w-full">
                <Button
                  className="!flex m-auto"
                  type="primary"
                  icon={<Icons.Upload size="20px" />}
                >
                  Upload Files
                </Button>
              </Paragraph>
              <Space direction="vertical" className="w-[278px]">
                <h6 className="font-medium">
                  Or drag and drop multiple video files here
                </h6>
                <Text className="!text-gray-400">
                  Format supports mp4, avi, flv, mov, wmv Upload up to 3 files.
                  Max file size: 500MB
                </Text>
              </Space>
            </Dragger>
          </Flex>
        </Flex>
      </Layout>
      {/* <Footer className="max-w-7xl m-auto">
        Media Modify ©2023 Created by Media Modify
      </Footer> */}
    </Flex>
  );
};

const HomePage = (props: IPageProps) => {
  return withTheme(<Page {...props} />);
};

export default HomePage;
