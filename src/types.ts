import type { ImageMetadata } from "astro";

export interface ProgressiveImage {
  optimizedSrc: ImageMetadata;
  fullResPath: string;
}
