import React, { useEffect, useState, useMemo } from 'react';
import Table from './Table';
import axios from 'axios';

function TableList() {
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios('https://randomuser.me/api/?results=100&nat=us');
      setData(result.data.results);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Full Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'name.first',
          },
          {
            Header: 'Last Name',
            accessor: 'name.last',
          },
        ],
      },
      {
        Header: 'Address',
        columns: [
          {
            Header: 'Number',
            accessor: 'location.street.number',
          },
          {
            Header: 'Name',
            accessor: 'location.street.name',
          },
          {
            Header: 'City',
            accessor: 'location.city',
          },
          {
            Header: 'State',
            accessor: 'location.state',
          },
          {
            Header: 'Postcode',
            accessor: 'location.postcode',
          },
        ],
      },
      {
        Header: 'Contact',
        columns: [
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Phone',
            accessor: 'phone',
          },
          {
            Header: 'Cell',
            accessor: 'cell',
          },
        ],
      },
    ],
    []
  );

  return (
    <div className='container mt-3'>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default TableList;
