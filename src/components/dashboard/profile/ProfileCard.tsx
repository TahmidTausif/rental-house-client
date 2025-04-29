
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '@/components/shared/Loader'; 
import { useSession } from 'next-auth/react'; 
import PrimaryButton from '@/components/shared/PrimaryButton';
import SecondaryButton from '@/components/shared/SecondaryButton';
import { useRouter } from 'next/navigation';
import Image from "next/image";


interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
}

const ProfileCard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userEmail = session?.user?.email;
  const token = session?.accessToken;

  console.log(userEmail)

  // Fetch profile data on component mount
  useEffect(() => {
    if (!userEmail) return;

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getSingle/${userEmail}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Send token as Bearer token
                },
              }
        );
        setProfileData(response.data.data);
      } catch (err) {
        setError('Error fetching profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userEmail, token]);

  

  // Handle Edit Profile and Change Password buttons
  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    router.push('/dashboard/profile/update-profile');
  };

  const handleChangePassword = () => {
    // Logic for changing password
    console.log('Change password clicked');
    router.push('/dashboard/profile/change-password');
  };

  if (status === 'loading') return <div>Loading session...</div>;
  if (status === 'unauthenticated') return <div>Please log in to view your profile.</div>;
  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 mt-8 max-w-md mx-auto bg-white rounded-lg shadow-theme">
      {/* Image Section */}
      <div className="mb-4 flex justify-center">
        <Image 
          src={profileData?.imageUrl || '/default-profile.png'}
          alt="Profile Image"
          width={32}
          height={32}
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>
  
      {/* Profile Information */}
      <div className="mb-4 text-black">
        <strong>Name:</strong> {profileData?.name || 'N/A'}
      </div>
      <div className="mb-4 text-black">
        <strong>Email:</strong> {profileData?.email || 'N/A'}
      </div>
      <div className="mb-4 text-black">
        <strong>Phone:</strong> {profileData?.phone || 'N/A'}
      </div>
  
      {/* Buttons */}
      <div className="flex justify-center mt-6 gap-4">
        <PrimaryButton onClick={handleEditProfile} className="w-full bg-primary text-white">
          Edit Profile
        </PrimaryButton>
        <SecondaryButton onClick={handleChangePassword} className="w-full bg-secondary text-white">
          Change Password
        </SecondaryButton>
      </div>
    </div>
  );
  
};

export default ProfileCard;
