import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Container from "react-bootstrap/Container";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import SignUp from "./pages/SignUp";


function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container mainBody">
        <main>
            <Routes>
              <Route path="/products/id/:_id" element={<ProductPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
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
