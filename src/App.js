import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Select from "./pages/Select";
import AuthLayout from "./components/AuthLayout";
import Start from "./pages/Start";
import Game from "./pages/Game";
import Clear from "./pages/Clear";
import Profile from "./pages/Profile";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/" element={<AuthLayout />} >
          <Route path="select" element={<Select />} />
          <Route path="profile" element={<Profile />} />
          <Route path="game" element={<Game />} />
          <Route path="clear" element={<Clear />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
