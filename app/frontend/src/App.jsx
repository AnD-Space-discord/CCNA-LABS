import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LabsPage from './pages/LabsPage';
import CategoryLabsPage from './pages/CategoryLabsPage';
import BlogsPage from './pages/BlogsPage';
import LabDetail from './pages/LabDetail';
import BlogDetail from './pages/BlogDetail';
import { Toaster } from 'sonner';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/labs" element={<LabsPage />} />
                    <Route path="/labs/category/:category" element={<CategoryLabsPage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/labs/:id" element={<LabDetail />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                </Routes>
                <Toaster richColors position="bottom-right" />
            </div>
        </Router>
    );
}

export default App;
