import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LandingScreen } from "@/components/genesis/LandingScreen";
import { QuizScreen } from "@/components/genesis/QuizScreen";
import { RoundComplete } from "@/components/genesis/RoundComplete";
import { BonusRound } from "@/components/genesis/BonusRound";
import { PrizeScreen } from "@/components/genesis/PrizeScreen";
import { PhotoScreen } from "@/components/genesis/PhotoScreen";
import { BONUS_POINTS, round1Questions } from "@/data/quizData";

const TITLE = "GDG GENESIS 4.0 — One Day. One Challenge. One Experience.";
const DESCRIPTION =
  "An interactive futuristic tech-quiz experience for GDG GENESIS 4.0: two rounds, live scoring, prize reveal and a photo booth finale.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "landing" | "quiz" | "round1" | "bonus" | "bonusScore" | "prize" | "photo";

const MAX_ROUND1 = round1Questions.length;
const MAX_TOTAL = MAX_ROUND1 + BONUS_POINTS;

function Index() {
  const [stage, setStage] = useState<Stage>("landing");
  const [round1Score, setRound1Score] = useState(0);
  const [bonusScore, setBonusScore] = useState(0);

  const reset = () => {
    setRound1Score(0);
    setBonusScore(0);
    setStage("landing");
  };

  return (
    <main className="min-h-dvh bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {stage === "landing" && <LandingScreen onStart={() => setStage("quiz")} />}

          {stage === "quiz" && (
            <QuizScreen
              onComplete={(score) => {
                setRound1Score(score);
                setStage("round1");
              }}
            />
          )}

          {stage === "round1" && (
            <RoundComplete
              label="Round Complete"
              scoreLabel="Your Score"
              score={round1Score}
              total={MAX_ROUND1}
              onContinue={() => setStage("bonus")}
            />
          )}

          {stage === "bonus" && (
            <BonusRound
              onComplete={(points) => {
                setBonusScore(points);
                setStage("bonusScore");
              }}
            />
          )}

          {stage === "bonusScore" && (
            <RoundComplete
              label="Bonus Complete"
              scoreLabel="Bonus Score"
              score={bonusScore}
              total={BONUS_POINTS}
              extra={{
                label: "Total Score — Round 1 + Bonus",
                score: round1Score + bonusScore,
                total: MAX_TOTAL,
              }}
              onContinue={() => setStage("prize")}
            />
          )}

          {stage === "prize" && (
            <PrizeScreen
              total={round1Score + bonusScore}
              maxTotal={MAX_TOTAL}
              onContinue={() => setStage("photo")}
            />
          )}

          {stage === "photo" && <PhotoScreen onRestart={reset} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
