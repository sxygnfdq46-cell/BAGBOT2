"use client";
import React from "react";

interface AIOrbProps {
  size?: "sm" | "md" | "lg";
  thinking?: boolean;
}

export function AIOrb({ size = "md", thinking = false }: AIOrbProps) {
  const sizeClasses =
    size === "lg"
      ? "w-14 h-14"
      : size === "sm"
      ? "w-6 h-6"
      : "w-10 h-10";

  return (
    <div
      className={`relative rounded-full ${sizeClasses} bg-gradient-to-br from-cyan-400 to-neon-purple`}
    >
      {thinking && (
        <div className="absolute inset-0 rounded-full border-2 border-cyan-300 opacity-60 animate-ping"></div>
      )}
    </div>
  );
}
