import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "./AnimatedBackground";
import { StageButton } from "./StageButton";

type Props = {
  label: string;
  scoreLabel: string;
  score: number;
  total: number;
  extra?: { label: string; score: number; total: number };
  onContinue: () => void;
};

function CountUp({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.1, ease: "easeOut" });
    const unsub = rounded.on("change", setDisplay);
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, mv, rounded]);

  return <>{display}</>;
}

export function RoundComplete({ label, scoreLabel, score, total, extra, onContinue }: Props) {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <AnimatedBackground variant="green" particles={14} />

      <motion.p
        initial={{ opacity: 0, letterSpacing: "1em" }}
        animate={{ opacity: 1, letterSpacing: "0.32em" }}
        transition={{ duration: 0.8 }}
        className="label-mono relative"
      >
        {label}
      </motion.p>

      <p className="label-mono relative mt-10 !text-[0.65rem]">{scoreLabel}</p>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.2 }}
        className="text-display relative mt-2 text-[22vw] text-g-blue sm:text-[10rem]"
      >
        <CountUp value={score} />
        <span className="text-foreground/25"> / {total}</span>
      </motion.div>

      {extra && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="relative mt-6 border-t border-border pt-6"
        >
          <p className="label-mono !text-[0.65rem]">{extra.label}</p>
          <p className="text-display mt-2 text-5xl md:text-7xl">
            <CountUp value={extra.score} />
            <span className="text-foreground/25"> / {extra.total}</span>
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative mt-14"
      >
        <StageButton onClick={onContinue}>Continue</StageButton>
      </motion.div>
    </section>
  );
}
