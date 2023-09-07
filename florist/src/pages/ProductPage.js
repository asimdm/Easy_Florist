import axios from "axios";
import { useEffect, useReducer } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useParams } from "react-router-dom";
import Rating from "../component/Rating";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    default:
      return state;
  }
};

function ProductPage() {
  const params = useParams();
  const { productId } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/products/id/${productId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };
    fetchData();
  }, [productId]);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={5}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}></img>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>₹{product.price}</strong>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Product Description:</b>
              <br></br>
              <br></br>
              {product.description}
            </ListGroup.Item>
            <ListGroup.Item>
              <ul style={{ listStylePosition: "outside", color: "#696969" }}>
                {product.productDetails.map((details, index) => (
                  <li key={index}>{details}</li>
                ))}
              </ul>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>₹{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Out of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button style={{ backgroundColor: "#66b0de" }}>
                        Buy
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;
