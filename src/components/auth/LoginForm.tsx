import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, LoginSchema } from "@/validations/login-schema";
import TextField from "../common/text-field/text-field";
import PasswordField from "../common/password-field/password-field";
import { Button } from "../common/button";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "user@example.com",
      password: "password",
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { login, isLoading, error } = useAuthStore();

  const processForm: SubmitHandler<LoginInputs> = async (data) => {
    console.log(data);
    const success = await login(data?.email, data?.password);
    if (success) {
      navigate("/dashboard");
    } else toast.error("Error", { description: error });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome Back
      </h2>
      <form className="flex flex-col gap-4">
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
