import Link from "next/link";

import Icons from "./Icons";
import LocaleSwitcher from "./LocaleSwitcher";
import NavTools from "./NavTools";
import Logo from "./Logo";

export function SiteHeader() {
  return (
    <header className="sticky px-8 top-0 z-40 w-full border-b border-b-slate-200 bg-white">
      <div className="flex max-w-7xl m-auto py-5 h-17 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Logo />
        <NavTools />
        <div className="flex items-center justify-end gap-1">
          <LocaleSwitcher />
          <Link
            href="https://github.com/SpanChenGithub/videonut"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            <Icons.Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
