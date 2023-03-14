import { useData } from "../../context/DataContext";
import ProductCard from "./ProductCard";

const Products = () => {
  const { productList } = useData();

  // console.log("Product list are " + JSON.stringify(productList));

  return (
    <>
      <div className="product-container border-bottom-1 mb-4">
        <div className="grid-container border-left-1 p-2">
          {productList.map((product) => (
            <ProductCard key={product.prod_id} productDetails={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
