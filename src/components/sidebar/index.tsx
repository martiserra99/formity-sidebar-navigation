import type { Steps, FormStep, ReviewStep } from "../../types/steps";

import { motion } from "motion/react";

import { Step } from "./step";

interface SidebarProps {
  steps: Steps;
  current: number;
  completed: number;
  jump: (step: string) => void;
}

export function Sidebar({ steps, current, completed, jump }: SidebarProps) {
  const forms = steps.slice(0, -1) as FormStep[];
  const review = steps[steps.length - 1] as ReviewStep;
  return (
    <aside className="hidden w-72 shrink-0 flex-col overflow-hidden bg-gray-950 @3xl:flex">
      <nav className="flex flex-col gap-0.5 px-4 pt-12">
        {forms.map((form: FormStep, i) => (
          <Step
            key={form.id}
            position={`${i + 1}`}
            label={form.label}
            subtitle={form.subtitle}
            state={state(i, current, completed)}
            onClick={() => jump(form.id)}
          />
        ))}
        <Step
          position={`${forms.length + 1}`}
          label={review.label}
          subtitle={review.subtitle}
          state={state(forms.length, current, completed)}
          onClick={() => jump(review.id)}
        />
      </nav>
      <div className="mt-auto border-t border-white/10 px-6 pt-4 pb-7">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400">
            Step {current + 1} of {steps.length}
          </span>
          <span className="text-xs font-semibold text-gray-400">
            {Math.round((completed / forms.length) * 100)}%
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full origin-left rounded-full bg-white"
            animate={{ scaleX: completed / forms.length }}
            initial={false}
          />
        </div>
      </div>
    </aside>
  );
}

function state(step: number, current: number, completed: number) {
  const here = step === current;
  const done = step < completed;
  const next = step === completed;
  if (here && done) return "good";
  if (here) return "here";
  if (done) return "done";
  if (next) return "next";
  return "locked";
}
