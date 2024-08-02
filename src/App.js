import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ArticlePage from './pages/ArticlePage';
import UserPage from './pages/UserPage';
import EventPage from './pages/EventPage';
import ReviewPage from './pages/ReviewPage';
import CommentPage from './pages/CommentPage';
import NavigationBar from './components/Navbar';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/articles" element={<ArticlePage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/comments" element={<CommentPage />} />
            <Route path="/users" element={<UserPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
