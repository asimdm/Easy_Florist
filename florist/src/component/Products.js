import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { Store } from "../Store";
import axios from "axios";

function Products(props) {
  const { product } = props;
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const itemExist = cart.cartItems.find((x) => x._id === product._id);
    const quantity = itemExist ? itemExist.quantity + 1 : 1;
    const { data } = await axios.get(`/products/id/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry! Item is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD", payload: { ...product, quantity } });
  };

  return (
    <Card className="m-1 p-2">
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/products/id/${product._id}`}>
        <img src={product.image} className="card-img-top" alt="bouquet" />
      </Link>
      <div className="product-info">
        <Card.Body>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/products/id/${product._id}`}>
            <Card.Text>{product.name}</Card.Text>
            <div>
              <Card.Text>
                <strong>₹{product.price}</strong>
              </Card.Text>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}></Rating>
            </div>
          </Link>
          <div className="d-grid gap-2">
            <Button
              className="mt-3"
              size="sm"
              style={{
                backgroundColor: "#66b0de",
                color: "white",
                border: "none",
              }}
              onClick={addToCartHandler}>
              Buy
            </Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}

export default Products;
