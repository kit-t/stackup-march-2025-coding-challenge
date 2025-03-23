"use client";

import { useShow } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    DateField,
    NumberField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const ProductsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Product Name
                </Typography>
                <TextField value={record?.product_name} />
                <Typography variant="body1" fontWeight="bold">
                    Generic Name
                </Typography>
                <TextField value={record?.generic_name} />
                <Typography variant="body1" fontWeight="bold">
                    Manufacturer
                </Typography>
                <TextField value={record?.manufacturer} />
                <Typography variant="body1" fontWeight="bold">
                    Dosage
                </Typography>
                <TextField value={record?.dosage} />
                <Typography variant="body1" fontWeight="bold">
                    Unit Of Measure
                </Typography>
                <TextField value={record?.unit_of_measure} />
                <Typography variant="body1" fontWeight="bold">
                    Description
                </Typography>
                <TextField value={record?.description} />
                <Typography variant="body1" fontWeight="bold">
                    Reorder Level
                </Typography>
                <NumberField value={record?.reorder_level ?? ""} />
            </Stack>
        </Show>
    );
};

