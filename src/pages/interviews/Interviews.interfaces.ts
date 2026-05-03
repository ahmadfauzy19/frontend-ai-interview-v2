export interface InterviewForm {
  name: string;
  description: string;
  companyNamePartner: string;
  context: string;
  objective: string;
  purpose: string;
  createdBy: string;
  roleTarget: string;
  levelTarget: string;
  technology: string;
  number: number;
  language: string;
}

export interface Interviews {
  id: string;
  name: string;
  description: string;
  companyNamePartner: string;
  context: string;
  objective: string;
  roleTarget: string;
  levelTarget: string;
  technology: string;
  purpose: string;
  status: string;
  createdBy: string;
  createdAt: string;
  isAnswered: boolean;
  isEditable: boolean;
  language: string;
}
