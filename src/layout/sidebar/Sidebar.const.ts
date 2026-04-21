import type { SidebarMenuInterface } from './Sidebar.interface';

export const SidebarMenu: SidebarMenuInterface[] = [
  {
    title: 'Interviews',
    path: '/interviews',
    icon: 'solar:play-circle-linear',
    hidden: false,
  },
  {
    title: 'Detail Interview',
    path: '/interviews/:id',
    icon: '',
    hidden: true,
  },
  {
    title: 'Edit Interview',
    path: '/interviews/:id/edit',
    icon: '',
    hidden: true,
  },
  {
    title: 'Detail Interview',
    path: '/interviews/:id/answer/:userId',
    icon: '',
    hidden: true,
  },
  {
    title: 'Monitoring',
    path: '/monitoring',
    icon: 'mdi:chart-areaspline',
    hidden: false,
    roles: ['ADMIN', 'INTERVIEWER', 'CANDIDATE'],
  },
  {
    title: 'Results Answer',
    path: '/results',
    icon: 'mdi:chart-bar',
    hidden: false,
    roles: ['CANDIDATE'],
  }
];
