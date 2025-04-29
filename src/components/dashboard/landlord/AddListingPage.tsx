"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "@/components/shared/Loader";
import Swal from "sweetalert2";

const CLOUDINARY_UPLOAD_PRESET = "tahmid123";
const CLOUDINARY_CLOUD_NAME = "dfvvoq4ud";

type ListingType = "apartment" | "house" | "villa" | "townhouse";
type StatusType = "available" | "not available";

interface IListingImages {
  img1: string;
  img2?: string;
  img3?: string;
  img4?: string;
  img5?: string;
}

interface IListingDetails {
  description: string;
  rooms: number;
  garage: string;
  yearBuilt: string;
}

interface FormDataType {
  title: string;
  address: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  flatPlan: string;
  type: ListingType;
  status: StatusType;
  propertyFeatures: string[];
  details: IListingDetails;
  images: IListingImages;
}

const initialImages: IListingImages = {
  img1: "",
  img2: "",
  img3: "",
  img4: "",
  img5: "",
};

const toTitleCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, " $1");

export default function AddListingPage() {
  const { data: session, status } = useSession();
  const [hasGarage, setHasGarage] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    address: "",
    price: 0,
    sqft: 0,
    beds: 0,
    baths: 0,
    flatPlan: "",
    type: "apartment",
    status: "available",
    propertyFeatures: [],
    details: {
      description: "",
      rooms: 0,
      garage: hasGarage ? "Yes" : "No",
      yearBuilt: "",
    },
    images: { ...initialImages },
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    const checked =
      type === "checkbox" && "checked" in target
        ? (target as HTMLInputElement).checked
        : false;

    if (name in formData.details) {
      setFormData((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          [name]:
            type === "checkbox"
              ? checked
              : type === "number"
              ? parseInt(value)
              : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: ["price", "sqft", "beds", "baths"].includes(name)
          ? parseInt(value)
          : value,
      }));
    }
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      propertyFeatures: checked
        ? [...prev.propertyFeatures, value]
        : prev.propertyFeatures.filter((f) => f !== value),
    }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof IListingImages
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        form
      );
      const imageUrl = response.data.secure_url;

      console.log(imageUrl);
      setFormData((prev) => ({
        ...prev,
        images: { ...prev.images, [key]: imageUrl },
      }));
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const handleCreate = async () => {
    try {
      const token = session?.accessToken;
      const landlordId = session?.user?.id || session?.user?.id;

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/create-listing`,
        { ...formData, landlord: landlordId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = "Try again and upload all 5 image";
        console.log( err.response?.data?.message );
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "successfully added product",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({
        title: "",
        address: "",
        price: 0,
        sqft: 0,
        beds: 0,
        baths: 0,
        flatPlan: "",
        type: "apartment",
        status: "available",
        propertyFeatures: [],
        details: {
          description: "",
          rooms: 0,
          garage: "No",
          yearBuilt: "",
        },
        images: { ...initialImages },
      });
      setHasGarage(false);
      setLoading(false);
    }
  };

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated")
    return <div>Please log in to add a listing.</div>;
  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-600 text-center my-4">{error}</div>;

  return (
    <div className="bg-white p-6 mx-auto my-10 rounded w-full max-w-3xl">
      <div className="grid grid-cols-2 gap-4">
        {(
          [
            "title",
            "address",
            "price",
            "sqft",
            "beds",
            "baths",
            "flatPlan",
          ] as const
        ).map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="text-black font-semibold mb-2">
              {toTitleCase(field)}
            </label>
            <input
              id={field}
              name={field}
              type={
                ["price", "sqft", "beds", "baths"].includes(field)
                  ? "number"
                  : "text"
              }
              min="0"
              value={formData[field]}
              onChange={handleChange}
              className="border text-black px-3 py-2 rounded"
            />
          </div>
        ))}

        {(["type", "status"] as const).map((selectField) => (
          <div key={selectField} className="flex flex-col">
            <label
              htmlFor={selectField}
              className="text-black font-semibold mb-2"
            >
              {toTitleCase(selectField)}
            </label>
            <select
              id={selectField}
              name={selectField}
              value={formData[selectField]}
              onChange={handleChange}
              className="border text-black px-3 py-2 rounded"
            >
              {(selectField === "type"
                ? ["apartment", "house", "villa", "townhouse"]
                : ["available", "not available"]
              ).map((option) => (
                <option key={option} value={option}>
                  {toTitleCase(option)}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex flex-col">
          <label htmlFor="yearBuilt" className="text-black font-semibold mb-2">
            Year Built
          </label>
          <input
            id="yearBuilt"
            name="yearBuilt"
            type="date"
            value={formData.details.yearBuilt}
            onChange={handleChange}
            className="border text-black px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="rooms" className="text-black font-semibold mb-2">
            Rooms
          </label>
          <input
            id="rooms"
            name="rooms"
            type="number"
            min="0"
            value={formData.details.rooms}
            onChange={handleChange}
            className="border text-black px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center mt-4 col-span-2 space-x-2">
          <input
            type="checkbox"
            id="garage"
            name="garage"
            onChange={(e) => setHasGarage(e.target.checked)}
          />
          <label htmlFor="garage" className="text-black">
            Garage
          </label>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="description" className="text-black font-semibold mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.details.description}
          onChange={handleChange}
          className="mt-2 w-full border text-black px-3 py-2 rounded"
        />
      </div>

      <div className="mt-4">
        <p className="text-black font-semibold mb-1">Property Features</p>
        {[
          "Balcony",
          "Elevator",
          "Swimming Pool",
          "Gym",
          "Garden",
          "Parking",
        ].map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={feature}
              value={feature}
              checked={formData.propertyFeatures.includes(feature)}
              onChange={handleFeatureChange}
            />
            <label htmlFor={feature} className="text-black">
              {feature}
            </label>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {Object.entries(formData.images).map(([key, url], index) => (
          <div key={key} className="space-y-2 relative">
            {url ? (
              <Image
                src={url}
                alt={`Image ${index + 1}`}
                width={150}
                height={100}
                className="rounded"
              />
            ) : (
              <div className="w-full h-24 bg-gray-200 flex justify-center items-center rounded">
                <span>No Image</span>
              </div>
            )}
            <input
              id={`image-${key}`}
              type="file"
              accept="image/*"
              className="hidden"
              required
              onChange={(e) =>
                handleImageUpload(e, key as keyof IListingImages)
              }
            />
            <label
              htmlFor={`image-${key}`}
              className="border rounded-lg border-black outline-none p-3 w-full text-sm text-black cursor-pointer flex justify-start"
            >
              {url ? `Image ${index + 1}` : "Upload Image"}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
