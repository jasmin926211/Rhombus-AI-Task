import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="content-center">
      <h2 className="error">404</h2>
      <p>PAGE NOT FOUND</p>
      <p>It looks like nothing was found at this location.</p>
      <p style={{ textAlign: "center" }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
