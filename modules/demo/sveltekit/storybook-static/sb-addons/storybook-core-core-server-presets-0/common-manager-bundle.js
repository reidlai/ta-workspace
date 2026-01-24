try {
  (() => {
    var h = __STORYBOOK_API__,
      {
        ActiveTabs: O,
        Consumer: T,
        ManagerContext: g,
        Provider: w,
        RequestResponseError: f,
        addons: n,
        combineParameters: G,
        controlOrMetaKey: L,
        controlOrMetaSymbol: v,
        eventMatchesShortcut: A,
        eventToShortcut: x,
        experimental_MockUniversalStore: P,
        experimental_UniversalStore: M,
        experimental_requestResponse: R,
        experimental_useUniversalStore: C,
        isMacLike: U,
        isShortcutTaken: B,
        keyToSymbol: E,
        merge: I,
        mockChannel: K,
        optionOrAltSymbol: N,
        shortcutMatchesShortcut: Y,
        shortcutToHumanString: q,
        types: D,
        useAddonState: F,
        useArgTypes: H,
        useArgs: j,
        useChannel: V,
        useGlobalTypes: z,
        useGlobals: J,
        useParameter: Q,
        useSharedState: W,
        useStoryPrepared: X,
        useStorybookApi: Z,
        useStorybookState: $,
      } = __STORYBOOK_API__;
    var m = (() => {
        let e;
        return (
          typeof window < "u"
            ? (e = window)
            : typeof globalThis < "u"
              ? (e = globalThis)
              : typeof window < "u"
                ? (e = window)
                : typeof self < "u"
                  ? (e = self)
                  : (e = {}),
          e
        );
      })(),
      u = "tag-filters",
      p = "static-filter";
    n.register(u, (e) => {
      let d = Object.entries(m.TAGS_OPTIONS ?? {}).reduce((o, t) => {
        let [r, i] = t;
        return (i.excludeFromSidebar && (o[r] = !0), o);
      }, {});
      e.experimental_setFilter(p, (o) => {
        let t = o.tags ?? [];
        return (
          (t.includes("dev") || o.type === "docs") &&
          t.filter((r) => d[r]).length === 0
        );
      });
    });
  })();
} catch (e) {
  console.error(
    "[Storybook] One of your manager-entries failed: " + import.meta.url,
    e,
  );
}
