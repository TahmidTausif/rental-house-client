/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import PropertyCard from "@/components/cards/PropertyCard";
import useListing from "@/components/hooks/listing/useLIsting";
import Loader from "@/components/shared/Loader";
import SectionHeader from "@/components/shared/SectionHeader";
import FilterBox from "@/components/tenant/FilterBox";
import { useSearchParams } from "next/navigation";

const PropertyListingPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const type = searchParams.get("type") || "";
  const beds = searchParams.get("beds") || "";
  const baths = searchParams.get("baths") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  
  const initialFilters = {
    searchTerm,
    type,
    beds,
    baths,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    sortBy,
    sortOrder,
    page: 1,
    limit: 6,
  };
  
  const [filters, setFilters] = useState<any>(initialFilters);
  
  // const [filters, setFilters] = React.useState({ page: 1, limit: 6 });
  const [listings, isPending] = useListing(filters);

  const properties = listings?.data?.data ?? [];
  const totalPages = listings?.data?.totalPages ?? 1;

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters({ ...newFilters, page: 1, limit: 6 });
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="container mx-auto w-7/8">
        <SectionHeader subtitle="Rent Your House" title="Listing" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3">
            {properties.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No listings found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
                  {properties.map((property: any) => (
                    <PropertyCard key={property._id} {...property} />
                  ))}
                </div>

                {/* Pagination UI */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2 flex-wrap">
                    <button
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      onClick={() => handlePageChange(filters.page - 1)}
                      disabled={filters.page === 1}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          className={`px-4 py-2 rounded ${
                            filters.page === pageNum
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      )
                    )}

                    <button
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      onClick={() => handlePageChange(filters.page + 1)}
                      disabled={filters.page === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="w-full lg:w-1/3 lg:ml-6 mt-6 lg:mt-0">
            <FilterBox onFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingPage;
