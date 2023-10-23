import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { Store } from "../Store";
import { useContext } from "react";

function Header() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div>
      <header>
        <Navbar>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Easy Florist</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to={"/cart"} className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.length}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
