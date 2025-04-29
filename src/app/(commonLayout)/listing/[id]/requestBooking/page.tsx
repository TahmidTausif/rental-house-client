/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/components/shared/SecondaryButton";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import useSingleListing from "@/components/hooks/listing/useSingleListing";
import { useSession } from "next-auth/react";
import useAxiosPublic from "@/components/hooks/listing/useAxiosPublic";
import Loader from "@/components/shared/Loader";

const RequestBooking = ({ params }: any) => {
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const { id }: any = use(params);
  const [data, isPending] = useSingleListing(id);

  const listing = data?.data;
  const { data: session, status } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formData || {},
  });

  useEffect(() => {
    if (listing && user) {
      const newFormData = {
        tenant: user?.id || "68067216b461d20fc2aa0479",
        landlord: listing?.landlord?._id,
        listing: id,
        details: {
          message: "",
          familyMembers: "",
          children: "",
        },
        paymentStatus: false,
      };
      setFormData(newFormData);
      reset(newFormData);
    }
  }, [listing, user, id, reset]);

  if (status === "loading" || isPending || !formData) return <Loader />;
  if (!session) return <div>You need to sign in</div>;

  const onSubmit = (data: any) => {
    console.log(data);

    axiosPublic.post("/booking-request/create-booking", data).then((data) => {
      console.log(data.data.data);
      if (data?.data?.data) {
        Swal.fire({
          title: "Good job!",
          text: "Booking Request Successfull!",
          icon: "success"
        });
      }

      router.push("/dashboard/tenant/rental-request");
    });

    reset();
  };

  return (
    <div className="md:w-7/8 mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Booking Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Request a Booking
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <div className="p-3 bg-gray-100 rounded text-gray-800">
              {user?.name}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <div className="p-3 bg-gray-100 rounded text-gray-800">
              {user?.phone}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="p-3 bg-gray-100 rounded text-gray-800">
              {user?.email}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Family Members</label>
            <select
              {...register("details.familyMembers", {
                required: "Family members is required",
              })}
              className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-secondary"
            >
              <option value="">Select family members</option>
              <option value="1">1 Member</option>
              <option value="2">2 Members</option>
              <option value="3">3 Members</option>
              <option value="4">4 Members</option>
              <option value="5">5 Members</option>
              <option value="6">6 Members</option>
              <option value="7">7 Members</option>
              <option value="8">8 Members</option>
              <option value="9">9 Members</option>
              <option value="10">10 Members</option>
            </select>
            {(errors.details as any)?.familyMembers && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.details as any).familyMembers.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Children</label>
            <select
              {...register("details.children", {
                required: "Children field is required",
              })}
              className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-secondary"
            >
              <option value="">Select children</option>
              <option value="0">No Children</option>
              <option value="1">1 Child</option>
              <option value="2">2 Children</option>
              <option value="3+">3+ Children</option>
            </select>
            {(errors.details as any)?.children && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.details as any).children.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Additional Message</label>
            <textarea
              {...register("details.message")}
              className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-secondary"
              rows={4}
              placeholder="Write a message to the landlord..."
            />
          </div>

          <SecondaryButton type="submit" className="w-full">
            Submit Request
          </SecondaryButton>
        </form>
      </div>

      {/* Property Summary */}
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-5">
        <h3 className="text-2xl font-semibold text-primary mb-3">
          Selected Property
        </h3>
        {listing?.images?.img1 && (
          <Image
            src={listing.images.img1}
            alt="Property"
            width={600}
            height={400}
            className="rounded-lg w-full h-64 object-cover"
          />
        )}
        <div>
          <p className="text-xl font-bold text-gray-800">{listing?.title}</p>
          <p className="text-gray-500 text-sm">{listing?.address}</p>
          <p className="text-xl text-primary font-semibold mt-2">
            ৳ {listing?.price} / month
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default RequestBooking;