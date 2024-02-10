import { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { a, useSpring, to } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { clamp } from "lodash-es";

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
const HANDLE_WIDTH = 27;
const INNER_WIDTH = OUTER_WIDTH - HANDLE_WIDTH * 2;
const BORDER_WIDTH = 6;

const HandleStrip = () => {
  return (
    <div
      className={css`
        height: 20px;
        border-radius: 32px;
        width: 3px;
        background: currentColor;
      `}
    />
  );
};

const Handle = ({ position, ...rest }: any) => {
  return (
    <a.div
      className={css`
        position: absolute;
        top: 0;
        ${position}: 0;
        height: 100%;
        width: ${HANDLE_WIDTH}px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: w-resize;
        background: #ffcd02;
      `}
      {...rest}
    >
      <HandleStrip />
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
      className={css`
        width: ${OUTER_WIDTH}px;
        height: 100%;
        touch-action: none;
        user-select: none;
        -webkit-touch-callout: none;
      `}
    >
      <div
        className={css`
          position: relative;
          border-radius: 0.5rem;
          width: 100%;
          height: 100%;
        `}
      >
        <div
          className={css`
            width: 100%;
            height: 100%;
            padding: ${BORDER_WIDTH}px ${HANDLE_WIDTH}px;
          `}
        >
          <div
            className={css`
              position: relative;
              width: 100%;
              height: 100%;
            `}
          >
            <div
              className={css`
                width: 100%;
                height: 100%;
                background: #444;
              `}
            >
              {children}
            </div>
            <div
              className={css`
                width: 5px;
                height: calc(100% + ${BORDER_WIDTH / 2}px);
                background: white;
                position: absolute;
                top: ${-BORDER_WIDTH / 4}px;
                left: ${(currentTime / 1000) * (100 / duration)}%;
                border-radius: 50px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                z-index: 1;
              `}
            />
          </div>
        </div>
        <a.div
          id="timeline-container"
          className={css`
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            border-top: ${BORDER_WIDTH}px solid;
            border-bottom: ${BORDER_WIDTH}px solid
              ${active ? "#ffcd02" : "#ffcd02"};
            position: absolute;
          `}
          style={{
            x,
            width,
            borderColor: active.to((active) =>
              active ? "#ffcd02" : "#ffcd02"
            ),
          }}
        >
          <a.div
            id="timeline-inner"
            {...bindMiddle()}
            className={css`
              position: absolute;
              width: 100%;
              height: 100%;
              cursor: grab;

              &:active {
                cursor: grabbing;
              }
            `}
          />
          <Handle
            position="left"
            {...bindLeft()}
            style={{
              background: active.to((active) => (active ? "#ffcd02" : "#222")),
              color: active.to((active) => (active ? "#ffcd02" : "#fff")),
            }}
          />
          <Handle
            position="right"
            {...bindRight()}
            style={{
              background: active.to((active) => (active ? "#ffcd02" : "#222")),
              color: active.to((active) => (active ? "#ffcd02" : "#fff")),
            }}
          />

          <a.div
            className={css`
              position: absolute;
              bottom: calc(100% + ${BORDER_WIDTH + 8}px);
              left: ${HANDLE_WIDTH}px;
              color: white;
            `}
            style={{
              display: fromVisible.to((visible) =>
                visible ? "block" : "none"
              ),
            }}
          >
            <div
              className={css`
                transform: translateX(calc(-50% + 1px));
              `}
            >
              <AnimatedTime
                time={x.to((x) => (((x * 100) / INNER_WIDTH) * duration) / 100)}
              />
            </div>
            <div
              className={css`
                width: 1px;
                height: 2rem;
                background: white;
              `}
            />
          </a.div>
          <a.div
            className={css`
              position: absolute;
              bottom: calc(100% + ${BORDER_WIDTH + 8}px);
              right: ${HANDLE_WIDTH}px;
              color: white;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            `}
            style={{
              display: toVisible.to((visible) => (visible ? "flex" : "none")),
            }}
          >
            <div
              className={css`
                transform: translateX(calc(50% - 1px));
              `}
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
            <div
              className={css`
                width: 1px;
                height: 2rem;
                background: white;
              `}
            />
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
    <div
      className={css`
        display: grid;
        flex: 1;
        place-items: center;
      `}
    >
      <div
        className={css`
          display: flex;
        `}
      >
        <div
          className={css`
            width: ${OUTER_WIDTH}px;
            height: 62px;
            background: #222;
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          `}
        >
          <div
            className={css`
              width: 100%;
              height: 100%;
              border-radius: 0.5rem;
            `}
          >
            <Timeline duration={DURATION} currentTime={currentTime}>
              {children}
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
}
