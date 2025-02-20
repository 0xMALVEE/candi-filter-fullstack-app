export interface Candidate {
  name: string;
  email: string;
  phone: string | null;
  location: string;
  submitted_at: string;
  work_availability: string[];
  annual_salary_expectation: {
    'full-time': string;
  };
  work_experiences: {
    company: string;
    roleName: string;
  }[];
  education: {
    highest_level: string;
    degrees: {
      degree: string;
      subject: string;
      school: string;
      gpa: string;
      startDate: string;
      endDate: string;
      originalSchool: string;
      isTop50: boolean;
    }[];
  };
  skills: string[];
}
