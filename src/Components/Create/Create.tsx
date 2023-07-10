import React, { Fragment } from "react";
import "./Create.css";

const Create = () => (
  <Fragment>
    <div className="centerDiv">
      <form>
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="Name"
          defaultValue="John"
        />
        <br />
        <label htmlFor="fname">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="category"
          defaultValue="John"
        />
        <br />
        <label htmlFor="fname">Price</label>
        <br />
        <input className="input" type="number" id="fname" name="Price" />
        <br />
      </form>
      <br />
      <img alt="Posts" width="200px" height="200px" src=""></img>
      <form>
        <br />
        <input type="file" />
        <br />
        <button className="uploadBtn">upload and Submit</button>
      </form>
    </div>
  </Fragment>
);

export default Create;
