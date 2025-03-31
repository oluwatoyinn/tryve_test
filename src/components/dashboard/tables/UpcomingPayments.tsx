import { nairaFormat } from "@/lib/helpers";
import useDashboardStore from "../../../store/dashboardStore";
import { useNavigate } from "react-router-dom";

const UpcomingPayments = () => {
  const navigate = useNavigate();
  const { upcomingPayments } = useDashboardStore();

  // Calculating days remaining for each payment
  const paymentsWithDaysLeft = upcomingPayments.map((payment) => {
    const dueDate = new Date(payment.dueDate);
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return {
      ...payment,
      daysLeft,
    };
  });

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b">
        <h3 className="text-gray-800 font-medium text-lg">Upcoming Payments</h3>
      </div>

      <div className="divide-y">
        {paymentsWithDaysLeft.map((payment) => (
          <div key={payment.id} className="px-6 py-4 flex items-center">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-800">
                {payment.description}
              </p>
              <p className="text-xs text-gray-500">Due on {payment.dueDate}</p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-800">
                {nairaFormat.format(payment.amount)}
              </span>
              <span
                className={`text-xs ${
                  payment.daysLeft <= 3 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {payment.daysLeft > 0
                  ? `${payment.daysLeft} days left`
                  : "Due today"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {upcomingPayments.length === 0 && (
        <div className="px-6 py-8 text-center">
          <p className="text-gray-500 text-sm">No upcoming payments</p>
        </div>
      )}

      <div
        className="px-6 py-4 border-t"
        onClick={() => navigate("/transactions")}
      >
        <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-700 cursor-pointer">
          Manage Payments
        </button>
      </div>
    </div>
  );
};

export default UpcomingPayments;
