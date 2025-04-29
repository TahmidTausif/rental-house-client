"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useSession } from "next-auth/react";
import SecondaryButton from "@/components/shared/SecondaryButton";

const ChangePasswordForm = () => {
  const { data: session } = useSession();
  const [cpassword, setCPassword] = useState("");
  const [npassword, setNPassword] = useState("");
  const [cnpassword, setCNPassword] = useState("");

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (npassword !== cnpassword) {
      alert("New password and confirmation do not match");
      return;
    }

    const payload = {
      email: session?.user?.email,
      cpassword,
      npassword,
    };

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update/password`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        alert("Password updated successfully!");
        setCPassword("");
        setNPassword("");
        setCNPassword("");
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (err) {
      // Check if error is an instance of an Error object
      if (err instanceof Error) {
        console.error("Password update error:", err.message);
        alert(err.message || "Update failed");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const inputStyle =
    "w-full px-4 py-2 text-black rounded-lg border focus:outline-none focus:ring-2";

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="flex flex-col gap-6 w-full max-w-md p-8 border-2 border-black bg-white shadow-theme">
        <h2 className="text-3xl text-black font-bold text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Current Password */}
          <div className="relative flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Current Password
              <input
                type={showPassword.current ? "text" : "password"}
                required
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                className={`${inputStyle} mt-1 border-black focus:ring-gray-500`}
              />
            </label>
            <button
              type="button"
              onClick={() => toggleVisibility("current")}
              className="absolute right-4 top-[38px] transform -translate-y-1/2 text-gray-400"
            >
              {showPassword.current ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              New Password
              <input
                type={showPassword.new ? "text" : "password"}
                required
                value={npassword}
                onChange={(e) => setNPassword(e.target.value)}
                className={`${inputStyle} mt-1 border-gray-700 focus:ring-gray-500`}
              />
            </label>
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="absolute right-4 top-[38px] transform -translate-y-1/2 text-gray-400"
            >
              {showPassword.new ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm New Password */}
          <div className="relative flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Confirm New Password
              <input
                type={showPassword.confirm ? "text" : "password"}
                required
                value={cnpassword}
                onChange={(e) => setCNPassword(e.target.value)}
                className={`${inputStyle} mt-1 border-gray-700 focus:ring-gray-500`}
              />
            </label>
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              className="absolute right-4 top-[38px] transform -translate-y-1/2 text-gray-400"
            >
              {showPassword.confirm ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            </button>
          </div>


          <SecondaryButton
            type="submit"
            customClass="w-full py-3 px-4 bg-green-600 text-white hover:bg-green-700"
          >
            Change Password
          </SecondaryButton>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
