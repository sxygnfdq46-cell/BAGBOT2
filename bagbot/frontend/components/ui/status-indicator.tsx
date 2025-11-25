"use client";
import React from "react";

interface StatusIndicatorProps {
  status?: "active" | "processing" | "offline";
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function StatusIndicator({
  status = "active",
  label = "",
  size = "md",
}: StatusIndicatorProps) {

  const sizeClasses =
    size === "lg"
      ? "px-4 py-2 text-lg"
      : size === "sm"
      ? "px-2 py-1 text-xs"
      : "px-3 py-1 text-sm";

  const statusColor =
    status === "processing"
      ? "bg-yellow-500"
      : status === "active"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <div className={`flex items-center gap-2 ${sizeClasses}`}>
      <span className={`w-3 h-3 rounded-full ${statusColor} animate-pulse`} />
      {label && <span className="text-white">{label}</span>}
    </div>
  );
}
