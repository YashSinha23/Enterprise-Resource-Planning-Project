import React from 'react';

const SummaryCards = () => {
  const summaryData = [
    {
      title: 'Total Employees',
      value: '50',
      subtitle: 'All employees',
      color: 'gray'
    },
    {
      title: 'Present Today',
      value: '42',
      subtitle: '+5 vs yesterday',
      color: 'green'
    },
    {
      title: 'Absent',
      value: '5',
      subtitle: '-2 vs yesterday',
      color: 'red'
    },
    {
      title: 'On Leave',
      value: '3',
      subtitle: 'No change',
      color: 'yellow'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'green':
        return 'text-green-600';
      case 'red':
        return 'text-red-600';
      case 'yellow':
        return 'text-yellow-600';
      default:
        return 'text-gray-900';
    }
  };

  const getSubtitleColor = (color) => {
    switch (color) {
      case 'green':
        return 'text-green-600';
      case 'red':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{item.title}</p>
              <p className={`text-2xl font-bold ${getColorClasses(item.color)}`}>
                {item.value}
              </p>
              <p className={`text-xs mt-1 ${getSubtitleColor(item.color)}`}>
                {item.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;