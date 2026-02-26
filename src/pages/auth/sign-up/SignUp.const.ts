import type { FormOption } from '@/components/Form/Form.interfaces';

export const roleOptions: FormOption[] = [
  {
    label: 'Admin',
    value: 'ADMIN',
  },
  {
    label: 'Interviewer',
    value: 'INTERVIEWER',
  },
  {
    label: 'Candidate',
    value: 'CANDIDATE',
  },
];
