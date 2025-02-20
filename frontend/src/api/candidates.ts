import axios from 'axios';
import { Candidate } from '../types/candidate';

const API_URL = 'http://localhost:3001';

export const getCandidates = async (): Promise<Candidate[]> => {
  const { data } = await axios.get(`${API_URL}/candidates`);
  return data;
};

export const getCandidatesBySkills = async (skills: string[]): Promise<Candidate[]> => {
  const { data } = await axios.get(`${API_URL}/candidates/by-skills?skills=${skills.join(',')}`);
  return data;
};

export const getCandidatesByExperience = async (role: string): Promise<Candidate[]> => {
  const { data } = await axios.get(`${API_URL}/candidates/by-experience?role=${role}`);
  return data;
};

export const getTopEducatedCandidates = async (): Promise<Candidate[]> => {
  const { data } = await axios.get(`${API_URL}/candidates/top-educated`);
  return data;
}; 