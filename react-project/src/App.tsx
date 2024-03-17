import { library } from "@fortawesome/fontawesome-svg-core"; // import the library
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import { UploadFiles } from "./components/UploadFiles";
import NotFoundPage from "./pages/NotFoundPage";

// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UploadFiles />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

library.add(fab, fas, far);
