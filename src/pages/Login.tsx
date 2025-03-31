import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">TryVe</h1>
          <p className="text-gray-600">Your financial future starts here</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;