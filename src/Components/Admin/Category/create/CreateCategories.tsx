import { useFormik } from "formik";
import { ChangeEvent } from "react";
import defaultImage from'../../../assets/default-image.jpg';
import { ICategoryCreate } from "../../../../interfaces/category";
import http_common from "../../../../http_common";

const CreateCategories = () => {

const init: ICategoryCreate = {
      name: "",
      image: null,
      description: "",
    };
    const onFormikSubmit = async (values: ICategoryCreate) => {
        try {
            console.log(values);
          await http_common.post("api/Categories", values,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
        });
        } catch (error) {
          console.error("error: ", error);
        }
      };
    
  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit
  });
  const {values, handleChange, handleSubmit, setFieldValue } = formik;
  
    return(
      <>
          <div className="container">
                  <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
                      <div className="mb-3">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input type="text" className="form-control" id="name"
                                 value={values.name}
                                 onChange={handleChange}
                                 name="name"/>
                      </div>
                    
                      <div className="mb-3">
                          <label htmlFor="description" className="form-label">Description</label>
                          <input type="text" className="form-control" id="description"
                                 value={values.description}
                                 onChange={handleChange}
                                 name="description"/>
                      </div>
                      <div className="mb-3">
                          <label htmlFor="image" className="form-label">
                              <img src={values.image==null ? defaultImage: URL.createObjectURL(values.image)}
                                   alt="фото"
                                   width={200}
                                   style={{cursor: "pointer"}}/>
                          </label>
                          <input type="file" className="form-control d-none" id="image"
                                  onChange={(event) => {
                                    const file =
                                      event.currentTarget.files && event.currentTarget.files[0];
                                    if (file) {
                                      setFieldValue(event.target.name, file);
                                    }
                                  }}
                                 name="image"/>
                      </div>
                      <button type="submit" className="btn btn-primary">Add Category</button>
                  </form>
              </div>
        </>
    )
    }
  
  export default CreateCategories;
  