import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

function CardList() {
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios('https://randomuser.me/api/?results=150&nat=us');
      setData(result.data.results);
    })();
  }, []);

  return (
    <div className='container mt-3'>
      <Card data={data} />
    </div>
  );
}

export default CardList;
