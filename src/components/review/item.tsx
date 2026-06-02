import { cn } from "@/lib/cn";

export interface Item {
  text: string;
  rows: { label: string; value: string }[];
}

export function ItemView({ text, rows }: Item) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
        <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          {text}
        </p>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={cn("flex items-center justify-between px-5 py-3", {
            "border-b border-gray-200": i < rows.length - 1,
          })}
        >
          <span className="text-xs font-medium text-gray-500">{row.label}</span>
          <span className="text-xs font-semibold text-gray-900">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
