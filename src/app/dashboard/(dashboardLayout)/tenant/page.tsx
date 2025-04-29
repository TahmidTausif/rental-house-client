"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "@/components/shared/Loader";

interface IBooking {
  _id: string;
  bookingStatus: "accepted" | "rejected" | "cancelled" | "pending";
  paymentStatus: boolean;
  createdAt?: string;
  listing: {
    title: string;
    address: string;
  };
}

const TenantOverview = () => {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const tenantId = session?.user.id;
  const token = session?.accessToken;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking-request/tenant-bookings/${tenantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching tenant bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tenantId && token) fetchBookings();
  }, [tenantId, token]);

  if (status === "loading") return <div>Loading session...</div>;
  if (status === "unauthenticated") return <div>Please log in to view your dashboard.</div>;
  if (loading) return <Loader />;

  const total = bookings.length;
  const accepted = bookings.filter((b) => b.bookingStatus === "accepted").length;
  const rejected = bookings.filter((b) => b.bookingStatus === "rejected").length;
  const paid = bookings.filter((b) => b.paymentStatus).length;
  const recent = [...bookings].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()).slice(0, 3);

  return (
    <div className="space-y-6 my-5">
      <h2 className="text-2xl font-semibold lg:text-3xl mb-8">Tenant Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h4 className="text-black">Total Requests</h4>
          <p className="text-black text-xl font-bold">{total}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h4 className="text-black">Accepted</h4>
          <p className="text-black text-xl font-bold">{accepted}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h4 className="text-black">Rejected</h4>
          <p className="text-black text-xl font-bold">{rejected}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h4 className="text-black">Paid</h4>
          <p className="text-black text-xl font-bold">{paid}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Requests</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recent.map((b) => (
            <li key={b._id} className="bg-white p-4 rounded shadow">
              <p className="text-black font-semibold">{b.listing?.title}</p>
              <p className="text-gray-600 text-sm mb-2">{b.listing?.address}</p>
              <p className="text-black mb-1">Status: <strong>{b.bookingStatus}</strong></p>
              <p className="text-black mb-1">Paid: <strong>{b.paymentStatus ? "Yes" : "No"}</strong></p>
              <p className="text-black text-sm">Requested: {new Date(b.createdAt!).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TenantOverview;
