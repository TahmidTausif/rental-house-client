"use client";

import React, { useState } from "react";
import Link from "next/link";
import SecondaryButton from "@/components/shared/SecondaryButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../shared/Loader";
import Swal from "sweetalert2";

const RegistrationForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("tenant");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // Added image state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsLoading(true); 

    // Upload image and get the URL
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImage(); // Call the image upload function
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          name,
          email,
          phone,
          password,
          role,
          imageUrl, // Include image URL in the registration request
        }
      );

      if (response.data?.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "successfully registered",
        showConfirmButton: false,
        timer: 1500
      });
        router.push("/login");
      } else {
        alert("Registration failed.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Something went wrong!");
      } else {
        alert("An unexpected error occurred!");
      }
    }finally {
      setIsLoading(false); // Stop loader in case of error (optional – won't run if `router.push` executes first)
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Update image state with selected file
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return ""; // Ensure there's a file to upload

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "tahmid123"); // Cloudinary preset
    formData.append("cloud_name", "dfvvoq4ud"); // Cloudinary cloud name

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dfvvoq4ud/image/upload", formData);
      return res.data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Image upload failed", error);
      return ""; // Return empty string if upload fails
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="flex flex-col gap-6 w-full max-w-md p-8 border-2 border-white shadow-theme">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-secondary mt-2">Sign up to get started</p>
        </div>

        <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 focus:border-secondary outline-none p-3 w-full text-sm placeholder-secondary"
          />

          <input
            id="email"
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 focus:border-secondary outline-none p-3 w-full text-sm placeholder-secondary"
          />

          <input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            pattern="[0-9]{11,}"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 focus:border-secondary outline-none p-3 w-full text-sm placeholder-secondary"
          />
          

          {/* image upload */}
          <div className="relative">
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
              required
            />
            <label
              htmlFor="image"
              className="border border-gray-300 focus:border-secondary outline-none p-3 w-full text-sm text-secondary cursor-pointer flex  justify-start"
            >
              {imageFile ? imageFile.name : "Image"}
            </label>
          </div>

          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 focus:border-secondary outline-none p-3 w-full text-sm placeholder-secondary"
          />

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 focus:border-secondary outline-none p-3 w-full text-sm placeholder-secondary"
          />

          {/* Image Upload */}


          <div className="flex items-center gap-4 text-secondary">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="tenant"
                checked={role === "tenant"}
                onChange={() => setRole("tenant")}
                className="form-radio"
              />
              Tenant
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="landlord"
                checked={role === "landlord"}
                onChange={() => setRole("landlord")}
                className="form-radio"
              />
              Landlord
            </label>
          </div>

          <SecondaryButton
            type="submit"
            customClass="w-full py-3 px-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Register
          </SecondaryButton>

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 text-secondary"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
