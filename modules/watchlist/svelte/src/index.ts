import type { IModuleBundle } from "virtual-module-core/types";
import MyTickersWidget from "./widgets/MyTickersWidget.svelte";

const bundle: IModuleBundle = {
  id: "watchlist-module",
  widgets: [
    {
      id: "my-tickers",
      title: "My Tickers",
      component: MyTickersWidget,
      location: "dashboard",
      size: "small",
    },
  ],
};

export const init = async (context: any): Promise<IModuleBundle> => {
  return bundle;
};
