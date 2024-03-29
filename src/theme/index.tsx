"use client";

import { ConfigProvider } from "antd";

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeight: 32,
            borderRadius: 4,
            colorPrimaryHover: "rgb(45, 147, 255)",
            colorPrimaryActive: "rgb(0, 88, 182)",
            colorPrimary: "rgb(0, 115, 238)",
          },
          Tooltip: {
            colorBgSpotlight: "rgb(0, 115, 238)",
          },
        },
        token: {
          colorPrimary: "#0067D1",
          colorInfo: "#0067d1",
          colorTextBase: "#191919",
        },
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
