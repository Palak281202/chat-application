import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateChat from "./pages/CreateChat/CreateChat";
import Chats from "./pages/Chats/Chats";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create-chat" element={<CreateChat />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chat/:id" element={<ChatRoom />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
