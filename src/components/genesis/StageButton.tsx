import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  onClick: () => void;
  size?: "md" | "lg";
  className?: string;
};

export function StageButton({ children, onClick, size = "md", className }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
      className={cn(
        "corner-brackets glow-blue label-mono relative bg-transparent !text-foreground transition-colors hover:bg-g-blue/10",
        size === "lg" ? "px-12 py-5 !text-sm md:px-20 md:py-7 md:!text-base" : "px-8 py-4",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
