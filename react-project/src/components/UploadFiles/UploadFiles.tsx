import { faFileUpload, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef, useState } from "react";

import { ALLOW_FILE, FILE_UNITS } from "../../constants/constants";
import { ERROR, SUCCESS } from "../../constants/stateConstants";
import "./UploadFiles.scss";
import { File } from "./UploadFiles.types";

import { TableComponent } from "/#/components/Table";
import { useToast } from "/#/hooks/usetoast"; // Import the custom hook

const UploadFiles: React.FC = () => {
  const [selectedFileNames, setSelectedFileNames] = useState<File[]>([]);
  const [file, setFile] = useState<Blob | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { showError, showSuccess } = useToast(); // Use the custom hook
  const [responseData, setResponseData] = useState<any>([]); // State to store response data from server

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) {
      setFileError("No file selected.");
      return;
    }
    setFileError("");
    const files: File[] = Array.from(fileList).map((file) => ({
      name: file.name,
      size: file.size,
    }));
    setSelectedFileNames((prevFiles) => [...prevFiles, ...files]);
    setFile(fileList[0]);
  };

  const removeFile = (index: number) => {
    setSelectedFileNames((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
    formRef.current?.reset();
    setSelectedFileNames([]);
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setFileError("Please select a file.");
      return;
    }
    setFileError("");
    const formData = new FormData();
    formData.append("file", file as Blob);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/process-data/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);
      setResponseData(response.data.data);
      formRef.current?.reset();
      setSelectedFileNames([]);
      setFile(null);
      showSuccess(`${SUCCESS} - File uploaded`);
    } catch (error) {
      showError(`${ERROR} - Somthing went wrong!! ${error}`);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (size: number): string => {
    let index = 0;
    while (size >= 1024 && index < FILE_UNITS.length - 1) {
      size /= 1024;
      index++;
    }
    return `${size.toFixed(2)} ${FILE_UNITS[index]}`;
  };

  return (
    <div id="app">
      <div className="container">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="file-input-box">
            <div className="wrapper-file-input" onClick={openFileInput}>
              <div className="input-box">
                <FontAwesomeIcon icon={faFileUpload} size="2x" />
                <h4>Choose File to upload</h4>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept=".csv,.xls"
                  onChange={handleFileChange}
                />
              </div>
              <small>Files Supported: {ALLOW_FILE.join(", ")}</small>
              {fileError && <div className="error-message">{fileError}</div>}
            </div>
            <div className="wrapper-file-section">
              {selectedFileNames.length > 0 && (
                <div className="selected-files">
                  <h5>Selected Files</h5>
                  <ul className="file-list">
                    {selectedFileNames.map((file, index) => (
                      <li className="item" key={index}>
                        <span className="name">
                          {file.name} ({formatFileSize(file.size)})
                        </span>
                        <div
                          className="remove"
                          onClick={() => removeFile(index)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="wrapper-button">
              <button type="submit">Upload</button>
            </div>
          </div>
        </form>
        {responseData && <TableComponent data={responseData} />}
      </div>
    </div>
  );
};

export default UploadFiles;
