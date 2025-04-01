/* eslint-disable @typescript-eslint/no-explicit-any */
import { nairaFormat } from "@/lib/helpers";
import useDashboardStore from "@/store/dashboardStore";
import React, { FormEvent, useState } from "react";

const AddToSaving = ({ showSuccessMessage }: any) => {
  const { savingsGoals, addToSavings } = useDashboardStore();
  // Add to savings form state
  const [amount, setAmount] = useState<string>("");
  const [selectedGoalId, setSelectedGoalId] = useState<number>(
    savingsGoals[0]?.id || 1
  );
  // Handle adding to savings
  const handleAddToSavings = (e: FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);

    if (isNaN(amountValue) || amountValue <= 0) return;

    addToSavings(selectedGoalId, amountValue);
    setAmount("");
    showSuccessMessage("Successfully added to your savings!");
  };
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow p-6 sticky top-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add to Savings
        </h2>

        <form onSubmit={handleAddToSavings}>
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
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₦</span>
              </div>
              <input
                type="number"
                id="amount"
                className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={savingsGoals.length === 0}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            disabled={savingsGoals.length === 0}
          >
            Add to Savings
          </button>
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
