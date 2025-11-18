export interface Database {
  public: {
    Tables: {
      companies: {
        Row: Company;
        Insert: Omit<Company, 'id' | 'created_at'>;
        Update: Partial<Omit<Company, 'id' | 'created_at'>>;
      };
    };
  };
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employee_count: number;
  founded_year: number | null;
  description: string;
  website: string;
  created_at: string;
}

export type SortField = 'name' | 'industry' | 'location' | 'employee_count' | 'founded_year';
export type SortOrder = 'asc' | 'desc';

export interface CompanyFilters {
  search: string;
  industry: string;
  location: string;
}
