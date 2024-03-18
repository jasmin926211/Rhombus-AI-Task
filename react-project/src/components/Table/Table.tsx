import axios from "axios";
import React, { useEffect, useState } from "react";
import { ERROR, SUCCESS } from "../../constants/stateConstants";
import { useToast } from "../../hooks/useToast"; // Import the custom hook
import "./Table.scss";
import { DataTypeMapping, TableProps } from "./Table.types";

const Table: React.FC<TableProps> = ({ data }) => {
  const [dataTypeOverrides, setDataTypeOverrides] = useState<DataTypeMapping>(
    {}
  );
  const { showError, showSuccess } = useToast();

  const dataTypeMapping: DataTypeMapping = {
    object: "Text",
    datetime64: "Date",
    int64: "Integer",
    float64: "Float",
    bool: "Boolean",
  };

  useEffect(() => {
    // Call the API to update data type mappings when they change
    axios
      .post(`${process.env.API_URL}/update-data-types/`, dataTypeOverrides)
      .then(() => {
        showSuccess(`${SUCCESS} - Update data types successfully`);
      })
      .catch((error) => {
        showError(`${ERROR} - Somthing went wrong!! ${error}`);
      });
  }, [dataTypeOverrides]);

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
