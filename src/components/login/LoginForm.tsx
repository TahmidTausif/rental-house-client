"use client";

import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Loader from "../shared/Loader";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const result = await signIn("credentials", {

      email,
      password,
      redirect: false,
    });

    console.log("SignIn result:", result);

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "successfully logged in",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/");
    }
  };

  if (isLoading) return <Loader />;
  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="flex flex-col gap-6 w-full max-w-md p-8 border-2 border-white shadow-theme">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-secondary mt-2">Login to your account</p>
        </div>

        <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 focus:border-secondary outline-none p-3 w-full text-sm placeholder-secondary"
            />
          </div>

          <div className="grid gap-2">
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 focus:border-secondary outline-none p-3 w-full text-sm placeholder-secondary"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <PrimaryButton
            type="submit"
            customClass="w-full py-3 px-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </PrimaryButton>

          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4 text-secondary">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
