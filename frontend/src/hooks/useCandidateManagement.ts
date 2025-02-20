import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCandidates, getCandidatesBySkills, getCandidatesByExperience } from '@/api/candidates';
import { Candidate } from '@/types/candidate';

export function useCandidateManagement() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);

  const { data: candidates = [], isLoading } = useQuery({
    queryKey: ['candidates'],
    queryFn: getCandidates
  });

  const { data: filteredCandidates = [] } = useQuery({
    queryKey: ['candidates', 'filtered', selectedSkills, selectedRole],
    queryFn: async () => {
      let results = candidates;
      
      if (selectedSkills.length > 0) {
        results = await getCandidatesBySkills(selectedSkills);
      }
      
      if (selectedRole) {
        const candidatesToFilter = selectedSkills.length > 0 ? results : candidates;
        const roleFiltered = await getCandidatesByExperience(selectedRole);
        results = candidatesToFilter.filter(c => 
          roleFiltered.some(rc => rc.email === c.email)
        );
      }
      
      return results;
    },
    enabled: candidates.length > 0 && (selectedSkills.length > 0 || !!selectedRole)
  });

  const handleSelectCandidate = (candidate: Candidate) => {
    if (selectedCandidates.length < 5 && !selectedCandidates.some(c => c.email === candidate.email)) {
      setSelectedCandidates([...selectedCandidates, candidate]);
    }
  };

  const handleRemoveCandidate = (email: string) => {
    setSelectedCandidates(selectedCandidates.filter(c => c.email !== email));
  };

  const displayCandidates = (selectedSkills.length > 0 || selectedRole) 
    ? filteredCandidates 
    : candidates;

  return {
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
  };
} 