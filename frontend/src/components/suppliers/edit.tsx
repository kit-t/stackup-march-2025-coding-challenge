"use client";

import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const SuppliersEdit = () => {
    const {
        saveButtonProps,
        refineCore: { query },
        register,
        control,
        formState: { errors },
    } = useForm();

    const suppliersData = query?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("supplier_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.supplier_name}
                    helperText={(errors as any)?.supplier_name?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Supplier Name"
                    name="supplier_name"
                />
                <TextField
                    {...register("contact_person", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.contact_person}
                    helperText={(errors as any)?.contact_person?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Contact Person"
                    name="contact_person"
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
                <TextField
                    {...register("email", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.email}
                    helperText={(errors as any)?.email?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="email"
                    label="Email"
                    name="email"
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
            </Box>
        </Edit>
    );
};
