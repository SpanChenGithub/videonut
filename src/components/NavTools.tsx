"use client";

import * as React from "react";
import Link from "next/link";

import { Dropdown, Layout } from "antd";

import { useTranslations, useLocale } from "next-intl";
import type { MenuProps, MenuTheme } from "antd";

import Icons from "@/components/Icons";

const { Header, Footer, Sider, Content } = Layout;

export interface NavItem {
  name: React.ReactNode;
  hideDropdown?: boolean;
  items?: MenuProps["items"];
}

export default function NavTools() {
  const t = useTranslations();

  const locale = useLocale();

  const ToolImages: MenuProps["items"] = [
    {
      key: "Product",
      label: (
        <Link href={`/${locale}/product`} locale={locale} className="flex">
          {/* <Icons.FileImage className="mr-2 h-4 w-4 text-orange-500" /> */}
          <span>{t("nav.Product")}</span>
        </Link>
      ),
    },
    {
      key: "UseCases",
      label: (
        <Link href={`/${locale}/use-cases`} locale={locale} className="flex">
          {/* <Icons.FileAudio className="mr-2 h-4 w-4 text-blue-500" /> */}
          <span>{t("nav.UseCases")}</span>
        </Link>
      ),
    },
    {
      key: "Resources",
      label: (
        <Link href={`/${locale}/resources`} locale={locale} className="flex">
          {/* <Icons.FileVideo className="mr-2 h-4 w-4 text-rose-500" /> */}
          <span>{t("nav.Resources")}</span>
        </Link>
      ),
    },
    {
      key: "ForBusiness",
      label: (
        <Link href={`/${locale}/for-business`} locale={locale} className="flex">
          {/* <Icons.FileText className="mr-2 h-4 w-4 text-green-500" /> */}
          <span>{t("nav.ForBusiness")}</span>
        </Link>
      ),
    },
    {
      key: "Pricing",
      label: (
        <Link href={`/${locale}/pricing`} locale={locale} className="flex">
          {/* <Icons.FileText className="mr-2 h-4 w-4 text-green-500" /> */}
          <span>{t("nav.Pricing")}</span>
        </Link>
      ),
    },
  ];

  const NavItems: NavItem[] = [
    {
      name: t("nav.Product"),
      items: ToolImages,
    },
    {
      name: t("nav.UseCases"),
      items: ToolImages,
    },
    {
      name: t("nav.Resources"),
      items: ToolImages,
    },
    {
      name: t("nav.ForBusiness"),
      items: ToolImages,
    },
    {
      name: t("nav.Pricing"),
      items: ToolImages,
      hideDropdown: true,
    },
  ];

  return (
    <nav className="flex flex-1 text-base font-semibold	text-[#191919] lg:gap-x-[20px] xl:gap-x-[40px]">
      {NavItems.map(({ name, items, hideDropdown }, index) => {
        return hideDropdown ? (
          <Link
            key={index}
            href="https://github.com/SpanChenGithub/videonut"
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </Link>
        ) : (
          <Dropdown key={index} menu={{ items }} className="cursor-pointer">
            <a className="flex-center gap-x-[4px]">
              <span>{name}</span>
              <Icons.ChevronDown className="h-[16px] w-[16px]" />
            </a>
          </Dropdown>
        );
      })}
    </nav>
  );
}
