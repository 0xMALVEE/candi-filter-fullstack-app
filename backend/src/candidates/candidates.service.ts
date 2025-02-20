import { Injectable } from '@nestjs/common';
import { Candidate } from '../types/candidate.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CandidatesService {
  private candidates: Candidate[];

  constructor() {
    const dataPath = path.join(__dirname, '../../data/data.json');
    this.candidates = JSON.parse(
      fs.readFileSync(dataPath, 'utf8'),
    ) as Candidate[];
  }

  findAll(): Candidate[] {
    return this.candidates;
  }

  findBySkills(skills: string[]): Candidate[] {
    return this.candidates.filter((candidate) =>
      skills.every((skill) => candidate.skills.includes(skill)),
    );
  }

  findByExperience(role: string): Candidate[] {
    return this.candidates.filter((candidate) =>
      candidate.work_experiences.some((exp) =>
        exp.roleName.toLowerCase().includes(role.toLowerCase()),
      ),
    );
  }
}
