export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};