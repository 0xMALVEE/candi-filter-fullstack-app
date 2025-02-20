import { Candidate } from '@/types/candidate';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected?: boolean;
  onSelect?: (candidate: Candidate) => void;
  disabled?: boolean;
}

export function CandidateCard({ candidate, isSelected, onSelect, disabled }: CandidateCardProps) {
  const latestExperience = candidate.work_experiences[0];
  const highestDegree = candidate.education.degrees.find(
    (d) => d.degree === candidate.education.highest_level
  );

  return (
    <div
      className={`relative bg-white rounded-lg p-6 border transition-all ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-200'
          : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {candidate.name}
            </h3>
            <button
              onClick={() => onSelect?.(candidate)}
              disabled={disabled}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isSelected
                  ? 'bg-blue-100 text-blue-700'
                  : disabled 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">{candidate.location}</p>
          
          {latestExperience && (
            <p className="mt-2 text-sm text-gray-600">
              {latestExperience.roleName} at {latestExperience.company}
            </p>
          )}
          
          {highestDegree && (
            <p className="mt-1 text-sm text-gray-600">
              {highestDegree.degree} in {highestDegree.subject}
              {highestDegree.isTop50 && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-600">
                  Top 50
                </span>
              )}
            </p>
          )}

          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 5).map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
                >
                  {skill}
                </span>
              ))}
              {candidate.skills.length > 5 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                  +{candidate.skills.length - 5}
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Submitted {new Date(candidate.submitted_at).toLocaleDateString()}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {candidate.annual_salary_expectation['full-time']}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 