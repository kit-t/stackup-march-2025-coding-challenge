"use client";

import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete, Button, Typography, IconButton } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";
import { useNotification } from "@refinedev/core";
import { supabaseBrowserClient } from "@utils/supabase/client";
import { GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";

export const PrescriptionsCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading, redirect },
        register,
        control,
        formState: { errors },
        getValues,
        watch
    } = useForm({
        defaultValues: {
            patient_id: "",
            prescription_date: "",
            doctor_name: "",
            diagnosis: "",
            dispensing: [{
                batch_id: null,
                quantity_dispensed: null,
                dispensing_date: new Date().toISOString().split('T')[0],
            }],
        },
    });

    const { autocompleteProps: patientAutocompleteProps } = useAutocomplete({
        resource: "patients",
    });

    const { autocompleteProps: batchAutocompleteProps } = useAutocomplete({
        resource: "batches",
        meta: {
            select: "*, products(id, product_name)"
        },
    });

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "dispensing", // unique name for your Field Array
        rules: { minLength: 1 },
    });

    // https://github.com/react-hook-form/react-hook-form/issues/1564
    const watchedFields = watch("dispensing", fields);

    const { open } = useNotification();

    const onSaveBtnClick = async () => {
        try {
            const formValues = getValues();
            const { error } = await supabaseBrowserClient.rpc(
                "upsert_prescription_with_items",
                {
                    "patient_id": formValues?.patient_id,
                    "prescription_date": formValues?.prescription_date,
                    "doctor_name": formValues?.doctor_name,
                    "diagnosis": formValues?.diagnosis,
                    "dispensing": formValues?.dispensing
                }
            );
            if (error) {
                return open?.({
                    type: "error",
                    message: "Failed to save prescription.",
                    description: error.message
                });
            }
            redirect("list")
        } catch (error) {
            return open?.({
                type: "error",
                message: "Failed to save prescription.",
                description: (error as any)?.message
            });
        }
    }

    return (
        <Create isLoading={formLoading} saveButtonProps={{ ...saveButtonProps, onClick: onSaveBtnClick }}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <Controller
                    control={control}
                    name="patient_id"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...patientAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    patientAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.patient_name ?? ""
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
                                    label="Patient"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.patient_id}
                                    helperText={
                                        (errors as any)?.patient_id?.message
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
                    {...register("prescription_date", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.prescription_date}
                    helperText={(errors as any)?.prescription_date?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    label="Prescription Date"
                    name="prescription_date"
                />
                <TextField
                    {...register("doctor_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.doctor_name}
                    helperText={(errors as any)?.doctor_name?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Doctor Name"
                    name="doctor_name"
                />
                <TextField
                    {...register("diagnosis", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.diagnosis}
                    helperText={(errors as any)?.diagnosis?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="text"
                    label="Diagnosis"
                    name="diagnosis"
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
                                    name={`dispensing.${index}.batch_id`}
                                    rules={{ required: "This field is required" }}
                                    // eslint-disable-next-line
                                    defaultValue={item.product_id ?? null as any}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...batchAutocompleteProps}
                                            {...field}
                                            onChange={(_, value) => {
                                                field.onChange(value?.id ?? value);
                                            }}
                                            getOptionLabel={(item) => {
                                                return (
                                                    batchAutocompleteProps?.options?.find(
                                                        (p) =>
                                                            p?.id?.toString() ===
                                                            (item?.id ?? item)?.toString(),
                                                    )?.batch_number ?? ""
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
                                                    label="Batch Number"
                                                    margin="normal"
                                                    variant="outlined"
                                                    error={!!(errors as any)?.[`dispensing.${index}.batch_id`]}
                                                    helperText={
                                                        (errors as any)?.[`dispensing.${index}.batch_id`]?.message
                                                    }
                                                    required
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <Controller
                                    disabled
                                    control={control}
                                    name={`dispensing.${index}.batch_id`}
                                    // eslint-disable-next-line
                                    defaultValue={item.batch_id ?? null as any}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...batchAutocompleteProps}
                                            {...field}
                                            onChange={(_, value) => {
                                                field.onChange(value?.id ?? value);
                                            }}
                                            getOptionLabel={(item) => {
                                                return (
                                                    batchAutocompleteProps?.options?.find(
                                                        (p) =>
                                                            p?.id?.toString() ===
                                                            (item?.id ?? item)?.toString(),
                                                    )?.products?.product_name ?? ""
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
                                                    label="Product Name"
                                                    margin="normal"
                                                    variant="outlined"
                                                    disabled
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <TextField
                                    {...register(`dispensing.${index}.quantity_dispensed`, {
                                        required: "This field is required",
                                    })}
                                    error={!!(errors as any)?.[`dispensing.${index}.quantity_dispensed`]}
                                    helperText={(errors as any)?.[`dispensing.${index}.quantity_dispensed`]?.message}
                                    margin="normal"
                                    fullWidth
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    type="number"
                                    label="Quantity Dispensed"
                                    name={`dispensing.${index}.quantity_dispensed`}
                                />
                                {/*
                                    DatePicker component is not included in "@refinedev/mui" package.
                                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                                */}
                                <TextField
                                    {...register(`dispensing.${index}.dispensing_date`, {
                                        required: "This field is required",
                                    })}
                                    error={!!(errors as any)?.[`dispensing.${index}.dispensing_date`]}
                                    helperText={(errors as any)?.[`dispensing.${index}.dispensing_date`]?.message}
                                    margin="normal"
                                    fullWidth
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    label="Dispensing Date"
                                    name={`dispensing.${index}.dispensing_date`}
                                />
                            </Box>
                        );
                    })}

                    <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            type="button"
                            onClick={() => {
                                append({
                                    batch_id: null,
                                    quantity_dispensed: null,
                                    dispensing_date: new Date().toISOString().split('T')[0],
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
