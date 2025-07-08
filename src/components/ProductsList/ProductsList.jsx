// import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";
import { axiosInterceptor } from "../../networks/interceptor";

export default function ProductsList() {
  const [data, setData] = useState([]); // Products from API
  const [searchTerm, setSearchTerm] = useState(""); // Search output

  useEffect(() => {
    axiosInterceptor
      .get("/products")
      .then((res) => {
        console.log(res.data.products);
        setData(res.data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleShortList = (productName) => {
    alert(`Added to Short List: ${productName}`);
  };

  // Filter products based on search word
  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products after filter*/}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToShortList={handleShortList}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
