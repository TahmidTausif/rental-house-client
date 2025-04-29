"use client"
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

function useSingleListing(id:string) {
    const axiosPublic = useAxiosPublic()

    const { refetch, isPending, data } = useQuery({
        queryKey: ['singleListings'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/listings/${id}`) ;
            return res.data ;
        },
      })

    return [data, isPending ,refetch]
}

export default useSingleListing;