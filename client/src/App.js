import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateNote from "./pages/CreateNote/CreateNote";
import EditNote from "./pages/EditNote/EditNote";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/createNote" element={<CreateNote />} />
            <Route path="/editnote/:id" element={<EditNote />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
