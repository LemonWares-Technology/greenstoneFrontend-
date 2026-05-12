import { useState, useCallback } from "react";

interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: unknown[]) => Promise<T | undefined>;
  reset: () => void;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

/**
 * Generic async state hook for service calls.
 *
 * @example
 * const { data, loading, error, execute } = useApi(blogService.getAll);
 * useEffect(() => { execute(); }, []);
 */
export function useApi<T>(
  asyncFn: (...args: unknown[]) => Promise<T>,
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | undefined> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await asyncFn(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const apiErr = err as ApiError;
        setState((prev: any) => ({
          ...prev,
          loading: false,
          error: apiErr.message || "Something went wrong",
        }));
        return undefined;
      }
    },
    [asyncFn],
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  const setData: React.Dispatch<React.SetStateAction<T | null>> = useCallback(
    (value: React.SetStateAction<T | null>) => {
      setState((prev) => ({
        ...prev,
        data:
          typeof value === "function"
            ? (value as (prev: T | null) => T | null)(prev.data)
            : value,
      }));
    },
    [],
  );

  return { ...state, execute, reset, setData };
}
