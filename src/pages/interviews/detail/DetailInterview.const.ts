import type { FormOption } from '@/components/Form/Form.interfaces';
import type {
  DetailInterview,
  OverallScore,
} from './DetailInterview.interfaces';

export const filterOptions: FormOption[] = [
  {
    label: 'All',
    value: 'ALl',
  },
  {
    label: 'No Status',
    value: 'No Status',
  },
  {
    label: 'Not Selected',
    value: 'Not Selected',
  },
  {
    label: 'Potential',
    value: 'Potential',
  },
  {
    label: 'Selected',
    value: 'Selected',
  },
];

export const dummyUserReponse: DetailInterview[] = [
  {
    id: '1',
    name: 'John Doe',
    interviewTime: '02-03-2026 10:35',
    status: 'Selected',
  },
];

export const dummyOverall: OverallScore[] = [
  {
    id: '1',
    name: 'John Doe',
    communicationScore: 5,
    overallScore: 5,
    summary: 'This is a summary',
  },
];
