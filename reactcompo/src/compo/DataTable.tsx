
// function DataTable({ data, col }) {

//     return (
//         <div>{
//             col.map((val, idx) => (
//                 <h1 key={idx}>{val.title}</h1>
//             ))
//         }</div>
//     )
// }

// export default DataTable

import { useState } from "react";

export default function DataTable({
    data,
    columns,
    loading = false,
    selectable = false,
    onRowSelect,
}) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

    // ---- Sorting Logic ----
    const handleSort = (col) => {
        if (!col.sortable) return;

        let direction = "asc";
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
    const handleRowSelect = (row) => {
        let updatedSelection = [];
        if (selectedRows.includes(row)) {
            updatedSelection = selectedRows.filter((r) => r !== row);
        } else {
            updatedSelection = selectable === "single" ? [row] : [...selectedRows, row];
        }
        setSelectedRows(updatedSelection);
        if (onRowSelect) onRowSelect(updatedSelection);
    };

    // ---- Render ----
    if (loading) {
        return <p style={{ textAlign: "center" }}>Loading...</p>;
    }

    if (!data || data.length === 0) {
        return <p style={{ textAlign: "center" }}>No data available</p>;
    }

    return (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
                <tr>
                    {selectable && <th>Select</th>}
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            style={{ cursor: col.sortable ? "pointer" : "default" }}
                            onClick={() => handleSort(col)}
                        >
                            {col.title}
                            {sortConfig?.key === col.dataIndex &&
                                (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row, idx) => (
                    <tr
                        key={idx}
                        style={{
                            background: selectedRows.includes(row) ? "#e0f7fa" : "transparent",
                            cursor: selectable ? "pointer" : "default",
                        }}
                        onClick={() => selectable && handleRowSelect(row)}
                    >
                        {selectable && (
                            <td>
                                <input
                                    type={selectable === "single" ? "radio" : "checkbox"}
                                    checked={selectedRows.includes(row)}
                                    onChange={() => handleRowSelect(row)}
                                />
                            </td>
                        )}
                        {columns.map((col) => (
                            <td key={col.key}>{row[col.dataIndex]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
