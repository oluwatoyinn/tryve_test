import React from 'react';

// Define the icon types for better type safety
type IconType = 'expense' | 'income' | 'chart';

// Define the change direction types
type ChangeType = 'up' | 'down';

// Define the props interface
interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: IconType;
  change?: string; // Optional prop
  changeType?: ChangeType; // Optional prop
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change, changeType }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-2 ${
          icon === 'expense' ? 'bg-red-100 text-red-600' : 
          icon === 'income' ? 'bg-green-100 text-green-600' : 
          'bg-blue-100 text-blue-600'
        } rounded-lg`}>
          {icon === 'expense' ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          ) : icon === 'income' ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )}
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center">
          <span className={`mr-1 ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {changeType === 'up' ? (
              <svg className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
          </span>
          <span className={`text-xs font-medium ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {change} vs last month
          </span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;