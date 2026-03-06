export interface CandidateInterview {
  candidateId: string;
  name: string;
  startedAt: string;
  status?: string; // No Status, Not Selected, Potential, Selected (belum ada response nya di BE (06/03/2026) jadi masih mengikuti response yang ada di BE dulu)
}

export interface OverallScore {
  id: string;
  name: string;
  communicationScore: number;
  overallScore: number;
  summary: string;
}
