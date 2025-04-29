/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Lottie from "lottie-react";
import React, { use } from "react";
import paymentSuccess from "../../../../../public/payment-success.json";
import Link from "next/link";
import PrimaryButton from "@/components/shared/PrimaryButton";

const page = ({ params }: any) => {
  const { id }:any = use(params);
  return (
    <div className="">
      <div className="text-center w-1/2 m-auto">
        <Lottie animationData={paymentSuccess} loop={true} />
        <h1 className="flex justify-center items-center font-bold font-mono text-red-500">
          {" "}
          <span className="text-2xl text-black pr-2">
            Transaction ID :{" "}
          </span>{" "}
          {id}{" "}
        </h1>
      </div>
      <div className="my-10 flex gap-4 justify-center">
        <Link href="/">
          <PrimaryButton>Back to home</PrimaryButton>
        </Link>
        <Link href="/dashboard/tenant">
          <PrimaryButton>Back to Dashboard</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default page;
