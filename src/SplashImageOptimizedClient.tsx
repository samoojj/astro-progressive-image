import { useEffect, useState } from "react";
import { motion } from "motion/react";

type Props = {
  desktopSrcSet: string;
  mobileSrcSet: string;
};

export default function SplashImageOptimizedClient({
  desktopSrcSet,
  mobileSrcSet,
}: Props) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  // --- MEDIA QUERY ---
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px)");

    const update = () => setIsDesktop(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      {/* Desktop hi-res */}
      <motion.img
        srcSet={desktopSrcSet}
        sizes="100vw"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDesktop ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Mobile hi-res */}
      <motion.img
        srcSet={mobileSrcSet}
        sizes="100vw"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDesktop === false ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
    </>
  );
}
