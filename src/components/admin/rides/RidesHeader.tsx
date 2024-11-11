import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

interface RidesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
  isExporting: boolean;
}

export function RidesHeader({ 
  searchTerm, 
  onSearchChange, 
  onExport, 
  isExporting 
}: RidesHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Rides Management</h2>
        <div className="flex space-x-4">
          <button
            onClick={onExport}
            disabled={isExporting}
            className="btn-primary flex items-center"
          >
            <Download className="h-5 w-5 mr-2" />
            {isExporting ? 'Exporting...' : 'Export Data'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search rides..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
              />
            </div>
            <button className="btn-secondary flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}