import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">Page Not Found</h2>
        <p className="text-gray-600 mt-4">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;