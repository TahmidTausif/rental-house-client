"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import Image from "next/image";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl?: string;
  isActive: boolean;
  role: "tenant" | "landlord" | "admin";
}

const ManageUsers = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const token = session?.accessToken;

  // Fetch users function
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "Something went wrong";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Load users once authenticated
  useEffect(() => {
    if (status === "authenticated") fetchUsers();
  }, [status]);

  // Handle status toggle (Activate/Deactivate)
  const handleToggleStatus = async (userId: string, isActive: boolean) => {
    try {
      const newStatus = !isActive; // If the user is active, toggle it to inactive, or vice versa
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/admin/change-user-status`,
        { id: userId, isActive: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers(); // Re-fetch to update state
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "Something went wrong";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  // Handle changing user role
  const handleChangeRole = async (userId: string, newRole: "tenant" | "landlord" | "admin") => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/admin/change-user-role`,
        { id: userId, role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers(); // Re-fetch to update state
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "Something went wrong";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  // Loading, unauthenticated, or error handling
  if (status === "loading" || loading) return <Loader />;
  if (status === "unauthenticated") return <div>Please log in as admin.</div>;
  if (error) return <div>{error}</div>;

  // Separate users by role
  const tenants = users.filter((u) => u.role === "tenant");
  const landlords = users.filter((u) => u.role === "landlord");
  const admins = users.filter((u) => u.role === "admin");

  // Render tables
  // Updated renderTable function
const renderTable = (title: string, data: IUser[], isAdminTable: boolean) => (
  <div className="my-10">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="overflow-x-auto shadow border rounded-lg">
      <table className="min-w-full text-sm bg-white">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="text-black p-3">Image</th>
            <th className="text-black p-3">Name</th>
            <th className="text-black p-3">Email</th>
            <th className="text-black p-3">Phone</th>
            <th className="text-black p-3">Status</th>
            {/* Only render Action buttons for Tenants and Landlords */}
            {!isAdminTable && (
              <>
                <th className="text-black p-3">Change Role</th>
                <th className="text-black p-3">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-3">
                <Image
                  src={user.imageUrl || "/default-user.png"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </td>
              <td className="text-black p-3">{user.name}</td>
              <td className="text-black p-3">{user.email}</td>
              <td className="text-black p-3">{user.phone}</td>
              <td className="text-black p-3">{user.isActive ? "Active" : "Inactive"}</td>
              {/* Only show action buttons for Tenants and Landlords */}
              {!isAdminTable && (
                <>
                  <td className="text-black p-3">
                    <select
                      className="border p-2 rounded"
                      value={user.role}
                      onChange={(e) =>
                        handleChangeRole(user._id, e.target.value as "tenant" | "landlord" | "admin")
                      }
                    >
                      <option value="tenant">Tenant</option>
                      <option value="landlord">Landlord</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="text-white p-3 space-y-2">
                    <Button
                      variant="outline"
                      className="bg-black"
                      onClick={() => handleToggleStatus(user._id, user.isActive)}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


return (
  <div>
    {renderTable("Admins", admins, true)}  
    {renderTable("Tenants", tenants, false)}  
    {renderTable("Landlords", landlords, false)}  
  </div>
);
};

export default ManageUsers;
