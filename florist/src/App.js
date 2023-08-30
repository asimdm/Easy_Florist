import data from "./data";

function App() {
  return (
    <div>
      <header>
        <a href='/'>Easy Florist</a>
      </header>
      <main>
        <h3>Popular Bouquet</h3>
        <div className="products">
        {
          data.products.map(product => (
            <div className="product" key={product.productId}>
              <a style={{textDecoration:'none',color:'black'}} href={`/product/${product.productId}`}>
                <img src={product.image} alt="bouquet" />
                <div className="product-info">
                  <p>{product.name}</p>
                  <p><strong>₹{product.price}</strong></p>
                </div>
              </a>
            </div>
          ))
        }
        </div>
      </main>
    </div>
  );
}

export default App;
