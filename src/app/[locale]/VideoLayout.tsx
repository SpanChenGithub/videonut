"use client";

import { Button, Flex, Layout, Radio, Space, Tooltip, Typography } from "antd";
import Icons from "@/components/Icons";
import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Circles } from "react-loader-spinner";

import { VideoToFrames, VideoToFramesMethod } from "./VideoToFrame";

import Image from "next/image";

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

  const [images, setImages] = useState([""]);
  const [status, setStatus] = useState("IDLE");

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
      <Layout.Content className="p-[32px] bg-[#15202C] h-full">
        <Space.Compact block>
          {videoList.map(({ label, icon }, index) => (
            <Tooltip title={label} key={index}>
              <Button
                onClick={handleCurrentAction(label)}
                className={`!text-white !flex gap-[6px] opacity-${
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
          className="py-[24px] h-full"
        >
          {images.length > 0 && (
            <img width={214} height={378} src={images[0]} alt="home" />
          )}
          <Flex justify="center" align="center">
            {status === "LOADING" ? (
              <Circles color="#00BFFF" height={100} width={100} />
            ) : (
              <Flex>
                {images?.length > 0 && (
                  <Space size={0} className="output">
                    {images.map((imageUrl, index) => (
                      <a
                        key={imageUrl}
                        href={imageUrl}
                        download={`${now}-${index + 1}.png`}
                      >
                        <img src={imageUrl} alt="" />
                      </a>
                    ))}
                  </Space>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}

export default VideoLayout;
