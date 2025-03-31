import useAuthStore from '../../store/authStore';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuthStore();
  
  return (
    <header className="bg-white shadow-sm h-16 fixed w-full top-0 left-0 z-10">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 md:hidden text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className="text-xl font-bold text-blue-600">FinSave</div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4 relative">
            <button className="text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </div>
          
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-2">
              {user?.name.charAt(0)}
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-700">{user?.name}</div>
            </div>
            <div className="ml-2 relative">
              <button 
                onClick={logout}
                className="text-sm text-gray-600 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;