import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...rest
}) => {
  const base =
    "px-4 py-2 rounded-md font-medium text-sm border transition disabled:opacity-60 disabled:cursor-not-allowed";
  const primary =
    "bg-purple-600 text-white border-transparent hover:bg-purple-700";
  const secondary =
    "bg-white text-gray-800 border-gray-300 hover:bg-gray-50";

  const className = `${base} ${variant === "primary" ? primary : secondary} ${
    rest.className ?? ""
  }`;

  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
};
