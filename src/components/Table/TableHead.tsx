import { ChangeEvent, FunctionComponent, useContext } from "react";
import { SelectionContext } from "./SelectionContext";
import { TableProps } from "./types";

export const TableHead: FunctionComponent<
  Omit<TableProps, "onSelectionChange">
> = ({ cols, rows }) => {
  const { setData } = useContext(SelectionContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setData(rows.filter((row) => !row.disabled));
    } else {
      setData([]);
    }
  };

  return (
    <thead>
      <tr>
        <th>
          <input onChange={onChange} type="checkbox" />
        </th>
        {cols.map((col) => (
          <th key={col.field}>{col.name}</th>
        ))}
      </tr>
    </thead>
  );
};
