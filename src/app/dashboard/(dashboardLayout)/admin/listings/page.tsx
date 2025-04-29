import ManageAllListings from '@/components/dashboard/admin/ManageAllListings';
import React from 'react';

const page = () => {
    return (
        <div>
            <h1 className="text-center font-bold text-2xl lg:text-3xl my-5">All Listings Data</h1>
            <ManageAllListings/>
        </div>
    );
};

export default page;