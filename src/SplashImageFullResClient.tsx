import { useEffect, useState } from "react";
import { motion } from "motion/react";

type Props = {
  desktopSrc: string;
  mobileSrc: string;
};

function loadImage(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
  });
}

export default function SplashImageFullResClient({
  desktopSrc,
  mobileSrc,
}: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px)");

    const load = (isDesktop: boolean) => {
      const url = isDesktop ? desktopSrc : mobileSrc;
      loadImage(url).then(setSrc);
    };

    load(mq.matches);

    const onChange = (e: MediaQueryListEvent) => load(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!src) return null;

  return (
    <motion.img
      key={src}
      src={src}
      alt="Mill River, Florence, MA"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
}
