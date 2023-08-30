import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
/* import data from "../data"; */

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  /* const [products, setProduct] = useState([]); */
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }

      //setProduct(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h3>Popular Bouquet</h3>
      <div className="products">
        {loading ? (
          <div>Loading....</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
