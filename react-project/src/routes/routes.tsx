import React from "react";
import { Route, Routes } from "react-router-dom";
import { UploadFiles } from "../components/UploadFiles";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UploadFiles />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
