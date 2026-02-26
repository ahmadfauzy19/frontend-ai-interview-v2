export interface InterviewForm {
  name: string;
  context: string;
  objective: string;
  purpose: string;
  createdBy: string;
  roleTarget: string;
  levelTarget: string;
  technology: string;
  number: number;
}

export interface Interviews {
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
}
