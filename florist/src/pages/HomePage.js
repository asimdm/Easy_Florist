import { useEffect, useReducer } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Products from "../component/Products";
import { Helmet } from "react-helmet-async";
import Loading from "../component/Loading";
import MessageBox from "../component/MessageBox";
import Banner from "../component/Banner";
import Header from "../component/Header";
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
      <Helmet>
        <title>Easy Florist</title>
      </Helmet>
      <Header />
      <Banner />
      <h3
        style={{
          marginTop: "30px",
          fontFamily: "Roboto",
          marginLeft: "20px",
          fontSize: "30px",
          color: "rgb(59, 111, 98)",
        }}>
        Popular Bouquet
      </h3>
      <div className="products" style={{ marginTop: "5px" }}>
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row className="p-2">
            {products.map((product) => (
              <Col
                sm={6}
                md={4}
                lg={3}
                className="mb-3 d-flex align-items-stretch"
                key={product._id}>
                <Products product={product}></Products>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomePage;
