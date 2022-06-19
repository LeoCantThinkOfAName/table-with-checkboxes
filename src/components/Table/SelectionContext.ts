import { createContext } from "react";
import { SelectionContextProps } from "./types";

export const defaultContext: SelectionContextProps = {
  data: [],
  setData: () => 0,
  latest: {
    index: null,
    checked: false,
  },
  setLatest: () => null,
};

export const SelectionContext =
  createContext<SelectionContextProps>(defaultContext);
