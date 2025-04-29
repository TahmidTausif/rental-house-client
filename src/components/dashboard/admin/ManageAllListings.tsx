"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SecondaryButton from "@/components/shared/SecondaryButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Loader from "@/components/shared/Loader";

// Cloudinary config
const CLOUDINARY_UPLOAD_PRESET = "tahmid123";
const CLOUDINARY_CLOUD_NAME = "dfvvoq4ud";

type ListingType = "apartment" | "house" | "villa" | "townhouse";
type StatusType = "available" | "not available";

interface ILandlord {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

interface IListingImages {
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    img5: string;
}

interface IListingDetails {
    description: string;
    rooms: number;
    garage: string;
    yearBuilt: string;
}

interface IListing {
    _id: string;
    title: string;
    address: string;
    price: number;
    sqft: number;
    beds: number;
    baths: number;
    type: ListingType;
    status: StatusType;
    flatPlan?: string;
    images: IListingImages;
    propertyFeatures: string[];
    details: IListingDetails;
    landlord: ILandlord;  
    createdAt?: string;
}

const ManageAllListings = () => {
    const { data: session } = useSession();
    const [listings, setListings] = useState<IListing[]>([]);
    const [selectedListing, setSelectedListing] = useState<IListing | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);

    const token = session?.accessToken;

    const fetchListings = async (page: number) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, limit: pageSize }, 
            });

            setListings(res.data.data.data);
            setTotalPages(res.data.data.totalPages);
        } catch (err) {
            console.error(err);
            setError("Error fetching listings.");
        }finally {
            setIsLoading(false); 
          }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return; 
        setCurrentPage(newPage);
    };

    const handleEdit = (listing: IListing) => {
        setSelectedListing(listing);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this listing?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/listings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchListings(currentPage);
        } catch (err) {
            console.error("Failed to delete listing:", err);
        }
    };

    const handleInputChange = <T extends keyof IListing>(field: T, value: IListing[T]) => {
        if (!selectedListing) return;
        setSelectedListing({ ...selectedListing, [field]: value });
    };

    const handleDetailChange = <T extends keyof IListingDetails>(field: T, value: IListingDetails[T]) => {
        if (!selectedListing) return;
        setSelectedListing({
            ...selectedListing,
            details: { ...selectedListing.details, [field]: value },
        });
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, imageKey: keyof IListingImages) => {
        const file = event.target.files?.[0];
        if (!file || !selectedListing) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData);

        const updatedImages = { ...selectedListing.images, [imageKey]: res.data.secure_url };
        setSelectedListing({ ...selectedListing, images: updatedImages });
    };

    const handleSave = async () => {
        // Ensure selectedListing is not null or undefined before destructuring
        if (!selectedListing?._id) {
            setError("Listing data is incomplete.");
            return;
        }

        // Destructure selectedListing and exclude 'landlord' without assigning it to a variable
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { landlord, ...updatedListing } = selectedListing;

        try {
            // Send the updated listing data (without the 'landlord' field) to the backend
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/listings/${selectedListing._id}`,
                updatedListing,  // send updatedListing which doesn't contain the 'landlord' field
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowModal(false);
            fetchListings(currentPage);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || "Something went wrong";
                setError(errorMessage);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };


    useEffect(() => {
        if (token) fetchListings(currentPage);
    }, [currentPage, token]); 

    if (isLoading) return <Loader/>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                    <div key={listing._id} className="bg-white p-4 rounded shadow">
                        <Image
                            src={listing.images?.img1 || "/default-image.jpg"}
                            width={300}
                            height={200}
                            alt={listing.title}
                            className="rounded mb-2 object-cover h-48 w-full"
                        />
                        <h3 className="text-black font-semibold text-lg">{listing.title}</h3>
                        <p className="text-gray-600">{listing.address}</p>
                        <div className="flex gap-2 mt-4">
                            <PrimaryButton
                                onClick={() => handleEdit(listing)}
                                className="bg-blue-600 text-white px-3 py-2 rounded text-sm"
                            >
                                Edit
                            </PrimaryButton>
                            <SecondaryButton
                                onClick={() => handleDelete(listing._id)}
                                className="bg-red-600 text-white px-3 py-2 rounded text-sm"
                            >
                                Delete
                            </SecondaryButton>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {showModal && selectedListing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-full max-w-3xl overflow-y-auto max-h-[90vh]">
                        <h2 className="text-xl text-black font-bold mb-4">Edit Listing</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="title" className="text-black font-semibold mb-2">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={selectedListing.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    className="border text-black px-3 py-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="address" className="text-black font-semibold mb-2">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    value={selectedListing.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    className="border text-black px-3 py-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="price" className="text-black font-semibold mb-2">Price</label>
                                <input
                                    id="price"
                                    type="number"
                                    value={selectedListing.price}
                                    onChange={(e) => handleInputChange("price", Number(e.target.value))}
                                    className="border text-black px-3 py-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="sqft" className="text-black font-semibold mb-2">Sqft</label>
                                <input
                                    id="sqft"
                                    type="number"
                                    value={selectedListing.sqft}
                                    onChange={(e) => handleInputChange("sqft", Number(e.target.value))}
                                    className="border text-black px-3 py-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="beds" className="text-black font-semibold mb-2">Beds</label>
                                <input
                                    id="beds"
                                    type="number"
                                    value={selectedListing.beds}
                                    onChange={(e) => handleInputChange("beds", Number(e.target.value))}
                                    className="border text-black px-3 py-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="baths" className="text-black font-semibold mb-2">Baths</label>
                                <input
                                    id="baths"
                                    type="number"
                                    value={selectedListing.baths}
                                    onChange={(e) => handleInputChange("baths", Number(e.target.value))}
                                    className="border text-black px-3 py-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="flatPlan" className="text-black font-semibold mb-2">Flat Plan</label>
                                <input
                                    id="flatPlan"
                                    type="text"
                                    value={selectedListing.flatPlan || ""}
                                    onChange={(e) => handleInputChange("flatPlan", e.target.value)}
                                    className="border text-black px-3 py-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="yearBuilt" className="text-black font-semibold mb-2">Year Built</label>
                                <input
                                    id="yearBuilt"
                                    type="date"
                                    value={selectedListing.details.yearBuilt?.slice(0, 10)}
                                    onChange={(e) => handleDetailChange("yearBuilt", e.target.value)}
                                    className="border text-black px-3 py-2 rounded"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <label htmlFor="description" className="text-black font-semibold mb-1">Description</label>
                            <textarea
                                id="description"
                                value={selectedListing.details.description}
                                onChange={(e) => handleDetailChange("description", e.target.value)}
                                className="mt-2 w-full border text-black px-3 py-2 rounded"
                            />
                        </div>


                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                            {Object.entries(selectedListing.images).map(([key, url]) => (
                                <div key={key} className="space-y-2">
                                    <Image src={url} alt={key} width={150} height={100} className="rounded" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="text-black"
                                        onChange={(e) => handleImageUpload(e, key as keyof IListingImages)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAllListings;
