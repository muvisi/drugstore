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
        name: 'Patient Services',
        url: '/dashboard/patients/services',
        icon: 'icon-notebook'
      },
      {
        name: 'Add Patient',
        url: '/dashboard/patients/new-patient/',
        icon: 'icon-user-follow'
      },
      {
        name: 'Triage',
        url: '/dashboard/patients/triage/',
        icon: 'icon-info'
      },
      {
        name: 'Diagnosis & Treatment',
        url: '/dashboard/patients/diagnosis&treatment/',
        icon: 'icon-hourglass'
      },
       {
        name: 'Make Payments',
        url: '/dashboard/patients/patient-list',
        icon: 'icon-wallet',
      },
    ]
  },
  {
    name: 'Pharmacy',
    url: '/dashboard/pharmacy',
    icon: 'fa fa-medkit',
  },
  {
    name: 'Insurecheck',
    url: '/dashboard/patients/insure-check/',
    icon: 'icon-magnifier-add',
},
  {
    name: 'eClaims',
    url: '/dashboard/eclaims-dashboard',
    icon: 'icon-layers',
    // children: [
    //   {
    //     name: 'claims',
    //     url: '/dashboard/eclaims-dashboard/claims',
    //     icon: 'cui-justify-right'
    //   },
    //   {
    //     name: 'Batch-claims',
    //     url: '/dashboard/eclaims-dashboard/batching',
    //     icon: 'fa fa-gift'
    //   },
    //   {
    //     name: 'Batch-list',
    //     url: '/dashboard/eclaims-dashboard/batch-list',
    //     icon: 'cui-list'
    //   }
    // ]
  },
  {
    name: 'Lab',
    url: '/dashboard/lab',
    icon: 'icon-chemistry',
  },

  {
    name: 'Stock',
    url: '/dashboard/stock-level',
    icon: 'icon-magnifier-add',
  },
  {
    name: 'Setup',
    url: '/dashboard/set-up',
    icon: 'icon-wrench'
    },
];
