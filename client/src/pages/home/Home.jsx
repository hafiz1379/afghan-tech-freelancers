import React, { useEffect } from 'react';
import Featured from '../../components/featured/Featured';
import Slide from '../../components/Slide/Slide';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import Features from '../../components/features/Features';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/categories/categorySlice';
import Alert from '../../components/alert/Alert';
import { Loading } from '../../components/UtilComponents/Utils';

export default function Home() {
  const { categories, isLoading, hasError } = useSelector((store) => store.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  if (hasError) {
    return <Alert message="Something went wrong." />;
  }
  return (
    <div>
      <Featured />
      <Slide>
        {categories?.map((category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
      </Slide>
      <Features />
    </div>
  );
}
