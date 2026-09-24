import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

export function GlitchText({ text, className }: Props) {
  return (
    <span className={cn("glitch relative inline-block", className)} data-text={text}>
      {text}
    </span>
  );
}
