let showError: ((error: string) => void) | null = null;

export const setGlobalErrorHandler = (fn: (error: string) => void) => {
  showError = fn;
};

export const triggerGlobalError = (error: string) => {
  if (showError) showError(error);
};