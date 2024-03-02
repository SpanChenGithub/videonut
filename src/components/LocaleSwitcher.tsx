"use client";
import { useLocale } from "next-intl";

import { Select } from "antd";
// import { usePathname } from "next-intl/client";
// import Link from "next-intl/link";

import { usePathname, useRouter } from "@/navigation";

import { languages } from "@/locale";

import Icons from "./Icons";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  return (
    <Select
      defaultValue={locale}
      className="w-[120px]"
      onChange={handleChange}
      suffixIcon={<Icons.Languages className="h-5 w-5" />}
      variant="borderless"
      options={Object.entries(languages).map(([lang, setting]) => ({
        value: lang,
        label: `${setting.flag} ${setting.name}`,
      }))}
    />
  );
}
// <Dropdown
//   menu={{
//     items: Object.entries(languages).map(([lang, setting]) => ({
//       key: lang,
//       label: (
//         <Link href={pathname ?? "/"} locale={lang}>
//           {setting.flag}&nbsp;&nbsp;{setting.name}
//         </Link>
//       ),
//     })),
//   }}
// >
//   <div className="btn" role={"button"} tabIndex={0}>
//     <Icons.Languages className="h-5 w-5" />
//   </div>
// </Dropdown>
