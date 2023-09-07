import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";

function Products(props) {
  const { product } = props;
  return (
    <Card className="m-1 p-2">
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/products/id/${product.productId}`}>
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
          </Card.Body>
        </div>
      </Link>
    </Card>
  );
}

export default Products;
