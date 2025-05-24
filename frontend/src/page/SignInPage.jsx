import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { SignInSchema } from "../schema/auth.validations";
import { authImage, logo } from "../assets";
import { useAuthStore } from "../store/useAuthStore";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { isLoggingIn, login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignInSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error("SignIn failed:", error);
    }
  };

  return (
    <main className="flex min-h-screen w-full justify-between">
      <div className="flex items-center justify-center size-full max-sm:px-6">
        <div className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
          <header className="flex flex-col gap-5 md:gap-8 w-fit">
            <Link to="/" className="cursor-pointer items-center gap-3 flex">
              <img src={logo} alt="logo" height={40} width={40} />
              <h1 className="text-[30px] leading-[32px] font-bold">
                AlgoGrader
              </h1>
            </Link>
            <div className="space-y-4">
              <h1 className="text-5xl font-bold mt-2">Sign In</h1>
              <p className="text-lg text-base-content/60">
                Please enter your details.
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40 z-10" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40 z-10" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40 z-10" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40 z-10" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/sign-up" className="link link-success">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <div className="flex h-screen w-full sticky top-0 items-center justify-end max-lg:hidden">
        <div className="h-screen w-full">
          <img
            src={authImage}
            alt="authImage"
            className="h-screen w-full rounded-bl-[15%] rounded-[5%] p-5"
          />
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
