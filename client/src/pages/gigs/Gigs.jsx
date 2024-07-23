import React, { useState, useRef, useEffect } from 'react';
import GigCard from '../../components/gigCard/GigCard';
import { FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/alert/Alert';
import { getGigs } from './../../redux/gigs/gigSlice';
import { useFetcher, useLocation } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

function Gigs() {
  const { gigs, isLoading, hasError } = useSelector((store) => store.gigs);
  const dispatch = useDispatch();
  const [categoryLoading, setCategoryLoading] = useState();
  const [category, setCategory] = useState();
  const { search } = useLocation();
  useEffect(() => {
    dispatch(getGigs(search));
  }, [dispatch]);

  let catID = '';
  if (search) {
    catID = search.split('=')[1];
  }

  useEffect(() => {
    setCategoryLoading(true);
    const fetchCategory = async () => {
      try {
        const res = await newRequest.get(`categories/${catID}`);
        setCategory(res.data.data.category);
      } catch (error) {
        return error;
      }
      setCategoryLoading(false);
    };
    fetchCategory();
  }, [dispatch]);

  if (isLoading || categoryLoading) {
    return <Alert message="Please wait..." />;
  }
  if (hasError) {
    return <Alert message="Something went wrong." />;
  }

  return (
    <div className="p-4 lg:p-12">
      <div className="flex flex-col gap-4">
        {category && (
          <div className="sm:px-1">
            <h1 className="text-2xl font-bold mb-8 text-center">{category.title}</h1>
            <p className="text-gray-600 font-semibold">{category.desc}</p>
          </div>
        )}
        {/* <div className="flex items-center justify-between flex-col sm:flex-row sm:pr-2 ">
            <div className="flex flex-col md:flex-row w-full gap-3 text-gray-500 font-normal lg:mb-0 sm:px-1">
              <span className="sm:mt-1">Budget</span>
              <input
                type="number"
                placeholder="min"
                ref={minRef}
                className="p-1 outline-none border-gray-500 border"
              />
              <input
                type="number"
                placeholder="max"
                ref={maxRef}
                className="p-1 outline-none border-gray-500 border"
              />
              <button className="bg-green-500 text-white font-medium border-none px-2 py-1 rounded-md cursor-pointer hover:bg-green-600">
                Apply
              </button>
            </div>
            <div className="flex items-center gap-2 relative">
              <span className="text-gray-500 font-light text-nowrap">Sort By</span>
              <span
                className="font-medium cursor-pointer text-nowrap"
                onClick={() => setOpen(!open)}
              >
                {sort === 'sales' ? 'Best Selling' : 'Newest'}
              </span>
              <FaChevronDown
                className="text-gray-500 w-4 h-4 cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="p-2 bg-white rounded-sm border border-gray-300 absolute top-8 right-0 text-gray-600">
                  {sort === 'sales' ? (
                    <span className="cursor-pointer">Newest</span>
                  ) : (
                    <span className="cursor-pointer">Best Selling</span>
                  )}
                  <span className="flex">Popular</span>
                </div>
              )}
            </div>
          </div> */}
        {gigs?.length ? (
          <div className="flex flex-wrap">
            {gigs.map((gig) => (
              <GigCard key={gig._id} item={gig} />
            ))}
          </div>
        ) : (
          <Alert message={'This category does not have any service'} />
        )}
      </div>
    </div>
  );
}

export default Gigs;
