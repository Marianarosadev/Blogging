import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BlogPost from './pages/BlogPost.tsx'
import './styles/App.css'

const App: React.FC = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<BlogPost />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;