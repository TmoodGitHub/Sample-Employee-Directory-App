import React from 'react';
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table';

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 500);

    return (
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Search Employee Records: </span>
          <input
            type='text'
            className='form-control'
            value={value || ''}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            placeholder={`${count} records...`}
            autoFocus
          />
        </div>
      </div>
    );
  };

  // Render the UI for your table
  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table className='table table-dark table-striped table-hover' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='table-light' {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <nav className='mx-auto' style={{ width: '43.2rem' }}>
        <ul className='pagination'>
          <li className='page-item'>
            <button
              type='button'
              className='btn btn-outline-dark'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'First'}
            </button>{' '}
          </li>
          <li className='page-item'>
            <button
              type='button'
              className='btn btn-outline-dark'
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {'Previous'}
            </button>{' '}
          </li>
          <li className='page-item'>
            <button type='button' className='btn btn-outline-dark' disabled>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </button>
          </li>
          <li className='page-item'>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon3'>
                Go to page:{' '}
              </span>
              <input
                type='text'
                className='form-control'
                id='basic-url'
                aria-describedby='basic-addon3'
                // eslint-disable-next-line
                type='number'
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: '100px' }}
              />
            </div>
          </li>
          <li className='page-item'>
            <select
              className='form-select'
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </li>
          <li className='page-item'>
            <button type='button' className='btn btn-outline-dark' onClick={() => nextPage()} disabled={!canNextPage}>
              {'Next'}
            </button>{' '}
          </li>
          <li className='page-item'>
            <button
              type='button'
              className='btn btn-outline-dark'
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'Last'}
            </button>{' '}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Table;
