"use client";

import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const PatientsEdit = () => {
    const {
        saveButtonProps,
        refineCore: { query },
        register,
        control,
        formState: { errors },
    } = useForm();

    const patientsData = query?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("patient_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.patient_name}
                    helperText={(errors as any)?.patient_name?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Patient Name"
                    name="patient_name"
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("date_of_birth", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.date_of_birth}
                    helperText={(errors as any)?.date_of_birth?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    label="Date Of Birth"
                    name="date_of_birth"
                />
                <TextField
                    {...register("address", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.address}
                    helperText={(errors as any)?.address?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Address"
                    name="address"
                />
                <TextField
                    {...register("phone", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.phone}
                    helperText={(errors as any)?.phone?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Phone"
                    name="phone"
                />
            </Box>
        </Edit>
    );
};
