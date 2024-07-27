import React from "react";
import type { ReactNode, CSSProperties } from "react";
import styles from '/styles/Scroller.module.css'

interface LayoutProps {
  children: ReactNode;
  contentMaxWidth?: string;
}

type CustomCSSProperties = CSSProperties & {
  "--space"?: string;
  "--space-md"?: string;
  "--content-max-width"?: string;
};

export default function Layout({ children, contentMaxWidth }: LayoutProps) {
  const customCSSProperties: CustomCSSProperties = {
    "--content-max-width": contentMaxWidth,
  };
  return (
    <div aria-label="Web site content">
      <main
        className={styles.content}
        aria-label="Principal content of the web page."
        style={customCSSProperties}
      >
        {children}
      </main>
    </div>
  );
}
