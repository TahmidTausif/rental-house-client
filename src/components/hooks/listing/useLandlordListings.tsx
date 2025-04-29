// src/hooks/listing/useLandlordListings.ts
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const useLandlordListings = (landlordId: string | null) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!landlordId) return;

    setIsPending(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/listings/landlord/${landlordId}`)
      .then((res) => {
        setData(res.data.data); // <-- array of listings
      })
      .catch((err) => console.error(err))
      .finally(() => setIsPending(false));
  }, [landlordId]);

  return [data, isPending] as const; // returns tuple
};

export default useLandlordListings;
