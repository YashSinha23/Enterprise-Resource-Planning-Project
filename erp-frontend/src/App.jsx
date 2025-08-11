import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { NavigationbarWithDropdownMultilevelMenu } from './components/Navbar';
import Home from './pages/home';
import Orders from './pages/orders/order';
import Transactions from './pages/transactions';
import Inventory from './pages/inventory';
import Employee from './pages/employee/employee';
import Admin from './pages/admin';

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-50 overflow-x-hidden">
        <NavigationbarWithDropdownMultilevelMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/attendance" element={<Employee />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '14px',
            },
            // Default options for specific types
            success: {
              duration: 3000,
              style: {
                background: '#10B981',
                color: '#fff',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#EF4444',
                color: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;