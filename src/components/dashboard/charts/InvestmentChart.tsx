import React from 'react';
import useDashboardStore from '../../../store/dashboardStore';

const InvestmentChart = () => {
  const { investmentHistory } = useDashboardStore();
  
  // Calculate the max value for scaling
  const maxValue = Math.max(...investmentHistory.map(item => item.amount));
  const minValue = Math.min(...investmentHistory.map(item => item.amount));
  const padding = (maxValue - minValue) * 0.1;
  
  // Generate points for the line
  const chartWidth = 100;
  const chartHeight = 100;
  const pointCount = investmentHistory.length;
  const stepX = chartWidth / (pointCount - 1);
  
  const normalizeY = (value) => {
    return chartHeight - ((value - minValue + padding) / (maxValue - minValue + padding * 2)) * chartHeight;
  };
  
  const points = investmentHistory.map((item, index) => {
    return `${index * stepX},${normalizeY(item.amount)}`;
  }).join(' ');
  
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 font-medium text-lg">Investment Growth</h3>
        <div className="text-xs text-gray-500">Last 6 months</div>
      </div>
      
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-full h-40 overflow-visible">
          {/* Grid lines */}
          <line x1="0" y1="0" x2="100" y2="0" stroke="#f1f5f9" strokeWidth="0.5" />
          <line x1="0" y1="33" x2="100" y2="33" stroke="#f1f5f9" strokeWidth="0.5" />
          <line x1="0" y1="66" x2="100" y2="66" stroke="#f1f5f9" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#f1f5f9" strokeWidth="0.5" />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Area under the line */}
          <polygon
            points={`${points} ${(pointCount - 1) * stepX},100 0,100`}
            fill="url(#investmentGradient)"
            fillOpacity="0.2"
          />
          
          {/* Gradient */}
          <defs>
            <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Points */}
          {investmentHistory.map((item, index) => (
            <circle
              key={index}
              cx={index * stepX}
              cy={normalizeY(item.amount)}
              r="1.5"
              fill="#10B981"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2">
          {investmentHistory.map((item, index) => (
            <div key={index} className="text-xs text-gray-500">{item.month}</div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div>
          <div className="font-medium">Starting</div>
          <div>${investmentHistory[0].amount.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Growth</div>
          <div className="text-green-600 font-medium">
            +${(investmentHistory[investmentHistory.length - 1].amount - investmentHistory[0].amount).toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">Current</div>
          <div>${investmentHistory[investmentHistory.length - 1].amount.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentChart;