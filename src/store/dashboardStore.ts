import { create } from "zustand";

interface Transaction {
  id: number;
  type: "deposit" | "withdrawal" | "investment";
  amount: number;
  date: string;
  description: string;
}

interface UpcomingPayment {
  id: number;
  amount: number;
  dueDate: string;
  description: string;
}

interface SavingsGoal {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

interface Investment {
  id: number;
  name: string;
  amount: number;
  returns: number;
}

interface MonthlyExpense {
  category: string;
  amount: number;
}

interface HistoryItem {
  month: string;
  amount: number;
}

interface DashboardState {
  balance: number;
  savings: number;
  transactions: Transaction[];
  upcomingPayments: UpcomingPayment[];
  savingsGoals: SavingsGoal[];
  investments: Investment[];
  monthlyExpenses: MonthlyExpense[];
  savingsHistory: HistoryItem[];
  investmentHistory: HistoryItem[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
  addToSavings: (goalId: number, amount: number) => void;
  createSavingsGoal: (goalData: Omit<SavingsGoal, "id" | "current">) => void;
  updateSavingsGoal: (
    goalId: number,
    updatedData: Partial<SavingsGoal>
  ) => void;
  deleteSavingsGoal: (goalId: number) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  balance: 12500.75,
  savings: 8450.33,
  transactions: [
    {
      id: 1,
      type: "deposit",
      amount: 1500,
      date: "2025-03-28",
      description: "Salary",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 250,
      date: "2025-03-27",
      description: "Grocery Shopping",
    },
    {
      id: 3,
      type: "investment",
      amount: 1000,
      date: "2025-03-25",
      description: "Stock Purchase",
    },
    {
      id: 4,
      type: "withdrawal",
      amount: 85.99,
      date: "2025-03-24",
      description: "Utility Bill",
    },
    {
      id: 5,
      type: "deposit",
      amount: 500,
      date: "2025-03-20",
      description: "Freelance Work",
    },
  ],
  upcomingPayments: [
    { id: 1, amount: 1200, dueDate: "2025-04-05", description: "Rent" },
    {
      id: 2,
      amount: 890.99,
      dueDate: "2025-04-10",
      description: "Internet Bill",
    },
    { id: 3, amount: 120, dueDate: "2025-04-15", description: "Phone Bill" },
  ],
  savingsGoals: [
    {
      id: 1,
      name: "Family Fund",
      target: 10000,
      current: 8450.33,
      deadline: "2025-06-30",
    },
    {
      id: 2,
      name: "New Car",
      target: 5000,
      current: 2500,
      deadline: "2025-12-31",
    },
  ],
  investments: [
    { id: 1, name: "Tech Stocks", amount: 5000, returns: 12.5 },
    { id: 2, name: "Index Fund", amount: 7500, returns: 8.2 },
    { id: 3, name: "Bonds", amount: 2250.8, returns: 4.5 },
  ],
  monthlyExpenses: [
    { category: "Housing", amount: 1200 },
    { category: "Food", amount: 500 },
    { category: "Transportation", amount: 300 },
    { category: "Utilities", amount: 250 },
    { category: "Entertainment", amount: 200 },
    { category: "Others", amount: 300 },
  ],
  savingsHistory: [
    { month: "Oct", amount: 7200 },
    { month: "Nov", amount: 7500 },
    { month: "Dec", amount: 7800 },
    { month: "Jan", amount: 8000 },
    { month: "Feb", amount: 8200 },
    { month: "Mar", amount: 8450 },
  ],
  investmentHistory: [
    { month: "Oct", amount: 12000 },
    { month: "Nov", amount: 12500 },
    { month: "Dec", amount: 13200 },
    { month: "Jan", amount: 13800 },
    { month: "Feb", amount: 14300 },
    { month: "Mar", amount: 14750 },
    { month: "Mar", amount: 14750 },
  ],

  isLoading: false,
  error: null,

  addToSavings: (goalId, amount) =>
    set((state) => {
      // Create a copy of savingsGoals array
      const updatedGoals = state.savingsGoals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            current: goal.current + amount,
          };
        }
        return goal;
      });

      // Update the total savings amount
      const newTotalSavings = state.savings + amount;

      return {
        savingsGoals: updatedGoals,
        savings: newTotalSavings,
      };
    }),

  createSavingsGoal: (goalData) =>
    set((state) => {
      // Generate a new ID (simple implementation)
      const newId = Math.max(...state.savingsGoals.map((goal) => goal.id)) + 1;

      const newGoal = {
        id: newId,
        current: 0,
        ...goalData,
      };

      return {
        savingsGoals: [...state.savingsGoals, newGoal],
      };
    }),

  updateSavingsGoal: (goalId, updatedData) =>
    set((state) => {
      const updatedGoals = state.savingsGoals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            ...updatedData,
          };
        }
        return goal;
      });

      return {
        savingsGoals: updatedGoals,
      };
    }),

  deleteSavingsGoal: (goalId) =>
    set((state) => {
      // Filter out the goal to be deleted
      const filteredGoal = state.savingsGoals.find(
        (goal) => goal.id === goalId
      );
      const updatedGoals = state.savingsGoals.filter(
        (goal) => goal.id !== goalId
      );

      // Recalculate total savings
      const amountToDeduct = filteredGoal ? filteredGoal.current : 0;
      const newTotalSavings = state.savings - amountToDeduct;

      return {
        savingsGoals: updatedGoals,
        savings: newTotalSavings,
      };
    }),

  fetchDashboardData: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      {
        /**
      @ description of activity: I am using the mock data already defined
      */
      }
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

export default useDashboardStore;
