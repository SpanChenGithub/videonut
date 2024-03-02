import Link from "next/link";

import { Button, Flex } from "antd";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import Navbar from "./Navbar";

export function SiteHeader() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      <div className="m-auto flex h-[60px] max-w-[1440px] items-center space-x-4 sm:justify-between sm:space-x-0 md:px-[16px] md:py-[4px] lg:px-[22px] lg:py-[6px] xl:px-[32px] xl:py-[16px]">
        <div className="flex-center lg:gap-x-[10px] xl:gap-x-[48px]">
          <Logo />
          <Navbar />
        </div>
        <div className="flex items-center justify-end md:gap-x-[4px] lg:gap-x-[10px] xl:gap-x-[26px]">
          <Link
            href="https://github.com/SpanChenGithub/videonut"
            target="_blank"
            rel="noreferrer"
          >
            {t("nav.ContactSales")}
          </Link>
          <LocaleSwitcher />
          <Flex gap="12px" wrap="wrap">
            <Button className="w-[88px]" size="large">
              Login
            </Button>
            <Button className="w-[88px]" size="large" type="primary">
              Sign Up
            </Button>
          </Flex>
        </div>
      </div>
    </header>
  );
}
