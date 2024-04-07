import "./Styles/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import BusSeatBooking from "./Pages/BusSeatBooking";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";

function App() {
  const navigate = useNavigate();
  const handleOptionChange = (optionId) => {
    console.log("option id:- ", optionId);
    switch (optionId) {
      case "1": {
        navigate("/");
        break;
      }

      case "2": {
        navigate("/dashboard");
        break;
      }

      default: {
        navigate("/");
        break;
      }
    }
  };
  return (
    <div className="App">
      <Navbar
        handleOptionChange={handleOptionChange}
      />
      <Routes>
        <Route exact path="/" Component={BusSeatBooking}></Route>
        <Route path="/dashboard" Component={Dashboard}></Route>
      </Routes>
    </div>
  );
}

export default App;
