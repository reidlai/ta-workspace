import { type Mock, vi } from "vitest";

export const goto: Mock = vi.fn();
export const invalidate: Mock = vi.fn();
export const prefetch: Mock = vi.fn();
export const prefetchRoutes: Mock = vi.fn();
export const afterNavigate: Mock = vi.fn();
export const beforeNavigate: Mock = vi.fn();
export const disableScrollHandling: Mock = vi.fn();
export const onNavigate: Mock = vi.fn();
