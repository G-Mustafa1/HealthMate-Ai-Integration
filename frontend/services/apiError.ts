import axios from "axios";


export const getApiErrorMessage = (
  err: unknown,
  fallback: string
): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { error?: string; message?: string }
      | undefined;

    return data?.error || data?.message || err.message || fallback;
  }

  return fallback;
};


export const getThrownErrorMessage = (
  err: unknown,
  fallback: string
): string => {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;

  return fallback;
};
