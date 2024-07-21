export const Delay = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, Math.max(1, ms)));
