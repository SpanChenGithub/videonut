import { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { a, useSpring, to } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { clamp } from "lodash-es";
import Image from "next/image";

const HOUR_IN_MS = 3600000;

const formatTime = (ms: any) => {
  const date = new Date();
  date.setMilliseconds(Math.floor(ms));

  if (ms <= HOUR_IN_MS) {
    return date.toISOString().substr(14, 5);
  }

  return date.toISOString().substr(11, 8);
};

const OUTER_WIDTH = 700;
const HANDLE_WIDTH = 16;
const INNER_WIDTH = OUTER_WIDTH - HANDLE_WIDTH * 2;
const BORDER_WIDTH = 6;

const Handle = ({ position, ...rest }: any) => {
  return (
    <a.div
      className="absolute top-0 h-full flex items-center justify-center cursor-ew-resize bg-white"
      {...rest}
    >
      <Image
        className="touch-none user-select-none -webkit-touch-callout-none"
        src="/assets/svg/drag-dot.svg"
        alt="cut video"
        width={4}
        height={24}
      />
    </a.div>
  );
};

const pxToPc = (px: any, max: any) => (px * 100) / max;
const pcToPx = (pc: any, max: any) => (pc * max) / 100;

const pxToPcOuter = (px: any) => pxToPc(px, OUTER_WIDTH);
const pcToPxOuter = (pc: any) => pcToPx(pc, OUTER_WIDTH);
const pxToPcInner = (px: any) => pxToPc(px, INNER_WIDTH);
const pcToPxInner = (pc: any) => pcToPx(pc, INNER_WIDTH);

const Time = ({ time }: any) => {
  return <span>{formatTime(time * 1000)}</span>;
};

const AnimatedTime = a(Time);

const Timeline = ({ duration, currentTime, children }: any) => {
  const [{ x, width, fromVisible, toVisible, active }, set] = useSpring(() => ({
    x: 0,
    width: "100%",
    active: false,
    fromVisible: false,
    toVisible: false,
    config: { precision: 0.01 },
    immediate: true,
  }));

  const bindLeft = useDrag(
    ({ movement: [mx], first, memo, down }) => {
      if (first) memo = { width: width.get(), x: x.get() };
      const maxX =
        pcToPxOuter(memo.width.slice(0, -1)) + memo.x - 2 * HANDLE_WIDTH;
      const nextX = clamp(mx, 0, maxX);
      const nextWidth =
        memo.width.slice(0, -1) - pxToPcOuter(nextX - memo.x) + "%";
      set({
        x: nextX,
        width: nextWidth,
        active: nextX !== 0 || nextWidth !== "100%",
        fromVisible: down,
        immediate: true,
      });
      return memo;
    },
    { from: () => [x.get(), 0] }
  );
  const bindRight = useDrag(({ movement: [ox], first, memo, down }) => {
    if (first) memo = width.get();
    const maxWidth = pxToPcOuter(OUTER_WIDTH - x.get());
    const minWidth = pxToPcOuter(2 * HANDLE_WIDTH);
    const nextWidth =
      clamp(memo.slice(0, -1) - pxToPcOuter(-ox), minWidth, maxWidth) + "%";

    set({
      width: nextWidth,
      active: x.get() !== 0 || nextWidth !== "100%",
      toVisible: down,
      immediate: true,
    });
    return memo;
  });

  const bindMiddle = useDrag(
    ({ movement: [mx], down }) => {
      const maxX = OUTER_WIDTH - pcToPxOuter(width.get().slice(0, -1));
      const nextX = clamp(mx, 0, maxX);
      set({ x: nextX, fromVisible: down, toVisible: down, immediate: true });
    },
    { from: () => [x.get(), 0] }
  );

  return (
    <div
      style={{ width: `${OUTER_WIDTH}px` }}
      className="h-full touch-none user-select-none -webkit-touch-callout-none"
    >
      <div className="relative w-full h-full">
        <div className="w-full h-full">{children}</div>
        <a.div
          id="timeline-container"
          className="absolute top-0 w-full h-full"
          style={{ x, width }}
        >
          <a.div
            id="timeline-inner"
            {...bindMiddle()}
            className="absolute w-full h-full cursor-grab :active:cursor-grabbing"
          />
          <Handle
            {...bindLeft()}
            style={{
              borderRadius: `4px 0 0 4px`,
              width: `${HANDLE_WIDTH}px`,
              left: 0,
            }}
          />
          <Handle
            {...bindRight()}
            style={{
              borderRadius: `0 4px 4px 0`,
              width: `${HANDLE_WIDTH}px`,
              right: 0,
            }}
          />

          <a.div
            className="absolute"
            style={{
              left: `${HANDLE_WIDTH}px`,
              color: "white",
              bottom: `calc(100% + ${BORDER_WIDTH + 8}px)`,
              display: fromVisible.to((visible) =>
                visible ? "block" : "none"
              ),
            }}
          >
            <div
              style={{
                transform: `translateX(calc(-50% + 1px))`,
              }}
            >
              <AnimatedTime
                time={x.to((x) => (((x * 100) / INNER_WIDTH) * duration) / 100)}
              />
            </div>
            <div className="w-1 h-8 bg-white" />
          </a.div>
          <a.div
            className="absolute text-white flex flex-col items-end"
            style={{
              bottom: `calc(100% + ${BORDER_WIDTH + 8}px)`,
              right: `${HANDLE_WIDTH}px`,
              display: toVisible.to((visible) => (visible ? "flex" : "none")),
            }}
          >
            <div
              style={{
                transform: `translateX(calc(50% - 1px))`,
              }}
            >
              <AnimatedTime
                time={to([x, width], (x, width) => {
                  const innerXPc = pxToPcInner(x);
                  const outerWidthPx = pcToPxOuter(`${width}`.slice(0, -1));
                  const innerWidthPc = pxToPcInner(
                    outerWidthPx - HANDLE_WIDTH * 2
                  );
                  return ((innerWidthPc + innerXPc) * duration) / 100;
                })}
              />
            </div>
            <div className="w-[1px] h-8 bg-white" />
          </a.div>
        </a.div>
      </div>
    </div>
  );
};

const DURATION = 500;

export default function AppDemo({ children }: { children: any }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime((prev) => (prev >= DURATION * 1000 ? 0 : prev + 100));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="h-[60px] flex" style={{ width: `${OUTER_WIDTH}px` }}>
      <Timeline duration={DURATION} currentTime={currentTime}>
        {children}
      </Timeline>
    </div>
  );
}
