import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { Question } from "@/data/quizData";
import { cn } from "@/lib/utils";

type Props = {
  question: Pick<Question, "question" | "options" | "correctAnswer">;
  selected: number | null;
  onSelect: (index: number) => void;
  accentClass?: string;
};

const LETTERS = ["A", "B", "C", "D"];

export function QuestionCard({ question, selected, onSelect }: Props) {
  const locked = selected !== null;

  return (
    <div className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-display text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
      >
        {question.question}
      </motion.h2>

      <div className="mt-8 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-4">
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctAnswer;
          const isPicked = selected === i;
          const reveal = locked && (isCorrect || isPicked);

          return (
            <motion.button
              key={option}
              type="button"
              disabled={locked}
              onClick={() => onSelect(i)}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 * i }}
              whileHover={locked ? {} : { x: 6 }}
              whileTap={locked ? {} : { scale: 0.985 }}
              aria-label={`Option ${LETTERS[i]}: ${option}`}
              className={cn(
                "group relative flex items-center gap-4 border border-border bg-card/60 px-4 py-4 text-left backdrop-blur-sm transition-colors md:px-6 md:py-6",
                !locked && "hover:border-g-blue/70 hover:bg-card",
                locked && !reveal && "opacity-40",
                reveal && isCorrect && "border-success bg-success/10",
                reveal && isPicked && !isCorrect && "border-destructive bg-destructive/10",
              )}
            >
              <span className="label-mono shrink-0 !text-sm !tracking-normal text-muted-foreground group-hover:text-foreground">
                {LETTERS[i]}
              </span>
              <span className="text-base font-medium sm:text-lg md:text-xl">{option}</span>
              {reveal && isCorrect && (
                <Check className="ml-auto size-5 shrink-0 text-success" aria-hidden />
              )}
              {reveal && isPicked && !isCorrect && (
                <X className="ml-auto size-5 shrink-0 text-destructive" aria-hidden />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
