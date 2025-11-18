import { supabase } from '../lib/supabase';
import type { Company, CompanyFilters, SortField, SortOrder } from '../types/database';

const ITEMS_PER_PAGE = 10;

export interface FetchCompaniesParams {
  page: number;
  filters: CompanyFilters;
  sortField: SortField;
  sortOrder: SortOrder;
}

export interface FetchCompaniesResult {
  data: Company[];
  total: number;
  page: number;
  totalPages: number;
}

export const companyService = {
  async fetchCompanies({
    page,
    filters,
    sortField,
    sortOrder,
  }: FetchCompaniesParams): Promise<FetchCompaniesResult> {
    let query = supabase.from('companies').select('*', { count: 'exact' });

    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    if (filters.industry) {
      query = query.eq('industry', filters.industry);
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return {
      data: data || [],
      total,
      page,
      totalPages,
    };
  },

  async getUniqueIndustries(): Promise<string[]> {
    const { data, error } = await supabase
      .from('companies')
      .select('industry')
      .order('industry');

    if (error) {
      throw error;
    }

    const industries = [...new Set((data ??[]).map((item: any) => item.industry))];
    return industries;
  },

  async getUniqueLocations(): Promise<string[]> {
    const { data, error } = await supabase
      .from('companies')
      .select('location')
      .order('location');

    if (error) {
      throw error;
    }

    const locations = [...new Set((data ?? []).map((item: any) => item.location))];
    return locations;
  },
};
