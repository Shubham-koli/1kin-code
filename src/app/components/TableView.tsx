import React from 'react';

const TableComponent = ({ data }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Eye Color</th>
          <th>Home World</th>
        </tr>
      </thead>
      <tbody>

        {data.length==0?'No records with brown hair':
        data.map((record:any, index:any) => (
          <tr key={index}>
            <td>{record.name}</td>
            <td>{record.eye_color}</td>
            <td>{record.homeworld.name??''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;