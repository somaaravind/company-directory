import { useState, useEffect, useCallback } from 'react';
import { companyService } from '../services/CompanyService';
import type {
  Company,
  CompanyFilters,
  SortField,
  SortOrder,
} from '../types/database';

interface UseCompaniesResult {
  companies: Company[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  total: number;
  filters: CompanyFilters;
  sortField: SortField;
  sortOrder: SortOrder;
  industries: string[];
  locations: string[];
  setPage: (page: number) => void;
  setFilters: (filters: CompanyFilters) => void;
  setSort: (field: SortField, order: SortOrder) => void;
  refetch: () => void;
}

export function useCompanies(): UseCompaniesResult {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<CompanyFilters>({
    search: '',
    industry: '',
    location: '',
  });
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [industries, setIndustries] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await companyService.fetchCompanies({
        page,
        filters,
        sortField,
        sortOrder,
      });

      setCompanies(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  }, [page, filters, sortField, sortOrder]);

  const fetchFilterOptions = useCallback(async () => {
    try {
      const [industriesData, locationsData] = await Promise.all([
        companyService.getUniqueIndustries(),
        companyService.getUniqueLocations(),
      ]);

      setIndustries(industriesData);
      setLocations(locationsData);
    } catch (err) {
      console.error('Failed to fetch filter options:', err);
    }
  }, []);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleFiltersChange = (newFilters: CompanyFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSort = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
    setPage(1);
  };

  return {
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
    setFilters: handleFiltersChange,
    setSort: handleSort,
    refetch: fetchCompanies,
  };
}
