// src/components/auth/LoginForm.jsx
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, LoginSchema } from "@/validations/login-schema";
import TextField from "../common/text-field/text-field";
import PasswordField from "../common/password-field/password-field";
import { Button } from "../common/button";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { login, isLoading, error } = useAuthStore();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const success = await login(email, password);
  //   if (success) {
  //     navigate("/dashboard");
  //   }
  // };

  const processForm: SubmitHandler<LoginInputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome Back
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form>
        <div>
          <TextField
            label="Email"
            name="email"
            control={control}
            iconPosition="left"
            placeholder="Enter your email"
            className="block w-full rounded-md border border-gray-300 py-2 pl-5 text-foreground shadow-sm outline-none focus:border focus:border-green-400 focus:ring-0 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-200/50 disabled:text-gray-500;"
          />
        </div>
        <div>
          <PasswordField
            label="Password"
            name="password"
            control={control}
            showPassword={showPassword}
            placeholder="Enter your password"
            onIconClick={() => handleShowPassword()}
            type={showPassword ? "text" : "password"}
            showLeftIcon={false}
            className="block w-full rounded-md border border-gray-300 py-2 pl-5 text-foreground shadow-sm outline-none focus:border focus:border-green-400 focus:ring-0 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-200/50 disabled:text-gray-500;"
          />
        </div>

        <div className="mt-3">
          <Button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            type="submit"
            label="Sign In"
            onClick={handleSubmit(processForm)}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
