// src/hooks/eshop/useProducts.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { Product } from '../../models/Product';

const BASE_URL = 'https://dummyjson.com/products';

type UseProductsHook = {
  products: Product[];
  totalProducts: number;
  isLoading: boolean;
  error: string | null;
  fetchProducts: (limit?: number, skip?: number) => Promise<void>;
  searchProducts: (
    query: string,
    limit?: number,
    skip?: number
  ) => Promise<void>;
  // ... other functions
};

const useProducts = (): UseProductsHook => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  const fetchProducts = useCallback(async (limit = 12, skip = 0) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}?limit=${limit}&skip=${skip}`
      );
      const paginatedProducts = response.data.products.map((product: Product) => ({
        ...product,
        fastShipping: /Ships in 1-2 business days|Ships overnight/i.test(
          product.shippingInformation
        ),
        promoRibbon: product.discountPercentage > 10,
      }));
      setProducts(paginatedProducts);
      setTotalProducts(response.data.total);
    } catch (err: unknown) {
      setError('Failed to fetch products. Please try again later.');
      console.warn('Failed to fetch products. Please try again later.' + err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search products
  const searchProducts = useCallback(
    async (query: string, limit = 12, skip = 0) => {
      setIsLoading(true);
      setError(null);

      try {
        const normalizedQuery = query.trim().toLowerCase();
        const response = await axios.get(
          `${BASE_URL}/search?q=${normalizedQuery}&limit=${limit}&skip=${skip}`
        );
        const filteredProducts = response.data.products.map((product: Product) => ({
          ...product,
          fastShipping: /Ships in 1-2 business days|Ships overnight/i.test(
            product.shippingInformation
          ),
          promoRibbon: product.discountPercentage > 10,
        }));
        setProducts(filteredProducts);
        setTotalProducts(response.data.total);
      } catch (err: unknown) {
        setError('Failed to fetch products. Please try again later.');
        console.warn('Failed to fetch products. Please try again later.' + err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // ... Other functions (fetchProductById, fetchProductsByCategory)

  return {
    products,
    totalProducts,
    isLoading,
    error,
    fetchProducts,
    searchProducts,
    // ... other functions
  };
};

export default useProducts;
