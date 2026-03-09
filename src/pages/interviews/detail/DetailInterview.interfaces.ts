export interface CandidateInterview {
  candidateId: string;
  name: string;
  startedAt: string;
  status?: string; // No Status, Not Selected, Potential, Selected (belum ada response nya di BE (06/03/2026) jadi masih mengikuti response yang ada di BE dulu)
}

export interface DetailInterview {
  id: string;
  name: string;
  context: string;
  objective: string;
  roleTarget: string;
  levelTarget: string;
  technology: string;
  purpose: string;
  status: string;
  createdBy: string;
  createdAt: string;
  isAnswered: boolean | null;
  questions: InterviewQuestion[];
}

export interface InterviewQuestion {
  id: string;
  questionText: string;
  orderNumber: number;
}

export interface OverallScore {
  id: string;
  name: string;
  communicationScore: number;
  overallScore: number;
  summary: string;
}
