import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CategoryEdit.scss";
import http_common from "../../../../http_common";
import { ICategory, ICategoryEdit } from "../../../../interfaces/category";
import { RootState } from "../../../../redux/store";
import axios from "axios";

export const CategoryEdit = () => {
  const { id } = useParams();

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    http_common.get("api/Categories").then((resp) => {
      setCategories(resp.data);
    });
    http_common.get(`api/Categories/${id}`).then(async (resp) => {
      setInitialValues((prevValues) => ({
        ...prevValues,
        name: resp.data.name,
        description: resp.data.description,
        image: resp.data.image,
        parentId: resp.data.parentId,
      }));

      const response = await axios.get(
        `https://adsplatformstorage.blob.core.windows.net/category-images/${resp.data.image}`,
        {
          responseType: "blob",
        },
      );
      const blob = response.data;

      setImage(new File([blob], resp.data.image));
    });
  }, []);

  const [initialValues, setInitialValues] = useState<ICategoryEdit>({
    name: "",
    description: "",
    image: null,
    parentId: null,
  });

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(255, "Name must be smaller")
      .test("unique-category", "Category already exists", function (value) {
        if (!value) {
          return false;
        }
        const categoryExists = categories.some(
          (c: ICategory) =>
            c.name.toLowerCase() === value.toLowerCase() && c.id !== Number(id),
        );
        return !categoryExists;
      }),
    description: Yup.string()
      .required("Description is required")
      .max(4000, "Description must be smaller"),
    categoryId: Yup.number(),
    image: Yup.mixed().required("Image is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: ICategoryEdit) => {
    try {
      await categorySchema.validate(values);

      await http_common.put(`api/Categories/${id}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("../..");
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const [image, setImage] = useState<File | null>();

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={categorySchema}
        enableReinitialize={true}
      >
        {({ errors, touched, setFieldValue, handleBlur, values }) => (
          <Form className="category-edit-form">
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
                value={values.description}
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

            <div className="image-list">
              {image ? (
                <div>
                  <i
                    onClick={() => {
                      setImage(null);
                    }}
                    className="bi bi-x-circle-fill"
                  ></i>
                  <img src={URL.createObjectURL(image)} alt="" />
                </div>
              ) : (
                <label
                  className={`custom-file-upload ${
                    errors.image && touched.image ? "is-image-invalid" : ""
                  }`}
                >
                  <input
                    onBlur={handleBlur}
                    multiple
                    type="file"
                    onChange={(event) => {
                      const file =
                        event.currentTarget.files &&
                        event.currentTarget.files[0];
                      if (file) {
                        setImage(file);
                      }
                    }}
                  />
                  <i className="bi bi-plus"></i>
                  <i className="bi bi-exclamation-circle exc"></i>
                </label>
              )}
            </div>

            <div className="form-floating">
              <select
                onBlur={handleBlur}
                className={`form-select ${
                  errors.parentId && touched.parentId ? "is-invalid" : ""
                }`}
                placeholder="parentId"
                name="parentId"
                aria-label="parentId"
                aria-describedby="basic-addon2"
                onChange={(event) => {
                  setFieldValue("parentId", event.currentTarget.value);
                }}
              >
                <option value={undefined}>No parent category</option>
                {categories.map((c: ICategory) => {
                  return (
                    <option
                      selected={c.id === initialValues.parentId}
                      key={c.id}
                      value={c.id}
                    >
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <label>Parent category</label>
              <ErrorMessage
                name="parentId"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <button
              onClick={() => {
                setFieldValue("image", image);
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
