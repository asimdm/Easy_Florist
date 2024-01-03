import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import { Store } from "../Store";
import axios from "axios";
import "reactjs-popup/dist/index";
import PopUp from "./PopUp";

function Products(props) {
  const { product } = props;

  const [visibility, setVisibility] = useState(false);

  const [{message, code}, setMessage] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    try {
      const itemExist = cart.cartItems.find((x) => x._id === product._id);
      const quantity = itemExist ? itemExist.quantity + 1 : 1;
      const { data } = await axios.get(`/products/id/${product._id}`);
      if (data.countInStock < quantity) {
        setMessage({message:"Sorry! Item is out of stock", code:"error"});
        return;
      }
      setMessage({message:"Item added to Cart!", code:"cart"});
      ctxDispatch({ type: "CART_ADD", payload: { ...product, quantity } });
    } catch (error) {
      setMessage({message:"An error occured while processing request", code:"error"});
      console.log("Error: ", error);
    }
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
              className="mt-3 button"
              size="sm"
              style={{
                backgroundColor: "#66b0de",
                color: "white",
                border: "none",
              }}
              onClick={() => {
                addToCartHandler();
                setVisibility(true);
              }}>
              Buy
            </Button>
          </div>
          <PopUp visibility={visibility} message={message} code={code} onClose={()=>setVisibility(false)} />
        </Card.Body>
      </div>
    </Card>
  );
}

export default Products;
