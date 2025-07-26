import React from 'react';
import { NavigationbarWithDropdownMultilevelMenu } from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavigationbarWithDropdownMultilevelMenu />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Welcome to Almed ERP</h1>
          <p className="text-gray-600 text-lg">Select a module from the navigation bar to get started.</p>
        </div>
        
        {/* Optional: Add some content cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Admin</h3>
            <p className="text-blue-700 text-sm">Manage system settings and user permissions</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Transactions</h3>
            <p className="text-green-700 text-sm">View and manage all financial transactions</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Orders</h3>
            <p className="text-purple-700 text-sm">Track and manage customer orders</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">Inventory</h3>
            <p className="text-orange-700 text-sm">Monitor stock levels and inventory</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;