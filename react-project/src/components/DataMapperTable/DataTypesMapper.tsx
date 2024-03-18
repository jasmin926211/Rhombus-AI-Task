import React, { ChangeEvent, useState } from "react";
import "./DataTypesMapper.scss";

interface Mapping {
  [columnName: string]: string;
}

interface Props {
  onMapping: (mapping: Mapping) => void;
}

const DataTypesMapper: React.FC<Props> = ({ onMapping }) => {
  const [mapping, setMapping] = useState<Mapping>({});

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    columnName: string
  ) => {
    const { value } = event.target;
    setMapping((prevMapping) => ({
      ...prevMapping,
      [columnName]: value,
    }));
  };

  const handleSave = () => {
    onMapping(mapping);
  };

  return (
    <div className="table-container">
      <h2>Data Type Mapping</h2>
      <table>
        <thead>
          <tr>
            <th>Column Name</th>
            <th>User-Friendly Name</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(mapping).map((columnName) => (
            <tr key={columnName}>
              <td>{columnName}</td>
              <td>
                <input
                  type="text"
                  value={mapping[columnName]}
                  onChange={(event) => handleInputChange(event, columnName)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="wrapper-button">
        <button onClick={handleSave}>Save Mapping</button>
      </div>
    </div>
  );
};

export default DataTypesMapper;
