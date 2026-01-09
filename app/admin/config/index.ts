import image1 from '../assets/Ellipse-4.png';
import image2 from '../assets/Ellipse-6.png';

export const DashboardStats = [
  {
    title: 'Total Properties',
    value: '2,092',
    percentage: 12.3
  },
  {
    title: 'Booked Tours',
    value: '1,313',
    percentage: 12.3
  },
  {
    title: 'Total Users',
    value: '1,092',
    percentage: 5.3
  },
  {
    title: 'Total Revenue',
    value: '$2,092',
    percentage: 8.3
  }
];

export const DashboardMessages = [
  {
    senderName: 'Dieli Doe',
    senderPhoto: image1,
    content: 'I would like to lay a complaint...',
    timeStamp: 'Today'
  },
  {
    senderName: 'John Doe',
    senderPhoto: image2,
    content: 'I am interested in the property you listed.',
    timeStamp: 'Yesterday'
  },
  {
    senderName: 'Dieli Doe',
    senderPhoto: image1,
    content: 'I would like to lay a complaint...',
    timeStamp: 'Today'
  },
  {
    senderName: 'John Doe',
    senderPhoto: image2,
    content: 'I am interested in the property you listed.',
    timeStamp: 'Yesterday'
  }
];

export const DashboardTableRows = () => {
  const statuses = ['Published', 'Pending', 'Failed'];
  const types = ['House', 'Land', 'Car'];

  const rowData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Property ${index + 1}`,
    propertyType: types[index % 3], // Repeats 0, 1, 2 → House, Land, Car
    status: statuses[index % 3], // Repeats 0, 1, 2 → Published, Pending, Failed
    inquiry: `Enquiry ${index + 1}`,
    price: `$${(index + 1) * 1000}`
  }));

  return rowData;
};

export const UserMgtTableRows = () => {
  const statuses = ['Suspended', 'Active', 'Inactive'];
  const roles = ['Landlord', 'Tenant'];
  const vStatuses = ['Verified', 'Unverified'];

  const rowData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Olawale Abolade`,
    role: roles[index % 2], // Repeats 0, 1, 2 → Landlord, User, Agent
    contact: { email: 'john.smith@email.com', phone: '+234 123 4567' },
    location: 'Lagos, Nigeria',
    status: statuses[index % 3], // Repeats 0, 1 → Suspended, Active
    verificationStatus: vStatuses[index % 2] // Repeats 0, 1 → Verified, Unverified
  }));

  return rowData;
};

export const FinanceTableRows = () => {
  const statuses = ['paid', 'refunded', 'failed', 'pending'];
  const roles = ['landlord', 'tenant'];
  const properties = ['Palm Harbor', 'Sunset Park', 'The Venice'];
  const paymentMethods = ['card', 'transfer'];

  const rowData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    date: new Date().toLocaleDateString(),
    paymentType: `Payment Type ${index + 1}`,
    amount: `$${(index + 1) * 100}`,
    senderName: `Olawale Abolade`,
    role: roles[index % 2], // Repeats 0, 1, 2 → Landlord, User, Agent
    property: properties[index % 3], // Repeats 0, 1, 2 → Palm Harbor, Sunset Park, The Venice
    ezyRentCharge: `$${(index + 1) * 10}`,
    netToReceiver: `$${(index + 1) * 90}`,
    paymentMethod: paymentMethods[index % 2], // Repeats 0,
    status: statuses[index % 4] // Repeats 0, 1 → paid, refunded, failed, pending
  }));

  return rowData;
};

export const TourTableRows = () => {
  const statuses = ['completed', 'pending', 'assigned'];
  const users = [
    'Charles Emmanuel',
    'Igashi Michael',
    'Dieli Precious',
    'Helen Doe'
  ];
  const staffs = ['Olawale Abolade', 'John Smith', 'Jane Doe'];
  const locations = [
    'Palm Harbor, Lekki',
    'Sunset Park, Ikoyi',
    'The Venice, Victoria Island'
  ];

  const rowData = Array.from({ length: 10 }, (_, index) => ({
    id: `tour ${index + 1}`,
    date: new Date().toLocaleDateString(),
    staff: staffs[index % 3], // Repeats 0, 1, 2 → Olawale Abolade, John Smith, Jane Doe
    location: locations[index % 3], // Repeats 0, 1, 2 → Palm Harbor, Sunset Park, The Venice
    user: users[index % 4], // Repeats 0, 1, 2 → Palm Harbor, Sunset Park, The Venice //
    status: statuses[index % 3] // Repeats 0, 1 → completed, pending, assigned
  }));

  return rowData;
};

export const DashboardAreaChartData = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 6000 },
  { name: 'Apr', value: 5020 },
  { name: 'May', value: 7000 }
];

export const AnalyticsLineChartData = [
  { month: 'Jan', listing: 1000, views: 600 },
  { month: 'Feb', listing: 800, views: 910 },
  { month: 'Mar', listing: 1400, views: 3090 },
  { month: 'Apr', listing: 1200, views: 2000 },
  { month: 'May', listing: 1900, views: 2181 }
];

export const AnalyticsPieChartData = [
  { name: 'Revenue', value: 75 },
  { name: 'Sales', value: 25 }
];
