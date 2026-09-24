import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { GlitchText } from "./GlitchText";
import { QuestionCard } from "./QuestionCard";
import { bonusQuestion, BONUS_POINTS } from "@/data/quizData";

export function BonusRound({ onComplete }: { onComplete: (points: number) => void }) {
  const [intro, setIntro] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 2600);
    return () => clearTimeout(t);
  }, []);

  const select = useCallback((i: number) => {
    setSelected((prev) => (prev === null ? i : prev));
  }, []);

  const finish = useCallback(() => {
    if (selected === null) return;
    onComplete(selected === bonusQuestion.correctAnswer ? BONUS_POINTS : 0);
  }, [selected, onComplete]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (intro) return;
      if (["1", "2", "3", "4"].includes(e.key)) select(Number(e.key) - 1);
      if (e.key === "Enter" || e.key === "ArrowRight") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro, select, finish]);

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden">
      <AnimatedBackground variant="red" particles={16} />

      <AnimatePresence mode="wait">
        {intro ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-1 flex-col items-center justify-center px-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="label-mono text-g-red"
            >
              Round 02
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="text-display mt-4 text-[20vw] text-g-red sm:text-[10rem]"
            >
              <GlitchText text="BONUS" />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-display mt-6 text-2xl md:text-4xl"
            >
              ONE QUESTION.
              <br />
              ONE CHANCE.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-1 flex-col px-6 py-10 md:px-16"
          >
            <div className="flex items-center justify-between">
              <p className="label-mono text-g-red">Round 02 / Bonus</p>
              <p className="label-mono flex items-center gap-2 !text-sm text-g-yellow">
                <Zap className="size-4" aria-hidden /> {BONUS_POINTS} pts
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-5xl flex-1 items-center">
              <div className="corner-brackets w-full border border-g-red/40 bg-card/40 p-6 backdrop-blur-sm md:p-12">
                <QuestionCard question={bonusQuestion} selected={selected} onSelect={select} />
              </div>
            </div>

            <div className="flex min-h-16 items-center justify-end">
              <AnimatePresence>
                {selected !== null && (
                  <motion.button
                    type="button"
                    onClick={finish}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 6 }}
                    className="corner-brackets label-mono glow-blue flex items-center gap-3 px-8 py-4 !text-foreground"
                  >
                    Reveal <ArrowRight className="size-4" aria-hidden />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
