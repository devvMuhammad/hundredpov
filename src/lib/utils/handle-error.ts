/**
 * Utility function to handle error messages from server actions
 * 
 * @param error The error object from a server action or any catch block
 * @returns A formatted error message string
 */
export function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred. Please try again.';
} 