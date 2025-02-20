import { Controller, Get, Query } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { Candidate } from '../types/candidate.interface';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get()
  findAll(): Candidate[] {
    return this.candidatesService.findAll();
  }

  @Get('by-skills')
  findBySkills(@Query('skills') skills: string): Candidate[] {
    const skillsArray = skills.split(',');
    return this.candidatesService.findBySkills(skillsArray);
  }

  @Get('by-experience')
  findByExperience(@Query('role') role: string): Candidate[] {
    return this.candidatesService.findByExperience(role);
  }
}
