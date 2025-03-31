import { nairaFormat } from "@/lib/helpers";
import useDashboardStore from "../../../store/dashboardStore";

const BalanceCard = () => {
  const { balance } = useDashboardStore();

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-medium opacity-80">Total Balance</h3>
          <p className="lg:text-2xl md:text-xl text-2xl font-bold mt-1">
            {nairaFormat.format(balance)}
          </p>
        </div>
        <div className="bg-white bg-opacity-20 p-2 rounded-lg md:hidden lg:block">
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div className="flex lg:justify-between lg:flex-row md:flex-col lg:gap-0 gap-5 ">
        <button className="bg-white text-green-600 bg-opacity-20 hover:bg-opacity-30 rounded-lg py-2 px-4 text-sm font-medium flex items-center cursor-pointer">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Money
        </button>
        <button className="bg-white text-red-600 bg-opacity-20 hover:bg-opacity-30 rounded-lg py-2 px-4 text-sm font-medium flex items-center cursor-pointer">
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
              d="M8 7l4-4m0 0l4 4m-4-4v18"
            />
          </svg>
          Transfer
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
