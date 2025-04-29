import ManageRentalRequests from '@/components/dashboard/landlord/ManageRentalRequests';
import React from 'react';

const page = () => {
    return (
        <div>
           <h1 className="text-center font-bold text-2xl lg:text-3xl my-5">My Rental Requests</h1> 
           <ManageRentalRequests/>
        </div>
    );
};

export default page;