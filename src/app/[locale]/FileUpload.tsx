import Icons from "@/components/Icons";
import { OUTER_WIDTH } from "@/components/Timeline";
import { VideoToFrames, VideoToFramesMethod } from "@/utils/VideoToFrame";
import { useMemoizedFn } from "ahooks";
import type { UploadProps } from "antd";
import { Button, Flex, Layout, Space, Typography, Upload, message } from "antd";
// import { UploadFileStatus } from "antd/es/upload/interface";
import { useLocale, useTranslations } from "next-intl";

const { Dragger } = Upload;

const { Header, Sider, Content, Footer } = Layout;
const { Text, Paragraph, Title } = Typography;
const FRAMES_WIDTH = 28;

export default function FileUpload({
  setFileList,
  setUploadStatus,
  fileList,
  setStatus,
  setImages,
  uploadStatus,
}: {
  setFileList: Function;
  setStatus: Function;
  setImages: Function;
  fileList: any;
  uploadStatus: string;
  setUploadStatus: Function;
}) {
  const t = useTranslations();
  const locale = useLocale();

  const handleFileToFrames = useMemoizedFn(async (file) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      console.log(`🚀 ~ fileUrl:`, fileUrl);
      setStatus("LOADING");

      const frames = await VideoToFrames.getFrames(
        fileUrl,
        OUTER_WIDTH() / FRAMES_WIDTH,
        VideoToFramesMethod.totalFrames
      );

      console.log(`🚀 ~ frames:`, frames);
      setStatus("IDLE");
      setImages(frames);

      setUploadStatus("done");
    }
  });

  // const [uploadStatus, setUploadStatus] = useState("");

  const handleUpload = async (option: any) => {
    const file = option.file as File;

    console.log("file:handleFileToFrames", file);

    // file.status = "uploading";

    // setUploadStatus("done");
    handleFileToFrames(file);

    // setFileList(file);

    try {
      // 使用第三方服务进行文件上传
      // const result = await uploadService.upload(file)
      // onSuccess的回调参数可以在 UploadFile.response 中获取
      // option.onSuccess(result.url)
    } catch (error) {
      // option.onError(error)
    }
  };

  const props: UploadProps = {
    name: "file",
    // fileList,
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return true;
    },
    progress: {
      size: ["100%", 12],
      strokeColor: "#00B87F",
    },
    customRequest: handleUpload,
    onChange(info) {
      const { status } = info.file;
      console.log(`🚀 ~ status:`, status);
      setUploadStatus(status);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        // fileList([info.file]);
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
    <Flex vertical align="center" className="h-full bg-[#E6F3FF]">
      <Layout className="w-full max-w-7xl items-center">
        <Flex vertical align="center" className="h-full w-full bg-[#E6F3FF]">
          <article className="py-[48px] text-center">
            <h1 className="text-5xl font-black">Online Video Converter</h1>
            <Text className="text-xl font-medium !text-gray-900">
              Use the free online video converter to change your video file
              format.
            </Text>
          </article>

          <Flex
            justify="center"
            className="h-[360px] w-[1040px] rounded-2xl bg-white p-[24px]"
          >
            <Dragger className="file-upload-layout w-full" {...props}>
              {uploadStatus === "init" && (
                <>
                  <Paragraph className="w-full">
                    <Button
                      className="m-auto !flex"
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
                      Format supports mp4, avi, flv, mov, wmv Upload up to 3
                      files. Max file size: 500MB
                    </Text>
                  </Space>
                </>
              )}

              {
                // uploadStatus === "uploading" && (
                //   <Space direction="vertical" className="w-[278px]">
                //     <h6 className="font-medium">Uploading...</h6>
                //     <Text className="!text-gray-400">
                //       Format supports mp4, avi, flv, mov, wmv Upload up to 3
                //       files. Max file size: 500MB
                //     </Text>
                //   </Space>
                // )
              }
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
