"use client";
import React from "react";

type Props = {
  type?: "info" | "success" | "warning" | "danger";
  title?: string;
  children?: React.ReactNode;
};

const styles: Record<NonNullable<Props["type"]>, string> = {
  info: "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-500/50 dark:bg-blue-950/40 dark:text-blue-200",
  success: "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/50 dark:bg-emerald-950/40 dark:text-emerald-200",
  warning: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-500/50 dark:bg-amber-950/40 dark:text-amber-200",
  danger: "border-red-300 bg-red-50 text-red-900 dark:border-red-500/50 dark:bg-red-950/40 dark:text-red-200",
};

export function Highlight({ type = "info", title, children }: Props) {
  return (
    <div className={`my-4 rounded-xl border p-4 ${styles[type]}`}>
      {title && <p className="mb-2 text-sm font-semibold">{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export default Highlight;