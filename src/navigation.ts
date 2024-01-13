import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

import { languages } from "./locale";

export const locales = Object.keys(languages);
export const localePrefix = "as-needed"; // 不使用默认前缀

// `pathnames` 对象保存了按语言环境分隔的内部路径和外部路径的对应关系。
export const pathnames = {
  // 如果所有语言环境使用相同的路径，可以提供一个外部路径。
  "/": "/",
  // "/blog": "/blog",
  // 如果不同的语言环境使用不同的路径，您可以为每个语言环境指定外部路径。
  // "/about": {
  //   en: "/about",
  //   de: "/ueber-uns",
  // },
  // 支持通过方括号进行动态参数
  // "/news/[articleSlug]-[articleId]": {
  //   en: "/news/[articleSlug]-[articleId]",
  //   de: "/neuigkeiten/[articleSlug]-[articleId]",
  // },
  // 还支持（可选）捕获所有段
  // "/categories/[...slug]": {
  //   en: "/categories/[...slug]",
  //   de: "/kategorien/[...slug]",
  // },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
