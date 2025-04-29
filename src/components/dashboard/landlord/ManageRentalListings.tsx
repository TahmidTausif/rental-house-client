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
import Loader from "@/components/shared/Loader";
import Image from "next/image";

export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

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
    landlord: ILandlord;  // Add landlord field here
    createdAt?: string;
}


const ManageRentalListings = () => {
  const { data: session, status } = useSession();
  const [allListings, setAllListings] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [listingDetails, setListingDetails] = useState<IListing | null>(null);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<IListing | null>(null);

  const landlordId = session?.user?.id;
  const token = session?.accessToken
  console.log("id", landlordId)

    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/listings/landlord/${landlordId}`);
        setAllListings(response.data.data);
      } catch (err: unknown) {
        setError("Error fetching listings");
        console.error(err);
      } finally {
        setLoading(false);
      }
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
      fetchListings();
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
      fetchListings();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "Something went wrong";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  

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

  useEffect(() => {
    if (token) fetchListings();
}, [token]);

  if (status === "loading") return <div>Loading session...</div>;
  if (status === "unauthenticated") return <div>Please log in to see your listings.</div>;
  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  console.log("data", allListings)
  const landlordListings = allListings

  return (
    <div>
      <div className="overflow-x-auto shadow-theme border border-sidebar-theme my-10">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 border-gray-200 text-black text-left">Title</th>
              <th className="border p-3 border-gray-200 text-black text-left">Location</th>
              <th className="border p-3 border-gray-200 text-black text-center">Status</th>
              <th className="border p-3 border-gray-200 text-black text-center">Actions</th>
              <th className="border p-3 border-gray-200 text-black text-center">Edit</th>
              <th className="border p-3 border-gray-200 text-black text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {landlordListings.map((listing:any) => (
              <tr key={listing._id} className="border">
                <td className="border border-gray-200 p-3 text-black">{listing.title}</td>
                <td className="border border-gray-200 p-3 text-black">{listing.address}</td>
                <td className="border border-gray-200 p-3 text-black capitalize text-center">
                  {listing.status}
                </td>
                <td className="border border-gray-200 p-3 text-black text-center">
                  <Button
                    variant="outline"
                    className="rounded-full bg-black text-white"
                    onClick={() => handleViewListingDetails(listing._id!)}
                  >
                    View Details
                  </Button>
                </td>
                <td className="border border-gray-200 p-3 text-black text-center">
                  <Button
                  variant="outline"
                    className="rounded-full bg-blue-500  text-white"
                    onClick={() => handleEdit(listing)}
                  >
                    Edit
                  </Button>
                </td>
                <td className="border border-gray-200 p-3 text-black text-center">
                  <Button
                    variant="outline"
                    className="rounded-full bg-red-500 text-white"
                    onClick={() => handleDelete(listing._id)}
                  >
                    Delete
                  </Button>
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
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded"
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

export default ManageRentalListings;
