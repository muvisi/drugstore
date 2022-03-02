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
    name: 'Register Link',
    url: '/dashboard/registration-link',
    icon: 'fas fa-address-book',
  
  },

  {
    name: 'Bookings',
    icon: 'fa fa-calendar-o',
    url: '/dashboard/booking',
  },
  {
    name: 'Print Forms',
    url: '/dashboard/InsuranceclaimsForm',
    icon: 'fa fa-folder-open',
  },
  {
    name: 'Calendar',
    url: '/dashboard/specialty',
    icon: 'fa fa-calendar-check-o',
  },
  
  {
    name: 'Clients',
    url: '/dashboard/records',
    icon: 'icon-people',
  },
  // {
  //   name: 'Calendar',
  //   url: '/dashboard/calendar',
  //   icon: 'fa fa-calendar-check-o',
  // },
 

  {
    name: 'Covid Report',
    url: '/dashboard/reports',
    icon: 'fa fa-line-chart',
  },
  
  // {
  //   name: 'Clinic-Setup',
  //   url: '/dashboard/clinic-setup',
  //   icon: 'fa fa-thermometer-half',
  // },
  // {
  //   name: 'Bookings Report',
  //   url: '/dashboard/queuereports',
  //   icon: 'icon-chart',
  // },

  // {
  //   name: 'Vaccine Setup',
  //   url: '/dashboard/vaccine-setup',
  //   icon: 'fas fa-syringe',
  // },

   {
    name: 'Feedbacks',
    url: '/dashboard/feedbacks',
    icon: 'fas fa-comment',
  },
  
  // {
  //   name: 'Time Slot Setup',
  //   url: '/dashboard/timeslot',
  //   icon: 'fas fa-address-book',
  
  // },
  // {
  //   name: 'Payments',
  //   url: '/dashboard/payments',
  //   icon: 'icon-wallet',
  
  // }

  // {
  //   name: 'Vaccine Setup',
  //   url: '/dashboard/vaccine-setup',
  //   icon: 'fas fa-syringe',
  // },
  // {
  //   name: 'Time Slot Setup',
  //   url: '/dashboard/timeslot',
  //   icon: 'fas fa-address-book',
  
  // },
  // {
  //   name: 'Payments',
  //   url: '/dashboard/payments',
  //   icon: 'icon-wallet',
  
  // }
  
 
];
