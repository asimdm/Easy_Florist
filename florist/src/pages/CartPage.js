import { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import MessageBox from "../component/MessageBox";
import { Store } from "../Store";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async(item,quantity) => {
    const {data} = await axios.get(`/products/id/${item._id}`);
    if(data.countInStock < quantity){
      window.alert("The flowers are being watered and are not available right now");
      return;
    }
    ctxDispatch({type:'CART_ADD', payload:{...item,quantity}});
  };

  const deleteCartItems = (item)=>{
    ctxDispatch({type:'CART_DELETE',payload:item})
  }

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <Header />
      <h3
        style={{
          fontFamily: "Roboto",
          marginLeft: "12px",
          color: "rgb(59, 111, 98)",
        }}>
        Your Bouquets
      </h3>
      <Row className="m-1">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox className="msg">
              <b>
                <p>Cart is empty.</p>
              </b>
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "#FF69B4" }}>
                Add flowers here
              </Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <Link
                        to={`/products/id/${item._id}`}
                        style={{ textDecoration: "none", color: "#000000" }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"></img>{" "}
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" onClick={()=>updateCartHandler(item,item.quantity-1)} disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button variant="light" onClick={()=>updateCartHandler(item,item.quantity+1)} disabled={item.quantity===item.countInStock}>
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price*item.quantity}</Col>
                    <Col md={2}>
                      <Button variant="light" onClick={()=>deleteCartItems(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items):
                    </Col>{" "}
                    <Col>
                      <b>
                        ${" "}
                        {cartItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        )}
                      </b>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      style={{ backgroundColor: "#66b0de" }}
                      disabled={cartItems.length === 0}>
                      Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartPage;
