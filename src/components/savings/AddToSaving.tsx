/* eslint-disable @typescript-eslint/no-explicit-any */
import { nairaFormat } from "@/lib/helpers";
import useDashboardStore from "@/store/dashboardStore";
import { useState } from "react";
import TextField from "../common/text-field/text-field";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../common/button";
import { savingSchema, Inputs } from "@/validations/saving-schema";

const AddToSaving = ({ showSuccessMessage }: any) => {
  const { savingsGoals, addToSavings } = useDashboardStore();
  const [selectedGoalId, setSelectedGoalId] = useState<number>(
    savingsGoals[0]?.id || 1
  );

  const { control, handleSubmit, reset } = useForm<Inputs>({
    resolver: yupResolver(savingSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const handleAddToSavings: SubmitHandler<Inputs> = async (data) => {
    addToSavings(selectedGoalId, data?.amount);
    showSuccessMessage("Successfully added to your savings!");
    reset();
  };
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow p-6 sticky top-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add to Savings
        </h2>

        <form onSubmit={handleSubmit(handleAddToSavings)}>
          <div className="mb-4">
            <label
              htmlFor="goal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Goal
            </label>
            <select
              id="goal"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(parseInt(e.target.value))}
              disabled={savingsGoals.length === 0}
            >
              {savingsGoals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name} ({nairaFormat.format(goal.current)} /{" "}
                  {nairaFormat.format(goal.target)})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <TextField
              label="amount"
              name="amount"
              control={control}
              iconPosition="left"
              placeholder="Enter your amount"
              className="block w-full rounded-md border border-gray-300 py-2 pl-5 text-foreground shadow-sm outline-none focus:border focus:border-green-400 focus:ring-0 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-200/50 disabled:text-gray-500;"
            />
          </div>

          <div className="mt-3">
            <Button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
              type="submit"
              label="Add to Savings"
              onClick={handleSubmit(handleAddToSavings)}
            />
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Savings Tip
          </h3>
          <p className="text-sm text-blue-600">
            Setting up automatic transfers is a great way to consistently build
            your savings without having to think about it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddToSaving;
