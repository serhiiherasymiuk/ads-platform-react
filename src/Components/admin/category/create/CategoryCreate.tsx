import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import http_common from "../../../../http_common";
import { ICategory, ICategoryCreate } from "../../../../interfaces/category";
import "./CategoryCreate.scss";
import { RootState } from "../../../../redux/store";

export const CategoryCreate = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const initialValues: ICategoryCreate = {
    name: "",
    description: "",
    image: null,
    parentId: null,
  };

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(255, "Name must be smaller")
      .test("unique-category", "Category already exists", function (value) {
        if (!value) {
          return false;
        }
        const categoryExists = categories.some(
          (c: ICategory) => c.name.toLowerCase() === value.toLowerCase()
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

  const handleSubmit = async (values: ICategoryCreate) => {
    console.log(values);
    try {
      await categorySchema.validate(values);

      await http_common.post("api/Categories", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("..");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={categorySchema}
      >
        {({ errors, touched, setFieldValue, handleBlur }) => (
          <Form className="category-form">
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
            <div className="form-group">
              <input
                onBlur={handleBlur}
                type="file"
                className={`form-control ${
                  errors.image && touched.image ? "is-invalid" : ""
                }`}
                placeholder="Image file"
                name="image"
                aria-label="Image file"
                aria-describedby="basic-addon2"
                onChange={(event) => {
                  const file =
                    event.currentTarget.files && event.currentTarget.files[0];
                  if (file) {
                    setFieldValue("image", file);
                  }
                }}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="invalid-feedback"
              />
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
                    <option key={c.id} value={c.id}>
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

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
