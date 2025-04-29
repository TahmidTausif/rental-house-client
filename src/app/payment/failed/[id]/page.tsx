"use client";
import Lottie from "lottie-react";
import paymentFailed from "../../../../../public/payment-failed.json";
import Link from "next/link";
import PrimaryButton from "@/components/shared/PrimaryButton";

const page = () => {

  return (
    <div className="">
      <div className="text-center w-1/2 m-auto">
        <Lottie animationData={paymentFailed} loop={true} />
        <h1 className="flex justify-center items-center font-bold font-mono text-2xl text-red-500">
          Please, Try Again!{" "}
        </h1>
      </div>
      <div className="my-10 flex gap-4 justify-center items-center">
        <Link href="/dashboard/tenant">
          <PrimaryButton>Back to Dashboard</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default page;
