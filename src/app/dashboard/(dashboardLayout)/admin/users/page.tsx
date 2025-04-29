import ManageUsers from '@/components/dashboard/admin/ManageUsers';
import React from 'react';

const page = () => {
    return (
        <div>
            <h1 className="text-center font-bold text-2xl lg:text-3xl my-5">All Users Data</h1>
            <ManageUsers/>
        </div>
    );
};

export default page;