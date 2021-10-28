interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Main'
  },
 
  {
    name: 'Booking',
    icon: 'fa fa-calendar-o',
    url: '/dashboard/booking',
  },

  {
    name: 'Report',
    url: '/dashboard/report',
    icon: 'icon-chart',
  },
  {
    name: 'Staff',
    url: '/dashboard/staff',
    icon: 'icon-user-following',
  }
];
