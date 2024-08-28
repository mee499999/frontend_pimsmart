// components/Table.tsx
import React from 'react';

interface TableProps<T> {
  headers: string[];
  data: T[];
}

const Table = <T extends { [key: string]: any }>({ headers, data }: TableProps<T>) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>

      <style jsx>{`
        .user-table {
          width: 100%;
          border-collapse: collapse;
        }
        .user-table th, .user-table td {
          padding: 8px;
          text-align: left;
          border: 1px solid #ddd;
        }
        .user-table thead {
          background-color: #f4f4f4;
        }
      `}</style>
    </table>
  );
};

export default Table;
