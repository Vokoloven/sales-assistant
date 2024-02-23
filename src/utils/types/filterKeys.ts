export type FilterKeys<T, C> = {
  [K in keyof T]: T[K] extends C ? T[K] : never;
}[keyof T];
