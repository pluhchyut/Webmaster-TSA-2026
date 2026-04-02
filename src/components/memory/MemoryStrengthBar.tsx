type MemoryStrengthBarProps = {
  score: number;
};

export function MemoryStrengthBar({ score }: MemoryStrengthBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-stone-600">
        <span>Memory strength</span>
        <span className="font-semibold text-emerald-900">{Math.round(score)}/100</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-700"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
