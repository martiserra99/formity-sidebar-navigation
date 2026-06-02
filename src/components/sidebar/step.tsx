import { cva } from "class-variance-authority";
import { CheckIcon } from "lucide-react";

const stepVariants = cva(
  "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/50",
  {
    variants: {
      state: {
        here: "bg-white/10",
        good: "bg-white/10",
        done: "hover:bg-white/10",
        next: "hover:bg-white/10",
        locked: "",
      },
    },
  },
);

const checkVariants = cva(
  "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300",
  {
    variants: {
      state: {
        here: "border-white/50 bg-white/10 text-white",
        good: "border-white bg-white text-gray-950",
        done: "border-white bg-white text-gray-950",
        next: "border-white/50 text-white",
        locked: "border-white/20 text-gray-400",
      },
    },
  },
);

const labelVariants = cva("truncate text-xs font-semibold transition-colors", {
  variants: {
    state: {
      here: "text-white",
      good: "text-white",
      done: "text-white",
      next: "text-white",
      locked: "text-gray-400",
    },
  },
});

const subtitleVariants = cva("mt-0.5 truncate text-xs transition-colors", {
  variants: {
    state: {
      here: "text-gray-400",
      good: "text-gray-400",
      done: "text-gray-400",
      next: "text-gray-400",
      locked: "text-gray-500",
    },
  },
});

type State = "here" | "good" | "done" | "next" | "locked";

interface StepProps {
  position: string;
  label: string;
  subtitle: string;
  state: State;
  onClick: () => void;
}

export function Step({ position, label, subtitle, state, onClick }: StepProps) {
  return (
    <button
      className={stepVariants({ state })}
      disabled={state === "locked"}
      onClick={onClick}
    >
      <div className={checkVariants({ state })}>
        {state === "good" || state === "done" ? (
          <CheckIcon className="size-3" strokeWidth={3} />
        ) : (
          position
        )}
      </div>
      <div className="min-w-0">
        <p className={labelVariants({ state })}>{label}</p>
        <p className={subtitleVariants({ state })}>{subtitle}</p>
      </div>
    </button>
  );
}
