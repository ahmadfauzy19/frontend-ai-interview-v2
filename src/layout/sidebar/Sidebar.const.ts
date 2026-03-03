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
];
