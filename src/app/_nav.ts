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
    name: 'Patient Actions',
    url: '/dashboard/patients',
    icon: 'icon-people',
    children: [
      {
        name: 'Patient Dashboard',
        url: '/dashboard/patients',
        icon: 'cui-laptop'
      },
      {
        name: 'Add Patient',
        url: '/dashboard/patients/new-patient/',
        icon: 'icon-user-follow'
      },
      {
        name: 'Patients List',
        url: '/dashboard/patients/records/',
        icon: 'fa fa-users'
      },
      {
        name: 'Billing',
        url: '/dashboard/patients/billing',
        icon: 'fa fa-database'
      },          
      {
          name: 'Insurecheck',
          url: '/dashboard/patients/insure-check/',
          icon: 'icon-magnifier-add',
      },
      {
        name: 'Triage',
        url: '/dashboard/patients/triage/',
        icon: 'icon-info'
      },
      {
        name: 'Treatment',
        url: '/dashboard/patients/diagnosis&treatment/',
        icon: 'fa fa-heartbeat'
      },
      {
        name: 'Record',
        url: '/dashboard/records-list',
        icon: 'fa fa-list',
      },
       {
        name: 'Calendar',
        url: '/dashboard/patients/appointments',
        icon: 'cui-calendar',
      },
    ]
  },
  {
    name: 'Pharmacy',
    url: '/dashboard/pharmacy',
    icon: 'fa fa-medkit',
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
    name: 'Pharmacy Stock',
    url: '/dashboard/stock-level',
    icon: 'icon-social-dropbox',
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
