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

export const BatchesList = () => {
    const { dataGridProps } = useDataGrid({
        meta: {
            select: "*, products(product_name)",
        }
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "products",
                flex: 1,
                headerName: "Product",
                minWidth: 150,
                renderCell: function render({ value }) {
                    return value.product_name;
                },
            },
            {
                field: "batch_number",
                flex: 1,
                headerName: "Batch Number",
                minWidth: 150,
            },
            {
                field: "expiry_date",
                flex: 1,
                headerName: "Expiry Date",
                minWidth: 150,
                display: "flex",
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "quantity",
                flex: 1,
                headerName: "Quantity",
                type: "number",
                minWidth: 100,
            },
            {
                field: "location",
                flex: 1,
                headerName: "Location",
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
                minWidth: 100,
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

