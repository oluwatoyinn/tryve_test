/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { create } from 'zustand';
import { AreaChart, XAxis, YAxis} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Wallet, PiggyBank, TrendingUp, BriefcaseBusiness, Bell, Settings, LogOut, Search } from 'lucide-react';

// Zustand store for state management
const useFinanceStore = create((set) => ({
  userData: null,
  accounts: [],
  investments: [],
  transactions: [],
  savingsGoals: [],
  loading: true,
  error: null,
  
  // Simulated API fetch functions
  fetchUserData: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const userData = {
        name: "Alex Johnson",
        avatar: "/api/placeholder/150/150",
        balance: 12450.65,
        savingsTotal: 5680.42,
        investmentTotal: 6770.23,
        monthlyChange: 5.7
      };
      
      const accounts = [
        { id: 1, name: "Main Savings", balance: 3450.65, type: "savings", monthlyGrowth: 2.3 },
        { id: 2, name: "Emergency Fund", balance: 2229.77, type: "savings", monthlyGrowth: 1.2 },
        { id: 3, name: "Checking Account", balance: 1870.32, type: "checking", monthlyGrowth: 0 }
      ];
      
      const investments = [
        { id: 1, name: "Tech ETF", value: 3200.45, allocationPct: 42, growth: 8.7, risk: "medium" },
        { id: 2, name: "S&P 500 Index", value: 2540.89, allocationPct: 36, growth: 6.2, risk: "low" },
        { id: 3, name: "Emerging Markets", value: 1028.89, allocationPct: 22, growth: -2.3, risk: "high" }
      ];
      
      const transactions = [
        { id: 1, description: "Deposit", amount: 1200, date: "2025-03-28", category: "income" },
        { id: 2, description: "Investment - Tech ETF", amount: -500, date: "2025-03-25", category: "investment" },
        { id: 3, description: "Savings Goal - Vacation", amount: -200, date: "2025-03-22", category: "savings" },
        { id: 4, description: "Dividend Payment", amount: 35.20, date: "2025-03-20", category: "income" },
        { id: 5, description: "Monthly Interest", amount: 12.55, date: "2025-03-15", category: "income" }
      ];
      
      const savingsGoals = [
        { id: 1, name: "Vacation", target: 3000, current: 1750, deadline: "2025-07-30" },
        { id: 2, name: "New Laptop", target: 1200, current: 800, deadline: "2025-05-15" },
        { id: 3, name: "Home Down Payment", target: 20000, current: 5200, deadline: "2026-06-30" }
      ];
      
      // Historical data for charts
      const monthlyData = [
        { month: 'Jan', savings: 4200, investments: 5800 },
        { month: 'Feb', savings: 4500, investments: 5900 },
        { month: 'Mar', savings: 4800, investments: 6100 },
        { month: 'Apr', savings: 5100, investments: 6300 },
        { month: 'May', savings: 5300, investments: 6500 },
        { month: 'Jun', savings: 5600, investments: 6700 },
      ];
      
      set({ 
        userData, 
        accounts, 
        investments, 
        transactions, 
        savingsGoals,
        monthlyData,
        loading: false 
      });
    } catch (error) {
      set({ error: "Failed to fetch user data", loading: false });
    }
  },
  
  // Additional methods could be added here
  transferFunds: (amount, from, to) => {
    // Implementation for transferring funds between accounts
  },
  
  addSavingsGoal: (goal) => {
    // Implementation for adding a new savings goal
  }
}));

// Main Dashboard Component
const Dashboard = () => {
  const { 
    userData, 
    accounts, 
    investments, 
    transactions, 
    savingsGoals,
    monthlyData, 
    loading, 
    fetchUserData 
  } = useFinanceStore();
  
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your financial dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-md z-10 hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-600">FinSmart</h2>
        </div>
        <div className="mt-8">
          <NavItem icon={<Wallet size={18} />} label="Dashboard" active />
          <NavItem icon={<PiggyBank size={18} />} label="Savings" />
          <NavItem icon={<TrendingUp size={18} />} label="Investments" />
          <NavItem icon={<BriefcaseBusiness size={18} />} label="Financial Planning" />
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <NavItem icon={<Bell size={18} />} label="Notifications" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
          <NavItem icon={<LogOut size={18} />} label="Log Out" />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-8">
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold text-blue-600">FinSmart</h2>
          <button className="p-2 rounded-full bg-gray-100">
            <span className="sr-only">Menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        {/* Header with user info */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div className="flex items-center">
            <img src={userData.avatar} alt="Profile" className="w-12 h-12 rounded-full" />
            <div className="ml-4">
              <h1 className="text-xl font-semibold">Welcome back, {userData.name}</h1>
              <p className="text-gray-500">Let's check your finances today</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + Add Money
            </button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <OverviewCard 
            title="Total Balance" 
            value={`$${userData.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} 
            change={userData.monthlyChange} 
            isPositive={userData.monthlyChange > 0}
          />
          <OverviewCard 
            title="Total Savings" 
            value={`$${userData.savingsTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} 
            change={2.3} 
            isPositive={true}
          />
          <OverviewCard 
            title="Investments" 
            value={`$${userData.investmentTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} 
            change={8.7} 
            isPositive={true}
          />
          <OverviewCard 
            title="Monthly Spending" 
            value="$2,845.30" 
            change={-12.5} 
            isPositive={false}
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Financial Overview</h3>
              <select className="p-2 border border-gray-300 rounded-md bg-white text-sm">
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>All Time</option>
              </select>
            </div>
            <div className="h-64">
              <AreaChart width={500} height={250} data={monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="investmentsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <tooltip />
                <area type="monotone" dataKey="savings" stroke="#3B82F6" fillOpacity={1} fill="url(#savingsGradient)" />
                <area type="monotone" dataKey="investments" stroke="#10B981" fillOpacity={1} fill="url(#investmentsGradient)" />
              </AreaChart>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Investment Allocation</h3>
              <button className="text-blue-600 text-sm">View Details</button>
            </div>
            <div className="h-64 flex flex-col">
              <div className="flex-1">
                {/* Placeholder for pie/donut chart */}
                <div className="h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                      <span className="text-gray-800 font-semibold">$6,770</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {investments.map(investment => (
                  <div key={investment.id} className="text-center">
                    <div className={`inline-block w-3 h-3 rounded-full ${
                      investment.growth > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <p className="text-xs text-gray-600">{investment.name}</p>
                    <p className="text-sm font-semibold">{investment.allocationPct}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Accounts & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Your Accounts</h3>
              <button className="text-sm text-blue-600">+ Add Account</button>
            </div>
            <div className="space-y-4">
              {accounts.map(account => (
                <div key={account.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      account.type === 'savings' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {account.type === 'savings' ? <PiggyBank size={20} /> : <Wallet size={20} />}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">{account.name}</h4>
                      <p className="text-sm text-gray-500">{account.type.charAt(0).toUpperCase() + account.type.slice(1)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    {account.monthlyGrowth > 0 && (
                      <div className="text-xs text-green-600 flex items-center justify-end">
                        <ArrowUpRight size={12} className="mr-1" />
                        {account.monthlyGrowth}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Savings Goals</h3>
              <button className="text-sm text-blue-600">+ New Goal</button>
            </div>
            <div className="space-y-6">
              {savingsGoals.map(goal => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{goal.name}</h4>
                    <p className="text-sm">${goal.current} of ${goal.target}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">Target date: {new Date(goal.deadline).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <button className="text-sm text-blue-600">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.category === 'income' ? 'bg-green-100 text-green-800' :
                        transaction.category === 'investment' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-right font-medium ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label, active }) => {
  return (
    <div className={`flex items-center px-4 py-3 ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
};

const OverviewCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold mb-2">{value}</h3>
      <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <ArrowUpRight size={16} className="mr-1" />
        ) : (
          <ArrowDownRight size={16} className="mr-1" />
        )}
        <span>{Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}</span>
      </div>
    </div>
  );
};

export default Dashboard;
