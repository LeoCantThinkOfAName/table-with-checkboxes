import { FunctionComponent, useState } from "react";
import { SelectionContext } from "./SelectionContext";
import "./table.css";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { LatestObject, RowType, TableProps } from "./types";

export const Table: FunctionComponent<TableProps> = ({
  cols,
  rows,
  // onSelectionChanged,
}) => {
  const [data, setData] = useState<RowType[]>([]);
  const [latest, setLatest] = useState<LatestObject>({
    index: null,
    checked: false,
  });

  return (
    <SelectionContext.Provider value={{ data, setData, latest, setLatest }}>
      <table>
        <TableHead cols={cols} rows={rows} />
        <TableBody rows={rows} />
      </table>
    </SelectionContext.Provider>
  );
};

Table.defaultProps = {
  cols: [],
  rows: [],
};
