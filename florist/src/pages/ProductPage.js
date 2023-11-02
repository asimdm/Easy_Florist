import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
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
  const {cart} = state;
  const addToCartHandler = async() => {
    const itemExist = cart.cartItems.find((x)=>x._id===product._id);
    console.log(itemExist);
    const quantity = itemExist ? itemExist.quantity+1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock < quantity){
      window.alert('Sorry! Item is out of stock');
        return;
      }
    ctxDispatch({ type: "CART_ADD", payload: { ...product, quantity} });
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
          <ListGroup variant="flush"  className="round-corner">
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
                        onClick={addToCartHandler}
                        style={{ backgroundColor: "#66b0de" }}>
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
