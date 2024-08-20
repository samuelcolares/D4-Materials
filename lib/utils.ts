import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function throwError(error: any) {
  throw new Error(buildErrorMessage(error));
}
export function buildErrorMessage(error: any): string {
  if (error instanceof Error) {
    return error?.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return 'Unknown error';
  }
}