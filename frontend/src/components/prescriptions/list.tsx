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

export const PrescriptionsList = () => {
    const { dataGridProps } = useDataGrid({
        meta: {
            select: "*, patients(patient_name)",
        }
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "patients",
                flex: 1,
                headerName: "Patient",
                minWidth: 300,
                renderCell: function render({ value }) {
                    return value?.patient_name;
                },
            },
            {
                field: "prescription_date",
                display: "flex",
                flex: 1,
                headerName: "Prescription Date",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "doctor_name",
                flex: 1,
                headerName: "Doctor Name",
                minWidth: 200,
            },
            {
                field: "diagnosis",
                flex: 1,
                headerName: "Diagnosis",
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
