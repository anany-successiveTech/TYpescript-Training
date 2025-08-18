"use client";
import { ReactNode } from "react";
import "@/app/styles/a5q8.css";

type ButtonProps = {
  type: string;
  onClick: () => void;
  children: ReactNode;
};

export default function Button({
  type = "primary",
  onClick,
  children,
}: ButtonProps) {
  return (
    <button className={`btn btn-${type}`} onClick={onClick}>
      {children}
    </button>
  );
}
