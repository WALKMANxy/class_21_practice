// src/pages/ProductListPage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchQuery } from '../store/search/searchSlice';
import ProductsList from '../components/shop/search/ProductList';

const ProductListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const query = params.get('query') || '';
     
        dispatch(setSearchQuery(query));
      
    }, [location.search, dispatch, navigate]);
  
    return (
      <div>
        <ProductsList />
      </div>
    );
  };

export default ProductListPage;
