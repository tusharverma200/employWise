import './App.css';
import LoginPage from './components/LoginPage.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UsersList from './components/UsersList.jsx';
import EditUser from './components/EditUser.jsx';

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <LoginPage /> : <Navigate to="/users"/>} />
        <Route path="/users" element={token ? <UsersList /> : <Navigate to="/"/>} /> 
        <Route path="/users/:id" element={token ? <EditUser /> : <Navigate to="/"/>} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
