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
    name: 'Client Actions',
    url: '/dashboard/patients',
    icon: 'icon-people',
    children: [
      // {
      //   name: 'Patient Dashboard',
      //   url: '/dashboard/patients',
      //   icon: 'cui-laptop'
      // },
      {
        name: 'Add Client',
        url: '/dashboard/new-client/',
        icon: 'icon-user-follow'
      },
      {
        name: 'Clients',
        url: '/dashboard/records/',
        icon: 'icon-people',
      },
      {
        name: 'Billing',
        url: '/dashboard/billing',
        icon: 'fa fa-database'
      }        
      // {
      //     name: 'Insurecheck',
      //     url: '/dashboard/patients/insure-check/',
      //     icon: 'icon-magnifier-add',
      // },
      // {
      //   name: 'Triage',
      //   url: '/dashboard/patients/triage/',
      //   icon: 'icon-info'
      // },
      // {
      //   name: 'Treatment',
      //   url: '/dashboard/patients/diagnosis&treatment/',
      //   icon: 'fa fa-heartbeat'
      // }
    ]
  },
  {
    name: 'Appointments',
    icon: 'fa fa-calendar-o',
    children: [
      {
        name: 'create',
        url: '/dashboard/appointments',
        icon: 'fa fa-calendar-plus-o'
      },
      {
        name: 'calendar',
        url: '/dashboard/calendar',
        icon: 'fa fa-calendar-check-o'
      },
      {
        name: 'Meetings',
        url: '/dashboard/appointment-list',
        icon: 'fa fa-list-ol'
      }
      
    ]
  },
  {
    name: 'Rooms',
    icon: 'fa fa-home',
    children: [
      {
        name: 'list',
        url: '/dashboard/rooms/list',
        icon: 'fa fa-list-ol'
      },
      
    ]
  },
  {
    name: 'Claims Checking',
    url: '/dashboard/eclaims-dashboard/checking',
    icon: 'fa fa-list-alt',
  },
  {
    name: 'Inpatient',
    url: '/dashboard/eclaims-dashboard/inpatient',
    icon: 'fa fa-bed',
  },
  {
    name: 'Outpatient',
    url: '/dashboard/eclaims-dashboard/outpatient',
    icon: 'fa fa-share',
  },
  {
    name: 'eClaims',
    url: '/dashboard/eclaims-dashboard',
    icon: 'icon-layers',
    children: [
      {
        name: 'claims',
        url: '/dashboard/eclaims-dashboard/claims',
        icon: 'cui-justify-right'
      },
      {
        name: 'Batch-claims',
        url: '/dashboard/eclaims-dashboard/batching',
        icon: 'fa fa-gift'
      },
      {
        name: 'Batch-list',
        url: '/dashboard/eclaims-dashboard/batch-list',
        icon: 'cui-list'
      }
    ]
  },
  {
    name: 'Payments',
    url: '/dashboard/payments',
    icon: 'icon-wallet',
  },
  {
    name: 'Reports',
    url: '/dashboard/reports',
    icon: 'icon-chart',
  },
  {
    name: 'Setup',
    url: '/dashboard/set-up',
    icon: 'icon-wrench'
    },
];
