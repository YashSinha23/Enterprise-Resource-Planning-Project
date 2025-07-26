import React, { useState } from "react";
import {
  CubeIcon,
  ClipboardDocumentListIcon,
  ArrowsRightLeftIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigationItems = [
  { name: "Transactions", icon: ArrowsRightLeftIcon, href: "#", active: false },
  { name: "Orders", icon: ClipboardDocumentListIcon, href: "#", active: true },
  { name: "Inventory", icon: CubeIcon, href: "#", active: false },
];

const adminItem = { name: "Admin", icon: UserIcon, href: "#", active: false };

export function NavigationbarWithDropdownMultilevelMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <CubeIcon className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Almed</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`${
                      item.active
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
                    } px-4 py-4 text-sm font-medium flex items-center space-x-2 transition-all duration-200 border-b-2 border-transparent`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Admin - Right Side */}
          <div className="hidden md:flex items-center">
            <a
              href={adminItem.href}
              className={`${
                adminItem.active
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
              } px-4 py-4 text-sm font-medium flex items-center space-x-2 transition-all duration-200 border-b-2 border-transparent`}
            >
              <UserIcon className="h-5 w-5" />
              <span>Admin</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.active
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  } block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              );
            })}
            {/* Admin in mobile menu */}
            <a
              href={adminItem.href}
              className={`${
                adminItem.active
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              } block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3`}
            >
              <UserIcon className="h-5 w-5" />
              <span>Admin</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}