import type { Next, Jump } from "@formity/react";
import type { FormStatus } from "../../types/status";

import { ItemView, type Item } from "./item";
import { Button } from "../button";

interface ReviewProps {
  heading: string;
  message: string;
  content: Item[];
  buttons: {
    next: string;
    back: string;
  };
  next: Next<Record<never, never>>;
  jump: Jump<Record<never, never>>;
  prev: string;
  status: FormStatus;
}

export function Review({
  heading,
  message,
  content,
  buttons,
  next,
  jump,
  prev,
  status,
}: ReviewProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 pt-12 pb-8">
        <div className="max-w-lg">
          <div className="mb-10">
            <h2 className="mb-1.5 text-2xl font-bold text-gray-950">
              {heading}
            </h2>
            <p className="text-sm font-medium text-gray-400">{message}</p>
          </div>
          <div className="mb-8 flex flex-col gap-4">
            {content.map((item, i) => (
              <ItemView key={i} {...item} />
            ))}
          </div>
          <div className="flex w-full items-center justify-end gap-8">
            <Button
              type="button"
              variant="secondary"
              disabled={status.submitting}
              onClick={() => jump(prev, {})}
            >
              {buttons.back}
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={() => next({})}
              disabled={status.submitting}
            >
              {status.submitting ? "Submitting..." : buttons.next}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
