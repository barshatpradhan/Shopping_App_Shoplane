import React from 'react'
import Navbar from '../components/Navbar';
import CategoryNames from '../components/CategoryNames';
import ProductDetail from "../components/ProductDetail";
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
 return (
   <>
     <Navbar />
     <CategoryNames />
     <ProductDetail data={id} />
   </>
  )
}

export default ProductDetailPage;
