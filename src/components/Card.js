import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ data }) => {
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const count = data.length;

  useEffect(() => {
    setFilteredEmployees(
      data.filter((index) => {
        return Object.keys(index).some((key) => index[key].toString().toLowerCase().includes(search.toLowerCase()));
      })
    );
  }, [search, data]);

  return (
    <>
      <div className='input-group mb-3'>
        <span className='input-group-text'>Search Employee Records: </span>
        <input
          type='text'
          className='form-control'
          placeholder={`${count} records...`}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
      </div>

      <div className='row row-cols-6 row-cols-md-2 g-4 mt-0'>
        {filteredEmployees.map((index, idx) => (
          <div className='card m-2' style={{ maxWidth: '420px' }} key={idx}>
            <div className='row g-0'>
              <div className='col-md-4 profile-img'>
                <img src={index.picture.large} alt='...' />
              </div>
              <div className='col-md-8 profile-data'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    {index.name.first} {index.name.last}
                  </h5>
                  <p className='card-text'>
                    <small className='text-muted'>Address:</small>
                    <br />
                    {index.location.street.number} {index.location.street.name}
                    <br />
                    {index.location.city}, {index.location.state} {index.location.postcode}
                  </p>
                  <p className='card-text'>
                    <small className='text-muted'>Email</small>
                    <br />
                    {index.email}
                  </p>
                  <p className='card-text'>
                    <small className='text-muted'>Phone</small>
                    <br />
                    {index.phone}
                  </p>
                  <p className='card-text'>
                    <small className='text-muted'>Cell</small>
                    <br />
                    {index.cell}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
