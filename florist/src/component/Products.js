import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import Button from "react-bootstrap/Button";

function Products(props) {
  const { product } = props;
  return (
    <Card className="m-1 p-2">
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/products/id/${product._id}`}>
        <img src={product.image} className="card-img-top" alt="bouquet" />
        <div className="product-info">
          <Card.Body>
            <Card.Text>{product.name}</Card.Text>
            <div>
              <Card.Text><strong>₹{product.price}</strong></Card.Text>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}></Rating>
            </div>
            <div className="d-grid gap-2">
            <Button className="mt-3" size="sm" style={{"backgroundColor":"#71d8eb", color:"black", border:"none"}}>
              Buy
            </Button>
            </div>
          </Card.Body>
        </div>
      </Link>
    </Card>
  );
}

export default Products;
