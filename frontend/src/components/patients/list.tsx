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

export const PatientsList = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "patient_name",
                flex: 1,
                headerName: "Patient Name",
                minWidth: 200,
            },
            {
                field: "date_of_birth",
                flex: 1,
                headerName: "Date Of Birth",
                minWidth: 250,
                display: "flex",
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "address",
                flex: 1,
                headerName: "Address",
                minWidth: 200,
            },
            {
                field: "phone",
                flex: 1,
                headerName: "Phone",
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
