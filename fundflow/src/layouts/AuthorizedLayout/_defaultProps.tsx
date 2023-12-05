import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from '@ant-design/icons';

const DefaultProps = {
  route: {
    path: '/',
    routes: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: <SmileFilled />,
        component: './dashboard',
      },
      {
        path: '/admin',
        name: 'Admin',
        icon: <CrownFilled />,
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/admin/sub-page1',
            name: 'Sup Page 1',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: './Welcome',
          },
          {
            path: '/admin/sub-page2',
            name: 'Sup Page 2',
            icon: <CrownFilled />,
            component: './Welcome',
          }
        ],
      },
      {
        name: 'Campaigns',
        icon: <TabletFilled />,
        path: '/campaigns',
        component: './ListTableList',
        routes: [
          {
            path: '/list/sub-page',
            name: 'Sup Page',
            icon: <CrownFilled />,
            routes: [
              {
                path: 'sub-sub-page1',
                name: 'Sub Sub Page 1',
                icon: <CrownFilled />,
              }
            ],
          },
          {
            path: '/list/sub-page2',
            name: 'Sub Page2',
            icon: <CrownFilled />,
            component: './Welcome',
          }
        ],
      },
      {
        path: '/smart-contracts',
        name: 'Smart Contracts',
        icon: <ChromeFilled />,
      },
    ],
  },
  location: {
    pathname: '/',
  },
};

export default DefaultProps; 