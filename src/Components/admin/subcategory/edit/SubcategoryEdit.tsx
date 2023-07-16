import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SubcategoryEdit.scss";
import http_common from "../../../../http_common";
import { ICategory } from "../../../../interfaces/category";
import {
  ISubcategory,
  ISubcategoryEdit,
} from "../../../../interfaces/subcategory";
import { RootState } from "../../../../redux/store";

export const SubcategoryEdit = () => {
  const subcategories = useSelector(
    (state: RootState) => state.subcategory.subcategories
  );

  const { id } = useParams();

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    http_common.get("api/Categories").then((resp) => {
      setCategories(resp.data);
    });
    http_common.get(`api/Subcategories/${id}`).then((resp) => {
      setInitialValues((prevValues) => ({
        ...prevValues,
        name: resp.data.name,
        description: resp.data.description,
        categoryId: resp.data.categoryId,
      }));
    });
  }, []);

  const [initialValues, setInitialValues] = useState<ISubcategoryEdit>({
    name: "",
    description: "",
    categoryId: null,
  });

  const subcategorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(255, "Name must be smaller")
      .test(
        "unique-subcategory",
        "Subcategory already exists",
        function (value) {
          if (!value) {
            return false;
          }
          const subcategoryExists = subcategories.some(
            (s: ISubcategory) =>
              s.name.toLowerCase() === value.toLowerCase() &&
              s.id !== Number(id)
          );
          return !subcategoryExists;
        }
      ),
    description: Yup.string()
      .required("Description is required")
      .max(4000, "Description must be smaller"),
    categoryId: Yup.number()
      .required("Category is required")
      .test("checkCategoryId", "Category is required", async (value) => {
        if (value != -1) return true;
        else return false;
      }),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: ISubcategoryEdit) => {
    try {
      await subcategorySchema.validate(values);

      await http_common.put(`api/Subcategories/${id}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("../..");
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={subcategorySchema}
        enableReinitialize={true}
      >
        {({ errors, touched, setFieldValue, handleBlur }) => (
          <Form className="subcategory-form">
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

            <button type="submit" className="btn btn-primary">
              Edit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
