import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import CategoryDetailModal from './CategoryDetailModal'; // Import the new component

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to manage selected category
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await newRequest.get('categories');
        setCategories(res.data.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this category?');
    if (confirmed) {
      try {
        await newRequest.delete(`categories/${id}`);
        setCategories(categories.filter((category) => category._id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  const handleDetail = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  if (loading) {
    return <p>Please wait...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  return (
    <div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>List of all categories:</h5>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Description</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <Category
                  category={category}
                  index={index}
                  key={category._id}
                  onDelete={handleDelete}
                  onDetail={handleDetail} // Pass the detail handler
                />
              ))}
            </tbody>
          </table>
          <Link className='btn btn-primary' to='/categories/add-category'>
            Create new category
          </Link>
        </div>
      </div>
      {showModal && <CategoryDetailModal category={selectedCategory} show={showModal} onClose={handleCloseModal} />} {/* Render the modal */}
    </div>
  );
}

const Category = ({ category, index, onDelete, onDetail }) => {
  const navigate = useNavigate();
  return (
    <tr>
      <th scope='row'>{index + 1}</th>
      <td>{category.title}</td>
      <td>{`${category.desc.substring(0, Math.min(30, category.desc.length))}...`}</td>
      <td>
        <button type='button' className='btn btn-danger btn-sm me-2' onClick={() => onDelete(category._id)}>
          Delete
        </button>
        <button type='button' className='btn btn-primary btn-sm me-2' onClick={() => navigate(`/categories/update-category/${category._id}`)}>
          Update
        </button>
        <button type='button' className='btn btn-info btn-sm' onClick={() => onDetail(category)}>
          Detail
        </button>
      </td>
    </tr>
  );
};
