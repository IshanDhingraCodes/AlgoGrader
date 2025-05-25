import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import { ForgotPasswordSchema } from "../schema/auth.validations";
import { logo } from "../assets";
import { useAuthStore } from "../store/useAuthStore";

const ForgotPassword = () => {
  const { forgotPassword, isSendingReset } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ForgotPasswordSchema) });

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data);
    } catch (error) {
      console.error("forgotPassword error :", error);
    }
  };

  return (
    <div className="flex items-center justify-center size-full max-sm:px-6">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
        <header className="flex flex-col gap-5 md:gap-8 w-fit">
          <Link to="/" className="cursor-pointer items-center gap-3 flex">
            <img src={logo} alt="logo" height={40} width={40} />
            <h1 className="text-[30px] leading-[32px] font-bold">AlgoGrader</h1>
          </Link>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold mt-2">Forgot Password</h1>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl"
            disabled={isSendingReset}
          >
            {isSendingReset ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Sending...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Return to{" "}
            <Link to="/sign-in" className="link link-success">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
