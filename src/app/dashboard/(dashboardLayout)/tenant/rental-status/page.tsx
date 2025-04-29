import RentedHouse from '@/components/dashboard/tenant/rental-status/RentedHouse';
import React from 'react';

const page = () => {
  return (
    <div>
      <h1 className="text-left font-bold text-2xl lg:text-3xl my-5">My Rental Status</h1>
      <RentedHouse/>
    </div>
  );
};

export default page;