import { ChartColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Outlet, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] sticky top-0 h-screen p-5">
        <div className="mt-20 space-y-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <ChartColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link
            to="/admin/course"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-24 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};


export default Sidebar;
