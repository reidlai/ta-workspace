try {
  (() => {
    var l = __REACT__,
      {
        Children: se,
        Component: ie,
        Fragment: ue,
        Profiler: ce,
        PureComponent: de,
        StrictMode: me,
        Suspense: pe,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: be,
        cloneElement: _e,
        createContext: Se,
        createElement: ye,
        createFactory: Te,
        createRef: ke,
        forwardRef: Oe,
        isValidElement: ve,
        lazy: Ce,
        memo: fe,
        startTransition: Ie,
        unstable_act: Ee,
        useCallback: O,
        useContext: xe,
        useDebugValue: he,
        useDeferredValue: Le,
        useEffect: x,
        useId: ge,
        useImperativeHandle: Ae,
        useInsertionEffect: Re,
        useLayoutEffect: we,
        useMemo: Be,
        useReducer: Pe,
        useRef: R,
        useState: w,
        useSyncExternalStore: Me,
        useTransition: Ne,
        version: Ge,
      } = __REACT__;
    var Fe = __STORYBOOK_API__,
      {
        ActiveTabs: Ue,
        Consumer: Ke,
        ManagerContext: Ye,
        Provider: $e,
        RequestResponseError: qe,
        addons: h,
        combineParameters: ze,
        controlOrMetaKey: je,
        controlOrMetaSymbol: Ze,
        eventMatchesShortcut: Je,
        eventToShortcut: Qe,
        experimental_MockUniversalStore: Xe,
        experimental_UniversalStore: et,
        experimental_requestResponse: tt,
        experimental_useUniversalStore: ot,
        isMacLike: rt,
        isShortcutTaken: at,
        keyToSymbol: lt,
        merge: nt,
        mockChannel: st,
        optionOrAltSymbol: it,
        shortcutMatchesShortcut: ut,
        shortcutToHumanString: ct,
        types: B,
        useAddonState: dt,
        useArgTypes: mt,
        useArgs: pt,
        useChannel: bt,
        useGlobalTypes: P,
        useGlobals: L,
        useParameter: _t,
        useSharedState: St,
        useStoryPrepared: yt,
        useStorybookApi: M,
        useStorybookState: Tt,
      } = __STORYBOOK_API__;
    var ft = __STORYBOOK_COMPONENTS__,
      {
        A: It,
        ActionBar: Et,
        AddonPanel: xt,
        Badge: ht,
        Bar: Lt,
        Blockquote: gt,
        Button: At,
        ClipboardCode: Rt,
        Code: wt,
        DL: Bt,
        Div: Pt,
        DocumentWrapper: Mt,
        EmptyTabContent: Nt,
        ErrorFormatter: Gt,
        FlexBar: Dt,
        Form: Vt,
        H1: Ht,
        H2: Wt,
        H3: Ft,
        H4: Ut,
        H5: Kt,
        H6: Yt,
        HR: $t,
        IconButton: N,
        IconButtonSkeleton: qt,
        Icons: g,
        Img: zt,
        LI: jt,
        Link: Zt,
        ListItem: Jt,
        Loader: Qt,
        Modal: Xt,
        OL: eo,
        P: to,
        Placeholder: oo,
        Pre: ro,
        ProgressSpinner: ao,
        ResetWrapper: lo,
        ScrollArea: no,
        Separator: G,
        Spaced: so,
        Span: io,
        StorybookIcon: uo,
        StorybookLogo: co,
        Symbols: mo,
        SyntaxHighlighter: po,
        TT: bo,
        TabBar: _o,
        TabButton: So,
        TabWrapper: yo,
        Table: To,
        Tabs: ko,
        TabsState: Oo,
        TooltipLinkList: D,
        TooltipMessage: vo,
        TooltipNote: Co,
        UL: fo,
        WithTooltip: V,
        WithTooltipPure: Io,
        Zoom: Eo,
        codeCommon: xo,
        components: ho,
        createCopyToClipboardFunction: Lo,
        getStoryHref: go,
        icons: Ao,
        interleaveSeparators: Ro,
        nameSpaceClassNames: wo,
        resetComponents: Bo,
        withReset: Po,
      } = __STORYBOOK_COMPONENTS__;
    var U = { type: "item", value: "" },
      K = (o, t) => ({
        ...t,
        name: t.name || o,
        description: t.description || o,
        toolbar: {
          ...t.toolbar,
          items: t.toolbar.items.map((e) => {
            let r = typeof e == "string" ? { value: e, title: e } : e;
            return (
              r.type === "reset" &&
                t.toolbar.icon &&
                ((r.icon = t.toolbar.icon), (r.hideIcon = !0)),
              { ...U, ...r }
            );
          }),
        },
      }),
      Y = ["reset"],
      $ = (o) => o.filter((t) => !Y.includes(t.type)).map((t) => t.value),
      _ = "addon-toolbars",
      q = async (o, t, e) => {
        (e &&
          e.next &&
          (await o.setAddonShortcut(_, {
            label: e.next.label,
            defaultShortcut: e.next.keys,
            actionName: `${t}:next`,
            action: e.next.action,
          })),
          e &&
            e.previous &&
            (await o.setAddonShortcut(_, {
              label: e.previous.label,
              defaultShortcut: e.previous.keys,
              actionName: `${t}:previous`,
              action: e.previous.action,
            })),
          e &&
            e.reset &&
            (await o.setAddonShortcut(_, {
              label: e.reset.label,
              defaultShortcut: e.reset.keys,
              actionName: `${t}:reset`,
              action: e.reset.action,
            })));
      },
      z = (o) => (t) => {
        let {
            id: e,
            toolbar: { items: r, shortcuts: a },
          } = t,
          c = M(),
          [S, i] = L(),
          n = R([]),
          u = S[e],
          v = O(() => {
            i({ [e]: "" });
          }, [i]),
          C = O(() => {
            let s = n.current,
              m = s.indexOf(u),
              p = m === s.length - 1 ? 0 : m + 1,
              d = n.current[p];
            i({ [e]: d });
          }, [n, u, i]),
          f = O(() => {
            let s = n.current,
              m = s.indexOf(u),
              p = m > -1 ? m : 0,
              d = p === 0 ? s.length - 1 : p - 1,
              b = n.current[d];
            i({ [e]: b });
          }, [n, u, i]);
        return (
          x(() => {
            a &&
              q(c, e, {
                next: { ...a.next, action: C },
                previous: { ...a.previous, action: f },
                reset: { ...a.reset, action: v },
              });
          }, [c, e, a, C, f, v]),
          x(() => {
            n.current = $(r);
          }, []),
          l.createElement(o, { cycleValues: n.current, ...t })
        );
      },
      H = ({ currentValue: o, items: t }) =>
        o != null && t.find((e) => e.value === o && e.type !== "reset"),
      j = ({ currentValue: o, items: t }) => {
        let e = H({ currentValue: o, items: t });
        if (e) return e.icon;
      },
      Z = ({ currentValue: o, items: t }) => {
        let e = H({ currentValue: o, items: t });
        if (e) return e.title;
      },
      J = ({
        active: o,
        disabled: t,
        title: e,
        icon: r,
        description: a,
        onClick: c,
      }) =>
        l.createElement(
          N,
          { active: o, title: a, disabled: t, onClick: t ? () => {} : c },
          r &&
            l.createElement(g, { icon: r, __suppressDeprecationWarning: !0 }),
          e ? `\xA0${e}` : null,
        ),
      Q = ({
        right: o,
        title: t,
        value: e,
        icon: r,
        hideIcon: a,
        onClick: c,
        disabled: S,
        currentValue: i,
      }) => {
        let n =
            r &&
            l.createElement(g, {
              style: { opacity: 1 },
              icon: r,
              __suppressDeprecationWarning: !0,
            }),
          u = {
            id: e ?? "_reset",
            active: i === e,
            right: o,
            title: t,
            disabled: S,
            onClick: c,
          };
        return (r && !a && (u.icon = n), u);
      },
      X = z(
        ({
          id: o,
          name: t,
          description: e,
          toolbar: {
            icon: r,
            items: a,
            title: c,
            preventDynamicIcon: S,
            dynamicTitle: i,
          },
        }) => {
          let [n, u, v] = L(),
            [C, f] = w(!1),
            s = n[o],
            m = !!s,
            p = o in v,
            d = r,
            b = c;
          (S || (d = j({ currentValue: s, items: a }) || d),
            i && (b = Z({ currentValue: s, items: a }) || b),
            !b && !d && console.warn(`Toolbar '${t}' has no title or icon`));
          let W = O(
            (E) => {
              u({ [o]: E });
            },
            [o, u],
          );
          return l.createElement(
            V,
            {
              placement: "top",
              tooltip: ({ onHide: E }) => {
                let F = a
                  .filter(({ type: I }) => {
                    let A = !0;
                    return (I === "reset" && !s && (A = !1), A);
                  })
                  .map((I) =>
                    Q({
                      ...I,
                      currentValue: s,
                      disabled: p,
                      onClick: () => {
                        (W(I.value), E());
                      },
                    }),
                  );
                return l.createElement(D, { links: F });
              },
              closeOnOutsideClick: !0,
              onVisibleChange: f,
            },
            l.createElement(J, {
              active: C || m,
              disabled: p,
              description: e || "",
              icon: d,
              title: b || "",
            }),
          );
        },
      ),
      ee = () => {
        let o = P(),
          t = Object.keys(o).filter((e) => !!o[e].toolbar);
        return t.length
          ? l.createElement(
              l.Fragment,
              null,
              l.createElement(G, null),
              t.map((e) => {
                let r = K(e, o[e]);
                return l.createElement(X, { key: e, id: e, ...r });
              }),
            )
          : null;
      };
    h.register(_, () =>
      h.add(_, {
        title: _,
        type: B.TOOL,
        match: ({ tabId: o }) => !o,
        render: () => l.createElement(ee, null),
      }),
    );
  })();
} catch (e) {
  console.error(
    "[Storybook] One of your manager-entries failed: " + import.meta.url,
    e,
  );
}
