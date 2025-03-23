"use client";

import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const BatchesEdit = () => {
    const {
        saveButtonProps,
        refineCore: { query },
        register,
        control,
        formState: { errors },
    } = useForm();

    const batchesData = query?.data?.data;

    const { autocompleteProps: productAutocompleteProps } = useAutocomplete({
        resource: "products",
        defaultValue: batchesData?.product_id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <Controller
                    control={control}
                    name="product_id"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...productAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    productAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.product_name ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Product"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.product_id}
                                    helperText={
                                        (errors as any)?.product_id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <TextField
                    {...register("batch_number", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.batch_number}
                    helperText={(errors as any)?.batch_number?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Batch Number"
                    name="batch_number"
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("expiry_date", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.expiry_date}
                    helperText={(errors as any)?.expiry_date?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    label="Expiry Date"
                    name="expiry_date"
                />
                <TextField
                    {...register("quantity", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.quantity}
                    helperText={(errors as any)?.quantity?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="number"
                    label="Quantity"
                    name="quantity"
                />
                <TextField
                    {...register("location", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.location}
                    helperText={(errors as any)?.location?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Location"
                    name="location"
                />
            </Box>
        </Edit>
    );
};
