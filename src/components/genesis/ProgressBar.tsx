import { motion } from "motion/react";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden bg-foreground/10"
      role="progressbar"
      aria-valuenow={Math.round(value * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Quiz progress"
    >
      <motion.div
        className="h-full"
        style={{
          background: "linear-gradient(90deg, var(--g-blue), var(--g-green), var(--g-yellow))",
          boxShadow: "0 0 18px var(--g-blue)",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value * 100}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
      />
    </div>
  );
}
