// src/hooks/eshop/useProducts.ts

import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Product } from "../../models/Product";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store"; // Adjust the import path based on your project structure

const BASE_URL = "https://dummyjson.com/products";
const CATEGORIES_URL = "https://dummyjson.com/products/category-list";

// Define a cache for category-based products
const categoryCache: Map<string, Product[]> = new Map();

type UseProductsHook = {
  products: Product[];
  totalProducts: number;
  isLoading: boolean;
  error: string | null;
  categories: string[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  fetchProducts: (limit?: number, skip?: number) => Promise<void>;
  searchProducts: (
    query: string,
    limit?: number,
    skip?: number
  ) => Promise<void>;
  fetchProductsByCategory: (
    category: string,
    limit?: number,
    skip?: number
  ) => Promise<void>;
  fetchProductById: (id: number) => Promise<Product | null>;
};

const useProducts = (): UseProductsHook => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const selectedCategory = useSelector(
    (state: RootState) => state.search.category
  );

  // Fetch all products (without category filtering)
  const fetchProducts = useCallback(async (limit = 12, skip = 0) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}?limit=${limit}&skip=${skip}`
      );
      const paginatedProducts = response.data.products.map(
        (product: Product) => ({
          ...product,
          fastShipping: /Ships in 1-2 business days|Ships overnight/i.test(
            product.shippingInformation
          ),
          promoRibbon: product.discountPercentage > 10,
        })
      );
      setProducts(paginatedProducts);
      setTotalProducts(response.data.total);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch products. Please try again later."
        );
      } else {
        setError("An unexpected error occurred while fetching products.");
      }
      console.warn("Failed to fetch products.", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchProducts = useCallback(
    async (query: string, limit = 12, skip = 0) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const normalizedQuery = query.trim().toLowerCase();
  
        let fetchedProducts: Product[] = [];
  
        if (selectedCategory) {
          // Check if products for the selected category are already cached
          if (categoryCache.has(selectedCategory)) {
            fetchedProducts = categoryCache.get(selectedCategory) || [];
          } else {
            // Fetch all products within the selected category
            const response = await axios.get(
              `${BASE_URL}/category/${encodeURIComponent(
                selectedCategory
              )}?limit=1000&skip=0`
            );
            fetchedProducts = response.data.products.map((product: Product) => ({
              ...product,
              fastShipping: /Ships in 1-2 business days|Ships overnight/i.test(
                product.shippingInformation
              ),
              promoRibbon: product.discountPercentage > 10,
            }));
            // Cache the fetched products for the category
            categoryCache.set(selectedCategory, fetchedProducts);
          }
  
          // Initialize filteredProducts with all fetched products
          let filteredProducts = fetchedProducts;
  
          if (normalizedQuery) {
            // Filter the fetched products based on the search query (name and description)
            filteredProducts = fetchedProducts.filter(
              (product) =>
                product.title.toLowerCase().includes(normalizedQuery) ||
                product.description.toLowerCase().includes(normalizedQuery)
            );
          }
  
          // Apply pagination
          const paginatedProducts = filteredProducts.slice(skip, skip + limit);
  
          setProducts(paginatedProducts);
          setTotalProducts(filteredProducts.length);
        } else {
          // Perform a general search across all products
          const response = await axios.get(
            `${BASE_URL}/search?q=${normalizedQuery}&limit=${limit}&skip=${skip}`
          );
          const filteredProducts = response.data.products.map(
            (product: Product) => ({
              ...product,
              fastShipping: /Ships in 1-2 business days|Ships overnight/i.test(
                product.shippingInformation
              ),
              promoRibbon: product.discountPercentage > 10,
            })
          );
          setProducts(filteredProducts);
          setTotalProducts(response.data.total);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Failed to fetch products. Please try again later."
          );
        } else {
          setError("An unexpected error occurred while fetching products.");
        }
        console.warn("Failed to fetch products.", err);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCategory]
  );
  
  // Fetch products by category (used when a category is selected)
  const fetchProductsByCategory = useCallback(
    async (category: string, limit = 12, skip = 0) => {
      setIsLoading(true);
      setError(null);

      try {
        // Check if products for the selected category are already cached
        if (categoryCache.has(category)) {
          const categorizedProducts = categoryCache.get(category) || [];
          const paginatedProducts = categorizedProducts.slice(
            skip,
            skip + limit
          );
          setProducts(paginatedProducts);
          setTotalProducts(categorizedProducts.length);
        } else {
          // Fetch all products within the selected category
          const response = await axios.get(
            `${BASE_URL}/category/${encodeURIComponent(
              category
            )}?limit=1000&skip=0`
          );
          const categorizedProducts = response.data.products.map(
            (product: Product) => ({
              ...product,
              fastShipping: /Ships in 1-2 business days|Ships overnight/i.test(
                product.shippingInformation
              ),
              promoRibbon: product.discountPercentage > 10,
            })
          );
          // Cache the fetched products for the category
          categoryCache.set(category, categorizedProducts);
          // Apply pagination
          const paginatedProducts = categorizedProducts.slice(
            skip,
            skip + limit
          );
          setProducts(paginatedProducts);
          setTotalProducts(categorizedProducts.length);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Failed to fetch products by category. Please try again later."
          );
        } else {
          setError(
            "An unexpected error occurred while fetching products by category."
          );
        }
        console.warn("Failed to fetch products by category.", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    setCategoriesLoading(true);
    setCategoriesError(null);

    try {
      const response = await axios.get<string[]>(CATEGORIES_URL);
      setCategories(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setCategoriesError(
          err.response?.data?.message ||
            "Failed to fetch categories. Please try again later."
        );
      } else {
        setCategoriesError(
          "An unexpected error occurred while fetching categories."
        );
      }
      console.warn("Failed to fetch categories.", err);
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  // Fetch categories on hook initialization
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch a specific product by ID
  const fetchProductById = useCallback(
    async (id: number): Promise<Product | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        const product: Product = {
          ...response.data,
          fastShipping: /Ships in 1-2 business days|Ships overnight/i.test(
            response.data.shippingInformation
          ),
          promoRibbon: response.data.discountPercentage > 10,
        };
        return product;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Failed to fetch the product. Please try again later."
          );
        } else {
          setError("An unexpected error occurred while fetching the product.");
        }
        console.warn("Failed to fetch the product.", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );


  return {
    products,
    totalProducts,
    isLoading,
    error,
    categories,
    categoriesLoading,
    categoriesError,
    fetchProducts,
    searchProducts,
    fetchProductsByCategory,
    fetchProductById,
  };
};

export default useProducts;
