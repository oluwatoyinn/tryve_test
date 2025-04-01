import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "Savings",
      path: "/savings",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 md:h-[93vh] h-[90vh] bg-gray-800 text-white w-64 transform transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto pt-6">
          <nav className="px-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                      location.pathname === item.path ? "bg-gray-700" : ""
                    }`}
                  >
                    <svg
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={item.icon}
                      />
                    </svg>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Need help section */}
        <div className="px-4 pb-6 mt-auto">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Need Help?
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Contact our support team for assistance
            </p>
            <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
