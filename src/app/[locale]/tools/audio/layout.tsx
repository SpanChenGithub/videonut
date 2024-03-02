"use client";
import { useRef, useState } from "react";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useTranslations } from "next-intl";

import { Layout } from "antd";

const { Header, Sider, Content, Footer } = Layout;

export default function Page({ params }: { params: any }) {
  const t = useTranslations();

  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const load = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.3/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.js`,
        "application/javascript"
      ),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
    setIsLoading(false);
  };

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    // u can use 'https://ffmpegwasm.netlify.app/video/video-15s.avi' to download the video to public folder for testing
    await ffmpeg.writeFile("input.avi", await fetchFile("video-15s.avi"));
    await ffmpeg.exec(["-i", "input.avi", "output.mp4"]);
    const data = (await ffmpeg.readFile("output.mp4")) as any;
    if (videoRef.current)
      videoRef.current.src = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
  };

  return (
    <Layout className="h-full items-center px-8">
      <h1 className="m-[30px]">{params.convert}</h1>
      <Content className="container max-w-7xl ">
        {loaded ? (
          <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <video ref={videoRef} controls></video>
            <br />
            <button
              onClick={transcode}
              className="rounded bg-green-500 px-6 py-3 text-white hover:bg-green-700"
            >
              Transcode avi to mp4
            </button>
            <p ref={messageRef}></p>
          </div>
        ) : (
          <button
            className="fixed left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            onClick={load}
          >
            Load ffmpeg-core
            {isLoading && (
              <span className="ml-3 animate-spin">
                <svg
                  viewBox="0 0 1024 1024"
                  focusable="false"
                  data-icon="loading"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                </svg>
              </span>
            )}
          </button>
        )}
      </Content>
    </Layout>
  );
}
