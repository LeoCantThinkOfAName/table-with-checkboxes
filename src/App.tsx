import { RowType, Table } from "./components/Table";
import data from "./data.json";

const Columns = [
  {
    field: "id",
    name: "ID",
  },
  {
    field: "status",
    name: "狀態",
  },
];

interface MyRowType extends RowType {
  status: string;
}

const Rows: MyRowType[] = data;

const App = () => {
  return <Table cols={Columns} rows={Rows} />;
};

export default App;
