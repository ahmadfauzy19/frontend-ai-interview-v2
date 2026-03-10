import type { FormOption } from '@/components/Form/Form.interfaces';
// import type { OverallScore } from './DetailInterview.interfaces';

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

// export const dummyOverall: OverallScore[] = [
//   {
//     candidateId: '1',
//     name: 'John Doe',
//     communicationScore: 5,
//     overallScore: 5,
//     summary: 'This is a summary',
//   },
// ];
