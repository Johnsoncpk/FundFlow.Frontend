/*const CampaignList: React.FC = () => {
    return (
        <div>Dashboard- Hi, User Name</div>

    );
}
export default CampaignList;*/

import React from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { DataSourceItemType } from 'antd/es/auto-complete';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Table } from 'antd';
//import type { SearchProps } from '../Search';

//import moment from 'moment';

interface DataType {
  key: React.Key;
  projectname: string;
  releasedate: any;
  desciption: string;
}

const { Search } = Input;
//const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

/*const columns: ColumnsType<DataType> = [
    {
      title: 'Project Name',
      dataIndex: 'projectname',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: string, record) => record.projectname.startsWith(value),
      width: '30%',
    },
    {
        title: 'Release Date',
        dataIndex: 'releasedate',
        width: 150
    },
    {
      title: 'Desciption',
      dataIndex: 'desciption',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value: string, record) => record.desciption.startsWith(value),
      filterSearch: true,
      width: '40%',
    },
  ];*/

const columns: ColumnsType<DataType> = [
  {
    title: 'Project Name',
    dataIndex: 'projectname',
    width: 300,
  },
  {
    title: 'Release Date',
    dataIndex: 'releasedate',
    width: 150,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.releasedate - b.releasedate,
    //sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
  },
  {
    title: 'Desciption',
    dataIndex: 'desciption',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    projectname: `Edward King ${i}`,
    releasedate: `20023-11-22`,
    desciption: `London, Park Lane no. ${i}`,
  });
}


const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

const CampaignList: React.FC = () => (
    //<Search placeholder="input search text" onSearch={onSearch} enterButton />
    <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 20 }} scroll={{ y: 1000 }} />
);

export default CampaignList;


