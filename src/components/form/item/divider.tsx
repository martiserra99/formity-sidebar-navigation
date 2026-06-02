export interface Divider {
  type: "divider";
  label: string;
}

export function DividerView({ label }: Divider) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
        {label}
      </p>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}
