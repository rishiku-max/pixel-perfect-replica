import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { round1Questions } from "@/data/quizData";

export function QuizScreen({ onComplete }: { onComplete: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = round1Questions[index] ?? round1Questions[0]!;
  const isLast = index === round1Questions.length - 1;

  const select = useCallback(
    (i: number) => {
      setSelected((prev) => {
        if (prev !== null) return prev;
        if (i === question.correctAnswer) setScore((s) => s + 1);
        return i;
      });
    },
    [question],
  );

  const next = useCallback(() => {
    if (selected === null) return;
    if (isLast) {
      onComplete(score);
      return;
    }
    setSelected(null);
    setIndex((i) => i + 1);
  }, [selected, isLast, onComplete, score]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4"].includes(e.key)) select(Number(e.key) - 1);
      if (e.key === "Enter" || e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [select, next]);

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden">
      <AnimatedBackground variant="blue" particles={12} />

      <header className="relative px-6 pt-8 md:px-16 md:pt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="label-mono text-g-blue">Round 01</p>
            <p className="text-display mt-1 text-xl md:text-3xl">THE QUIZ</p>
          </div>
          <p className="label-mono !text-sm !tracking-[0.2em]">
            Question {String(index + 1).padStart(2, "0")} / {round1Questions.length}
          </p>
        </div>
        <div className="mt-5">
          <ProgressBar value={(index + (selected !== null ? 1 : 0)) / round1Questions.length} />
        </div>
      </header>

      <div className="relative flex flex-1 items-center px-6 py-10 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-5xl"
          >
            <QuestionCard question={question} selected={selected} onSelect={select} />
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="relative flex min-h-24 items-center justify-between gap-4 px-6 pb-8 md:px-16 md:pb-12">
        <p className="label-mono hidden !text-[0.6rem] sm:block">
          Keys 1–4 to answer · Enter for next
        </p>
        <AnimatePresence>
          {selected !== null && (
            <motion.button
              type="button"
              onClick={next}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ x: 6 }}
              className="corner-brackets label-mono glow-blue ml-auto flex items-center gap-3 px-8 py-4 !text-foreground"
            >
              {isLast ? "Finish" : "Next"} <ArrowRight className="size-4" aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>
      </footer>
    </section>
  );
}
