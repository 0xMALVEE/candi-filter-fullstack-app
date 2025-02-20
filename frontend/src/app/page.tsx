'use client';

import { CandidateFilters } from '@/components/candidates/CandidateFilters';
import { SelectedCandidates } from '@/components/candidates/SelectedCandidates';
import { CandidateCard } from '@/components/candidates/CandidateCard';
import { useCandidateManagement } from '@/hooks/useCandidateManagement';

export default function Home() {
  const {
    candidates,
    selectedSkills,
    setSelectedSkills,
    selectedRole,
    setSelectedRole,
    selectedCandidates,
    displayCandidates,
    isLoading,
    handleSelectCandidate,
    handleRemoveCandidate
  } = useCandidateManagement();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-gray-600">Loading...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            Candidate Selection Tool
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        <CandidateFilters
          candidates={candidates}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />

        <SelectedCandidates
          selectedCandidates={selectedCandidates}
          onRemove={handleRemoveCandidate}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCandidates.map((candidate, index) => (
            <CandidateCard
              key={`display-${candidate.email}-${index}`}
              candidate={candidate}
              isSelected={selectedCandidates.some(c => c.email === candidate.email)}
              onSelect={handleSelectCandidate}
              disabled={selectedCandidates.length >= 5 || selectedCandidates.some(c => c.email === candidate.email)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
