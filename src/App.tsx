import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <div className="container">
      <Dashboard />
      <ToastContainer />
    </div>
  );
}

export default App;
