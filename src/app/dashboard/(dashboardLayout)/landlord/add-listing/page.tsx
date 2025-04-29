import AddListingPage from '@/components/dashboard/landlord/AddListingPage';
import React from 'react';

const page = () => {
    return (
        <div>
            <h1 className="text-center font-bold text-2xl lg:text-3xl my-5">Create New Listing</h1>
            <AddListingPage/>
        </div>
    );
};

export default page;