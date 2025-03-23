"use client";

import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const ProductsCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                {/* <TextField
                    {...register("created_at", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.created_at}
                    helperText={(errors as any)?.created_at?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    label="Created At"
                    name="created_at"
                /> */}
                <TextField
                    {...register("product_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.product_name}
                    helperText={(errors as any)?.product_name?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Product Name"
                    name="product_name"
                />
                <TextField
                    {...register("generic_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.generic_name}
                    helperText={(errors as any)?.generic_name?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Generic Name"
                    name="generic_name"
                />
                <TextField
                    {...register("manufacturer", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.manufacturer}
                    helperText={(errors as any)?.manufacturer?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Manufacturer"
                    name="manufacturer"
                />
                <TextField
                    {...register("dosage", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.dosage}
                    helperText={(errors as any)?.dosage?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Dosage"
                    name="dosage"
                />
                <TextField
                    {...register("unit_of_measure", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.unit_of_measure}
                    helperText={(errors as any)?.unit_of_measure?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Unit Of Measure"
                    name="unit_of_measure"
                />
                <TextField
                    {...register("description", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.description}
                    helperText={(errors as any)?.description?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Description"
                    name="description"
                />
                <TextField
                    {...register("reorder_level", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.reorder_level}
                    helperText={(errors as any)?.reorder_level?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="number"
                    label="Reorder Level"
                    name="reorder_level"
                />
            </Box>
        </Create>
    );
};
