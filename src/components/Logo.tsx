"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import Link from "next/link";

const { useRef, useState, useEffect, useMemo, memo } = React;

export interface ILogoProps {}

export const Logo: React.FC<ILogoProps> = (props) => {
  const {} = props;
  const t = useTranslations();

  const imageLoader = ({ src, width, quality }: any) => {
    // return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
    return `https://cdn0.iconfinder.com/data/icons/technology-and-support-spot/64/file_convert-512.png?w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <Link href="/" className="flex">
      <div className="hidden items-center space-x-2 md:flex">
        <Image
          src="/assets/images/Logo.webp"
          className="rounded-md"
          alt="Picture of videonut logo"
          width={112}
          height={28}
        />
      </div>
    </Link>
  );
};
export default memo(Logo);
