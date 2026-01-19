try {
  (() => {
    var re = Object.create;
    var W = Object.defineProperty;
    var ae = Object.getOwnPropertyDescriptor;
    var ie = Object.getOwnPropertyNames;
    var ce = Object.getPrototypeOf,
      le = Object.prototype.hasOwnProperty;
    var E = ((e) =>
      typeof require < "u"
        ? require
        : typeof Proxy < "u"
          ? new Proxy(e, {
              get: (o, c) => (typeof require < "u" ? require : o)[c],
            })
          : e)(function (e) {
      if (typeof require < "u") return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var G = (e, o) => () => (e && (o = e((e = 0))), o);
    var se = (e, o) => () => (
      o || e((o = { exports: {} }).exports, o),
      o.exports
    );
    var ue = (e, o, c, r) => {
      if ((o && typeof o == "object") || typeof o == "function")
        for (let a of ie(o))
          !le.call(e, a) &&
            a !== c &&
            W(e, a, {
              get: () => o[a],
              enumerable: !(r = ae(o, a)) || r.enumerable,
            });
      return e;
    };
    var Ie = (e, o, c) => (
      (c = e != null ? re(ce(e)) : {}),
      ue(
        o || !e || !e.__esModule
          ? W(c, "default", { value: e, enumerable: !0 })
          : c,
        e,
      )
    );
    var p = G(() => {});
    var h = G(() => {});
    var f = G(() => {});
    var X = se((Q, V) => {
      p();
      h();
      f();
      (function (e) {
        if (typeof Q == "object" && typeof V < "u") V.exports = e();
        else if (typeof define == "function" && define.amd) define([], e);
        else {
          var o;
          (typeof window < "u" || typeof window < "u"
            ? (o = window)
            : typeof self < "u"
              ? (o = self)
              : (o = this),
            (o.memoizerific = e()));
        }
      })(function () {
        var e, o, c;
        return (function r(a, d, l) {
          function t(i, I) {
            if (!d[i]) {
              if (!a[i]) {
                var s = typeof E == "function" && E;
                if (!I && s) return s(i, !0);
                if (n) return n(i, !0);
                var k = new Error("Cannot find module '" + i + "'");
                throw ((k.code = "MODULE_NOT_FOUND"), k);
              }
              var m = (d[i] = { exports: {} });
              a[i][0].call(
                m.exports,
                function (b) {
                  var y = a[i][1][b];
                  return t(y || b);
                },
                m,
                m.exports,
                r,
                a,
                d,
                l,
              );
            }
            return d[i].exports;
          }
          for (var n = typeof E == "function" && E, u = 0; u < l.length; u++)
            t(l[u]);
          return t;
        })(
          {
            1: [
              function (r, a, d) {
                a.exports = function (l) {
                  if (typeof Map != "function" || l) {
                    var t = r("./similar");
                    return new t();
                  } else return new Map();
                };
              },
              { "./similar": 2 },
            ],
            2: [
              function (r, a, d) {
                function l() {
                  return (
                    (this.list = []),
                    (this.lastItem = void 0),
                    (this.size = 0),
                    this
                  );
                }
                ((l.prototype.get = function (t) {
                  var n;
                  if (this.lastItem && this.isEqual(this.lastItem.key, t))
                    return this.lastItem.val;
                  if (((n = this.indexOf(t)), n >= 0))
                    return ((this.lastItem = this.list[n]), this.list[n].val);
                }),
                  (l.prototype.set = function (t, n) {
                    var u;
                    return this.lastItem && this.isEqual(this.lastItem.key, t)
                      ? ((this.lastItem.val = n), this)
                      : ((u = this.indexOf(t)),
                        u >= 0
                          ? ((this.lastItem = this.list[u]),
                            (this.list[u].val = n),
                            this)
                          : ((this.lastItem = { key: t, val: n }),
                            this.list.push(this.lastItem),
                            this.size++,
                            this));
                  }),
                  (l.prototype.delete = function (t) {
                    var n;
                    if (
                      (this.lastItem &&
                        this.isEqual(this.lastItem.key, t) &&
                        (this.lastItem = void 0),
                      (n = this.indexOf(t)),
                      n >= 0)
                    )
                      return (this.size--, this.list.splice(n, 1)[0]);
                  }),
                  (l.prototype.has = function (t) {
                    var n;
                    return this.lastItem && this.isEqual(this.lastItem.key, t)
                      ? !0
                      : ((n = this.indexOf(t)),
                        n >= 0 ? ((this.lastItem = this.list[n]), !0) : !1);
                  }),
                  (l.prototype.forEach = function (t, n) {
                    var u;
                    for (u = 0; u < this.size; u++)
                      t.call(
                        n || this,
                        this.list[u].val,
                        this.list[u].key,
                        this,
                      );
                  }),
                  (l.prototype.indexOf = function (t) {
                    var n;
                    for (n = 0; n < this.size; n++)
                      if (this.isEqual(this.list[n].key, t)) return n;
                    return -1;
                  }),
                  (l.prototype.isEqual = function (t, n) {
                    return t === n || (t !== t && n !== n);
                  }),
                  (a.exports = l));
              },
              {},
            ],
            3: [
              function (r, a, d) {
                var l = r("map-or-similar");
                a.exports = function (i) {
                  var I = new l(!1),
                    s = [];
                  return function (k) {
                    var m = function () {
                      var b = I,
                        y,
                        B,
                        T = arguments.length - 1,
                        R = Array(T + 1),
                        O = !0,
                        A;
                      if ((m.numArgs || m.numArgs === 0) && m.numArgs !== T + 1)
                        throw new Error(
                          "Memoizerific functions should always be called with the same number of arguments",
                        );
                      for (A = 0; A < T; A++) {
                        if (
                          ((R[A] = { cacheItem: b, arg: arguments[A] }),
                          b.has(arguments[A]))
                        ) {
                          b = b.get(arguments[A]);
                          continue;
                        }
                        ((O = !1),
                          (y = new l(!1)),
                          b.set(arguments[A], y),
                          (b = y));
                      }
                      return (
                        O &&
                          (b.has(arguments[T])
                            ? (B = b.get(arguments[T]))
                            : (O = !1)),
                        O ||
                          ((B = k.apply(null, arguments)),
                          b.set(arguments[T], B)),
                        i > 0 &&
                          ((R[T] = { cacheItem: b, arg: arguments[T] }),
                          O ? t(s, R) : s.push(R),
                          s.length > i && n(s.shift())),
                        (m.wasMemoized = O),
                        (m.numArgs = T + 1),
                        B
                      );
                    };
                    return (
                      (m.limit = i),
                      (m.wasMemoized = !1),
                      (m.cache = I),
                      (m.lru = s),
                      m
                    );
                  };
                };
                function t(i, I) {
                  var s = i.length,
                    k = I.length,
                    m,
                    b,
                    y;
                  for (b = 0; b < s; b++) {
                    for (m = !0, y = 0; y < k; y++)
                      if (!u(i[b][y].arg, I[y].arg)) {
                        m = !1;
                        break;
                      }
                    if (m) break;
                  }
                  i.push(i.splice(b, 1)[0]);
                }
                function n(i) {
                  var I = i.length,
                    s = i[I - 1],
                    k,
                    m;
                  for (
                    s.cacheItem.delete(s.arg), m = I - 2;
                    m >= 0 &&
                    ((s = i[m]), (k = s.cacheItem.get(s.arg)), !k || !k.size);
                    m--
                  )
                    s.cacheItem.delete(s.arg);
                }
                function u(i, I) {
                  return i === I || (i !== i && I !== I);
                }
              },
              { "map-or-similar": 1 },
            ],
          },
          {},
          [3],
        )(3);
      });
    });
    p();
    h();
    f();
    p();
    h();
    f();
    p();
    h();
    f();
    p();
    h();
    f();
    var g = __REACT__,
      {
        Children: Ee,
        Component: we,
        Fragment: M,
        Profiler: Le,
        PureComponent: Be,
        StrictMode: Re,
        Suspense: xe,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Pe,
        cloneElement: Ge,
        createContext: Me,
        createElement: De,
        createFactory: Ue,
        createRef: Ne,
        forwardRef: Fe,
        isValidElement: He,
        lazy: qe,
        memo: w,
        startTransition: ze,
        unstable_act: Ke,
        useCallback: D,
        useContext: Ve,
        useDebugValue: Ye,
        useDeferredValue: We,
        useEffect: je,
        useId: $e,
        useImperativeHandle: Ze,
        useInsertionEffect: Je,
        useLayoutEffect: Qe,
        useMemo: j,
        useReducer: Xe,
        useRef: eo,
        useState: U,
        useSyncExternalStore: oo,
        useTransition: no,
        version: to,
      } = __REACT__;
    p();
    h();
    f();
    var lo = __STORYBOOK_API__,
      {
        ActiveTabs: so,
        Consumer: uo,
        ManagerContext: Io,
        Provider: mo,
        RequestResponseError: po,
        addons: N,
        combineParameters: ho,
        controlOrMetaKey: fo,
        controlOrMetaSymbol: go,
        eventMatchesShortcut: bo,
        eventToShortcut: ko,
        experimental_MockUniversalStore: yo,
        experimental_UniversalStore: So,
        experimental_requestResponse: _o,
        experimental_useUniversalStore: Co,
        isMacLike: vo,
        isShortcutTaken: To,
        keyToSymbol: Ao,
        merge: Oo,
        mockChannel: Eo,
        optionOrAltSymbol: wo,
        shortcutMatchesShortcut: Lo,
        shortcutToHumanString: Bo,
        types: $,
        useAddonState: Ro,
        useArgTypes: xo,
        useArgs: Po,
        useChannel: Go,
        useGlobalTypes: Mo,
        useGlobals: x,
        useParameter: P,
        useSharedState: Do,
        useStoryPrepared: Uo,
        useStorybookApi: No,
        useStorybookState: Fo,
      } = __STORYBOOK_API__;
    p();
    h();
    f();
    var Vo = __STORYBOOK_COMPONENTS__,
      {
        A: Yo,
        ActionBar: Wo,
        AddonPanel: jo,
        Badge: $o,
        Bar: Zo,
        Blockquote: Jo,
        Button: Qo,
        ClipboardCode: Xo,
        Code: en,
        DL: on,
        Div: nn,
        DocumentWrapper: tn,
        EmptyTabContent: rn,
        ErrorFormatter: an,
        FlexBar: cn,
        Form: ln,
        H1: sn,
        H2: un,
        H3: In,
        H4: dn,
        H5: mn,
        H6: pn,
        HR: hn,
        IconButton: L,
        IconButtonSkeleton: fn,
        Icons: gn,
        Img: bn,
        LI: kn,
        Link: yn,
        ListItem: Sn,
        Loader: _n,
        Modal: Cn,
        OL: vn,
        P: Tn,
        Placeholder: An,
        Pre: On,
        ProgressSpinner: En,
        ResetWrapper: wn,
        ScrollArea: Ln,
        Separator: Bn,
        Spaced: Rn,
        Span: xn,
        StorybookIcon: Pn,
        StorybookLogo: Gn,
        Symbols: Mn,
        SyntaxHighlighter: Dn,
        TT: Un,
        TabBar: Nn,
        TabButton: Fn,
        TabWrapper: Hn,
        Table: qn,
        Tabs: zn,
        TabsState: Kn,
        TooltipLinkList: F,
        TooltipMessage: Vn,
        TooltipNote: Yn,
        UL: Wn,
        WithTooltip: H,
        WithTooltipPure: jn,
        Zoom: $n,
        codeCommon: Zn,
        components: Jn,
        createCopyToClipboardFunction: Qn,
        getStoryHref: Xn,
        icons: et,
        interleaveSeparators: ot,
        nameSpaceClassNames: nt,
        resetComponents: tt,
        withReset: rt,
      } = __STORYBOOK_COMPONENTS__;
    p();
    h();
    f();
    var st = __STORYBOOK_ICONS__,
      {
        AccessibilityAltIcon: ut,
        AccessibilityIcon: It,
        AccessibilityIgnoredIcon: dt,
        AddIcon: mt,
        AdminIcon: pt,
        AlertAltIcon: ht,
        AlertIcon: ft,
        AlignLeftIcon: gt,
        AlignRightIcon: bt,
        AppleIcon: kt,
        ArrowBottomLeftIcon: yt,
        ArrowBottomRightIcon: St,
        ArrowDownIcon: _t,
        ArrowLeftIcon: Ct,
        ArrowRightIcon: vt,
        ArrowSolidDownIcon: Tt,
        ArrowSolidLeftIcon: At,
        ArrowSolidRightIcon: Ot,
        ArrowSolidUpIcon: Et,
        ArrowTopLeftIcon: wt,
        ArrowTopRightIcon: Lt,
        ArrowUpIcon: Bt,
        AzureDevOpsIcon: Rt,
        BackIcon: xt,
        BasketIcon: Pt,
        BatchAcceptIcon: Gt,
        BatchDenyIcon: Mt,
        BeakerIcon: Dt,
        BellIcon: Ut,
        BitbucketIcon: Nt,
        BoldIcon: Ft,
        BookIcon: Ht,
        BookmarkHollowIcon: qt,
        BookmarkIcon: zt,
        BottomBarIcon: Kt,
        BottomBarToggleIcon: Vt,
        BoxIcon: Yt,
        BranchIcon: Wt,
        BrowserIcon: jt,
        ButtonIcon: $t,
        CPUIcon: Zt,
        CalendarIcon: Jt,
        CameraIcon: Qt,
        CameraStabilizeIcon: Xt,
        CategoryIcon: er,
        CertificateIcon: or,
        ChangedIcon: nr,
        ChatIcon: tr,
        CheckIcon: rr,
        ChevronDownIcon: ar,
        ChevronLeftIcon: ir,
        ChevronRightIcon: cr,
        ChevronSmallDownIcon: lr,
        ChevronSmallLeftIcon: sr,
        ChevronSmallRightIcon: ur,
        ChevronSmallUpIcon: Ir,
        ChevronUpIcon: dr,
        ChromaticIcon: mr,
        ChromeIcon: pr,
        CircleHollowIcon: hr,
        CircleIcon: Z,
        ClearIcon: fr,
        CloseAltIcon: gr,
        CloseIcon: br,
        CloudHollowIcon: kr,
        CloudIcon: yr,
        CogIcon: Sr,
        CollapseIcon: _r,
        CommandIcon: Cr,
        CommentAddIcon: vr,
        CommentIcon: Tr,
        CommentsIcon: Ar,
        CommitIcon: Or,
        CompassIcon: Er,
        ComponentDrivenIcon: wr,
        ComponentIcon: Lr,
        ContrastIcon: Br,
        ContrastIgnoredIcon: Rr,
        ControlsIcon: xr,
        CopyIcon: Pr,
        CreditIcon: Gr,
        CrossIcon: Mr,
        DashboardIcon: Dr,
        DatabaseIcon: Ur,
        DeleteIcon: Nr,
        DiamondIcon: Fr,
        DirectionIcon: Hr,
        DiscordIcon: qr,
        DocChartIcon: zr,
        DocListIcon: Kr,
        DocumentIcon: Vr,
        DownloadIcon: Yr,
        DragIcon: Wr,
        EditIcon: jr,
        EllipsisIcon: $r,
        EmailIcon: Zr,
        ExpandAltIcon: Jr,
        ExpandIcon: Qr,
        EyeCloseIcon: Xr,
        EyeIcon: ea,
        FaceHappyIcon: oa,
        FaceNeutralIcon: na,
        FaceSadIcon: ta,
        FacebookIcon: ra,
        FailedIcon: aa,
        FastForwardIcon: ia,
        FigmaIcon: ca,
        FilterIcon: la,
        FlagIcon: sa,
        FolderIcon: ua,
        FormIcon: Ia,
        GDriveIcon: da,
        GithubIcon: ma,
        GitlabIcon: pa,
        GlobeIcon: ha,
        GoogleIcon: fa,
        GraphBarIcon: ga,
        GraphLineIcon: ba,
        GraphqlIcon: ka,
        GridAltIcon: ya,
        GridIcon: q,
        GrowIcon: Sa,
        HeartHollowIcon: _a,
        HeartIcon: Ca,
        HomeIcon: va,
        HourglassIcon: Ta,
        InfoIcon: Aa,
        ItalicIcon: Oa,
        JumpToIcon: Ea,
        KeyIcon: wa,
        LightningIcon: La,
        LightningOffIcon: Ba,
        LinkBrokenIcon: Ra,
        LinkIcon: xa,
        LinkedinIcon: Pa,
        LinuxIcon: Ga,
        ListOrderedIcon: Ma,
        ListUnorderedIcon: Da,
        LocationIcon: Ua,
        LockIcon: Na,
        MarkdownIcon: Fa,
        MarkupIcon: Ha,
        MediumIcon: qa,
        MemoryIcon: za,
        MenuIcon: Ka,
        MergeIcon: Va,
        MirrorIcon: Ya,
        MobileIcon: Wa,
        MoonIcon: ja,
        NutIcon: $a,
        OutboxIcon: Za,
        OutlineIcon: Ja,
        PaintBrushIcon: Qa,
        PaperClipIcon: Xa,
        ParagraphIcon: ei,
        PassedIcon: oi,
        PhoneIcon: ni,
        PhotoDragIcon: ti,
        PhotoIcon: z,
        PhotoStabilizeIcon: ri,
        PinAltIcon: ai,
        PinIcon: ii,
        PlayAllHollowIcon: ci,
        PlayBackIcon: li,
        PlayHollowIcon: si,
        PlayIcon: ui,
        PlayNextIcon: Ii,
        PlusIcon: di,
        PointerDefaultIcon: mi,
        PointerHandIcon: pi,
        PowerIcon: hi,
        PrintIcon: fi,
        ProceedIcon: gi,
        ProfileIcon: bi,
        PullRequestIcon: ki,
        QuestionIcon: yi,
        RSSIcon: Si,
        RedirectIcon: _i,
        ReduxIcon: Ci,
        RefreshIcon: J,
        ReplyIcon: vi,
        RepoIcon: Ti,
        RequestChangeIcon: Ai,
        RewindIcon: Oi,
        RulerIcon: Ei,
        SaveIcon: wi,
        SearchIcon: Li,
        ShareAltIcon: Bi,
        ShareIcon: Ri,
        ShieldIcon: xi,
        SideBySideIcon: Pi,
        SidebarAltIcon: Gi,
        SidebarAltToggleIcon: Mi,
        SidebarIcon: Di,
        SidebarToggleIcon: Ui,
        SpeakerIcon: Ni,
        StackedIcon: Fi,
        StarHollowIcon: Hi,
        StarIcon: qi,
        StatusFailIcon: zi,
        StatusIcon: Ki,
        StatusPassIcon: Vi,
        StatusWarnIcon: Yi,
        StickerIcon: Wi,
        StopAltHollowIcon: ji,
        StopAltIcon: $i,
        StopIcon: Zi,
        StorybookIcon: Ji,
        StructureIcon: Qi,
        SubtractIcon: Xi,
        SunIcon: ec,
        SupportIcon: oc,
        SweepIcon: nc,
        SwitchAltIcon: tc,
        SyncIcon: rc,
        TabletIcon: ac,
        ThumbsUpIcon: ic,
        TimeIcon: cc,
        TimerIcon: lc,
        TransferIcon: sc,
        TrashIcon: uc,
        TwitterIcon: Ic,
        TypeIcon: dc,
        UbuntuIcon: mc,
        UndoIcon: pc,
        UnfoldIcon: hc,
        UnlockIcon: fc,
        UnpinIcon: gc,
        UploadIcon: bc,
        UserAddIcon: kc,
        UserAltIcon: yc,
        UserIcon: Sc,
        UsersIcon: _c,
        VSCodeIcon: Cc,
        VerifiedIcon: vc,
        VideoIcon: Tc,
        WandIcon: Ac,
        WatchIcon: Oc,
        WindowsIcon: Ec,
        WrenchIcon: wc,
        XIcon: Lc,
        YoutubeIcon: Bc,
        ZoomIcon: Rc,
        ZoomOutIcon: xc,
        ZoomResetIcon: Pc,
        iconList: Gc,
      } = __STORYBOOK_ICONS__;
    p();
    h();
    f();
    var Fc = __STORYBOOK_CLIENT_LOGGER__,
      {
        deprecate: Hc,
        logger: K,
        once: qc,
        pretty: zc,
      } = __STORYBOOK_CLIENT_LOGGER__;
    var Y = Ie(X());
    p();
    h();
    f();
    var Qc = __STORYBOOK_THEMING__,
      {
        CacheProvider: Xc,
        ClassNames: el,
        Global: ol,
        ThemeProvider: nl,
        background: tl,
        color: rl,
        convert: al,
        create: il,
        createCache: cl,
        createGlobal: ll,
        createReset: sl,
        css: ul,
        darken: Il,
        ensure: dl,
        ignoreSsrWarning: ml,
        isPropValid: pl,
        jsx: hl,
        keyframes: fl,
        lighten: gl,
        styled: ee,
        themes: bl,
        typography: kl,
        useTheme: yl,
        withTheme: Sl,
      } = __STORYBOOK_THEMING__;
    p();
    h();
    f();
    function oe(e) {
      for (var o = [], c = 1; c < arguments.length; c++)
        o[c - 1] = arguments[c];
      var r = Array.from(typeof e == "string" ? [e] : e);
      r[r.length - 1] = r[r.length - 1].replace(/\r?\n([\t ]*)$/, "");
      var a = r.reduce(function (t, n) {
        var u = n.match(/\n([\t ]+|(?!\s).)/g);
        return u
          ? t.concat(
              u.map(function (i) {
                var I, s;
                return (s =
                  (I = i.match(/[\t ]/g)) === null || I === void 0
                    ? void 0
                    : I.length) !== null && s !== void 0
                  ? s
                  : 0;
              }),
            )
          : t;
      }, []);
      if (a.length) {
        var d = new RegExp(
          `
[	 ]{` +
            Math.min.apply(Math, a) +
            "}",
          "g",
        );
        r = r.map(function (t) {
          return t.replace(
            d,
            `
`,
          );
        });
      }
      r[0] = r[0].replace(/^\r?\n/, "");
      var l = r[0];
      return (
        o.forEach(function (t, n) {
          var u = l.match(/(?:^|\n)( *)$/),
            i = u ? u[1] : "",
            I = t;
          (typeof t == "string" &&
            t.includes(`
`) &&
            (I = String(t)
              .split(
                `
`,
              )
              .map(function (s, k) {
                return k === 0 ? s : "" + i + s;
              }).join(`
`)),
            (l += I + r[n + 1]));
        }),
        l
      );
    }
    var ne = "storybook/background",
      S = "backgrounds",
      de = {
        light: { name: "light", value: "#F8F8F8" },
        dark: { name: "dark", value: "#333" },
      },
      me = w(function () {
        let e = P(S),
          [o, c, r] = x(),
          [a, d] = U(!1),
          { options: l = de, disable: t = !0 } = e || {};
        if (t) return null;
        let n = o[S] || {},
          u = n.value,
          i = n.grid || !1,
          I = l[u],
          s = !!r?.[S],
          k = Object.keys(l).length;
        return g.createElement(pe, {
          length: k,
          backgroundMap: l,
          item: I,
          updateGlobals: c,
          backgroundName: u,
          setIsTooltipVisible: d,
          isLocked: s,
          isGridActive: i,
          isTooltipVisible: a,
        });
      }),
      pe = w(function (e) {
        let {
            item: o,
            length: c,
            updateGlobals: r,
            setIsTooltipVisible: a,
            backgroundMap: d,
            backgroundName: l,
            isLocked: t,
            isGridActive: n,
            isTooltipVisible: u,
          } = e,
          i = D(
            (I) => {
              r({ [S]: I });
            },
            [r],
          );
        return g.createElement(
          M,
          null,
          g.createElement(
            L,
            {
              key: "grid",
              active: n,
              disabled: t,
              title: "Apply a grid to the preview",
              onClick: () => i({ value: l, grid: !n }),
            },
            g.createElement(q, null),
          ),
          c > 0
            ? g.createElement(
                H,
                {
                  key: "background",
                  placement: "top",
                  closeOnOutsideClick: !0,
                  tooltip: ({ onHide: I }) =>
                    g.createElement(F, {
                      links: [
                        ...(o
                          ? [
                              {
                                id: "reset",
                                title: "Reset background",
                                icon: g.createElement(J, null),
                                onClick: () => {
                                  (i({ value: void 0, grid: n }), I());
                                },
                              },
                            ]
                          : []),
                        ...Object.entries(d).map(([s, k]) => ({
                          id: s,
                          title: k.name,
                          icon: g.createElement(Z, {
                            color: k?.value || "grey",
                          }),
                          active: s === l,
                          onClick: () => {
                            (i({ value: s, grid: n }), I());
                          },
                        })),
                      ].flat(),
                    }),
                  onVisibleChange: a,
                },
                g.createElement(
                  L,
                  {
                    disabled: t,
                    key: "background",
                    title: "Change the background of the preview",
                    active: !!o || u,
                  },
                  g.createElement(z, null),
                ),
              )
            : null,
        );
      }),
      he = ee.span(
        ({ background: e }) => ({
          borderRadius: "1rem",
          display: "block",
          height: "1rem",
          width: "1rem",
          background: e,
        }),
        ({ theme: e }) => ({
          boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
        }),
      ),
      fe = (e, o = [], c) => {
        if (e === "transparent") return "transparent";
        if (o.find((a) => a.value === e) || e) return e;
        let r = o.find((a) => a.name === c);
        if (r) return r.value;
        if (c) {
          let a = o.map((d) => d.name).join(", ");
          K.warn(oe`
        Backgrounds Addon: could not find the default color "${c}".
        These are the available colors for your story based on your configuration:
        ${a}.
      `);
        }
        return "transparent";
      },
      te = (0, Y.default)(1e3)((e, o, c, r, a, d) => ({
        id: e || o,
        title: o,
        onClick: () => {
          a({ selected: c, name: o });
        },
        value: c,
        right: r ? g.createElement(he, { background: c }) : void 0,
        active: d,
      })),
      ge = (0, Y.default)(10)((e, o, c) => {
        let r = e.map(({ name: a, value: d }) =>
          te(null, a, d, !0, c, d === o),
        );
        return o !== "transparent"
          ? [te("reset", "Clear background", "transparent", null, c, !1), ...r]
          : r;
      }),
      be = { default: null, disable: !0, values: [] },
      ke = w(function () {
        let e = P(S, be),
          [o, c] = U(!1),
          [r, a] = x(),
          d = r[S]?.value,
          l = j(() => fe(d, e.values, e.default), [e, d]);
        Array.isArray(e) &&
          K.warn(
            "Addon Backgrounds api has changed in Storybook 6.0. Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md",
          );
        let t = D(
          (n) => {
            a({ [S]: { ...r[S], value: n } });
          },
          [e, r, a],
        );
        return e.disable
          ? null
          : g.createElement(
              H,
              {
                placement: "top",
                closeOnOutsideClick: !0,
                tooltip: ({ onHide: n }) =>
                  g.createElement(F, {
                    links: ge(e.values, l, ({ selected: u }) => {
                      (l !== u && t(u), n());
                    }),
                  }),
                onVisibleChange: c,
              },
              g.createElement(
                L,
                {
                  key: "background",
                  title: "Change the background of the preview",
                  active: l !== "transparent" || o,
                },
                g.createElement(z, null),
              ),
            );
      }),
      ye = w(function () {
        let [e, o] = x(),
          { grid: c } = P(S, { grid: { disable: !1 } });
        if (c?.disable) return null;
        let r = e[S]?.grid || !1;
        return g.createElement(
          L,
          {
            key: "background",
            active: r,
            title: "Apply a grid to the preview",
            onClick: () => o({ [S]: { ...e[S], grid: !r } }),
          },
          g.createElement(q, null),
        );
      });
    N.register(ne, () => {
      N.add(ne, {
        title: "Backgrounds",
        type: $.TOOL,
        match: ({ viewMode: e, tabId: o }) =>
          !!(e && e.match(/^(story|docs)$/)) && !o,
        render: () =>
          FEATURES?.backgroundsStoryGlobals
            ? g.createElement(me, null)
            : g.createElement(
                M,
                null,
                g.createElement(ke, null),
                g.createElement(ye, null),
              ),
      });
    });
  })();
} catch (e) {
  console.error(
    "[Storybook] One of your manager-entries failed: " + import.meta.url,
    e,
  );
}
