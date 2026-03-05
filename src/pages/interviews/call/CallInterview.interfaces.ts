export interface InterviewDetail {
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
  questions: Question[];
}

export interface Question {
  id: string;
  questionText: string;
  orderNumber: number;
  isDone?: boolean;
}

export interface CameraState {
  message: string;
  errorCode: string | null;
}

export type InterviewState = 'INTRO' | 'QUESTION' | 'END';
