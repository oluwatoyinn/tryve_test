import { nairaFormat } from "@/lib/helpers";
import useDashboardStore from "../../../store/dashboardStore";

const ExpenseChart = () => {
  const { monthlyExpenses } = useDashboardStore();

  const totalExpense = monthlyExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const chartItems = monthlyExpenses.map((item, index) => {
    let color;
    switch (index % 6) {
      case 0:
        color = "#4F46E5";
        break;
      case 1:
        color = "#0284C7";
        break;
      case 2:
        color = "#10B981";
        break;
      case 3:
        color = "#F59E0B";
        break;
      case 4:
        color = "#EF4444";
        break;
      default:
        color = "#8B5CF6";
        break;
    }

    const percentage = (item.amount / totalExpense) * 100;

    return {
      ...item,
      color,
      percentage,
      width: `${percentage}%`,
    };
  });

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-gray-800 font-medium text-lg mb-4">
        Monthly Expenses
      </h3>

      <div className="flex mb-6 h-4 bg-gray-200 rounded-full overflow-hidden">
        {chartItems.map((item, index) => (
          <span
            key={index}
            className="h-full transition-all duration-500"
            style={{ backgroundColor: item.color, width: item.width }}
          ></span>
        ))}
      </div>

      <div className="space-y-4">
        {chartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.category}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-800 mr-2">
                {nairaFormat.format(item.amount)}
              </span>
              <span className="text-xs text-gray-500">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;
