import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type WithElementRef<T, R = HTMLElement> = T & {
  ref?: R | null;
};

export type WithoutChildren<T> = Omit<T, "children">;

export type WithoutChildrenOrChild<T> = WithoutChildren<T> & {
  child?: never;
};
