import Icons from "@/components/Icons";
import { Button, Flex, Layout, Space, Typography, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { useTranslations, useLocale } from "next-intl";

const { Dragger } = Upload;

const { Header, Sider, Content, Footer } = Layout;
const { Text, Paragraph, Title } = Typography;

export default function FileUpload({ setHasFile }: { setHasFile: Function }) {
  const t = useTranslations();
  const locale = useLocale();

  const props: UploadProps = {
    name: "file",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setHasFile(true);
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

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
            <Dragger className="w-full" {...props}>
              <Paragraph className="w-full">
                <Button
                  className="!flex m-auto"
                  type="primary"
                  size="large"
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
}
