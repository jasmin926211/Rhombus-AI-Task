import React, { useState } from "react";
import "./Table.scss";
import { TableProps } from "./Table.types";

interface DataTypeMapping {
  [key: string]: string;
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [dataTypeOverrides, setDataTypeOverrides] = useState<DataTypeMapping>(
    {}
  );

  const dataTypeMapping: DataTypeMapping = {
    object: "Text",
    datetime64: "Date",
    // Add more mappings as needed
  };

  const handleDataTypeOverride = (columnName: string, dataType: string) => {
    setDataTypeOverrides((prevOverrides) => ({
      ...prevOverrides,
      [columnName]: dataType,
    }));
  };

  const renderDataTypeOptions = (columnName: string, dataType: string) => {
    return (
      <select
        value={dataTypeOverrides[columnName] || dataTypeMapping[dataType]}
        onChange={(e) => handleDataTypeOverride(columnName, e.target.value)}
      >
        {Object.values(dataTypeMapping).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    );
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          {Object.keys(data[0]).map((columnName) => (
            <th key={columnName}>
              {columnName}
              {renderDataTypeOptions(columnName, typeof data[0][columnName])}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(row).map((columnName) => (
              <td key={columnName}>{row[columnName]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="table-container">
      <h2>Processed Data</h2>
      <table className="table">
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </div>
  );
};

export default Table;
