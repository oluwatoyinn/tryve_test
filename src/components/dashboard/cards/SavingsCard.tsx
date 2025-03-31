import React from 'react';
import useDashboardStore from '../../../store/dashboardStore';

const SavingsCard = () => {
  const { savings, savingsGoals } = useDashboardStore();
  const mainGoal = savingsGoals[0]; // Emergency Fund
  const progressPercentage = (mainGoal.current / mainGoal.target) * 100;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Total Savings</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">${savings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>
      
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-gray-700">{mainGoal.name}</span>
        <span className="text-gray-500">${mainGoal.current.toLocaleString()} / ${mainGoal.target.toLocaleString()}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="mt-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Add to Savings
        </button>
      </div>
    </div>
  );
};

export default SavingsCard;