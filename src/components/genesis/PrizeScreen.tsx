import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Confetti } from "./Confetti";
import { StageButton } from "./StageButton";
import { prizeData } from "@/data/quizData";

export function PrizeScreen({
  total,
  maxTotal,
  onContinue,
}: {
  total: number;
  maxTotal: number;
  onContinue: () => void;
}) {
  const isWinner = total >= Math.ceil(maxTotal * 0.6);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <AnimatedBackground variant="yellow" particles={14} />
      <Confetti />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="label-mono relative text-g-yellow"
      >
        Prize Time
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="text-display relative mt-4 text-[16vw] sm:text-[8rem]"
      >
        YOU MADE IT.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative mt-10 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="glow-soft flex size-24 items-center justify-center border border-g-yellow/50 md:size-32"
        >
          <Trophy className="size-12 text-g-yellow md:size-16" aria-hidden />
        </motion.div>
        <p className="label-mono mt-5 !text-sm text-foreground">
          {isWinner ? "Winner" : "Participant"}
        </p>
        <p className="label-mono mt-2 !text-[0.65rem]">
          Score {total} / {maxTotal}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="corner-brackets relative mt-12 w-full max-w-2xl border border-border bg-card/50 p-6 text-left backdrop-blur-sm md:p-10"
      >
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex size-28 items-center justify-center border border-dashed border-border md:size-32">
            {prizeData.image ? (
              <img
                src={prizeData.image}
                alt={prizeData.title}
                className="size-full object-contain"
              />
            ) : (
              <span className="label-mono !text-[0.55rem]">Prize image</span>
            )}
          </div>
          <div>
            <p className="label-mono !text-[0.6rem]">Prize title</p>
            <p className="text-display mt-1 text-2xl md:text-3xl">{prizeData.title}</p>
            <p className="label-mono mt-5 !text-[0.6rem]">Prize description</p>
            <p className="mt-1 text-muted-foreground">{prizeData.description}</p>
            <div className="mt-5 flex flex-wrap gap-8">
              <div>
                <p className="label-mono !text-[0.6rem]">Winner</p>
                <p className="mt-1 font-medium">{prizeData.winnerName || "[ADD WINNER NAME]"}</p>
              </div>
              <div>
                <p className="label-mono !text-[0.6rem]">Sponsor</p>
                <p className="mt-1 font-medium">{prizeData.sponsor || "[ADD SPONSOR]"}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative mt-12"
      >
        <StageButton onClick={onContinue}>Photo Time</StageButton>
      </motion.div>
    </section>
  );
}
