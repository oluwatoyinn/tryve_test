import { nairaFormat } from "@/lib/helpers";
import useDashboardStore from "../../../store/dashboardStore";
import { useNavigate } from "react-router-dom";

const InvestmentCard = () => {
  const navigate = useNavigate();
  const dashboardStore = useDashboardStore();
  const totalInvestments = dashboardStore.investments.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );
  const avgReturn =
    dashboardStore.investments.reduce(
      (sum, inv) => sum + inv.returns * inv.amount,
      0
    ) / totalInvestments;

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">
            Total Investments
          </h3>
          <p className="lg:text-2xl md:text-xl text-2xl font-bold text-gray-800 mt-1">
            {nairaFormat.format(totalInvestments)}
          </p>
        </div>
        <div className="p-2 bg-green-100 text-green-600 rounded-lg md:hidden lg:block">
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
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="text-green-600 font-medium flex items-center">
          <svg
            className="h-4 w-4 mr-1"
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
          {avgReturn.toFixed(1)}% avg return
        </div>
      </div>

      <div className="flex lg:justify-between lg:flex-row md:flex-col lg:gap-2 gap-5 ">
        <button
          onClick={() => navigate("/investments")}
          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
        >
          Invest More
        </button>
        <button
          onClick={() => navigate("/investments")}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default InvestmentCard;
