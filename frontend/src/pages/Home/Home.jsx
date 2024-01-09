import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "../../components/Card/Card";

const Home = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  };

  return (
    <>
      <div style={{ padding: "3em" }}></div>
      <div className="productsCont">
        {products ? (
          products.map((product, index) => (
            <Card
              key={index}
              id={product.id}
              name={product.title}
              image={product.image}
              price={product.price}
              description={product.description}
              title={product.category}
            />
          ))
        ) : (
          <span id="loader"></span>
        )}
      </div>
    </>
  );
};

export default Home;
