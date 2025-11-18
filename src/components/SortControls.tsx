import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { SortField, SortOrder } from '../types/database';

interface SortControlsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
}

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'name', label: 'Company Name' },
  { value: 'industry', label: 'Industry' },
  { value: 'location', label: 'Location' },
  { value: 'employee_count', label: 'Employee Count' },
  { value: 'founded_year', label: 'Founded Year' },
];

export function SortControls({
  sortField,
  sortOrder,
  onSortChange,
}: SortControlsProps) {
  const handleFieldChange = (field: SortField) => {
    onSortChange(field, sortOrder);
  };

  const toggleSortOrder = () => {
    onSortChange(sortField, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ArrowUpDown className="w-4 h-4" />
          Sort by:
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFieldChange(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortField === option.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleSortOrder}
          className="ml-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-all flex items-center gap-2"
          title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        >
          {sortOrder === 'asc' ? (
            <>
              <ArrowUp className="w-4 h-4" />
              Ascending
            </>
          ) : (
            <>
              <ArrowDown className="w-4 h-4" />
              Descending
            </>
          )}
        </button>
      </div>
    </div>
  );
}
