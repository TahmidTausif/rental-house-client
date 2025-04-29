/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useSingleListing from "@/components/hooks/listing/useSingleListing";
import Loader from "@/components/shared/Loader";
import SecondaryButton from "@/components/shared/SecondaryButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import {
  FaMapMarkerAlt,
  FaRegCheckSquare,
  FaRulerCombined,
} from "react-icons/fa";
import Swal from "sweetalert2";

const PropertyDetails = ({ params }: any) => {
  const router = useRouter();
  const { id }: any = use(params);
  const [data, isPending] = useSingleListing(id);

  const property = data?.data;

  // get the current user ===
  const { data: session } = useSession();
  const user = session?.user;
  // if (status === "loading") return <Loader />;
  // if (!session) return <div>You need to sign in</div>;
  console.log(user?.role);

  const formattedDate = new Date(
    property?.details?.yearBuilt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleBookingRequestClick = () => {
    if (user?.role !== "tenant") {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Please log in as a tenant to request a booking.",
        confirmButtonText: "Go to Login",
      }).then(() => {
        router.push("/login");
      });
    } else {
      router.push(`/listing/${id}/requestBooking`);
    }
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="container md:w-7/8 mx-auto px-4 py-8 text-gray-800">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold">{property?.title}</h2>
          {/* Address and Size */}
          <div className="flex flex-wrap gap-4 items-center text-gray-500  text-sm">
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-1" /> {property?.address}
            </p>
            <p className="flex items-center">
              <FaRulerCombined className="mr-1" /> {property?.sqft} Sqft
            </p>
          </div>
          <p className="text-red-600 text-xl md:text-2xl font-semibold ">
            {property?.price} /-
          </p>
        </div>

        <div>
          <Link href={`/listing/${id}/requestBooking`}>
            <SecondaryButton onClick={handleBookingRequestClick}>
              Request Booking
            </SecondaryButton>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-10">
        {/*======== left side ======= */}
        <div className="md:w-3/4">
          <div>
            {/* Main Image */}
            <div className="relative w-full h-64 md:h-[400px] mb-6 rounded-lg overflow-hidden">
              <Image
                src={property?.images?.img1}
                alt="property"
                fill
                className="object-cover"
              />
              <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded">
                For Rent
              </span>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {property?.details?.description}
              </p>
            </div>
          </div>

      {/* Floor Plan */}
      <div className="mb-10">
        <h3 className="text-2xl lg:text-3xl font-semibold mb-4">Floor Plans</h3>
        <Image
          src={property?.flatPlan}
          alt="Floor Plan"
          width={700}
          height={500}
        />
      </div>
        </div>

        {/* ============right side ========= */}
        <div className="md:w-2/6">
          {/* Property Details Grid */}
          <div className="mb-10">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
              Property Details
            </h3>
            <div className="flex flex-col md:flex-wrap gap-4 text-gray-700">
              <p>
                <strong>Property phone:</strong> {property?.landlord.phone}
              </p>
              <p>
                <strong>Property Type:</strong> {property?.type}
              </p>
              <p>
                <strong>Property Status:</strong> {property?.status}
              </p>
              <p>
                <strong>Property Price:</strong>
                <strong>{property?.price}</strong>
              </p>
              <p>
                <strong>Rooms:</strong> {property?.details?.rooms}
              </p>
              <p>
                <strong>Location:</strong> {property?.address}
              </p>
              <p>
                <strong>Bath:</strong> {property?.baths}
              </p>
              <p>
                <strong>Garage:</strong> {property?.details?.garage}
              </p>
              <p>
                <strong>Year Built:</strong> {formattedDate}
              </p>
            </div>
          </div>

          {/* Property Features */}
          <div className="mb-10">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
              Property Features
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {property?.propertyFeatures?.map((feature: string, idx: any) => (
                <div key={idx} className="flex items-center text-gray-600">
                  <FaRegCheckSquare className="text-red-500 mr-2 text-base" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landlord Info */}
          <div className="mb-10">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
              Landlord Information
            </h3>
            <div className="flex items-center gap-4 text-gray-700">
              <div>
                <p>
                  <strong>Name:</strong> {property?.landlord?.name}
                </p>
                <p>
                  <strong>Email:</strong> {property?.landlord?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {property?.landlord?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floor Plan */}
      <div className="mb-10">
        <h3 className="text-2xl lg:text-3xl font-semibold mb-4">Floor Plans</h3>
        <Image src={property?.flatPlan} width={300} height={300} alt="Floor Plan" className="" />
      </div>
    </div>
  );
};

export default PropertyDetails;
