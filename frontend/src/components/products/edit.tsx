"use client";

import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const ProductsEdit = () => {
    const {
        saveButtonProps,
        refineCore: { query },
        register,
        control,
        formState: { errors },
    } = useForm();

    const productsData = query?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
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
        </Edit>
    );
};

