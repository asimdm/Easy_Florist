import express from "express";
import data from "./data.js";

const app = express();

app.get("/products", (req, res) => {
  res.send(data.products);
});

app.get("/products/id/:_id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params._id);
  if (product) res.send(product);
  else res.status(404).send({ message: "Product Not Found" });
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) res.send(product);
  else res.status(404).send({ message: "Product Not Found" });
});

app.get("/categories", (req, res) => {
  let categories = [];
  categories = data.products.map((item) => {
    return item.category;
  });
  categories=categories.reduce(function(acc,curr){
    if(!acc.includes(curr))
      acc.push(curr);
    return acc;
  },[]);
  res.send(categories);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
