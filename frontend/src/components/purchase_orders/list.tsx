"use client";

import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const PurchaseOrdersList = () => {
    const { dataGridProps } = useDataGrid({
        meta: {
            select: "*, suppliers(supplier_name)",
        }
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "suppliers",
                flex: 1,
                headerName: "Supplier",
                minWidth: 300,
                renderCell: function render({ value }) {
                    return value?.supplier_name;
                },
            },
            {
                field: "po_date",
                flex: 1,
                headerName: "Date",
                minWidth: 250,
                display: "flex",
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "status",
                flex: 1,
                headerName: "Status",
                minWidth: 200,
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                            <DeleteButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
