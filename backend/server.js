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

app.get("/categories", (req, res) => {
  let categories = [];
  categories = data.products.map((item) => {
    return {"category":item.category,
            "image":item.image
          };
  });
  const uniqueCategoriesArray = [];
  const categorySet = new Set();
  categories.forEach(item => {
    if (!categorySet.has(item.category)) {
        categorySet.add(item.category);
        uniqueCategoriesArray.push(item);
    }
});
  res.send(uniqueCategoriesArray);
});

app.get("/categories/:category", (req,res)=>{
  let products=[];
  products=data.products.map((product)=>{
    if(product.category===req.params.category){
      return product;
    }
  })
  res.send(products);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
