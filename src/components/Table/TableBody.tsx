import { ChangeEvent, FunctionComponent, useContext, useMemo } from "react";
import { SelectionContext } from "./SelectionContext";
import { RowType, TableProps } from "./types";

export const CheckboxCell: FunctionComponent<{
  row: RowType;
  rows: RowType[];
  index: number;
}> = ({ row, rows, index }) => {
  const {
    data,
    setData,
    latest: { index: latestIndex, checked: latestChecked },
    setLatest,
  } = useContext(SelectionContext);
  const disabled = row.disabled;
  const isChecked = useMemo(
    () => data.some((item) => item.id === row.id),
    [data, row],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let interval: RowType[] = [];
    const selectItem = () => {
      const checked = e.currentTarget.checked;
      if (checked) {
        setData([...data, row]);
      } else {
        setData(data.filter((item) => item.id !== row.id));
      }
      setLatest({ index, checked });
    };

    // @ts-ignore
    if (e.nativeEvent.shiftKey) {
      if (latestIndex !== null) {
        if (latestIndex > index) {
          interval = rows.filter(
            (item, i) => i >= index && i <= latestIndex && !item.disabled,
          );
          if (latestChecked) {
            setData([...data, ...interval]);
          } else {
            setData(
              data.filter((item) => !interval.some((i) => i.id === item.id)),
            );
          }
        } else {
          interval = rows.filter(
            (item, i) => i >= latestIndex && i <= index && !item.disabled,
          );
          if (latestChecked) {
            setData([...data, ...interval]);
          } else {
            setData(
              data.filter((item) => !interval.some((i) => i.id === item.id)),
            );
          }
        }
      } else {
        selectItem();
      }
    } else {
      selectItem();
    }
  };

  if (disabled) return <td />;

  return (
    <td>
      <input
        value={row.id}
        checked={isChecked}
        onChange={onChange}
        type="checkbox"
      />
    </td>
  );
};

export const TableBody: FunctionComponent<Pick<TableProps, "rows">> = ({
  rows,
}) => (
  <tbody>
    {rows.map((row, index) => (
      <tr key={row.id}>
        <CheckboxCell row={row} rows={rows} index={index} />
        {Object.entries(row).map((col) => {
          const key = col[0];
          if (key === "disabled") return;
          return <td key={`${row.id}${col[1]}`}>{col[1]}</td>;
        })}
      </tr>
    ))}
  </tbody>
);
