import express from "express";
import data from "./data.js";

const app = express();

app.get("/products", (req, res) => {
  res.send(data.products);
});

app.get("/products/id/:productId", (req, res) => {
  const product = data.products.find(
    (x) => x.productId === parseInt(req.params.productId)
  );
  if (product) res.send(product);
  else res.status(404).send({ message: "Product Not Found" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
