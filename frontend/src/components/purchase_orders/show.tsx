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

export const PurchaseOrdersShow = () => {
    const { query } = useShow({
        meta: {
            select: "*, suppliers(supplier_name), purchase_order_items(*, products(product_name))",
        },
    });
    const { data, isLoading } = query;

    const record = data?.data;

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "products",
                headerName: "Product",
                flex: 1,
                renderCell: function render({ value }) {
                    return value?.product_name;
                }
            },
            {
                field: "quantity_ordered",
                headerName: "Quantity Ordered",
                flex: 1,
            },
            {
                field: "unit_price",
                headerName: "Unit Price",
                flex: 1,
            },
        ],
        []
    );

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Supplier
                </Typography>
                <TextField value={record?.suppliers?.supplier_name} />
                <Typography variant="body1" fontWeight="bold">
                    Date
                </Typography>
                <DateField value={record?.po_date} />
                <Typography variant="body1" fontWeight="bold">
                    Status
                </Typography>
                <TextField value={record?.status} />
                <Typography variant="body1" fontWeight="bold">
                    Items
                </Typography>
                <DataGrid columns={columns} rows={record?.purchase_order_items} />
            </Stack>
        </Show>
    );
};
