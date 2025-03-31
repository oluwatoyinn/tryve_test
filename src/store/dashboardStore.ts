import { create } from 'zustand';

const useDashboardStore = create((set) => ({
  balance: 12500.75,
  savings: 8450.33,
  // investments: 14750.80,
  transactions: [
    { id: 1, type: 'deposit', amount: 1500, date: '2025-03-28', description: 'Salary' },
    { id: 2, type: 'withdrawal', amount: 250, date: '2025-03-27', description: 'Grocery Shopping' },
    { id: 3, type: 'investment', amount: 1000, date: '2025-03-25', description: 'Stock Purchase' },
    { id: 4, type: 'withdrawal', amount: 85.99, date: '2025-03-24', description: 'Utility Bill' },
    { id: 5, type: 'deposit', amount: 500, date: '2025-03-20', description: 'Freelance Work' },
  ],
  upcomingPayments: [
    { id: 1, amount: 1200, dueDate: '2025-04-05', description: 'Rent' },
    { id: 2, amount: 89.99, dueDate: '2025-04-10', description: 'Internet Bill' },
    { id: 3, amount: 120, dueDate: '2025-04-15', description: 'Phone Bill' },
  ],
  savingsGoals: [
    { id: 1, name: 'Emergency Fund', target: 10000, current: 8450.33, deadline: '2025-06-30' },
    { id: 2, name: 'Vacation', target: 5000, current: 2500, deadline: '2025-12-31' },
  ],
  investments: [
    { id: 1, name: 'Tech Stocks', amount: 5000, returns: 12.5 },
    { id: 2, name: 'Index Fund', amount: 7500, returns: 8.2 },
    { id: 3, name: 'Bonds', amount: 2250.80, returns: 4.5 },
  ],
  monthlyExpenses: [
    { category: 'Housing', amount: 1200 },
    { category: 'Food', amount: 500 },
    { category: 'Transportation', amount: 300 },
    { category: 'Utilities', amount: 250 },
    { category: 'Entertainment', amount: 200 },
    { category: 'Others', amount: 300 },
  ],
  savingsHistory: [
    { month: 'Oct', amount: 7200 },
    { month: 'Nov', amount: 7500 },
    { month: 'Dec', amount: 7800 },
    { month: 'Jan', amount: 8000 },
    { month: 'Feb', amount: 8200 },
    { month: 'Mar', amount: 8450 },
  ],
  investmentHistory: [
    { month: 'Oct', amount: 12000 },
    { month: 'Nov', amount: 12500 },
    { month: 'Dec', amount: 13200 },
    { month: 'Jan', amount: 13800 },
    { month: 'Feb', amount: 14300 },
    { month: 'Mar', amount: 14750 },
  ],
  
  isLoading: false,
  error: null,
  
  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, you would make API calls here
      // For the assessment, we're using the mock data already defined
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  }
}));

export default useDashboardStore;