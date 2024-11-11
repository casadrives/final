import React from 'react';
import { HardDrive } from 'lucide-react';

function StorageBar() {
  const storageTypes = [
    { type: 'Documents', size: '25.5 GB', color: 'bg-blue-500', percentage: 30 },
    { type: 'Media', size: '32.8 GB', color: 'bg-purple-500', percentage: 40 },
    { type: 'Other', size: '17.2 GB', color: 'bg-gray-500', percentage: 20 },
  ];

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <HardDrive className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Storage Overview</h2>
        </div>
        <span className="text-sm text-gray-500">75.5 GB of 100 GB used</span>
      </div>

      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
        {storageTypes.map((item, index) => (
          <div
            key={item.type}
            style={{ width: \`\${item.percentage}%\` }}
            className={\`h-full \${item.color} \${
              index > 0 ? '-mt-4' : ''
            }\`}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {storageTypes.map((item) => (
          <div key={item.type} className="text-center">
            <div className={\`h-3 w-3 rounded-full \${item.color} mx-auto mb-2\`} />
            <p className="text-sm font-medium text-gray-900">{item.type}</p>
            <p className="text-sm text-gray-500">{item.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StorageBar;