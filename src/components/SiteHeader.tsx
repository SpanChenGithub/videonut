import Link from "next/link";

import Icons from "./Icons";
import LocaleSwitcher from "./LocaleSwitcher";
import NavTools from "./NavTools";
import Logo from "./Logo";
import { useTranslations } from "next-intl";
import { Button, Flex } from "antd";

export function SiteHeader() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      <div className="max-w-[1440px] m-auto flex md:px-[16px] lg:px-[22px] xl:px-[32px] md:py-[4px] lg:py-[6px] xl:py-[16px] h-[60px] items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex-center lg:gap-x-[10px] xl:gap-x-[48px]">
          <Logo />
          <NavTools />
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
