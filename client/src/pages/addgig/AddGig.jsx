import { RiCloseLine } from 'react-icons/ri';
import React, { useEffect, useReducer, useState } from 'react';
import { gigReducer, initialState } from '../../reducers/gigReducer';
import upload from '../../utils/upload';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { Label, Loading } from '../../components/UtilComponents/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/categories/categorySlice';
import Alert from '../../components/alert/Alert';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Add = () => {
  const [coverImg, setCoverImg] = useState(undefined);
  const [feature, setFeature] = useState('');
  const { categories, isLoading, hasError } = useSelector((store) => store.categories);
  const dispatchRedux = useDispatch();
  const [state, dispatch] = useReducer(gigReducer, initialState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    dispatchRedux(getCategories());
  }, [dispatchRedux]);

  useEffect(() => {
    if (categories.length) {
      dispatch({ type: 'CHANGE_INPUT', payload: { name: 'categoryId', value: categories[0]._id } });
    }
  }, [categories]);

  const handleChange = (e) => {
    dispatch({ type: 'CHANGE_INPUT', payload: { name: e.target.name, value: e.target.value } });
  };

  const handleFeatures = () => {
    dispatch({ type: 'ADD_FEATURE', payload: feature });
    setFeature('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImg) {
      setError('Please upload a cover image.');
      return;
    }
    try {
      setLoading(true);
      const coverUrl = await upload(coverImg);
      await newRequest.post('gigs', {
        ...state,
        cover: coverUrl,
        images: [coverUrl],
      });
      navigate('/myGigs');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      console.log(state);
    }
  };

  if (isLoading || loading) {
    return <Loading />;
  }
  if (hasError || error) {
    return <Alert message={hasError ? hasError : error} />;
  }

  return (
    <div className='p-4 lg:p-12'>
      <h2 className='h2'>{t('title')}</h2>
      <div className='border rounded'>
        <form onSubmit={handleSubmit} className='sections grid md:grid-cols-2 gap-8 '>
          <div className='md:col-span-1 p-3 rounded'>
            <div className='flex flex-col gap-2'>
              <div className='my-2 flex flex-col'>
                <Label required>{t('fields.title.label')}</Label>
                <input type='text' placeholder={t('fields.title.placeholder')} name='title' onChange={handleChange} required />
              </div>

              <div className='my-2 flex flex-col'>
                <Label required>{t('fields.category.label')}</Label>
                <select name='categoryId' id='cat' onChange={handleChange} required>
                  <option value=''>{t('fields.category.placeholder')}</option>
                  {categories.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className='my-2 flex flex-col'>
                <Label required>{t('fields.coverImage.label')}</Label>
                <input type='file' onChange={(e) => setCoverImg(e.target.files[0])} required />
              </div>

              <div className='my-2 flex flex-col'>
                <Label required>{t('fields.description.label')}</Label>
                <textarea placeholder={t('fields.description.placeholder')} className='h-52' onChange={handleChange} name='desc' required></textarea>
              </div>
            </div>
          </div>

          {/* RIGHT PART */}
          <div className='md:col-span-1 p-3 rounded flex flex-col'>
            <div className='my-2 flex flex-col items-stretch'>
              <label htmlFor='service'>{t('fields.serviceTitle.label')}</label>
              <input type='text' placeholder={t('fields.serviceTitle.placeholder')} onChange={handleChange} name='shortTitle' />
            </div>
            <div className='my-2 flex flex-col items-stretch'>
              <Label required>{t('fields.shortDescription.label')}</Label>
              <textarea placeholder={t('fields.shortDescription.placeholder')} name='shortDesc' onChange={handleChange} required></textarea>
            </div>
            <div className='my-2 flex flex-col items-stretch'>
              <Label required>{t('fields.deliveryTime.label')}</Label>
              <input type='number' min={1} onChange={handleChange} name='deliveryTime' required placeholder='in days' />
            </div>
            <div className='my-2 flex flex-col items-stretch'>
              <Label required>{t('fields.revisionNumber.label')}</Label>
              <input type='number' min={1} onChange={handleChange} name='revisionNumber' required />
            </div>

            <div className='my-2 flex flex-col items-stretch gap-1'>
              <label htmlFor='add-features'>{t('fields.addFeatures.label')}</label>
              <div className='flex gap-2'>
                <input value={feature} type='text' placeholder={t('fields.addFeatures.placeholder')} className='flex-grow' onChange={(e) => setFeature(e.target.value)} />
                <button type='button' onClick={handleFeatures} className='p-2 bg-[#1dbf73] rounded text-white text-lg hover:bg-green-600 transition duration-300'>
                  {t('fields.addFeatures.createButton')}
                </button>
              </div>

              <div className='flex gap-2'>
                {state.features.map((f, index) => (
                  <div key={index + f}>
                    <div className='h-8 text-sm bg-transparent text-black border border-gray-800 rounded-sm px-1 flex gap-3 items-center'>
                      <span>{f}</span>
                      <RiCloseLine cursor='pointer' className='hover:bg-red-200' size={22} onClick={() => dispatch({ type: 'REMOVE_FEATURE', payload: f })} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='my-2 flex flex-col items-stretch'>
              <Label required>{t('fields.price.label')}</Label>
              <input type='number' min={1} onChange={handleChange} name='price' required />
            </div>
            <div className='my-2 flex flex-col'>
              <button type='submit' className='p-3 bg-[#1dbf73] rounded text-white text-lg hover:bg-green-600 transition duration-300'>
                {t('fields.createButton')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
