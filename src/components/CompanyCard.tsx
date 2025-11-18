import { Building2, MapPin, Users, Calendar, ExternalLink } from 'lucide-react';
import type { Company } from '../types/database';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {company.name}
            </h3>
            <span className="inline-block px-3 py-1 mt-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              {company.industry}
            </span>
          </div>
        </div>
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Visit website"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {company.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4 text-gray-400" />
          <span>{company.employee_count.toLocaleString()} employees</span>
        </div>
        {company.founded_year && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Founded {company.founded_year}</span>
          </div>
        )}
      </div>
    </div>
  );
}
