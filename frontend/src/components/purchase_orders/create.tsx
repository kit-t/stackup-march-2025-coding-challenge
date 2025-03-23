"use client";

import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete, Button, IconButton, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";
import { supabaseBrowserClient } from "@utils/supabase/client";
import { useNotification } from "@refinedev/core";
import { GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";

export const PurchaseOrdersCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading, redirect },
        register,
        control,
        formState: { errors },
        getValues,
        watch,
    } = useForm({
        defaultValues: {
            supplier_id: "",
            po_date: "",
            status: "",
            purchase_order_items: [{
                product_id: null,
                quantity_ordered: null,
                unit_price: null,
            }],
        },
    });

    const { autocompleteProps: supplierAutocompleteProps } = useAutocomplete({
        resource: "suppliers",
    });

    const { autocompleteProps: productAutocompleteProps } = useAutocomplete({
        resource: "products",
    });

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "purchase_order_items", // unique name for your Field Array
        rules: { minLength: 1 },
    });

    // https://github.com/react-hook-form/react-hook-form/issues/1564
    const watchedFields = watch("purchase_order_items", fields);

    const { open } = useNotification();

    const onSaveBtnClick = async () => {
        try {
            const formValues = getValues();
            const { error } = await supabaseBrowserClient.rpc(
                "upsert_purchase_order_with_items",
                {
                    "supplier_id": formValues?.supplier_id,
                    "po_date": formValues?.po_date,
                    "status": formValues?.status,
                    "purchase_order_items": formValues?.purchase_order_items
                }
            );
            if (error) {
                return open?.({
                    type: "error",
                    message: "Failed to save purchase order.",
                    description: error.message
                });
            }
            redirect("list")
        } catch (error) {
            return open?.({
                type: "error",
                message: "Failed to save purchase order.",
                description: (error as any)?.message
            });
        }
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={{ ...saveButtonProps, onClick: onSaveBtnClick }}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <Controller
                    control={control}
                    name="supplier_id"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...supplierAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    supplierAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.supplier_name ?? ""
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
                                    label="Supplier"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.supplier_id}
                                    helperText={
                                        (errors as any)?.supplier_id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("po_date", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.po_date}
                    helperText={(errors as any)?.po_date?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    label="Date"
                    name="po_date"
                />
                <TextField
                    {...register("status", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.status}
                    helperText={(errors as any)?.status?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Status"
                    name="status"
                />

<Box
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                        marginTop: "16px",
                        marginBottom: "8px",
                    }}
                >
                    <Typography
                        variant="body1"
                    >
                        Items
                    </Typography>
                    {watchedFields.map((item: any, index: number) => {
                        return (
                            <Box
                                key={index}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    padding: "8px",
                                    marginTop: "16px",
                                    marginBottom: "8px",
                                }}
                            >
                                <Box
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                    >
                                        Item {index + 1}
                                    </Typography>
                                    <IconButton
                                        onClick={() => remove(index)}
                                    >
                                        <GridDeleteIcon />
                                    </IconButton>
                                </Box>
                                <Controller
                                    control={control}
                                    name={`purchase_order_items.${index}.product_id`}
                                    rules={{ required: "This field is required" }}
                                    // eslint-disable-next-line
                                    defaultValue={item.product_id ?? null as any}
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
                                                    error={!!(errors as any)?.[`purchase_order_items.${index}.product_id`]}
                                                    helperText={
                                                        (errors as any)?.[`purchase_order_items.${index}.product_id`]?.message
                                                    }
                                                    required
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <TextField
                                    {...register(`purchase_order_items.${index}.quantity_ordered`, {
                                        required: "This field is required",
                                    })}
                                    error={!!(errors as any)?.[`purchase_order_items.${index}.quantity_ordered`]}
                                    helperText={(errors as any)?.[`purchase_order_items.${index}.quantity_ordered`]?.message}
                                    margin="normal"
                                    fullWidth
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    type="number"
                                    label="Quantity Ordered"
                                    name={`purchase_order_items.${index}.quantity_ordered`}
                                />
                                <TextField
                                    {...register(`purchase_order_items.${index}.unit_price`, {
                                        required: "This field is required",
                                    })}
                                    error={!!(errors as any)?.[`purchase_order_items.${index}.unit_price`]}
                                    helperText={(errors as any)?.[`purchase_order_items.${index}.unit_price`]?.message}
                                    margin="normal"
                                    fullWidth
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                        input: {
                                            inputProps: {
                                                step: "0.01",
                                            }
                                        }
                                    }}
                                    type="number"
                                    label="Unit Price"
                                    name={`purchase_order_items.${index}.unit_price`}
                                />
                            </Box>
                        );
                    })}

                    <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            type="button"
                            onClick={() => {
                                append({
                                    product_id: null,
                                    quantity_ordered: null,
                                    unit_price: null,
                                });
                            }}
                            variant="contained"
                            style={{
                                marginTop: "16px",
                                marginBottom: "8px",
                            }}
                            startIcon={<GridAddIcon />}
                        >
                            Add Item
                        </Button>
                    </Box>

                </Box>
            </Box>
        </Create>
    );
};
