import { Session as NextAuthSession } from "next-auth";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'tenant' | 'landlord';
  imageUrl: string;
  accessToken: string;
}

export interface Session extends NextAuthSession {
  accessToken: string;
  user: User;
}

export interface IBooking {
  _id: string;
  listing: {
    _id: string;
    title: string;
    address: string;
  };
  bookingStatus: "accepted" | "rejected" | "cancelled" | "pending";
  paymentStatus: boolean;
  tenant: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  landlord: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}


export type ListingType = 'apartment' | 'house' | 'villa' | 'townhouse';
export type statusType = 'available' | 'not available';


export interface IListingImages {
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
}

export interface IListingDetails {
  description: string;
  rooms: number;
  garage: string;
  yearBuilt: Date;
}

export interface ILandlord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  // any other fields like imageUrl or role can go here too
}

export interface IListing {
  _id?: string;
  landlord: ILandlord;
  images?: IListingImages;
  flatPlan?: string;
  title: string;
  address: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  type: ListingType;
  status: statusType;
  propertyFeatures: string[];
  details: IListingDetails;
  createdAt?: Date;
  updatedAt?: Date;
}