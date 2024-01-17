"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { Layout, Tag } from "antd";
import Icons from "@/components/Icons";

const { Header, Sider, Content, Footer } = Layout;

export default function Page({ params }: { params: any }) {
  const t = useTranslations();

  const locale = useLocale();

  return (
    <Layout className="h-full items-center">
      <Layout className="max-w-7xl w-full items-center">
        <Content className="p-8 w-full">content</Content>
      </Layout>
      <Footer className="max-w-7xl m-auto">
        Media Modify ©2023 Created by Media Modify
      </Footer>
    </Layout>
  );
}
