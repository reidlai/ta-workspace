import { render, screen } from "@testing-library/svelte";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { writable } from "svelte/store";
import MyTickersWidget from "./MyTickersWidget.svelte";
import { watchlistService } from "../../../ts/src/index";

// Mock the watchlist service
vi.mock("../../../ts/src/index", () => {
  const { writable } = require("svelte/store");
  const mockStore = writable([]);
  return {
    watchlistService: {
      subscribe: mockStore.subscribe,
      set: mockStore.set, // Helper for tests
      addTicker: vi.fn(),
      removeTicker: vi.fn(),
    },
  };
});

// Mock ShadCN components to avoid import issues during simple unit testing if path aliases fail
// We use a simple replacement if the real ones aren't available to the test runner
vi.mock(
  "../../../../../apps/sv-appshell/src/lib/components/ui/card",
  () => ({
    Root: { render: () => '<div data-testid="card-root"><slot /></div>' }, // Simplistic mock if needed, but svelte-component-mock is better.
    // Actually, for integration test in Svelte, better to rely on actual components if possible,
    // or stub them if they differ.
    // Since we suspect $lib issue, let's try to mock them to generic containers.
    Header: {
      render: () => '<header data-testid="card-header"><slot /></header>',
    },
    Title: { render: () => '<h3 data-testid="card-title"><slot /></h3>' },
    Description: {
      render: () => '<p data-testid="card-description"><slot /></p>',
    },
    Content: { render: () => '<div data-testid="card-content"><slot /></div>' },
  }),
  { virtual: true },
); // virtual if module doesn't exist

describe("MyTickersWidget", () => {
  beforeEach(() => {
    // Reset store
    (watchlistService as any).set([]);
  });

  it('renders "My Tickers" title', () => {
    render(MyTickersWidget);
    expect(screen.getByText("My Tickers")).toBeInTheDocument();
  });

  it("displays ticker count and exchange count", async () => {
    (watchlistService as any).set([
      { symbol: "AAPL", on_hand: true }, // NASDAQ
      { symbol: "MSFT", on_hand: false }, // NASDAQ
      { symbol: "F", on_hand: true }, // NYSE
    ]);

    render(MyTickersWidget);

    // 3 Tickers, 2 Exchanges (NASDAQ, NYSE)
    expect(screen.getByText(/3 Tickers/)).toBeInTheDocument();
    expect(screen.getByText(/2 Exchanges/)).toBeInTheDocument();
  });

  it("displays list of tickers", () => {
    (watchlistService as any).set([{ symbol: "AAPL", on_hand: true }]);
    render(MyTickersWidget);
    expect(screen.getByText("AAPL")).toBeInTheDocument();
  });

  it("does not show Add input", () => {
    render(MyTickersWidget);
    const input = screen.queryByPlaceholderText(/Symbol/);
    expect(input).not.toBeInTheDocument();
    const button = screen.queryByText("Add");
    expect(button).not.toBeInTheDocument();
  });

  it("derived exchange count handles unknown exchanges", () => {
    (watchlistService as any).set([
      { symbol: "UNKNOWN1", on_hand: false },
      { symbol: "UNKNOWN2", on_hand: false },
    ]);
    render(MyTickersWidget);
    // Both map to "Other", so 1 exchange
    expect(screen.getByText(/1 Exchanges/)).toBeInTheDocument();
  });
});
