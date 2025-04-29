"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loader from "@/components/shared/Loader";

interface IUser {
    _id: string;
    role: "tenant" | "landlord";
}

interface IListing {
    images: {
        img1?: string;
        img2?: string;
        img3?: string;
        img4?: string;
        img5?: string;
    };
    _id: string;
    title: string;
    address: string;
    createdAt: string;
}

const Overview = () => {
    const { data: session, status } = useSession();
    const [totalTenants, setTotalTenants] = useState(0);
    const [totalLandlords, setTotalLandlords] = useState(0);
    const [totalListings, setTotalListings] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [newestListings, setNewestListings] = useState<IListing[]>([]);
    const token = session?.accessToken;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch users and bookings
                const usersRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const bookingsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking-request/`);

                
                let listings: IListing[] = [];
                let page = 1;
                const totalPages = 2; 
                
                while (page <= totalPages) {
                    const listingsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/listings?page=${page}`);
                    const listingsData = listingsRes.data.data;

                    console.log(`Page ${page} Listings Data:`, listingsData);

                    // Check if the listingsData is an array before processing
                    if (Array.isArray(listingsData.data)) {
                        listings = [...listings, ...listingsData.data];
                    } else {
                        console.error("Listings data is not an array:", listingsData);
                    }
                    page++;
                }

                // Parse the fetched data
                const users = usersRes.data.data as IUser[];

                console.log("Users:", users);
                console.log("Listings:", listings);

                // Handle scenario where listings is not an array or is empty
                if (Array.isArray(listings) && listings.length > 0) {
                    // Set total values for tenants, landlords, listings, and bookings
                    setTotalTenants(users.filter(u => u.role === "tenant").length);
                    setTotalLandlords(users.filter(u => u.role === "landlord").length);
                    setTotalListings(listings.length);
                    setTotalBookings(bookingsRes.data.data.length);

                    // Set the 3 most recent listings (or fewer if not available)
                    setNewestListings(listings.slice(-3).reverse());
                } else {
                    console.error("Listings data is empty or not in expected format.");
                    setNewestListings([]);  
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }finally {
                setLoading(false); 
            }
        };

        fetchDashboardData();
    }, [token]);

    if (loading || status === "loading") return <Loader/>;
    if (status === "unauthenticated") return <div>Please log in to see your bookings.</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 shadow rounded-lg">
                    <h4 className="text-black">Tenants</h4>
                    <p className="text-black text-xl font-bold">{totalTenants}</p>
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <h4 className="text-black">Landlords</h4>
                    <p className="text-black text-xl font-bold">{totalLandlords}</p>
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <h4 className="text-black">Listings</h4>
                    <p className="text-black text-xl font-bold">{totalListings}</p>
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <h4 className="text-black">Bookings</h4>
                    <p className="text-black text-xl font-bold">{totalBookings}</p>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Newest Listings</h3>
                <ul className="space-y-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {newestListings.map(listing => (
                        <li
                            key={listing._id}
                            className="bg-white p-4 rounded shadow flex gap-4 justify-between h-full"
                        >
                            <div className="relative w-32 h-32 flex-shrink-0 ">
                                <Image
                                    src={listing.images?.img1 || "/default-image.jpg"}
                                    alt={listing.title}
                                    fill
                                    className="rounded object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-black text-xl font-bold mb-2">{listing.title}</h4>
                                <p className="text-sm text-black mb-0.5">{listing.address}</p>
                                <p className="text-xs text-black">
                                    Added on {new Date(listing.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Overview;
