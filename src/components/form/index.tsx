import type { DefaultValues } from "react-hook-form";
import type { Next, Jump } from "@formity/react";
import type { z } from "zod";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ItemView, type Item } from "./item";
import { Button } from "../button";

interface FormProps<T extends Record<string, unknown>> {
  defaultValues: DefaultValues<T>;
  validate: z.ZodType<T, T>;
  heading: string;
  message: string;
  content: Item[];
  buttons: {
    next: string;
    back: string | null;
  };
  next: Next<T>;
  jump: Jump<T>;
  prev: string | null;
}

export function Form<T extends Record<string, unknown>>({
  defaultValues,
  validate,
  heading,
  message,
  content,
  buttons,
  next,
  jump,
  prev,
}: FormProps<T>) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(validate),
  });

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit(next)}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <FormProvider {...form}>
        <div className="flex-1 overflow-y-auto px-12 pt-12 pb-8">
          <div className="max-w-lg">
            <div className="mb-10">
              <h2 className="mb-1.5 text-2xl font-bold text-gray-950">
                {heading}
              </h2>
              <p className="text-sm font-medium text-gray-400">{message}</p>
            </div>
            <div className="mb-8 flex flex-col gap-8">
              {content.map((item, i) => (
                <ItemView key={i} {...item} />
              ))}
            </div>
            <div className="flex w-full items-center justify-end gap-8">
              {buttons.back && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => jump(prev, form.getValues())}
                >
                  {buttons.back}
                </Button>
              )}
              <Button type="submit" variant="primary">
                {buttons.next}
              </Button>
            </div>
          </div>
        </div>
      </FormProvider>
    </form>
  );
}
