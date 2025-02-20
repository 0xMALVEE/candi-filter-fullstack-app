import { uniqueArrayValues } from '@/utils/array';
import { Candidate } from '@/types/candidate';

interface CandidateFiltersProps {
  candidates: Candidate[];
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

export function CandidateFilters({
  candidates,
  selectedSkills,
  setSelectedSkills,
  selectedRole,
  setSelectedRole
}: CandidateFiltersProps) {
  const uniqueSkills = uniqueArrayValues(candidates.flatMap(c => c.skills));
  const uniqueRoles = uniqueArrayValues(candidates.flatMap(c => c.work_experiences.map(e => e.roleName)));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Filter by Skills
        </h2>
        <select
          multiple
          value={selectedSkills}
          onChange={(e) => setSelectedSkills(Array.from(e.target.selectedOptions, option => option.value))}
          className="w-full h-48 rounded-lg border border-gray-200 bg-white text-gray-700
            focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200
            shadow-sm"
        >
          {uniqueSkills.map(skill => (
            <option key={skill} value={skill} className="py-2 px-3">{skill}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Filter by Role
        </h2>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white text-gray-700 py-3 px-4
            focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200
            shadow-sm"
        >
          <option value="">Select a role</option>
          {uniqueRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>
    </div>
  );
} 