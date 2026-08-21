"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md";
  disabled?: boolean;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Chọn...",
  className,
  size = "sm",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block text-left", className)}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border border-stone-200 bg-white font-sans text-xs font-medium text-stone-800 shadow-2xs transition-colors hover:bg-stone-50 focus:border-stone-400 focus:outline-none disabled:opacity-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800/80",
          size === "sm" ? "px-3 py-1.5" : "px-3.5 py-2",
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-stone-400 transition-transform duration-200",
            isOpen && "rotate-180 text-stone-700 dark:text-stone-300",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1.5 max-h-60 min-w-[200px] w-full overflow-y-auto rounded-md border border-stone-200 bg-white p-1 text-xs shadow-lg animate-in fade-in zoom-in-95 duration-100 dark:border-stone-800 dark:bg-stone-900">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-stone-400 italic text-center">
              Không có dữ liệu
            </div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xs px-2.5 py-1.5 font-sans text-xs transition-colors",
                    isSelected
                      ? "bg-stone-100 font-semibold text-stone-900 dark:bg-stone-800 dark:text-stone-50"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800/60 dark:hover:text-stone-100",
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <Check className="size-3.5 shrink-0 text-stone-900 dark:text-stone-100" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
