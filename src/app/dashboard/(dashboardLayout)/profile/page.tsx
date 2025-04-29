import ProfileCard from '@/components/dashboard/profile/ProfileCard';
import React from 'react';

const page = () => {
    return (
        <div>
            <h1 className="text-center font-bold text-2xl lg:text-3xl my-5">My Profile</h1>
            <ProfileCard/>
        </div>
    );
};

export default page;