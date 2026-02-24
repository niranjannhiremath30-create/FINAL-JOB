import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import Settings from './pages/Settings';
import Digest from './pages/Digest';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/digest" element={<Digest />} />
        <Route path="/jt/07-test" element={<TestChecklist />} />
        <Route path="/jt/08-ship" element={<Ship />} />
      </Routes>
    </BrowserRouter>
  );
}
