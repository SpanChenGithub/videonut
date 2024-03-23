"use client";

import { Button, Col, Flex, Layout, Row, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

import { VideoToFrames, VideoToFramesMethod } from "./VideoToFrame";

import AppDemo from "@/components/Timeline";
import Image from "next/image";

const DURATION = 500;

const videoList = [
  {
    label: "Trim or Cut",
    icon: "/assets/svg/cut.svg",
  },
  {
    label: "Crop",
    icon: "/assets/svg/crop.svg",
  },
  {
    label: "Rotate",
    icon: "/assets/svg/rotate.svg",
  },
  {
    label: "Flip",
    icon: "/assets/svg/flip.svg",
  },
  {
    label: "Change Resolution",
    icon: "/assets/svg/resolution.svg",
  },
  {
    label: "Change Volume",
    icon: "/assets/svg/volume.svg",
  },
  {
    label: "Change Speed",
    icon: "/assets/svg/speed.svg",
  },
  {
    label: "Loop",
    icon: "/assets/svg/loop.svg",
  },
  {
    label: "Stabilize Video",
    icon: "/assets/svg/stabilize.svg",
  },
  {
    label: "Add Image",
    icon: "/assets/svg/add-image.svg",
  },
  {
    label: "Add Text",
    icon: "/assets/svg/add-text.svg",
  },
  {
    label: "Remove Logo",
    icon: "/assets/svg/remove-logo.svg",
  },
];
function VideoLayout({ file }: { file: File }) {
  const [currentAction, setCurrentAction] = useState("");
  const handleCurrentAction = (value: string) => {
    return () => setCurrentAction(value);
  };

  const [currentTime, setCurrentTime] = useState(0);

  const [images, setImages] = useState([""]);
  const [status, setStatus] = useState("IDLE");

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCurrentTime((prev) => (prev >= DURATION * 1000 ? 0 : prev + 100));
  //   }, 100);

  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);

  useEffect(() => {
    const handleFileToFrames = async () => {
      const fileUrl = URL.createObjectURL(file);

      const frames = await VideoToFrames.getFrames(
        fileUrl,
        30,
        VideoToFramesMethod.totalFrames
      );
      setStatus("IDLE");
      setImages(frames);
    };

    if (file) {
      setImages([]);
      setStatus("LOADING");
      handleFileToFrames();
    }
  }, [file]);

  // const [images, setImages] = useState([]);
  // const [status, setStatus] = useState("IDLE");
  const now = new Date().toDateString();

  return (
    <Layout className="h-full">
      <Layout.Content className="h-full bg-[#15202C] p-[32px]">
        <Space.Compact block>
          {videoList.map(({ label, icon }, index) => (
            <Tooltip title={label} key={index}>
              <Button
                onClick={handleCurrentAction(label)}
                className={`!flex gap-[6px] !text-white opacity-${
                  currentAction === label ? 100 : 50
                } !bg-[#ffffff29]`}
                type="text"
              >
                <Image
                  className=" opacity-100"
                  src={icon}
                  alt="cut video"
                  width={20}
                  height={20}
                />
                {currentAction === label ? currentAction : ""}
              </Button>
            </Tooltip>
          ))}
        </Space.Compact>

        <Flex
          justify="space-evenly"
          vertical
          align="center"
          className="h-full py-[24px]"
        >
          {images.length > 0 && (
            <Image width={214} height={378} src={images[0]} alt="home" />
          )}
          <Flex justify="center" align="center">
            {status === "LOADING" ? (
              <Circles color="#00BFFF" height={100} width={100} />
            ) : (
              <AppDemo>
                {images?.length > 0 && (
                  <Row wrap={false} justify="center" className="h-full">
                    {images.map((imageUrl) => (
                      <Col key={imageUrl} className="h-full">
                        <Image
                          width={214}
                          height={378}
                          src={imageUrl}
                          alt={imageUrl}
                          className="h-full"
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </AppDemo>
            )}
          </Flex>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}

export default VideoLayout;
