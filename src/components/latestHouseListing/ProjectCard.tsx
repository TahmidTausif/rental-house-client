import { useState } from "react";
import { MapPin, Bath, Bed, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  _id: string;
  images: string[];
  status: string;
  price: number;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  _id,
  images,
  price,
  title,
  location,
  beds,
  baths,
  sqft,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm mx-auto mb-16">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
        <Image
          src={
            images[currentImage] ||
            "https://img.freepik.com/free-vector/hand-drawn-no-photo-sign_23-2149278213.jpg"
          }
          alt={title}
          fill
          className="object-cover"
        />

        {/* Badge */}
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold rounded-md px-3 py-1 z-10">
          For Rent
        </span>

        {/* Controls */}
        {images.length > 1 && (
          <>
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
          </>
        )}
      </div>

      <div className="p-4">
        <Link href={`/listing/${_id}`}>
          <h3 className="text-lg font-semibold hover:text-secondary duration-300  text-gray-800 mb-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
          <MapPin size={14} /> {location}
        </p>
        <span className="text-xl font-bold text-blue-700 block mb-3">
          ${price.toLocaleString()}
          <span className="text-sm text-gray-500 font-normal">/month</span>
        </span>

        <div className="flex items-center text-gray-500 text-sm justify-between">
          <div className="flex items-center gap-1">
            <Bed size={16} /> {beds} Beds
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} /> {baths} Baths
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={16} /> {sqft} sqft
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
