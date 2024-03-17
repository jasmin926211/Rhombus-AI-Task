import { library } from "@fortawesome/fontawesome-svg-core"; // import the library
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import AppRoutes from "./routes/routes";

// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

library.add(fab, fas, far);
