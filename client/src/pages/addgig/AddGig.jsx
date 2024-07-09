import { RiCloseLine } from 'react-icons/ri';
import React, { useReducer, useState } from 'react';
import { gigReducer, initialState } from '../../reducers/gigReducer';
import upload from '../../utils/upload';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { Label } from '../../components/UtilComponents/Utils';

const Add = () => {
  const [coverImg, setCoverImg] = useState(undefined);
  const [gigImages, setGigImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [feature, setFeature] = useState();

  const [state, dispatch] = useReducer(gigReducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({ type: 'CHANGE_INPUT', payload: { name: e.target.name, value: e.target.value } });
  };

  const handleFeatures = () => {
    dispatch({ type: 'ADD_FEATURE', payload: feature });
    setFeature('');
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(coverImg);
      const images = await Promise.all(
        [...gigImages].map(async (img) => {
          const url = await upload(img);
          return url;
        }),
      );
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { cover, images } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newRequest.post('gigs', state);
    navigate('/myGigs');
  };
  console.log(state);

  return (
    <div className="p-4 lg:p-12">
      <h2 className="h2">Add new gig</h2>
      <div className="border rounded">
        <form onSubmit={handleSubmit} className="sections grid md:grid-cols-2 gap-8 ">
          <div className="md:col-span-1 p-3 rounded">
            <div action="#" className="flex flex-col gap-2">
              <div className="my-2 flex flex-col">
                <Label required>Title</Label>
                <input
                  type="text"
                  placeholder="I will do something that I'm very good at"
                  name="title"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="my-2 flex flex-col">
                <Label required>Categore</Label>
                <select name="cat" id="cat" onChange={handleChange} required>
                  <option value="---">___</option>
                  <option value="design">Design</option>
                  <option value="web">Web Development</option>
                  <option value="animation">Animation</option>
                  <option value="music">Music</option>
                </select>
              </div>

              <div className="grid grid-cols-2 items-end gap-2">
                <div>
                  <div className="my-2 flex flex-col">
                    <Label required>Cover Image</Label>
                    <input type="file" onChange={(e) => setCoverImg(e.target.files[0])} required />
                  </div>

                  <div className="my-2 flex flex-col">
                    <label htmlFor="upload-image">Upload Images</label>
                    <input type="file" multiple onChange={(e) => setGigImages(e.target.files)} />
                  </div>
                </div>

                <div className="my-2">
                  <button
                    className="p-2 bg-[#1dbf73] rounded text-white text-lg hover:bg-green-600 transition duration-300 w-full"
                    onClick={handleUpload}
                  >
                    {uploading ? 'Uploading' : 'Upload'}
                  </button>
                </div>
              </div>

              <div className="my-2 flex flex-col">
                <Label required>Description</Label>
                <textarea
                  placeholder="A brief description to introduce your product to customer"
                  className="h-52"
                  onChange={handleChange}
                  name="desc"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* RIGHT PART */}
          <div className="md:col-span-1 p-3 rounded flex flex-col">
            <div className="my-2 flex flex-col items-stretch">
              <label htmlFor="service">Service Title</label>
              <input
                type="text"
                placeholder="(e.g): One page website"
                onChange={handleChange}
                name="shortTitle"
              />
            </div>
            <div className="my-2 flex flex-col items-stretch">
              <Label required>Short Description</Label>
              <textarea
                placeholder="Short description of you service"
                name="shortDesc"
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="my-2 flex flex-col items-stretch">
              <Label required>Delivery Time</Label>
              <input type="number" min={1} onChange={handleChange} name="deliveryTime" required />
            </div>
            <div className="my-2 flex flex-col items-stretch">
              <Label required>Revision Number</Label>
              <input type="number" min={1} onChange={handleChange} name="revisionNumber" required />
            </div>

            <div className="my-2 flex flex-col items-stretch gap-1">
              <label htmlFor="add-features">Add Features</label>
              <div className="flex gap-2">
                <input
                  value={feature}
                  type="text"
                  placeholder="e.g page design"
                  className="flex-grow"
                  onChange={(e) => setFeature(e.target.value)}
                />
                <button
                  onClick={handleFeatures}
                  className="p-2 bg-[#1dbf73] rounded text-white text-lg hover:bg-green-600 transition duration-300"
                >
                  Add
                </button>
              </div>

              <div className="flex gap-2">
                {state.features.map((f, index) => (
                  <div key={index + f}>
                    <div className="h-8 text-sm bg-transparent text-red-600 border border-red-500 rounded-sm px-1 flex gap-3 items-center">
                      <span>{f}</span>
                      <RiCloseLine
                        cursor="pointer"
                        className="hover:bg-red-200"
                        size={22}
                        onClick={() => dispatch({ type: 'REMOVE_FEATURE', payload: f })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-2 flex flex-col items-stretch">
              <Label required>Price</Label>
              <input type="number" min={1} onChange={handleChange} name="price" required />
            </div>
            <div className="my-2 flex flex-col">
              <button
                type="submit"
                className="p-3 bg-[#1dbf73] rounded text-white text-lg hover:bg-green-600 transition duration-300"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
