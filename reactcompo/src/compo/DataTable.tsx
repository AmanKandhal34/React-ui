import { useState } from "react";

type Column<T> = {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
};

type RowData = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const columns: Column<RowData>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const data: RowData[] = [
  { id: 1, name: "Aman", age: 22, email: "aman@example.com" },
  { id: 2, name: "Rahul", age: 25, email: "rahul@example.com" },
  { id: 3, name: "Sneha", age: 21, email: "sneha@example.com" },
];

type SortConfig<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;

export default function DataTable() {
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig<RowData>>(null);
  const [loading] = useState(false);

  const onRowSelect = (rows: RowData[]) => console.log("Selected:", rows);

  // ---- Sorting Logic ----
  const handleSort = (col: Column<RowData>) => {
    if (!col.sortable) return;

    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === col.dataIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.dataIndex, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  // ---- Row Selection ----
  const handleRowSelect = (row: RowData) => {
    let updatedSelection: RowData[] = [];
    if (selectedRows.includes(row)) {
      updatedSelection = selectedRows.filter((r) => r !== row);
    } else {
      updatedSelection = [...selectedRows, row];
    }
    setSelectedRows(updatedSelection);
    onRowSelect(updatedSelection);
  };

  // ---- Render ----
  if (loading) {
    return <p className="text-center py-4 text-gray-500">Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center py-4 text-gray-500">No data available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Select</th>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-2 border border-gray-300 text-left font-semibold ${
                  col.sortable ? "cursor-pointer hover:bg-gray-200" : ""
                }`}
                onClick={() => handleSort(col)}
              >
                <div className="flex items-center gap-1">
                  {col.title}
                  {sortConfig?.key === col.dataIndex &&
                    (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              className={`transition-colors ${
                selectedRows.includes(row) ? "bg-teal-100" : "hover:bg-gray-50"
              } cursor-pointer`}
              onClick={() => handleRowSelect(row)}
            >
              <td className="px-4 py-2 border border-gray-300 text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowSelect(row)}
                />
              </td>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 border border-gray-300">
                  {row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
