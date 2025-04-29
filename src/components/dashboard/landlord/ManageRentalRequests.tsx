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

interface IUserInfo {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

interface ISelectedUser {
    landlord: IUserInfo;
    tenant: IUserInfo;
}

const ManageRentalRequests = () => {
    const { data: session, status } = useSession();
    const [bookingData, setBookingData] = useState<IBooking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [listingDetails, setListingDetails] = useState<IListing | null>(null);
    const [selectedUser, setSelectedUser] = useState<ISelectedUser | null>(null);
    const [isListingModalOpen, setIsListingModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const landlordId = session?.user?.id;

    useEffect(() => {
        const fetchBookings = async () => {
            if (!landlordId) return;

            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/booking-request/landlord-bookings/${landlordId}`
                );
                setBookingData(response.data.data);
            } catch (err: unknown) {
                setError("Error fetching booking data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [landlordId]);

    const handleViewListingDetails = async (listingId: string) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/listings/${listingId}`
            );
            setListingDetails(response.data.data);
            setIsListingModalOpen(true);
        } catch (error) {
            console.error("Error fetching listing details", error);
        }
    };

    const handleViewUserDetails = (user: ISelectedUser) => {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    };

    // Function to handle booking status update
    const handleBookingAction = async (id: string, status: "accepted" | "rejected") => {
        try {
            // Update booking status on the backend
            await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/booking-request/${status}/${id}`, {
                bookingStatus: status,
            });

            // Refetch the booking data after updating the status
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/booking-request/landlord-bookings/${landlordId}`
            );
            setBookingData(response.data.data);
        } catch (err) {
            console.error(`Failed to ${status} booking`, err);
        }
    };

    if (status === "loading") return <div>Loading session...</div>;
    if (status === "unauthenticated") return <div>Please log in to see your bookings.</div>;
    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="overflow-x-auto shadow-theme border border-sidebar-theme my-10">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 border-gray-200 text-black text-left">Title</th>
                            <th className="border p-3 border-gray-200 text-black text-left">Status</th>
                            <th className="border p-3 border-gray-200 text-black text-center">Payment</th>
                            <th className="border p-3 border-gray-200 text-black text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingData.map((item) => (
                            <tr key={item._id} className="border">
                                <td className="border border-gray-200 p-3 text-black">{item.listing.title}</td>
                                <td className="border border-gray-200 p-3 text-black capitalize">
                                    {item.bookingStatus || "pending"}
                                </td>
                                <td className="border border-gray-200 p-3 text-black capitalize text-center">
                                    {item.paymentStatus ? "Paid" : "Not Paid"}
                                </td>
                                <td className="border border-gray-200 p-3 text-black text-center space-x-2">
                                    <Button
                                        variant="outline"
                                        className="rounded-full text-white"
                                        onClick={() => handleViewListingDetails(item.listing._id)}
                                    >
                                        View Listing
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-full text-white"
                                        onClick={() => handleViewUserDetails({ landlord: item.landlord, tenant: item.tenant })}
                                    >
                                        View Users
                                    </Button>
                                    {item.bookingStatus === "pending" && (
                                        <>
                                            <Button
                                                variant="outline"
                                                className="rounded-full bg-green-500 text-white"
                                                onClick={() => handleBookingAction(item._id, "accepted")}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="rounded-full bg-red-500 text-white"
                                                onClick={() => handleBookingAction(item._id, "rejected")}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Listing Modal */}
            {isListingModalOpen && listingDetails && (
                <Dialog open={isListingModalOpen} onOpenChange={setIsListingModalOpen}>
                    <DialogContent className="sm:max-w-[600px] p-4">
                        <DialogHeader>
                            <DialogTitle className="text-center">Listing Details</DialogTitle>
                        </DialogHeader>
                        <div className="text-center mx-auto">
                            <h3 className="font-bold text-xl mb-2">{listingDetails?.title}</h3>
                            <p><strong>sqft:</strong> {listingDetails?.sqft || "N/A"}</p>
                            <p><strong>Location:</strong> {listingDetails?.address || "N/A"}</p>
                            <p><strong>Price:</strong> {listingDetails?.price || "N/A"}</p>
                            <p><strong>Status:</strong> {listingDetails?.status || "N/A"}</p>
                        </div>
                        <Button onClick={() => setIsListingModalOpen(false)} className="mt-4">
                            Close
                        </Button>
                    </DialogContent>
                </Dialog>
            )}

            {/* User Details Modal */}
            {isUserModalOpen && selectedUser && (
                <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
                    <DialogContent className="sm:max-w-[600px] p-4">
                        <DialogHeader>
                            <DialogTitle className="text-center">User Details</DialogTitle>
                        </DialogHeader>
                        <div className="text-left space-y-4">
                            <div>
                                <h4 className="font-semibold">Landlord</h4>
                                <p><strong>Name:</strong> {selectedUser.landlord?.name}</p>
                                <p><strong>Email:</strong> {selectedUser.landlord?.email}</p>
                                <p><strong>Phone:</strong> {selectedUser.landlord?.phone}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Tenant</h4>
                                <p><strong>Name:</strong> {selectedUser.tenant?.name}</p>
                                <p><strong>Email:</strong> {selectedUser.tenant?.email}</p>
                                <p><strong>Phone:</strong> {selectedUser.tenant?.phone}</p>
                            </div>
                        </div>
                        <Button onClick={() => setIsUserModalOpen(false)} className="mt-4">
                            Close
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ManageRentalRequests;
