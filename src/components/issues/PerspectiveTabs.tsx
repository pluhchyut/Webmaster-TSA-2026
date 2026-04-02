"use client";

import { useMemo, useState } from "react";

import { PerspectivePanel } from "@/components/issues/PerspectivePanel";
import { type demoIssues } from "@/lib/demoContent";

type PerspectiveTabsProps = {
  perspectives: (typeof demoIssues)[number]["perspectives"];
};

export function PerspectiveTabs({ perspectives }: PerspectiveTabsProps) {
  const [activeKey, setActiveKey] = useState(perspectives[0]?.perspectiveKey);

  const activePerspective = useMemo(
    () => perspectives.find((item) => item.perspectiveKey === activeKey) ?? perspectives[0],
    [activeKey, perspectives],
  );

  if (!activePerspective) return null;

  return (
    <div className="space-y-4">
      <div
        aria-label="Stakeholder perspectives"
        className="flex flex-wrap gap-2"
        role="tablist"
      >
        {perspectives.map((perspective) => {
          const isActive = perspective.perspectiveKey === activePerspective.perspectiveKey;
          return (
            <button
              key={perspective.perspectiveKey}
              aria-selected={isActive}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-emerald-800 text-white"
                  : "border border-stone-200 bg-white text-stone-700 hover:border-emerald-700 hover:text-emerald-900"
              }`}
              role="tab"
              type="button"
              onClick={() => setActiveKey(perspective.perspectiveKey)}
            >
              {perspective.displayName}
            </button>
          );
        })}
      </div>
      <PerspectivePanel perspective={activePerspective} />
    </div>
  );
}
