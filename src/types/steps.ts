import type { z } from "zod";

export type Steps = [...FormStep[], ReviewStep];

export type FormStep<T = Record<string, unknown>> = {
  id: string;
  label: string;
  subtitle: string;
  zod: z.ZodType<T, T>;
};

export type ReviewStep = {
  id: string;
  label: string;
  subtitle: string;
};
