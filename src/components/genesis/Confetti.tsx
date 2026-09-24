import { useMemo } from "react";

const COLORS = ["var(--g-blue)", "var(--g-red)", "var(--g-yellow)", "var(--g-green)"];

export function Confetti({ count = 60 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 17) % 100,
        delay: (i % 12) * 0.45,
        duration: 4 + (i % 5),
        drift: ((i % 7) - 3) * 30,
        color: COLORS[i % COLORS.length],
        rounded: i % 3 === 0,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            borderRadius: p.rounded ? "9999px" : undefined,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
