import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdAccessTime } from 'react-icons/md';
import newRequest from '../../utils/newRequest';
import Stars from '../../components/Stars/Stars';
import ReviewContainer from '../../components/reviews/ReviewContainer';
import getCurrentUser from '../../utils/getCurentUser';
import { getGigs } from '../../redux/gigs/gigSlice';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/alert/Alert';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { Label } from '../../components/UtilComponents/Utils';

const Gig = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const dispatch = useDispatch();
  const [gig, setGig] = useState();
  const [user, setUser] = useState();
  const [category, setCategory] = useState();

  const currentUser = getCurrentUser();
  const { id } = useParams();

  const {
    gigs,
    isLoading: isLoadingGigs,
    hasError: hasErrorGigs,
  } = useSelector((store) => store.gigs);

  useEffect(() => {
    dispatch(getGigs(''));
  }, [dispatch]);

  useEffect(() => {
    if (gigs.length > 0) {
      const foundGig = gigs.find((g) => g._id == id);
      setGig(foundGig);
    }
  }, [gigs]);

  useEffect(() => {
    const getData = async (userId, categoryId) => {
      try {
        const resUser = await newRequest.get(`users/${userId}`);
        const resCategory = await newRequest.get(`categories/${categoryId}`);
        setUser(resUser.data);
        setCategory(resCategory.data.data.category);
      } catch (error) {
        return error;
      }
    };
    if (gig) {
      getData(gig.userId, gig.categoryId);
    }
  }, [gig]);

  if (isLoadingGigs || !gig || !user || !category) {
    return <Alert message={t('Please wait...')} />;
  }
  if (hasErrorGigs) {
    return <Alert message={t('Something went wrong.')} />;
  }

  return (
    <div className="grid lg:grid-cols-3 px-4 md:px-10 sm:p-6 md:mt-6 lg:gap-8 relative">
      {/* Left */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <span className="breadcrumb">
          {t('ATF >>')} {category.title}
        </span>
        <h1 className="text-2xl font-bold font-poppins">{`${gig.title}`}</h1>
        <div className="flex items-center gap-2 h-12">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img className="h-full object-cover" src={user.img || '/images/no avatar.jpg'} alt="" />
          </div>
          <span className="font-semibold text-2xl text-gray-500">{user.username}</span>

          {/* User Stars */}
          {!isNaN(gig.totalStars / gig.starNumber) && (
            <Stars amount={Math.round(gig.totalStars / gig.starNumber)} />
          )}
        </div>

        <div className="max-w-[500px] mx-auto my-6 rounded overflow-hidden">
          <img
            src={
              gig.images.length
                ? gig.images[0]
                : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
            }
            alt="Gig Image"
          />
        </div>
        <h2 className="h2">{t('aboutThisJob')}</h2>
        <p className="text-gray-500 font-normal text-lg leading-7">{gig.desc}</p>
        <Seller data={user} />
        <ReviewContainer
          gigId={gig._id}
          showAddReview={currentUser && !currentUser.isSeller && currentUser._id !== user._id}
        />
      </div>
      {/* Right */}
      <div className="lg:col-span-1">
        <Price data={gig} id={id} />
      </div>
    </div>
  );
};

const Price = ({ data }) => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [paymentType, setPaymentType] = useState('');
  const navigate = useNavigate();

  const handleSelect = (e) => {
    setPaymentType(e.target?.value);
  };

  const handleClick = () => {
    if (paymentType === 'on-cash') navigate('/pay/on-cash/:id');
    if (paymentType === 'bank-account') navigate('/pay/bank-account/:id');
  };

  return (
    <div className="border rounded p-5 flex flex-col gap-2 md:sticky md:top-32">
      <div className="price font-bold font-poppins text-gray-600 flex justify-between mb-2.5 ">
        <h3>{data.shortTitle}</h3>
        <span>{data.price}</span>
      </div>
      <p>{data.shortDesc}</p>
      <div className="details flex items-center justify-between my-3">
        <div className="item flex gap-1 items-center">
          <MdAccessTime size={24} />
          <p className="font-semibold">
            {data.deliveryTime} {t('daysDelivery')}
          </p>
        </div>
        <div className="item flex gap-1 items-center justify-center">
          <HiOutlineRefresh size={24} />
          <p className="font-semibold">
            {data.revisionNumber} {t('revisions')}
          </p>
        </div>
      </div>
      <div className="features">
        {data.features.map((feature) => {
          return (
            <div key={feature} className="item flex gap-2 text-gray-500 leading-8 items-center">
              <FaCheck className="text-green-500" />
              <span>{feature}</span>
            </div>
          );
        })}
      </div>

      <Label required htmlFor="payment-type">
        Payment type
      </Label>
      <select name="pay-ment-type" id="payment-type" onChange={handleSelect}>
        <option value="">Select one Option</option>
        <option value="bank-account">Bank Account</option>
        <option value="on-cash">On cash</option>
      </select>

      <button
        className={paymentType ? 'enabled-button' : 'disabled-button'}
        disabled={!paymentType}
        onClick={handleClick}
      >
        {t('continue')}
      </button>
    </div>
  );
};

const Seller = ({ data }) => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const handleContact = async () => {
    const sellerId = currentUser?.isSeller ? currentUser?._id : data?._id;
    const buyerId = currentUser?.isSeller ? data._id : currentUser?._id;

    const conversationId = sellerId + buyerId;

    console.log(conversationId);

    try {
      setLoading(true);
      const res = await newRequest.get(`conversations/single/${conversationId}`);
      console.log(res.data);
      navigate(`/message/${conversationId}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        await newRequest.post(`conversations`, {
          id: conversationId,
          sellerId,
          buyerId,
          readBySeller: currentUser?.isSeller,
          readByBuyer: !currentUser?.isSeller,
        });

        navigate(`/message/${conversationId}`);
      }
    }
  };

  if (loading) {
    return <Alert message="Please wait" />;
  }
  return (
    <div className="mt-10 flex flex-col text-gray-600">
      <h2>{t('About the seller')}</h2>
      <div className="flex items-center gap-8">
        <img
          className="max-w-24 max-h-24 rounded-full object-cover"
          src={data.img ? data.img : '/images/no avatar.jpg'}
          alt=""
        />

        <div className="flex flex-col gap-1 items-start">
          <span className="font-semibold text-xl text-gray-700">{data.username}</span>
          <Stars />
          {currentUser && !currentUser?.isSeller && currentUser._id !== data._id ? (
            <button
              className="bg-white rounded-md border-gray-400 border py-1 px-5 font-semibold hover:bg-green-600 hover:text-white transition ease-in duration-75"
              onClick={handleContact}
            >
              {t('contactMe')}
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="border-gray-400 border p-6 rounded-sm mt-6">
        <p>{data.desc}</p>
      </div>
    </div>
  );
};

export default Gig;
