// src/components/link/index.tsx
//
// This is a custom Link component for Next.js projects.
//
// Purpose:
// - Wraps Next.js's built-in <Link> to provide enhanced UX and prefetching behavior.
// - Prefetches the linked page when the user hovers over the link, improving perceived navigation speed.
// - Accepts all standard Next.js Link props, plus target and other anchor attributes.
//
// How it works:
// - Uses a ref to access the underlying anchor element.
// - On mouseover, sets prefetching to true, triggering Next.js to prefetch the page in the background.
// - On mouseleave, disables prefetching.
// - This makes navigation feel faster, especially on slow networks or large pages.
//
// Usage Example:
//   <Link href="/about">About Us</Link>
//   <Link href="/menu" target="_blank">Menu</Link>

"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from "react";

type CustomLinkProps = NextLinkProps & {
  children: React.ReactNode;
  href: string;
  target?: string;
} & HTMLAttributes<HTMLAnchorElement>;

const Link: FC<CustomLinkProps> = ({ children, href, ...rest }) => {
  const [prefetching, setPrefetching] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const setPrefetchListener = () => {
    setPrefetching(true);
  };
  const removePrefetchListener = () => {
    setPrefetching(false);
  };
  useEffect(() => {
    const linkElement = linkRef.current;
    linkElement?.addEventListener("mouseover", setPrefetchListener);
    linkElement?.addEventListener("mouseleave", removePrefetchListener);
    return () => {
      linkElement?.removeEventListener("mouseover", setPrefetchListener);
      linkElement?.removeEventListener("mouseleave", removePrefetchListener);
    };
  }, [prefetching]);
  return (
    <NextLink href={href} ref={linkRef} prefetch={prefetching} {...rest}>
      {children}
    </NextLink>
  );
};

export default Link;
