"use client";

import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ProductsList = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "product_name",
                flex: 1,
                headerName: "Product Name",
                minWidth: 150,
            },
            {
                field: "generic_name",
                flex: 1,
                headerName: "Generic Name",
                minWidth: 150,
            },
            {
                field: "manufacturer",
                flex: 1,
                headerName: "Manufacturer",
                minWidth: 150,
            },
            {
                field: "dosage",
                flex: 1,
                headerName: "Dosage",
                minWidth: 50,
            },
            {
                field: "unit_of_measure",
                flex: 1,
                headerName: "Unit Of Measure",
                minWidth: 100,
            },
            {
                field: "description",
                flex: 1,
                headerName: "Description",
                minWidth: 200,
            },
            {
                field: "reorder_level",
                flex: 1,
                headerName: "Reorder Level",
                type: "number",
                minWidth: 50,
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
            <DataGrid {...dataGridProps} columns={columns} />
        </List>
    );
};

