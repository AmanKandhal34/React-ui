import { useState } from "react";

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  helper?: string;
  size?: "sm" | "medium" | "lg";
  variant?: "outlined" | "filled" | "ghost";
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
  clear?: boolean;
  type?: "text" | "password" | "email" | "number"; // extend as needed
};

export default function InputField({
  label,
  placeholder = "",
  helper,
  size = "medium",
  variant = "outlined",
  disabled = false,
  error = false,
  loading = false,
  clear = false,
  type = "text",
}: InputFieldProps) {
  const [value, setValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const sizeclass: Record<NonNullable<InputFieldProps["size"]>, string> = {
    sm: "px-2 py-1 text-sm",
    medium: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantclass: Record<NonNullable<InputFieldProps["variant"]>, string> = {
    outlined: "border border-gray-300 dark:border-gray-700 dark:bg-gray-900",
    filled: "bg-gray-100 border border-gray-200",
    ghost: "border-transparent bg-transparent",
  };

  return (
    <div className="w-1/2">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none
            ${sizeclass[size]} ${variantclass[variant]}
            ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
            ${error ? "border-red-500" : ""}`}
        />

        {/* Password toggle */}
        {type === "password" && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 text-gray-600"
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}

        {/* Clear button */}
        {clear && value && !loading && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-2 text-gray-600"
          >
            ✕
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2 h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent"></div>
        )}
      </div>

      {helper && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helper}</p>
      )}
    </div>
  );
}
