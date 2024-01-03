import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useParams } from "react-router-dom";
import Rating from "../component/Rating";
import { Helmet } from "react-helmet-async";
import Loading from "../component/Loading";
import MessageBox from "../component/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";
import Header from "../component/Header";
import PopUp from "../component/PopUp";

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
  const { _id } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });

  const [visibility, setVisibility] = useState(false);

  const [{ message, code }, setMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/products/id/${_id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: getError(err) });
      }
    };
    fetchData();
  }, [_id]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    try {
      const itemExist = cart.cartItems.find((x) => x._id === product._id);
      const quantity = itemExist ? itemExist.quantity + 1 : 1;
      const { data } = await axios.get(`/products/id/${product._id}`);
      if (data.countInStock < quantity) {
        setMessage({ message: "Sorry! Item is out of stock", code: "error" });
        return;
      }
      ctxDispatch({ type: "CART_ADD", payload: { ...product, quantity } });
      setMessage({ message: "Item added to Cart!", code: "cart" });
    } catch (err) {
      setMessage({
        message: "An error occured while processing request",
        code: "error",
      });
      console.log("Error: ", err);
    }
  };

  return loading ? (
    <div className="msg">
      <Loading />
    </div>
  ) : error ? (
    <div className="msg">
      <MessageBox variant="danger">{error}</MessageBox>
    </div>
  ) : (
    <div>
      <Header />
      <Row className="m-1">
        <Col md={5}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}></img>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush" className="round-corner">
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
                      <Button
                        onClick={() => {
                          addToCartHandler();
                          setVisibility(true);
                        }}
                        style={{ backgroundColor: "#66b0de" }}>
                        Buy
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
              <PopUp
                visibility={visibility}
                message={message}
                code={code}
                onClose={() => setVisibility(false)}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;
