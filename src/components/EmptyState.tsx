import { Building2 } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className="bg-gray-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Building2 className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No companies found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filters to see more results.
        </p>
      </div>
    </div>
  );
}
