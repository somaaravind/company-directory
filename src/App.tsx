import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { useCompanies } from './hooks/UseCompanies';
import { FilterBar } from './components/FilterBar';
import { SortControls } from './components/SortControls';
import { ViewToggle } from './components/ViewToggle';
import { CompanyCard } from './components/CompanyCard';
import { CompanyTable } from './components/CompanyTable';
import { Pagination } from './components/Pagination';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';

function App() {
  const [view, setView] = useState<'cards' | 'table'>('cards');
  const {
    companies,
    loading,
    error,
    page,
    totalPages,
    total,
    filters,
    sortField,
    sortOrder,
    industries,
    locations,
    setPage,
    setFilters,
    setSort,
    refetch,
  } = useCompanies();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-lg shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Companies Directory
                </h1>
                <p className="text-gray-600 mt-1">
                  Discover and explore leading companies
                </p>
              </div>
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          industries={industries}
          locations={locations}
        />

        <SortControls
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={setSort}
        />

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : companies.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {view === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="mb-6">
                <CompanyTable companies={companies} />
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalItems={total}
                itemsPerPage={10}
              />
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2024 Companies Directory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
