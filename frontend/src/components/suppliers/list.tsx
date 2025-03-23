"use client";

import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
    EmailField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const SuppliersList = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "supplier_name",
                flex: 1,
                headerName: "Supplier Name",
                minWidth: 200,
            },
            {
                field: "contact_person",
                flex: 1,
                headerName: "Contact Person",
                minWidth: 200,
            },
            {
                field: "phone",
                flex: 1,
                headerName: "Phone",
                minWidth: 200,
            },
            {
                field: "email",
                flex: 1,
                headerName: "Email",
                minWidth: 250,
                display: "flex",
                renderCell: function render({ value }) {
                    return <EmailField value={value} />;
                },
            },
            {
                field: "address",
                flex: 1,
                headerName: "Address",
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
