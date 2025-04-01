import * as yup from "yup";

export const savingSchema = yup.object({
    amount: yup.number().required("amount"),
});


export type Inputs = yup.InferType<typeof savingSchema>;
