import { useNavigate, useParams } from "react-router-dom";
import "./SearchSection.scss";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

export const SearchSection = () => {
  const navigate = useNavigate();
  const { value, category } = useParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (value) setQuery(value);
    else setQuery("");
  }, [value]);

  const handleSubmit = (values: any) => {
    const { searchQuery } = values;
    setQuery(searchQuery);

    if (category) {
      navigate(`/${category}/${searchQuery}`);
    } else {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ searchQuery: query }}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ handleChange, values }) => (
          <Form>
            <div className="search-group">
              <i
                onClick={() => handleSubmit(values)}
                className="bi bi-search"
              ></i>
              <input
                type="text"
                placeholder="Search for anything"
                name="searchQuery"
                value={values.searchQuery}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
