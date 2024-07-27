import React from "react";
import styles from '/styles/Scroller.module.css'


interface GalleryDivProps {
  children: React.ReactNode[];
  direction?: string;
  galleryItemsAspectRatio?: "video" | "square" | "regular";
}

export default function GalleryDiv({
  children,
  direction = "right",
  galleryItemsAspectRatio = "square",
}: GalleryDivProps) {
  return (
    <div
      className={styles.gallery}
      data-direction={direction}
    >
      <ul
        className={styles.floating_content}
        data-images={galleryItemsAspectRatio}
      >
        {children}
      </ul>
    </div>
  );
}
