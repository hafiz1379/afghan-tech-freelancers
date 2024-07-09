import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import getCurrentUser from '../../utils/getCurentUser';
import newRequest from '../../utils/newRequest';
import Alert from '../../components/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getGigs } from '../../redux/gigs/gigSlice';
import { Loading } from '../../components/UtilComponents/Utils';

const MyGigs = () => {
  const currentUser = getCurrentUser();

  const { gigs: data, isLoading, hasError } = useSelector((store) => store.gigs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGigs(`?userId=${currentUser._id}`));
  }, [dispatch]);

  const handleDelete = async (id) => {
    await newRequest.delete(`gigs/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Alert message="Something went wrong" />;
  }

  return (
    <div className="flex justify-center px-2">
      {isLoading ? (
        <Alert message="Loading..." />
      ) : hasError ? (
        <Alert message="Something went wrong" />
      ) : (
        <div className="md:px-8 py-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Gigs</h1>
            {/* <Link to="/add"> */}
            <Link to="/addGig">
              <button className="bg-green-500 text-white font-normal p-2 rounded-md cursor-pointer hover:bg-green-600">
                Add New Gig
              </button>
            </Link>
            {/* </Link> */}
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 h-12">
                <th className="text-left p-2 border-b border-gray-300">Image</th>
                <th className="text-left p-2 border-b border-gray-300">Title</th>
                <th className="text-left p-2 border-b border-gray-300">Price</th>
                <th className="text-left p-2 border-b border-gray-300">Sales</th>
                <th className="text-left p-2 border-b border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => (
                <tr className="h-12 hover:bg-gray-50" key={gig._id}>
                  <td className="p-2 border-b border-gray-300">
                    <img src={gig.cover} alt="Gig" className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="p-2 border-b border-gray-300">{gig.title}</td>
                  <td className="p-2 border-b border-gray-300">{gig.price}</td>
                  <td className="p-2 border-b border-gray-300">{gig.sales}</td>
                  <td className="p-2 pl-6 border-b border-gray-300">
                    <FaTrash
                      className="text-red-500  cursor-pointer hover:text-red-700"
                      onClick={() => handleDelete(gig._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGigs;
