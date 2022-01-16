export const mix = (min: number, max: number, progress: number) =>
  -progress * min + progress * max + min
