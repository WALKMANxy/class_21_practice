// src/models/Product.ts
export type Review = {
    rating: number;
    comment: string;
    date: string; // ISO date string
    reviewerName: string;
    reviewerEmail: string;
  };
  
  export type Meta = {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode?: string;
    qrCode?: string; // URL to QR code
  };
  
  export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    discountPercentage: number;
    availabilityStatus: string;
    shippingInformation: string;
    reviews: Review[];
    meta: Meta;
    images: string[]; // List of image URLs
    thumbnail: string; // Thumbnail image URL
    fastShipping?: boolean;
    promoRibbon?: boolean;
  };
  