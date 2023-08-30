import { Link } from "react-router-dom";
import data from "../data";

function HomePage() {
  return (
    <div>
      <h3>Popular Bouquet</h3>
      <div className="products">
        {data.products.map((product) => (
          <div className="product" key={product.productId}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/product/${product.productId}`}>
              <img src={product.image} alt="bouquet" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>
                  <strong>₹{product.price}</strong>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
