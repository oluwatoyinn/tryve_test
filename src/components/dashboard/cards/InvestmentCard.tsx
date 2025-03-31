import React from 'react';
import useDashboardStore from '../../../store/dashboardStore';

const InvestmentCard = () => {
  const dashboardStore = useDashboardStore();
  const totalInvestments = dashboardStore.investments.reduce((sum, inv) => sum + inv.amount, 0);
  const avgReturn = dashboardStore.investments.reduce((sum, inv) => sum + (inv.returns * inv.amount), 0) / totalInvestments;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Total Investments</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">${totalInvestments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="text-green-600 font-medium flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          {avgReturn.toFixed(1)}% avg return
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          Invest More
        </button>
        <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

export default InvestmentCard;