"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import SecondaryButton from "../shared/SecondaryButton";

interface FilterSectionProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const FilterBox: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [keywords, setKeywords] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortBy, setSortBy] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  const applyFilters = () => {
    const filters: Record<string, any> = {};

    if (keywords) filters.searchTerm = keywords;
    if (propertyType) filters.type = propertyType;
    if (minPrice !== "") filters.minPrice = minPrice;
    if (maxPrice !== "") filters.maxPrice = maxPrice;

    if (sortBy === "price-low-high") {
      filters.sortBy = "price";
      filters.sortOrder = "asc";
    } else if (sortBy === "price-high-low") {
      filters.sortBy = "price";
      filters.sortOrder = "desc";
    }

    if (beds) filters.beds = beds;
    if (baths) filters.baths = baths;

    onFilterChange(filters);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md sticky top-20">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Filter By Features
      </h2>

      {/* Keywords */}
      <div className="mb-3 lg:mb-6">
        <input
          type="text"
          className="shadow bg-gray-50 rounded w-full p-3 lg:p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>

      {/* Property Type */}
      <div className="mb-3 lg:mb-6">
        <select
          className="bg-gray-50 shadow rounded w-full p-3 lg:p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Filter by Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="townhouse">Townhouse</option>
        </select>
      </div>

      {/* Beds & Baths */}
      <div className="mb-3 lg:mb-6 md:flex md:space-x-4">
        <div className="w-full mb-3 md:mb-0">
          <select
            className="bg-gray-50 shadow rounded w-full p-3 lg:p-4 text-gray-700 focus:outline-none"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          >
            <option value="">Beds</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10+</option>
          </select>
        </div>
        <div className="w-full">
          <select
            className="bg-gray-50 shadow rounded w-full p-3 lg:p-4 text-gray-700 focus:outline-none"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
          >
            <option value="">Baths</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10+</option>
          </select>
        </div>
      </div>

      {/* Min Price and Max Price */}
      <div className="mb-3 lg:mb-6">
        <div className="flex items-center">
          <input
            type="number"
            className="bg-gray-50 shadow rounded w-1/2 p-3 lg:p-4 text-gray-700 focus:outline-none focus:shadow-outline mr-2"
            placeholder="Min Price"
            name="minPrice"
            value={minPrice ?? ""}
            onChange={(e) =>
              setMinPrice(e.target.value ? parseInt(e.target.value) : "")
            }
          />
          <span className="mx-2">-</span>
          <input
            type="number"
            className="bg-gray-50 shadow rounded w-1/2 p-3 lg:p-4 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Max Price"
            name="maxPrice"
            value={maxPrice ?? ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? parseInt(e.target.value) : "")
            }
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <select
          className="bg-gray-50 shadow rounded w-full p-3 lg:p-4 text-gray-700 focus:outline-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Select Sorting</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      <div className="flex justify-center items-center">
        <SecondaryButton onClick={applyFilters} customClass="w-full">
          Filter By Features
        </SecondaryButton>
      </div>
    </div>
  );
};

export default FilterBox;
