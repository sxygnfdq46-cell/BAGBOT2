import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-700/40 ${className}`}
      style={{ width, height }}
    ></div>
  );
}
