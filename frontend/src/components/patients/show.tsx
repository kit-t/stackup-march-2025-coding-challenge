"use client";

import { useShow } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const PatientsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Patient Name
                </Typography>
                <TextField value={record?.patient_name} />
                <Typography variant="body1" fontWeight="bold">
                    Date Of Birth
                </Typography>
                <DateField value={record?.date_of_birth} />
                <Typography variant="body1" fontWeight="bold">
                    Address
                </Typography>
                <TextField value={record?.address} />
                <Typography variant="body1" fontWeight="bold">
                    Phone
                </Typography>
                <TextField value={record?.phone} />
            </Stack>
        </Show>
    );
};
