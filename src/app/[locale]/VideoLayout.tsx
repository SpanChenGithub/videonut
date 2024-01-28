"use client";

import { Button, Flex, Layout, Radio, Space, Tooltip, Typography } from "antd";
import Icons from "@/components/Icons";
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";

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
function VideoLayout() {
  const [currentAction, setCurrentAction] = useState("");
  const handleCurrentAction = (value: string) => {
    return () => setCurrentAction(value);
  };

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

        <Flex>sss</Flex>
      </Layout.Content>
    </Layout>
  );
}

export default VideoLayout;
