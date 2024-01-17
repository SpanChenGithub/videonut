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
      <div className="max-w-[1440px] m-auto flex px-[32px] py-[16px] h-[60px] items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex-center gap-x-[48px]">
          <Logo />
          <NavTools />
        </div>
        <div className="flex items-center justify-end gap-x-[26px]">
          <Link
            href="https://github.com/SpanChenGithub/videonut"
            target="_blank"
            rel="noreferrer"
            className="btn"
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
