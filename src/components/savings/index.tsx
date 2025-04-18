/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { nairaFormat } from "@/lib/helpers";
import useDashboardStore from "@/store/dashboardStore";
import AddToSaving from "./AddToSaving";
import NewGoalForm from "./NewGoalForm";

interface GoalFormData {
  name: string;
  target: string;
  deadline: string;
}

interface EditGoalFormData extends GoalFormData {
  id: number;
}

const Savings = () => {
  const { savings, savingsGoals, deleteSavingsGoal } = useDashboardStore();

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // New goal form state
  const [showNewGoalForm, setShowNewGoalForm] = useState<boolean>(false);

  // Edit goal form state
  const [showEditGoalForm, setShowEditGoalForm] = useState<boolean>(false);
  const [editGoalData, setEditGoalData] = useState<EditGoalFormData>({
    id: 0,
    name: "",
    target: "",
    deadline: "",
  });

  // Handle deleting a goal
  const handleDeleteGoal = (goalId: number) => {
    deleteSavingsGoal(goalId);
    showSuccessMessage("Savings goal deleted successfully!");
  };

  // Open edit form with goal data
  const openEditForm = (goal: any) => {
    setEditGoalData({
      id: goal.id,
      name: goal.name,
      target: goal.target.toString(),
      deadline: goal.deadline,
    });
    setShowEditGoalForm(true);
    setShowNewGoalForm(false);
  };

  // Helper function to show success messages
  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Savings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your savings goals and track your progress
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-sm">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* New Goal Form */}
          {showNewGoalForm && (
            <NewGoalForm
              setShowNewGoalForm={setShowNewGoalForm}
              showSuccessMessage={showSuccessMessage}
            />
          )}

          {/* Edit Goal Form */}
          {showEditGoalForm && (
            <NewGoalForm
              showEditGoalForm={showEditGoalForm}
              setShowNewGoalForm={setShowNewGoalForm}
              showSuccessMessage={showSuccessMessage}
              editGoalData={editGoalData}
              setShowEditGoalForm={setShowEditGoalForm}
            />
          )}

          {/* Goals List */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Your Savings Goals
              </h2>
              <p className="text-gray-500 font-medium">
                Total: {nairaFormat.format(savings)}
              </p>
            </div>

            {savingsGoals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  You don't have any savings goals yet.
                </p>
                <button
                  onClick={() => {
                    setShowNewGoalForm(true);
                    setShowEditGoalForm(false);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Goal
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {savingsGoals.map((goal) => {
                  const progressPercentage = (goal.current / goal.target) * 100;
                  const formattedDate = new Date(
                    goal.deadline
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <div
                      key={goal.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-800">
                          {goal.name}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditForm(goal)}
                            className="text-gray-500 hover:text-blue-600 p-1"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteGoal(goal.id)}
                            className="text-gray-500 hover:text-red-600 p-1"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500 mb-2">
                        Due: {formattedDate}
                      </div>

                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">
                          {nairaFormat.format(goal.current)} /{" "}
                          {nairaFormat.format(goal.target)}
                        </span>
                      </div>

                      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${
                              progressPercentage > 100
                                ? 100
                                : progressPercentage
                            }%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{progressPercentage.toFixed(0)}% saved</span>
                        <span>
                          {nairaFormat.format(
                            goal.target - goal.current > 0
                              ? goal.target - goal.current
                              : 0
                          )}{" "}
                          to go
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {savingsGoals.length > 0 && !showNewGoalForm && (
              <div className="mt-6">
                <button
                  onClick={() => {
                    setShowNewGoalForm(true);
                    setShowEditGoalForm(false);
                  }}
                  className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                >
                  Add New Saving Goal
                </button>
              </div>
            )}
          </div>
        </div>

        <AddToSaving showSuccessMessage={showSuccessMessage} />
      </div>

      {/* Create New Goal Button - Fixed at Bottom on Mobile */}
      {!showNewGoalForm && !showEditGoalForm && (
        <div className="lg:hidden fixed bottom-6 right-6">
          <button
            onClick={() => {
              setShowNewGoalForm(true);
              setShowEditGoalForm(false);
            }}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Savings;
