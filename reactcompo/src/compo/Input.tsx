import { useState } from "react";

export default function InputField({
    label,
    placeholder = "",
    helper,
    size,
    variant,
    disabled,
    error,
    loading,
    clear,
    type,
}) {
    const [value, setValue] = useState("");
    const [password, setShowPassword] = useState(true);

    const sizeclass = {
        sm: "px-2 py-1 text-sm text-red-500 border-2 border-yellow-400",
        medium: "px-2 py-2 text-medium",
        lg: "px-2 py-2 text-lg"
    }
    const varientclass = {
        outlined: "border border-gray-300  dark:border-gray-700 dark:bg-gray-900",
        filled: "px-2 py-1 text-sm text-red-500 border-2 border-yellow-400 ",
        ghost: "border-transparent bg-transparent",
    }

    return (
        <div className="w-full">
            {label && (
                <label
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    {label}
                </label>
            )}

            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
            // className={`${sizeclass[size]}`}
            // className={`${varientclass[variant]}`}
            // className={`${disabled ? "bg-gray-100 text-gray-400" : "bg-red-500 text-yellow"}`}
            // className={`${error ? "bg-gray-100 text-gray-400" : "bg-red-500 text-yellow"}`}

            />
            {type === "text" && !loading && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="border-red-400"
                >
                    {password ? "🙈" : "👁️"}
                </button>
            )}

            {clear && value && !loading && (
                <button
                    type="button"
                    onClick={() => setValue("")}
                    className="border-green-400"
                >✕
                </button>
            )}
            {loading && (

                <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 "></div>

            )}

            {helper && (
                <p

                    className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                >
                    {helper}
                </p>
            )}
        </div>
    );
}
