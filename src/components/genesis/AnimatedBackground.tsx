import { motion } from "motion/react";
import { useMemo } from "react";

type Props = {
  /** hue accent for glowing orbs */
  variant?: "blue" | "red" | "green" | "yellow";
  particles?: number;
};

const accentMap = {
  blue: "var(--g-blue)",
  red: "var(--g-red)",
  green: "var(--g-green)",
  yellow: "var(--g-yellow)",
};

export function AnimatedBackground({ variant = "blue", particles = 18 }: Props) {
  const accent = accentMap[variant];

  const dots = useMemo(
    () =>
      Array.from({ length: particles }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        delay: (i % 7) * 0.8,
        duration: 9 + (i % 5) * 2.5,
        size: 1 + (i % 3),
      })),
    [particles],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-[0.55]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_85%)]" />

      <motion.div
        className="absolute -left-40 top-[-10%] h-[45rem] w-[45rem] rounded-full blur-[140px]"
        style={{ background: accent, opacity: 0.16 }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-40 bottom-[-15%] h-[38rem] w-[38rem] rounded-full blur-[140px]"
        style={{ background: "var(--g-violet)", opacity: 0.14 }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: accent,
            boxShadow: `0 0 8px ${"currentColor"}`,
          }}
          animate={{ y: [0, -70, 0], opacity: [0, 0.9, 0] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="scanlines absolute inset-0" />
    </div>
  );
}
