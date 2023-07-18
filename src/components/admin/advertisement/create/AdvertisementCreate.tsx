import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import http_common from "../../../../http_common";
import { useNavigate } from "react-router-dom";
import "./AdvertisementCreate.scss";
import { ICategory } from "../../../../interfaces/category";
import * as Yup from "yup";
import { IAdvertismentCreate } from "../../../../interfaces/advertisment";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { IAuthUser } from "../../../../interfaces/user";

export const AdvertisementCreate = () => {
  const { user } = useSelector((store: any) => store.auth as IAuthUser);

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const initialValues: IAdvertismentCreate = {
    name: "",
    description: "",
    price: 0,
    contactPerson: "",
    contactPhoneNumber: "",
    advertismentImages: [],
    location: "",
    categoryId: null,
    userId: "",
  };

  const navigate = useNavigate();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const advertisementSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(255, "Name must be smaller"),
    description: Yup.string()
      .required("Description is required")
      .max(4000, "Description must be smaller"),
    categoryId: Yup.number()
      .required("Category is required")
      .test("category-required", "Category is required", function (value) {
        if (value === -1) return false;
        else return true;
      }),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price cannot be less than 0"),
    location: Yup.string()
      .required("Location is required")
      .max(255, "Location must be smaller"),
    contactPerson: Yup.string()
      .required("Contact person is required")
      .max(255, "Contact person must be smaller"),
    contactPhoneNumber: Yup.string()
      .required("Contact phone number is required")
      .matches(phoneRegExp, "Phone number is not valid"),
  });

  const handleSubmit = async (values: IAdvertismentCreate) => {
    try {
      if (user?.id !== undefined) values.userId = user?.id;

      await advertisementSchema.validate(values);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
      formData.append("contactPerson", values.contactPerson);
      formData.append("contactPhoneNumber", values.contactPhoneNumber);
      values.advertismentImages.forEach((image) => {
        formData.append("advertismentImages", image);
      });
      formData.append("location", values.location);
      if (values.categoryId !== null)
        formData.append("categoryId", values.categoryId.toString());
      formData.append("userId", values.userId);

      await http_common.post("api/Advertisments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("..");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const [images, setImages] = useState<File[]>([]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={advertisementSchema}
      >
        {({ errors, touched, setFieldValue, handleBlur }) => (
          <Form className="advertisement-form">
            <div className="form-floating">
              <Field
                type="text"
                className={`form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
                placeholder="Name"
                name="name"
                aria-label="Name"
                aria-describedby="basic-addon2"
              />
              <label htmlFor="floatingTextarea2">Name</label>
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-floating">
              <textarea
                onBlur={handleBlur}
                className={`form-control ${
                  errors.description && touched.description ? "is-invalid" : ""
                }`}
                placeholder="Description"
                name="description"
                aria-label="Description"
                aria-describedby="basic-addon2"
                onChange={(event) => {
                  setFieldValue("description", event.currentTarget.value);
                }}
              />
              <label>Description</label>
              <ErrorMessage
                name="description"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-floating">
              <Field
                type="text"
                onBlur={handleBlur}
                className={`form-control ${
                  errors.location && touched.location ? "is-invalid" : ""
                }`}
                placeholder="location"
                name="location"
                aria-label="Location"
                aria-describedby="basic-addon2"
              />
              <label htmlFor="floatingTextarea2">Location</label>
              <ErrorMessage
                name="location"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-floating">
              <Field
                type="text"
                onBlur={handleBlur}
                className={`form-control ${
                  errors.contactPerson && touched.contactPerson
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="contactPerson"
                name="contactPerson"
                aria-label="Contact person"
                aria-describedby="basic-addon2"
              />
              <label htmlFor="floatingTextarea2">Contact person</label>
              <ErrorMessage
                name="contactPerson"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-floating">
              <Field
                type="text"
                onBlur={handleBlur}
                className={`form-control ${
                  errors.contactPhoneNumber && touched.contactPhoneNumber
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="contactPhoneNumber"
                name="contactPhoneNumber"
                aria-label="Contact phone number"
                aria-describedby="basic-addon2"
              />
              <label htmlFor="floatingTextarea2">Contact phone number</label>
              <ErrorMessage
                name="contactPhoneNumber"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-floating">
              <Field
                type="number"
                onBlur={handleBlur}
                className={`form-control ${
                  errors.price && touched.price ? "is-invalid" : ""
                }`}
                placeholder="price"
                name="price"
                aria-label="Price"
                aria-describedby="basic-addon2"
              />
              <label htmlFor="floatingTextarea2">Price</label>
              <ErrorMessage
                name="price"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="image-list">
              {images.map((f: File, id: number) => {
                return (
                  <div key={id}>
                    <i
                      onClick={() => {
                        setImages((prevImages) =>
                          prevImages.filter((image) => image !== f)
                        );
                      }}
                      className="bi bi-x-circle-fill"
                    ></i>
                    <img src={URL.createObjectURL(f)} alt="" />
                  </div>
                );
              })}
              <label className="custom-file-upload">
                <input
                  multiple
                  type="file"
                  onChange={(event) => {
                    const file =
                      event.currentTarget.files && event.currentTarget.files[0];
                    if (file) {
                      setImages([...images, file]);
                    }
                  }}
                />
                <i className="bi bi-plus"></i>
              </label>
            </div>
            <div className="form-floating">
              <select
                onBlur={handleBlur}
                className={`form-select ${
                  errors.categoryId && touched.categoryId ? "is-invalid" : ""
                }`}
                placeholder="categoryId"
                name="categoryId"
                aria-label="categoryId"
                aria-describedby="basic-addon2"
                onChange={(event) => {
                  setFieldValue("categoryId", event.currentTarget.value);
                }}
              >
                <option value={-1}>Select a category</option>
                {categories.map((c: ICategory) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <label>Category</label>
              <ErrorMessage
                name="categoryId"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <button
              onClick={() => {
                setFieldValue("advertismentImages", images);
              }}
              type="submit"
              className="btn btn-primary"
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
