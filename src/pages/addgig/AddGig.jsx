import React from "react";

const Add = () => {
  return (
    <div>
      <div className="container">
        <h1>Add new gig</h1>
        <div className="sections">
          <div className="left">
            <form action="#">
              <label htmlFor="title"></label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="I will do something that I'm very good at"
              />
              <label htmlFor="category"></label>
              <input type="text" name="category" id="category" />
              <select name="categories" id="categories">
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
              </select>

              <label htmlFor="cover-image">Cover Image</label>
              <input type="file" />
              <label htmlFor="upload-image">Upload Images</label>
              <input type="file" multiple />
              <label htmlFor="image-description">Description</label>
              <textarea placeholder="A brief description to introduce your product to customer"></textarea>
              <button>Create</button>
            </form>
          </div>
          <div className="right">
            <label htmlFor="service">Service Title</label>
            <input type="text" placeholder="(e.g): One page website" />
            <label htmlFor="short-description">Short Description</label>
            <textarea placeholder="Short description of you service"></textarea>
            <label htmlFor="delivery-time">Delivery Time (e.g: 3 days)</label>
            <input type="number" min={1} />
            <label htmlFor="revision-num">Revision Number</label>
            <input type="number" min={1} />
            <label htmlFor="add-features">Add Features</label>
            <input type="text" placeholder="e.g page design" />
            <input type="text" placeholder="e.g file uploading" />
            <input type="text" placeholder="e.g setting up a domain" />
            <input type="text" placeholder="e.g hosting" />
            <label htmlFor="price">Price</label>
            <input type="number" min={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
