import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { useContext } from "react";
import { Store } from "./Store";

function App() {
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
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
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/products/id/:productId" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <Container>
            <div className="text-center">
              <p>All Rights Reserved</p>
            </div>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
