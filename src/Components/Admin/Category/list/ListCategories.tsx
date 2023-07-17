import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from "react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import http_common from "../../../../http_common";
import { ICategory } from "../../../../interfaces/category";
import ModalDelete from "../DeleteCategory/DeleteCategore";
import { APP_ENV } from "../../../../env";



export const ListCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    http_common.get("api/Categories").then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  

  const onClickDelete = async (id: number) => {
    try {
        //console.log("Видаляємо категорію", id);
        await http_common.delete(`api/Categories/${id}`);
        setCategories(categories.filter(x=>x.id!==id));
    }
    catch {
        console.log("Помилка видалення");
    }
}
  return (
    <>
    <div className="container">
        <div className="container">
            <h1 className="text-center">Список категорій</h1>
            <Link to="create" className="btn btn-success">Додати</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Назва</th>
                    <th scope="col">Фото</th>
                    <th scope="col">Опис</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {categories.map((c) => {
                    return (
                        <tr key={c.id}>
                            <th scope="row">{c.id}</th>
                            <td>{c.name}</td>
                            <td>
                                <img src={`${APP_ENV.BASE_URL}uploads/150_${c.image}`} alt="фото" width={50}/>
                            </td>
                            <td>{c.description}</td>
                            <td>
                                <ModalDelete id={c.id} text={c.name} deleteFunc={onClickDelete}/>
                                &nbsp; &nbsp;
                                <Link to={`edit/${c.id}`} className="btn btn-info" >Змінить</Link>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    </div>
</>
  );
};
