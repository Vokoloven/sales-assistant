export type KeyExtractor<T> = T[keyof T];

export type FilteredKeys<T, C> = {
  [K in keyof T]: K extends C ? T[K] : never;
}[keyof T];
