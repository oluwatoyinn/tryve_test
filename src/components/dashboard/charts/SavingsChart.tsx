import React from 'react';
import useDashboardStore from '../../../store/dashboardStore';

const SavingsChart = () => {
  const { savingsHistory } = useDashboardStore();
  
  // Calculate the max value for scaling
  const maxValue = Math.max(...savingsHistory.map(item => item.amount));
  
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 font-medium text-lg">Savings Growth</h3>
        <div className="text-xs text-gray-500">Last 6 months</div>
      </div>
      
      <div className="relative h-40">
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-full">
          {savingsHistory.map((item, index) => {
            const height = (item.amount / maxValue) * 100;
            return (
              <div 
                key={index}
                className="flex flex-col items-center w-1/6"
              >
                <div 
                  className="w-8 bg-blue-500 rounded-t-sm transition-all duration-500"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{item.month}</div>
              </div>
            );
          })}
        </div>
        
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((_, index) => (
            <div 
              key={index} 
              className="border-t border-gray-200 w-full h-0"
            ></div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div>
          <div className="font-medium">Starting</div>
          <div>${savingsHistory[0].amount.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="font-medium">Current</div>
          <div>${savingsHistory[savingsHistory.length - 1].amount.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default SavingsChart;