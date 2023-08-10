import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import http_common from "../../../../http_common";
import { useNavigate, useParams } from "react-router-dom";
import "./AdvertisementEdit.scss";
import { ICategory } from "../../../../interfaces/category";
import * as Yup from "yup";
import {
  IAdvertisementEdit,
  IAdvertisementImage,
} from "../../../../interfaces/advertisement";
import { Formik, Field, ErrorMessage, Form } from "formik";
import axios from "axios";

export const AdvertisementEdit = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const { id } = useParams();

  useEffect(() => {
    http_common.get("api/Categories").then((resp) => {
      setCategories(resp.data);
    });
    http_common.get(`api/Advertisements/${id}`).then((resp) => {
      setInitialValues((prevValues) => ({
        ...prevValues,
        name: resp.data.name,
        description: resp.data.description,
        price: resp.data.price,
        contactPerson: resp.data.contactPerson,
        contactPhoneNumber: resp.data.contactPhoneNumber,
        advertisementImages: [],
        location: resp.data.location,
        categoryId: resp.data.categoryId,
        userId: resp.data.userId,
      }));

      const imageUrls = resp.data.advertisementImages.map(
        (image: IAdvertisementImage) =>
          `https://adsplatformstorage.blob.core.windows.net/advertisement-images/${image.image}`,
      );

      downloadAndConvertImages(imageUrls).then((files) => {
        setImages(files);
      });
    });
  }, []);

  async function downloadAndConvertImages(urls: string[]): Promise<File[]> {
    const files: File[] = [];

    for (const url of urls) {
      const filename = url.substring(url.lastIndexOf("/") + 1);
      const file = await downloadImage(filename);
      files.push(file);
    }

    return files;
  }

  async function downloadImage(filename: string): Promise<File> {
    const url = `https://adsplatformstorage.blob.core.windows.net/advertisement-images/${filename}`;

    const response = await axios.get(url, {
      responseType: "blob",
    });
    const blob = response.data;

    return new File([blob], filename);
  }

  const [initialValues, setInitialValues] = useState<IAdvertisementEdit>({
    name: "",
    description: "",
    price: 0,
    contactPerson: "",
    contactPhoneNumber: "",
    advertisementImages: [],
    location: "",
    categoryId: null,
    userId: "",
  });

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

  const handleSubmit = async (values: IAdvertisementEdit) => {
    try {
      await advertisementSchema.validate(values);

      const formattedPrice = values.price.toString().replace(".", ",");

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", formattedPrice);
      formData.append("contactPerson", values.contactPerson);
      formData.append("contactPhoneNumber", values.contactPhoneNumber);
      values.advertisementImages.forEach((image) => {
        formData.append("advertisementImages", image);
      });
      formData.append("location", values.location);
      if (values.categoryId !== null)
        formData.append("categoryId", values.categoryId.toString());
      formData.append("userId", values.userId);

      await http_common.put(`api/Advertisements/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("../..");
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
        enableReinitialize={true}
      >
        {({ errors, touched, setFieldValue, handleBlur }) => (
          <Form className="advertisement-edit-form">
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
                value={initialValues.description}
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
                          prevImages.filter((image) => image !== f),
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
                    <option
                      selected={c.id === initialValues.categoryId}
                      key={c.id}
                      value={c.id}
                    >
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
                setFieldValue("advertisementImages", images);
              }}
              type="submit"
              className="btn btn-primary"
            >
              Edit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
