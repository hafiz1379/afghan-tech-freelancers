import React from "react";
import { RiMessage2Fill } from "react-icons/ri";
import "./Orders.css"

const Orders = () => {

  const currentUser = {
    id: 1,
    username: "John Doe",
    isSeller: true,
  }; 
    return (
      <div className="flex justify-center px-2">
        <div className="md:px-8 py-12 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Orders</h1>
          </div>
          <table className="w-full">
            <tr className="h-12 table-even-row">
              <th className="text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
              <th className="text-left">Contact</th>
            </tr>
            <tr className="h-12 table-even-row">
              <td className="td-padding"><img src="/images/man.png" alt="Gig image" className="w-12 h-6 object-cover"/></td>
              <td className="td-padding">Gig1</td>
              <td className="td-padding">88</td>
              <td className="td-padding">123</td>
              <td className="td-padding">
              <RiMessage2Fill  className="text-blue-500 cursor-pointer" />
              </td>
            </tr>
            <tr className="h-12 table-even-row">
              <td className="td-padding"><img src="/images/man.png" alt="Gig image" className="w-12 h-6 object-cover"/></td>
              <td className="td-padding">Gig1</td>
              <td className="td-padding">88</td>
              <td className="td-padding">123</td>
              <td className="td-padding">
              <RiMessage2Fill  className="text-blue-500 cursor-pointer" />
              </td>
            </tr>
            <tr className="h-12 table-even-row">
              <td className="td-padding"><img src="/images/man.png" alt="Gig image" className="w-12 h-6 object-cover"/></td>
              <td className="td-padding">Gig1</td>
              <td className="td-padding">88</td>
              <td className="td-padding">123</td>
              <td className="td-padding">
              <RiMessage2Fill  className="text-blue-500 cursor-pointer" />
              </td>
            </tr>
            <tr className="h-12 table-even-row">
              <td className="td-padding"><img src="/images/man.png" alt="Gig image" className="w-12 h-6 object-cover"/></td>
              <td className="td-padding">Gig1</td>
              <td className="td-padding">88</td>
              <td className="td-padding">123</td>
              <td className="td-padding">
              <RiMessage2Fill  className="text-blue-500 cursor-pointer" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
}

export default Orders;