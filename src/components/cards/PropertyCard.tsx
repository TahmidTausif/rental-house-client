import { FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import PrimaryButton from "../shared/PrimaryButton";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface PropertyCardProps {
  _id:string
  images: {
    img1?: string;
    img2?: string;
    img3?: string;
    img4?: string;
    img5?: string;
  };
  forRent?: boolean;
  price: string;
  title: string;
  address: string;
  beds?: number;
  baths?: number;
  sqft?: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  _id,
  images,
  price,
  title,
  address,
  beds,
  baths,
  sqft,
}) => {
  const imageList = Object.values(images);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % imageList.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
        {/* Image Carousel */}
        <Image
          src={imageList[currentImage] || "https://img.freepik.com/free-vector/hand-drawn-no-photo-sign_23-2149278213.jpg?ga=GA1.1.1518679940.1727447932&semt=ais_hybrid&w=740"}
          alt={title}
          fill
          className="rounded-t-lg object-cover"
        />

        {/* Badge */}
        <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold rounded-md px-4 py-2 z-10">
          For Rent
        </span>

        {/* Carousel Controls */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70"
        >
          ›
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          <FaMapMarkerAlt className="inline-block mr-1" /> {address}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary">{price}/-</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          {beds !== undefined && (
            <div className="mr-4">
              <FaBed className="inline-block mr-1" /> {beds} Beds
            </div>
          )}
          {baths !== undefined && (
            <div className="mr-4">
              <FaBath className="inline-block mr-1" /> {baths} Baths
            </div>
          )}
          {sqft !== undefined && (
            <div>
              <FaRulerCombined className="inline-block mr-1" /> {sqft} sqft
            </div>
          )}
        </div>
        <div className="mt-4">
          <Link href={`/listing/${_id}`}>
            <PrimaryButton customClass="w-full">View Details</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
