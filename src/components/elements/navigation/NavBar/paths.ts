import { ISubNav } from '../SubNav/SubNav';

const NAV_LINKS: ISubNav[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Projects',
    href: '/projects',
    children: [
      {
        label: 'Browse',
        subLabel: 'Search any project you may interested',
        href: '/projects',
        logo: 'marketplace',
      },
      {
        label: 'Create',
        subLabel: 'Public your crazy ideas and get funded',
        href: '/projects/create',
        logo: 'pack',
      },
    ],
  },
  {
    label: 'Transactions',
    href: '/transactions',
  },
];

export default NAV_LINKS;
