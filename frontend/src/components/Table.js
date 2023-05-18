import React from 'react';

function Table({ listProducts }) {
  return (
    <div className="col-md-8">
      <table className="table table-striped table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>ThumbnailURL</th>
            <th>SourceURL</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            
          {listProducts.map(row => (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>{row[4]}</td>
              <td width="130">
                <a href={`/edit/${row[0]}`} className="btn btn-secondary btn-sm">edit</a>
                <a href={`/delete/${row[0]}`} className="btn btn-danger btn-delete btn-sm">delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
