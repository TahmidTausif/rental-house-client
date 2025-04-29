"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SecondaryButton from "@/components/shared/SecondaryButton";
import Link from "next/link";
import Loader from "@/components/shared/Loader";

const UpdateProfileForm = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");

  const email = session?.user?.email

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      email
    };

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update/user`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Update failed:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Update failed");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  if (status === "loading") return <Loader />;
  if (!session?.user) return <div>You need to log in</div>;

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="flex flex-col gap-6 w-full max-w-md p-8 border-2 border-white shadow-theme">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Update Profile</h1>
          <p className="text-secondary mt-2">Edit your account information</p>
        </div>

        <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 focus:border-secondary outline-none p-3 w-full text-sm placeholder-secondary"
          />

          <SecondaryButton
            type="submit"
            customClass="w-full py-3 px-4 bg-green-600 text-white hover:bg-green-700"
          >
            Update Info
          </SecondaryButton>

          <div className="text-center text-sm mt-4">
            Want to go back?{" "}
            <Link
              href="/dashboard"
              className="underline underline-offset-4 text-secondary"
            >
              Dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
