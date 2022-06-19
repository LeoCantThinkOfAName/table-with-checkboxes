import { Dispatch, SetStateAction } from "react";

export type LatestObject = {
  index: number | null;
  checked: boolean;
};

export interface RowType {
  id: number | string;
  disabled?: boolean;
}

export interface TableProps {
  cols: { field: string; name: string }[];
  rows: RowType[];
  onSelectionChanged?: (selection: RowType[]) => unknown;
}

export interface SelectionContextProps {
  data: RowType[];
  setData: Dispatch<SetStateAction<RowType[]>>;
  latest: LatestObject;
  setLatest: Dispatch<SetStateAction<LatestObject>>;
}
