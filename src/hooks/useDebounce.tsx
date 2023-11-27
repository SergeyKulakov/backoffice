import { useState, useEffect } from "react";

export function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  const [timeoutId, setTimeoutId] = useState<number | null | NodeJS.Timeout>(
    null
  );

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId as NodeJS.Timeout);

    const newTimeoutId = setTimeout(() => {
      func(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  };
}
