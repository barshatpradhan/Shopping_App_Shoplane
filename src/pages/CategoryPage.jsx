import React from 'react'
import Navbar from '../components/Navbar';
import CategoryNames from '../components/CategoryNames';
import EachCategory from "../components/EachCategory";
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const catName = useParams();
  return (
    <>
      <Navbar />
      <CategoryNames />
      <EachCategory data={ catName } />
    </>
  )
}

export default CategoryPage
