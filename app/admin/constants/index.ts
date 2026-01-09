import {
  Banknote,
  CreditCard,
  House,
  LayoutDashboard,
  Star,
  TrendingUpDownIcon
} from 'lucide-react';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { LuUsers } from 'react-icons/lu';

export const siderbarItems: SidebarItemType[] = [
  { title: 'dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  {
    title: 'property Mgt.',
    href: '/admin/property-management',
    icon: House
  },
  { title: 'messages', href: '/admin/messages', icon: BiMessageRoundedDetail },
  { title: 'user Mgt.', href: '/admin/users', icon: LuUsers },
  { title: 'finance', href: '/admin/finance', icon: Banknote },
  { title: 'analytics', href: '/admin/analytics', icon: TrendingUpDownIcon },

  { title: 'tour Mgt.', href: '/admin/tour', icon: CreditCard },
  { title: 'blogs', href: '/admin/blogs', icon: MdOutlineLibraryBooks },
  { title: 'reviews', href: '/admin/reviews', icon: Star }
];

export const ITEMS_PER_PAGE = 10;
export const PROPERTY_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'condo', label: 'Condo' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'flat', label: 'Flat' },
  { value: 'shortlet', label: 'Shortlet' },
  { value: 'apartment', label: 'Apartment' }
];

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Added' },
  { value: 'price', label: 'Price' },
  { value: 'title', label: 'Title' }
];
