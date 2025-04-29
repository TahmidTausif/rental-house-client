import ManageRentalListings from '@/components/dashboard/landlord/ManageRentalListings';
import React from 'react';

const page = () => {
    return (
        <div>
            <h1 className="text-center font-bold text-2xl lg:text-3xl my-5">My Rental Houses</h1>
            <ManageRentalListings/>
        </div>
    );
};

export default page;