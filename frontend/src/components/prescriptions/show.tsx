"use client";

import { useShow } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const PrescriptionsShow = () => {
    const { query } = useShow({
        meta: {
            select: "*, patients(patient_name), dispensing(id, batch_id, quantity_dispensed, dispensing_date, batches(batch_number, products(product_name)))",
        }
    });
    const { data, isLoading } = query;

    const record = data?.data;
    
    const dispensing = record?.dispensing?.map((item: any) => ({
        id: item?.id,
        product_name: item?.batches?.products?.product_name,
        batch_number: item?.batches?.batch_number,
        quantity_dispensed: item?.quantity_dispensed,
        dispensing_date: item?.dispensing_date
    }))

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "product_name",
                headerName: "Product Name",
                flex: 1
            },
            {
                field: "batch_number",
                headerName: "Batch Number",
                flex: 1
            },
            {
                field: "quantity_dispensed",
                headerName: "Quantity Dispensed",
                flex: 1,
            },
            {
                field: "dispensing_date",
                headerName: "Dispensing Date",
                display: "flex",
                flex: 1,
                renderCell: function render({ value }) {
                    return <DateField value={value} />
                }
            },
        ],
        []
    );

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Patient
                </Typography>
                <TextField value={record?.patients.patient_name} />
                <Typography variant="body1" fontWeight="bold">
                    Prescription Date
                </Typography>
                <DateField value={record?.prescription_date} />
                <Typography variant="body1" fontWeight="bold">
                    Doctor Name
                </Typography>
                <TextField value={record?.doctor_name} />
                <Typography variant="body1" fontWeight="bold">
                    Diagnosis
                </Typography>
                <TextField value={record?.diagnosis} />
                <Typography variant="body1" fontWeight="bold">
                    Items
                </Typography>
                <DataGrid columns={columns} rows={dispensing} />
            </Stack>
        </Show>
    );
};
