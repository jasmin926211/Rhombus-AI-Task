import React from "react";
import "./Table.scss";
import { TableProps } from "./Table.types";

const Table: React.FC<TableProps> = ({ data }) => {
  // Extract unique headers from the data to display table columns
  const headers: string[] = Array.from(
    new Set(data.flatMap((row) => Object.keys(row)))
  );

  return (
    <div className="table-container">
      <table className="table">
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
              {headers.map((header, key) => (
                <td key={key}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
