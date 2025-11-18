import { LayoutGrid, Table } from 'lucide-react';

interface ViewToggleProps {
  view: 'cards' | 'table';
  onViewChange: (view: 'cards' | 'table') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onViewChange('cards')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
          view === 'cards'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label="Card view"
      >
        <LayoutGrid className="w-4 h-4" />
        Cards
      </button>
      <button
        onClick={() => onViewChange('table')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
          view === 'table'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label="Table view"
      >
        <Table className="w-4 h-4" />
        Table
      </button>
    </div>
  );
}
