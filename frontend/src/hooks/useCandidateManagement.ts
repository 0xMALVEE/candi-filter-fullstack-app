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

  const { data: filteredBySkills = [] } = useQuery({
    queryKey: ['candidates', 'skills', selectedSkills],
    queryFn: () => getCandidatesBySkills(selectedSkills),
    enabled: selectedSkills.length > 0
  });

  const { data: filteredByExperience = [] } = useQuery({
    queryKey: ['candidates', 'experience', selectedRole],
    queryFn: () => getCandidatesByExperience(selectedRole),
    enabled: !!selectedRole
  });

  const handleSelectCandidate = (candidate: Candidate) => {
    if (selectedCandidates.length < 5 && !selectedCandidates.some(c => c.email === candidate.email)) {
      setSelectedCandidates([...selectedCandidates, candidate]);
    }
  };

  const handleRemoveCandidate = (email: string) => {
    setSelectedCandidates(selectedCandidates.filter(c => c.email !== email));
  };

  const displayCandidates = filteredBySkills.length > 0 
    ? filteredBySkills 
    : filteredByExperience.length > 0 
    ? filteredByExperience 
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