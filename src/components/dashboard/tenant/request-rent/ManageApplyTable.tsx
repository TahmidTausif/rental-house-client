"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IBooking, IListing } from "@/types/types";
import Loader from "@/components/shared/Loader";
import Image from "next/image";

const ManageApplyTable = () => {
  const { data: session, status } = useSession();
  const [bookingData, setBookingData] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [listingDetails, setListingDetails] = useState<IListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tenantId = session?.user?.id;



  console.log("Decoded ID:", session?.user?.id);

  console.log(session?.user)
  // Fetch booking data
  useEffect(() => {
    const fetchBookings = async () => {
      if (!tenantId) return;

      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking-request/tenant-bookings/${tenantId}`);
        setBookingData(response.data.data);
        console.log("response", response.data.data)
      } catch (err: unknown) {
        setError("Error fetching booking data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [tenantId]);

  // Fetch listing details
  const handleViewDetails = async (listingId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/listings/${listingId}`);
      setListingDetails(response.data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching listing details", error);
    }
  };

  if (status === "loading") return <div>Loading session...</div>;
  if (status === "unauthenticated") return <div>Please log in to see your bookings.</div>;
  if (loading) return <Loader />;
  // if (!loading && bookingData.length === 0) return <div>No bookings found.</div>;
  if (error) return <div>{error}</div>;

  console.log('bookingData:', bookingData);

  return (
    <div>
      <div className="overflow-x-auto shadow-theme  border border-sidebar-theme my-10">
        <table className="min-w-full  bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 border-gray-200 text-black text-left">Title</th>
              <th className="border p-3 border-gray-200 text-black text-left">Address</th>
              <th className="border p-3 border-gray-200 text-black text-left">Status</th>
              {/* <th className="border p-3 border-gray-200 text-black text-center">Payment Status</th> */}
              <th className="border p-3 border-gray-200 text-black text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookingData?.map((item) => (
              <tr key={item?._id} className="border">
                <td className="border border-gray-200 p-3 text-black">{item?.listing.title}</td>
                <td className="border border-gray-200 p-3 text-black">
                  {item?.listing?.address || "N/A"}
                </td>
                <td className="border border-gray-200 p-3 text-black capitalize">
                  {item?.bookingStatus || "pending"}
                </td>
                {/* <td className="border border-gray-200 p-3 text-black capitalize">
                  {item?.paymentStatus ? "Paid" : "Not Paid"}
                </td> */}
                <td className="border border-gray-200 p-3 text-black text-center">
                  <Button
                    variant="outline"
                    className="rounded-full text-white"
                    onClick={() => handleViewDetails(item?.listing._id)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to show listing details */}
      {isModalOpen && listingDetails && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[600px] p-4">
            <DialogHeader>
              <DialogTitle className="text-center">Listing Details</DialogTitle>
            </DialogHeader>
            {listingDetails?.images?.img1 && (
              <div className="flex justify-center mb-4">
                <Image
                  src={listingDetails.images.img1}
                  alt="Listing Image"
                  width={300} // Adjust width to fit your needs
                  height={100} // Adjust height to fit your needs
                  className="object-cover rounded-md" // Keeps the image aspect ratio intact
                />
              </div>
            )}

            <div className="text-center mx-auto">
              <h3 className="font-bold text-xl mb-2">{listingDetails?.title}</h3>
              <p><strong>sqft: </strong>{listingDetails?.sqft || "N/A"}</p>
              <p><strong>Location: </strong>{listingDetails?.address || "N/A"}</p>
              <p><strong>Price: </strong>{listingDetails?.price || "N/A"}</p>
              <p><strong>Status: </strong>{listingDetails?.status || "N/A"}</p>
            </div>
            <Button onClick={() => setIsModalOpen(false)} className="mt-4">
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ManageApplyTable;


