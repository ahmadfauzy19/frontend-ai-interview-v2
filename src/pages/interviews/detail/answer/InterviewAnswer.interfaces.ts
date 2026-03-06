export interface CandidateAnswer {
  name: string;
  totalScore: number | null;
  finalRecommendation: string | null;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  questionText: string;
  answerTranscript: string;
  videoUrl: string;
  score: number | null;
  fileName: string;
}
