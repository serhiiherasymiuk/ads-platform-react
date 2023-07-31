import { useSelector } from "react-redux";
import "./Loader.scss";

const Loader = () => {
  const { isLoading } = useSelector((store: any) => store.loading);
  return (
    <>
      {isLoading && (
        <div className="my_eclipse">
          <div className="progress">
            <div>
              <div className="spinner-border" role="status"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
