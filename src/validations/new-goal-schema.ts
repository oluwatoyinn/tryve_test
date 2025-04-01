import * as yup from "yup";

export const newGoalSchema = yup.object({
  name: yup.string().required("Goal Name is required"),
  target: yup.number().required("Goal Target is required"),
  deadline: yup.string().required("Deadline is required"),
});

export type Inputs = yup.InferType<typeof newGoalSchema>;
