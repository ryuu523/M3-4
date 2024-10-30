import { Navigate, Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import './App.css';
import Start from './pages/Start';
import AuthLayout from './components/AuthLayout';
import Game from './pages/Game';
import Select from './pages/Select';
import Profile from './pages/Profile';
import Clear from './pages/Clear';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/' element={<AuthLayout />}>
          <Route path="game" element={<Game />} />
          <Route path="select" element={<Select />} />
          <Route path="profile" element={<Profile />} />
          <Route path="clear" element={<Clear />} />

        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
