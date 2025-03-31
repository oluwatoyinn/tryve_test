import { nairaFormat } from "@/lib/helpers";
import useDashboardStore from "../../../store/dashboardStore";
import { useNavigate } from "react-router-dom";

const RecentTransactions = () => {
  const navigate = useNavigate();
  const { transactions } = useDashboardStore();

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return (
          <div className="p-2 bg-green-100 text-green-600 rounded-full">
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        );
      case "withdrawal":
        return (
          <div className="p-2 bg-red-100 text-red-600 rounded-full">
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        );
      case "investment":
        return (
          <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-100 text-gray-600 rounded-full">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b">
        <h3 className="text-gray-800 font-medium text-lg">
          Recent Transactions
        </h3>
      </div>

      <div className="divide-y">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="px-6 py-4 flex items-center">
            {getTransactionIcon(transaction.type)}

            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-800">
                {transaction.description}
              </p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>

            <div
              className={`text-sm font-medium ${
                transaction.type === "deposit"
                  ? "text-green-600"
                  : transaction.type === "withdrawal"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {transaction.type === "deposit" ? "+" : "-"}
              {nairaFormat.format(transaction.amount)}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t" onClick={() => navigate("/transactions")}>
        <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-700 cursor-pointer">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;
