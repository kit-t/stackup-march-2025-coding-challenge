"use client";

import { useShow } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    DateField,
    NumberField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const BatchesShow = () => {
    const { query } = useShow({
        meta: {
            select: "*, products(product_name)",
        }
    });
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Product
                </Typography>
                <TextField value={record?.products?.product_name} />
                <Typography variant="body1" fontWeight="bold">
                    Batch Number
                </Typography>
                <TextField value={record?.batch_number} />
                <Typography variant="body1" fontWeight="bold">
                    Expiry Date
                </Typography>
                <DateField value={record?.expiry_date} />
                <Typography variant="body1" fontWeight="bold">
                    Quantity
                </Typography>
                <NumberField value={record?.quantity ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Location
                </Typography>
                <TextField value={record?.location} />
            </Stack>
        </Show>
    );
};
