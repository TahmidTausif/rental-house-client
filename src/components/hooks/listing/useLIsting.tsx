/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const buildQueryParams = (filters: Record<string, any>) => {
  const query = new URLSearchParams();
  for (const key in filters) {
    if (filters[key] !== undefined && filters[key] !== "") {
      query.append(key, filters[key]);
    }
  }
  return query.toString();
};

function useListing(filters: Record<string, any> = {}) {
  const axiosPublic = useAxiosPublic();

  const queryString = buildQueryParams(filters);

  const { refetch, isPending, data: listings = [] } = useQuery({
    queryKey: ["listings", filters], // key includes filters to re-fetch on change
    queryFn: async () => {
      const res = await axiosPublic.get(`/listings?${queryString}`);
      return res.data;
    },
  });

  return [listings, isPending, refetch];
}

export default useListing