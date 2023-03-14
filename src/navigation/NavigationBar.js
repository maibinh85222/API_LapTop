import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import "../styles/navigationbar.css";

const NavigationBar = () => {
  const navDrawerData = ["All", "Laptop ", "Phụ kiện", "Điện thoại", "Màn hình"];

  const {categoryName, dispatch} = useData();

  const categoryGroupHandler = (groupName) => {
    dispatch({
        type: "CATEGORY_GROUP_NAME",
        payload: groupName
    })
  }

  return (
    <nav className="navbar-header">
        {navDrawerData.map((item, index) => { return (
            <Link
            key={index}
            to="/products"
            className={`nav-link ${item === categoryName ? "active" : ""}`}
            onClick={() => {
              categoryGroupHandler(item);
            }}
          >
            {item}
          </Link>
        )
          
        })}  
    </nav>
  );
};

export default NavigationBar;
