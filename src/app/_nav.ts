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
    name: 'Available Rooms',
    url: '/dashboard/rooms-available/',
    icon: 'fa fa-university',
  
  },


  {
    name: 'Rooms Set-Up',
    icon: 'fa fa-tag',
    url: '/dashboard/Room-set-up/',
  },



  {
    name: 'Clients bookings',
    icon: 'fa fa-bed',
    url: '/dashboard/clients-bookings/',
  },
  // {
  //   name: 'Claim Forms',
  //   url: '/dashboard/InsuranceclaimsForm',
  //   icon: 'fa fa-print',
  // },
  // {
  //   name: 'Calendar',
  //   url: '/dashboard/calendar',
  //   icon: 'fa fa-calendar-check-o',
  // },
  
  // {
  //   name: 'Clients',
  //   url: '/dashboard/records',
  //   icon: 'icon-people',
  // },
 

 


  // {
  //   name: 'Mpesa',
  //   url: '/dashboard/mpesa-payments',
  //   icon: 'fas fa-credit-card',
  // },
  
  // {
  //   name: 'Feedback',
  //   url: '/dashboard/feedbacks',
  //   icon: 'fas fa-comment',
  // },


  // {
    
  //   name: 'Feedback Reports',
  //   url: '/dashboard/Feedback-graphs',
  //   icon: 'fa fa-bar-chart',
  // },

  // {
  //   name: 'Covid Reports',
  //   url: '/dashboard/reports',
  //   icon: 'fa fa-line-chart',
  // },
  // {
  //   name: 'Patients Upload',
  //   url: '/dashboard/patients-upload',
  //   icon: 'fa fa-upload',
  // }

  
  
 
];





export const navItemscashiers: NavData[] = [
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
    name: 'Claim Forms',
    url: '/dashboard/InsuranceclaimsForm',
    icon: 'fa fa-print',
  },

  // {
  //   name: 'Bookings',
  //   icon: 'fa fa-calendar-o',
  //   url: '/dashboard/booking',
  // },
  // {
  //   name: 'Calendar',
  //   url: '/dashboard/calendar',
  //   icon: 'fa fa-calendar-check-o',
  // },
  
  // {
  //   name: 'Clients',
  //   url: '/dashboard/records',
  //   icon: 'icon-people',
  // },
 
 
 

  // {
  //   name: 'Mpesa',
  //   url: '/dashboard/payments',
  //   icon: 'fas fa-credit-card',
  // },


  // {
  //   name: 'Covid Reports',
  //   url: '/dashboard/reports',
  //   icon: 'fa fa-line-chart',
  // }


  
  
 
];


export const navItemsnursesdocs: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Main'
  },

  // {
  //   name: 'Bookings',
  //   icon: 'fa fa-calendar-o',
  //   url: '/dashboard/booking',
  // },

  // {
  //   name: 'Maternity',
  //   icon: 'fa fa-h-square',
  //   url: '/dashboard/view-maternity-booking',
  // },

  // {
  //   name: 'Calendar',
  //   url: '/dashboard/calendar',
  //   icon: 'fa fa-calendar-check-o',
  // },
  
 
 




  // {
  //   name: 'Covid Reports',
  //   url: '/dashboard/reports',
  //   icon: 'fa fa-line-chart',
  // }


  
  
 
];



// export const navItemsfinance: NavData[] = [
//   {
//     name: 'Dashboard',
//     url: '/dashboard',
//     icon: 'icon-speedometer'
//   },
//   {
//     title: true,
//     name: 'Main'
//   },

//   {
//     name: 'Claim Forms',
//     url: '/dashboard/InsuranceclaimsForm',
//     icon: 'fa fa-print',
//   },

  
  
 
// ];



// export const navItemscustomerservice: NavData[] = [
//   {
//     name: 'Dashboard',
//     url: '/dashboard',
//     icon: 'icon-speedometer'
//   },
//   {
//     title: true,
//     name: 'Main'
//   },
//   {
//     name: 'SMS Links',
//     url: '/dashboard/registration-link',
//     icon: 'fas fa-address-book',
  
//   },


//   {
//     name: 'Bookings',
//     icon: 'fa fa-calendar-o',
//     url: '/dashboard/booking',
//   },

//   {
//     name: 'Calendar',
//     url: '/dashboard/calendar',
//     icon: 'fa fa-calendar-check-o',
//   },
  
//   {
//     name: 'Clients',
//     url: '/dashboard/records',
//     icon: 'icon-people',
//   },
 

 

//    {
//     //  <div>
//     name: 'Feedback',
//     url: '/dashboard/feedbacks',
//     icon: 'fas fa-comment',
//     // </div>
//   },

//   {
//     name: 'Clients Insight',
//     url: '/dashboard/patients-reports',
//     icon: 'fa fa-folder-open',
//   },
  
//   // {
//   //   name: 'Clients Birthday',
//   //   url: '/dashboard/birthday-Messanges',
//   //   icon: 'fas fa-paper-plane',
 
//   // },

//   {
    
//     name: 'Feedback Graphs',
//     url: '/dashboard/Feedback-graphs',
//     icon: 'fa fa-bar-chart',
//   },

//   {
//     name: 'Covid Reports',
//     url: '/dashboard/reports',
//     icon: 'fa fa-line-chart',
//   },

//   {
//     name: 'Patients Upload',
//     url: '/dashboard/patients-upload',
//     icon: 'fa fa-upload',
//   }
  
  
 
// ];


// export const navItemsmanagement: NavData[] = [
//   {
//     name: 'Dashboard',
//     url: '/dashboard',
//     icon: 'icon-speedometer'
//   },
//   {
//     title: true,
//     name: 'Main'
//   },


//   {
//     name: 'Calendar',
//     url: '/dashboard/calendar',
//     icon: 'fa fa-calendar-check-o',
//   },
  
 
 

 

//    {
//     //  <div>
//     name: 'Feedback',
//     url: '/dashboard/feedbacks',
//     icon: 'fas fa-comment',
//     // </div>
//   },

//   {
//     name: 'Clients Insight',
//     url: '/dashboard/patients-reports',
//     icon: 'fa fa-folder-open',
//   },
  
 

//   {
    
//     name: 'Feedback Graphs',
//     url: '/dashboard/Feedback-graphs',
//     icon: 'fa fa-bar-chart',
//   },

//   {
//     name: 'Covid Reports',
//     url: '/dashboard/reports',
//     icon: 'fa fa-line-chart',
//   },
//   {
//     name: 'Patients Upload',
//     url: '/dashboard/patients-upload',
//     icon: 'fa fa-upload',
//   }


  
  
 
// ];





