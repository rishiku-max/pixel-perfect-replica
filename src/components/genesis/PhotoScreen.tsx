import { motion } from "motion/react";
import { AnimatedBackground } from "./AnimatedBackground";
import { GlitchText } from "./GlitchText";
import { StageButton } from "./StageButton";
import { eventConfig } from "@/data/quizData";

export function PhotoScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <AnimatedBackground variant="violet" particles={20} />

      <p className="label-mono relative">Photo Time</p>
      <h2 className="text-display relative mt-3 text-4xl md:text-6xl">{eventConfig.photoText}</h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="corner-brackets glow-blue relative mt-8 flex w-full max-w-5xl flex-col items-center justify-between gap-10 border border-g-blue/40 bg-card/30 px-6 py-12 backdrop-blur-sm md:px-14 md:py-20"
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative flex w-full items-start justify-between">
          <span className="label-mono !text-[0.55rem]">REC ●</span>
          <span className="label-mono !text-[0.55rem]">FRAME 01</span>
        </div>

        <div className="relative">
          <p className="label-mono">Google Developer Group</p>
          <h3 className="text-display mt-3 text-[13vw] leading-none sm:text-[7rem]">
            <GlitchText text="GENESIS 4.0" className="text-g-blue" />
          </h3>
          <p className="label-mono mt-5 !tracking-[0.4em]">{eventConfig.tagline}</p>
        </div>

        <div className="relative flex w-full items-end justify-between">
          <span className="label-mono !text-[0.55rem]">{eventConfig.eventName}</span>
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-g-blue" />
            <span className="size-2 rounded-full bg-g-red" />
            <span className="size-2 rounded-full bg-g-yellow" />
            <span className="size-2 rounded-full bg-g-green" />
          </div>
        </div>
      </motion.div>

      <div className="relative mt-10">
        <StageButton onClick={onRestart}>Restart Experience</StageButton>
      </div>
    </section>
  );
}
