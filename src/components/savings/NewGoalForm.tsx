import { Inputs, newGoalSchema } from "@/validations/new-goal-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "../common/text-field/text-field";
import { Button } from "../common/button";
import useDashboardStore from "@/store/dashboardStore";
import { useEffect } from "react";

const NewGoalForm = ({
  setShowEditGoalForm,
  setShowNewGoalForm,
  showSuccessMessage,
  showEditGoalForm,
  editGoalData,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const { createSavingsGoal, updateSavingsGoal } = useDashboardStore();
  const { control, handleSubmit, setValue } = useForm<Inputs>({
    resolver: yupResolver(newGoalSchema),
    defaultValues: {
      name: "",
      target: 0,
      deadline: "",
    },
  });

  useEffect(() => {
    if (editGoalData?.id) {
      setValue("name", editGoalData?.name);
      setValue("target", editGoalData?.target);
      setValue("deadline", editGoalData?.deadline);
    }
  }, [editGoalData, setValue]);

  const handleCloseModal = () => {
    setShowNewGoalForm(false);
    setShowEditGoalForm(false);
  };

  const handleCreateGoal: SubmitHandler<Inputs> = async (data) => {
    console.log({ data });
    if (editGoalData?.id) {
      updateSavingsGoal(editGoalData.id, data);
      handleCloseModal();
      showSuccessMessage("Savings goal updated successfully!");
    } else {
      createSavingsGoal(data);
      handleCloseModal();
      showSuccessMessage("New savings goal created successfully!");
    }
  };
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {showEditGoalForm ? " Edit Savings Goal" : "Create New Savings Goal"}
        </h2>
        <button
          onClick={handleCloseModal}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit(handleCreateGoal)}>
        <div className="mb-4">
          <div>
            <TextField
              label="Goal Name"
              name="name"
              control={control}
              iconPosition="left"
              placeholder="Enter your goal name"
              className="block w-full rounded-md border border-gray-300 py-2 pl-5 text-foreground shadow-sm outline-none focus:border focus:border-green-400 focus:ring-0 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-200/50 disabled:text-gray-500;"
            />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <TextField
              label="Target Amount (₦)"
              name="target"
              type="number"
              control={control}
              iconPosition="left"
              placeholder="Enter your goal name"
              className="block w-full rounded-md border border-gray-300 py-2 pl-5 text-foreground shadow-sm outline-none focus:border focus:border-green-400 focus:ring-0 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-200/50 disabled:text-gray-500;"
            />
          </div>
        </div>

        <div className="mb-6">
          <div>
            <TextField
              label="Target Date"
              name="deadline"
              type="date"
              control={control}
              iconPosition="left"
              placeholder="Enter your goal name"
              className="block w-full rounded-md border border-gray-300 py-2 pl-5 text-foreground shadow-sm outline-none focus:border focus:border-green-400 focus:ring-0 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-200/50 disabled:text-gray-500;"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 hover:bg-gray-50"
            label="Cancel"
            onClick={handleCloseModal}
          />
          <Button
            className=" bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            type="submit"
            label=" Create Goal"
            onClick={handleSubmit(handleCreateGoal)}
          />
        </div>
      </form>
    </div>
  );
};

export default NewGoalForm;
