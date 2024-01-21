"use client";

import React from "react";
import { ConfigProvider } from "antd";

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 4,
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
