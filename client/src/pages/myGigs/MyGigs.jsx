import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import getCurrentUser from '../../utils/getCurentUser';
import newRequest from '../../utils/newRequest';
import Alert from '../../components/alert/Alert';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const MyGigs = () => {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () =>
      newRequest.get(`gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('myGigs');
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="flex justify-center px-2">
      {isLoading ? (
        <Alert message="Loading..." />
      ) : error ? (
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
                    <FaTrash className="text-red-500  cursor-pointer hover:text-red-700" onClick={() => handleDelete(gig._id)} />
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
