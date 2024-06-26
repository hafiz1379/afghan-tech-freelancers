import React from "react";

const Add = () => {
  return (
    <div className="p-4 lg:p-12">
      <h2 className="h2">Add new gig</h2>
      <div className="border rounded">
        <div className="sections grid md:grid-cols-2 gap-8 ">
          <div className="md:col-span-1 p-3 rounded">
            <form action="#" className="flex flex-col gap-2">
              <div className="my-2 flex flex-col">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="I will do something that I'm very good at"
                />
              </div>
              <div className="my-2 flex flex-col">
                <label htmlFor="category">Category</label>
                <select name="categories" id="categories">
                  <option value="design">Design</option>
                  <option value="web">Web Development</option>
                  <option value="animation">Animation</option>
                  <option value="music">Music</option>
                </select>
              </div>
              <div className="my-2 flex flex-col">
                <label htmlFor="cover-image">Cover Image</label>
                <input type="file" />
              </div>
              <div className="my-2 flex flex-col">
                <label htmlFor="upload-image">Upload Images</label>
                <input type="file" multiple />
              </div>
              <div className="my-2 flex flex-col">
                <label htmlFor="image-description">Description</label>
                <textarea
                  placeholder="A brief description to introduce your product to customer"
                  className="h-52"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="md:col-span-1 p-3 rounded flex flex-col">
            <div className="my-2 flex flex-col items-stretch">
              <label htmlFor="service">Service Title</label>

              <input type="text" placeholder="(e.g): One page website" />
            </div>
            <div className="my-2 flex flex-col items-stretch">
              <label htmlFor="short-description">Short Description</label>
              <textarea placeholder="Short description of you service"></textarea>
            </div>
            <div className="my-2 flex flex-col items-stretch">
              <label htmlFor="delivery-time">Delivery Time (e.g: 3 days)</label>
              <input type="number" min={1} />
            </div>
            <div className="my-2 flex flex-col items-stretch">
              <label htmlFor="revision-num">Revision Number</label>
              <input type="number" min={1} />
            </div>
            <div className="my-2 flex flex-col items-stretch gap-1">
              <label htmlFor="add-features">Add Features</label>
              <input type="text" placeholder="e.g page design" />
              <input type="text" placeholder="e.g file uploading" />
              <input type="text" placeholder="e.g setting up a domain" />
              <input type="text" placeholder="e.g hosting" />
            </div>
            <div className="my-2 flex flex-col items-stretch">
              <label htmlFor="price">Price</label>
              <input type="number" min={1} />
            </div>
            <div className="my-2 flex flex-col">
              <button className="p-3 bg-[#1dbf73] rounded text-white text-lg hover:bg-green-600 transition duration-300">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
