"use client";
import React from "react";

interface AlertPanelProps {
  type?: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
}

export function AlertPanel({
  type = "info",
  title,
  message,
}: AlertPanelProps) {
  const color =
    type === "info"
      ? "bg-blue-500"
      : type === "warning"
      ? "bg-yellow-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-green-500";

  return (
    <div className={`p-4 rounded-lg bg-opacity-20 border ${color} border-opacity-40`}>
      <h3 className="font-bold text-white">{title}</h3>
      <p className="text-white text-sm opacity-90">{message}</p>
    </div>
  );
}
