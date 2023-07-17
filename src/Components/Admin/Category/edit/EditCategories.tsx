import { useFormik } from "formik";
import { useEffect } from "react";
import defaultImage from'../../../assets/default-image.jpg';
import { useNavigate, useParams } from "react-router-dom";
import { ICategory, ICategoryEdit } from "../../../../interfaces/category";
import http_common from "../../../../http_common";
import axios from "axios";



const EditCategory = () => {
  const {id} = useParams();
  const navigate = useNavigate();




  const init: ICategoryEdit = {
      
      name: "",
      image: null,
      description: ""
  };

  const onFormikSubmit = async (values: ICategoryEdit) => {
   try{
  
        await http_common.put(`api/Categories/${id}`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        navigate("../..");
      } catch (error) {
        console.error("Error adding subcategory:", error);
      }
    };
  

  const formik = useFormik({
      initialValues: init,
      onSubmit: onFormikSubmit
  });

  const {values, handleChange, handleSubmit, setFieldValue} = formik;

  useEffect(() => {
      http_common.get<ICategory>(`api/Categories/${id}`)
          .then(resp => {
              const {data} = resp;
              setFieldValue("name", data.name);
              setFieldValue("description", data.description);
          });
  },[id]);

//   const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if(files)
//     {
//         const file = files[0];
//         if(file) {
//             //Перевірка на тип обраного файлу - допустимий тип jpeg, png, gif
//             const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
//             if (!allowedTypes.includes(file.type)) {
//                 alert("Не допустимий тип файлу");
//                 return;
//             }
//             setFieldValue(e.target.name, file);
//         }
//     }
// }

 
  return (
      <>
      <div className="container" >
          <h1 className="text-center">Змінить категорію</h1>
          <div className="container">
              <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label htmlFor="name" className="form-label">Назва</label>
                      <input type="text" className="form-control" id="name"
                             value={values.name}
                             onChange={handleChange}
                             name="name"/>
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

                  <div className="mb-3">
                      <label htmlFor="description" className="form-label">Опис</label>
                      <input type="text" className="form-control" id="description"
                             value={values.description}
                             onChange={handleChange}
                             name="description"/>
                  </div>

                  <button type="submit" className="btn btn-primary">Зберегти</button>
              </form>
           </div>
          </div>
      </>
  );
    }
  
  export default EditCategory;

  /* onChange={(event) => {
                                    const file =
                                      event.currentTarget.files && event.currentTarget.files[0];
                                    if (file) {
                                      setFieldValue(event.target.name, file);
                                    }
                                  }}*/