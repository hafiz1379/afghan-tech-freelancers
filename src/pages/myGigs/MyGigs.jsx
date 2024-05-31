  import React from "react";
  import { Link } from "react-router-dom";
  import { FaTrash } from 'react-icons/fa';
  import "./MyGigs.css"


  const MyGigs = () => {
    return (
      <div className="flex justify-center px-2">
        <div className="md:px-8 py-12 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gigs</h1>
            <Link to="/add"><button className="bg-green-500 text-white font-normal p-2 cursor-pointer">Add New Gig</button></Link>
          </div>
          <table className="w-full">
            <tr className="h-12 table-even-row ">
              <th className="text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">Sales</th>
              <th className="text-left">Action</th>
            </tr>
            <tr className="h-12 table-even-row">
              <td className="td-padding"><img src="/images/man.png" alt="Gig image" className="w-12 h-6 object-cover"/></td>
              <td className="td-padding">Gig1</td>
              <td className="td-padding">88</td>
              <td className="td-padding">123</td>
              <td className="td-padding">
              <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
            <tr className="h-12 table-even-row">
              <td className="td-padding"><img src="/images/man.png" alt="Gig image" className="w-12 h-6 object-cover"/></td>
              <td className="td-padding">Gig1</td>
              <td className="td-padding">88</td>
              <td className="td-padding">123</td>
              <td className="td-padding">
              <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
            <tr className="h-12 table-even-row">
              <td className="td-padding"><img src="/images/man.png" alt="Gig image" className="w-12 h-6 object-cover"/></td>
              <td className="td-padding">Gig1</td>
              <td className="td-padding">88</td>
              <td className="td-padding">123</td>
              <td className="td-padding">
              <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
            <tr className="h-12 table-even-row">
              <td className="td-padding"><img src="/images/man.png" alt="Gig image" className="w-12 h-6 object-cover"/></td>
              <td className="td-padding">Gig1</td>
              <td className="td-padding">88</td>
              <td className="td-padding">123</td>
              <td className="td-padding">
              <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }

  export default MyGigs;