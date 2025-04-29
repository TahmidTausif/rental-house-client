/* eslint-disable @typescript-eslint/no-explicit-any */
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
import PrimaryButton from "@/components/shared/PrimaryButton";
import Swal from "sweetalert2";
import useAxiosPublic from "@/components/hooks/listing/useAxiosPublic";
import { useRouter } from "next/navigation";

const RentedHouse = () => {
  const { data: session, status } = useSession();
  const [bookingData, setBookingData] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [listingDetails, setListingDetails] = useState<IListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const router = useRouter();

  const tenantId = session?.user?.id;

  // Fetch booking data
  useEffect(() => {
    const fetchBookings = async () => {
      if (!tenantId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking-request/tenant-bookings/${tenantId}`
        );
        setBookingData(response.data.data);
        console.log("response", response.data.data);
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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/${listingId}`
      );
      setListingDetails(response.data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching listing details", error);
    }
  };

  console.log(tenantId);
  // payment ==========
  const handlePayment = (bookingId: any, listingId:any) => {
    Swal.fire({
      title: "Submit Your Address",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm Payment",
      showLoaderOnConfirm: false,
      preConfirm: (address) => {
        if (!address) {
          Swal.showValidationMessage("Address cannot be empty");
          return false;
        }
        return address;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          listing: listingId,
          tenant: tenantId,
          address: result.value,
        };
        console.log(data, bookingId);
        console.log(typeof bookingId);
        axiosPublic.post(`/payment/initiate/${bookingId}`, data).then((data) => {
          if (data.data.url) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Redirecting to payment",
              showConfirmButton: false,
              timer: 1500,
            });
            router.push(data.data.url);
          }
        });
      }
    });
  };

  const filteredBookings = bookingData.filter(
    (booking) => booking.bookingStatus !== "pending"
  );

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated")
    return <div>Please log in to see your bookings.</div>;
  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (filteredBookings.length === 0)
    return (
      <div className="text-xl font bold text center my-20">
        No Accepted Request found
      </div>
    );

  // Filter bookings: Exclude bookings with 'pending' status

  return (
    <div>
      <div className="overflow-x-auto shadow-theme border border-sidebar-theme my-10">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 border-gray-200 text-black text-left">
                Title
              </th>
              <th className="border p-3 border-gray-200 text-black text-left">
                Status
              </th>
              <th className="border p-3 border-gray-200 text-black text-center">
                Payment Status
              </th>
              <th className="border p-3 border-gray-200 text-black text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((item) => (
              <tr key={item._id} className="border">
                <td className="border text-black border-gray-200 p-3 ">
                  {item.listing.title}
                </td>
                <td className="border text-black border-gray-200 p-3  capitalize">
                  {item.bookingStatus}
                </td>
                <td className="border text-black border-gray-200 p-3  capitalize">
                  {item.paymentStatus == true ? "Paid" : "Not Paid"}
                </td>
                <td className="border border-gray-200 p-3  text-center">
                  {item.bookingStatus === "accepted" && !item.paymentStatus ? (
                    <PrimaryButton
                      // variant="outline"
                      // className="rounded-full text-white"
                      onClick={() => handlePayment(item._id, item.listing._id)}
                    >
                      Pay Now
                    </PrimaryButton>
                  ) : item.paymentStatus ? (
                    <span>Paid</span>
                  ) : (
                    <PrimaryButton
                      className="rounded-full text-white"
                      onClick={() => handleViewDetails(item.listing._id)}
                    >
                      View Details
                    </PrimaryButton>
                  )}
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
            <div className="text-center mx-auto">
              <h3 className="font-bold text-xl mb-2">
                {listingDetails?.title}
              </h3>
              <p>
                <strong>sqft: </strong>
                {listingDetails?.sqft || "N/A"}
              </p>
              <p>
                <strong>Location: </strong>
                {listingDetails?.address || "N/A"}
              </p>
              <p>
                <strong>Price: </strong>
                {listingDetails?.price || "N/A"}
              </p>
              <p>
                <strong>Status: </strong>
                {listingDetails?.status || "N/A"}
              </p>
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

export default RentedHouse;

// RentedHouse
