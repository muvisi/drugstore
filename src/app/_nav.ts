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
    name: 'SMS Links',
    url: '/dashboard/registration-link',
    icon: 'fas fa-address-book',
  
  },


  {
    name: 'Bookings',
    icon: 'fa fa-calendar-o',
    url: '/dashboard/booking',
  },
  {
    name: 'Claim Forms',
    url: '/dashboard/InsuranceclaimsForm',
    icon: 'fa fa-print',
  },
  {
    name: 'Calendar',
    url: '/dashboard/calendar',
    icon: 'fa fa-calendar-check-o',
  },
  
  {
    name: 'Clients',
    url: '/dashboard/records',
    icon: 'icon-people',
  },
 

 

   {
    name: 'Feedback',
    url: '/dashboard/feedbacks',
    icon: 'fas fa-comment',
  },
  {
    name: 'Mpesa',
    url: '/dashboard/payments',
    icon: 'fas fa-credit-card',
  },
  {
    name: 'Clients Insight',
    url: '/dashboard/patients-reports',
    icon: 'fa fa-folder-open',
  },
  
  {
    name: 'Clients Birthday',
    url: '/dashboard/birthday-Messanges',
    icon: 'fas fa-paper-plane',
 
  },

  {
    name: 'Feedback Graphs',
    url: '/dashboard/Feedback-graphs',
    icon: 'fa fa-bar-chart',
  },

  {
    name: 'Covid Reports',
    url: '/dashboard/reports',
    icon: 'fa fa-line-chart',
  }


  
  
 
];
