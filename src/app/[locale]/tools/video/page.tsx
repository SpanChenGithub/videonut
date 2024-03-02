"use client";
import { useTranslations } from "next-intl";

import { Layout } from "antd";

const { Header, Sider, Content, Footer } = Layout;

export default function Page() {
  const t = useTranslations();

  return <Layout className="h-full items-center">video tools</Layout>;
}
