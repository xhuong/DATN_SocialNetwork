import { Breadcrumb as AntBreadCrumb } from "antd";
import { Link } from "react-router-dom";

const BreadCrumb = () => {
  return (
    <AntBreadCrumb>
      <AntBreadCrumb.Item>
        <Link to="/">Home</Link>
      </AntBreadCrumb.Item>
      <AntBreadCrumb.Item>
        <Link to="/shop">Shop</Link>
      </AntBreadCrumb.Item>
      <AntBreadCrumb.Item>
        <Link to="/my-cart">My Cart</Link>
      </AntBreadCrumb.Item>
    </AntBreadCrumb>
  );
};

export default BreadCrumb;
