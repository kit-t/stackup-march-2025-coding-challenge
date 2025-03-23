"use client";

import { useShow } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    EmailField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const SuppliersShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Supplier Name
                </Typography>
                <TextField value={record?.supplier_name} />
                <Typography variant="body1" fontWeight="bold">
                    Contact Person
                </Typography>
                <TextField value={record?.contact_person} />
                <Typography variant="body1" fontWeight="bold">
                    Phone
                </Typography>
                <TextField value={record?.phone} />
                <Typography variant="body1" fontWeight="bold">
                    Email
                </Typography>
                <EmailField value={record?.email} />
                <Typography variant="body1" fontWeight="bold">
                    Address
                </Typography>
                <TextField value={record?.address} />
            </Stack>
        </Show>
    );
};
