export interface CandidateAnswer {
  name: string;
  totalScore: number | null;
  recommendation: string | null;
  summaryReason: string | null;
  answers: Answer[];
}

export interface Answer {
  participantId: string;
  questionId: string;
  questionText: string;
  questionNumber: number;
  answerTranscript: string;
  videoUrl: string;
  technicalFundamentalScore: number | null;
  problemSolvingScore: number | null;
  communicationScore: number | null;
  fileName: string;
  isValidated: boolean;
}
