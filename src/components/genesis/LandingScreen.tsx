import { motion } from "motion/react";
import { AnimatedBackground } from "./AnimatedBackground";
import { GlitchText } from "./GlitchText";
import { StageButton } from "./StageButton";

export function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <AnimatedBackground variant="blue" particles={22} />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="label-mono relative"
      >
        Enter the experience
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="text-display relative mt-6 text-[18vw] leading-[0.82] sm:text-[14vw] lg:text-[9rem]"
      >
        <span className="block bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">
          GDG
        </span>
        <GlitchText text="GENESIS 4.0" className="block text-g-blue" />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="label-mono relative mt-8 max-w-md !tracking-[0.2em]"
      >
        One day. One challenge. One experience.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.85, type: "spring", stiffness: 200, damping: 18 }}
        className="relative mt-14"
      >
        <StageButton size="lg" onClick={onStart} className="pulse-ring">
          Start
        </StageButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="label-mono absolute bottom-6 flex gap-6 !text-[0.6rem]"
      >
        <span>SYS / ONLINE</span>
        <span className="text-g-green">READY</span>
      </motion.div>
    </section>
  );
}
