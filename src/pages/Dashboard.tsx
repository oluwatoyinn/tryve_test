// src/pages/Dashboard.jsx
import useDashboardStore from "@/store/dashboardStore";
import { useEffect } from "react";
import BalanceCard from "../components/dashboard/cards/BalanceCard";
import SavingsCard from "../components/dashboard/cards/SavingsCard";
import InvestmentCard from "../components/dashboard/cards/InvestmentCard";
import StatsCard from "../components/dashboard/cards/StatsCard";
import ExpenseChart from "../components/dashboard/charts/ExpenseChart";
import SavingsChart from "../components/dashboard/charts/SavingsChart";
import InvestmentChart from "../components/dashboard/charts/InvestmentChart";
import RecentTransactions from "../components/dashboard/tables/RecentTransactions";
import UpcomingPayments from "../components/dashboard/tables/UpcomingPayments";

const Dashboard = () => {
  const { fetchDashboardData, isLoading } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Overview of your financial health</p>
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard />
        <SavingsCard />
        <InvestmentCard />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Income"
          value="₦5,240"
          icon="income"
          change="+5.2%"
          changeType="up"
        />
        <StatsCard
          title="Monthly Expenses"
          value="₦2,750"
          icon="expense"
          change="-2.1%"
          changeType="down"
        />
        <StatsCard
          title="Net Worth"
          value="₦35,680"
          icon="income"
          change="+12.3%"
          changeType="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExpenseChart />
        <SavingsChart />
        <InvestmentChart />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <UpcomingPayments />
      </div>
    </div>
  );
};

export default Dashboard;
