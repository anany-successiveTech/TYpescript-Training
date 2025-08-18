"use client";

import Input from "@/component/Input";
import React, { ChangeEvent, useState } from "react";
import "@/app/styles/a4q7.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
}

const Page: React.FC = () => {
  const [searchedItem, setSearchedItem] = useState<string>("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedItem(event.target.value);
  };

  const products: Product[] = [
    { id: 1, title: "Refrigerator", price: 100, image: "/pic-1.jpg" },
    { id: 2, title: "Washing Machine", price: 100, image: "/pic-3.jpg" },
    { id: 3, title: "Laptop", price: 100, image: "/pic-5.jpg" },
    { id: 4, title: "Drawer Cabinet", price: 100, image: "/pic-2.jpg" },
    { id: 5, title: "Laptop", price: 100, image: "/pic-6.jpg" },
    { id: 6, title: "Dining Table", price: 100, image: "/pic-4.jpg" },
  ];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchedItem.toLowerCase())
  );

  return (
    <div className="search-page">
      <p className="search-instructions">
        7. Design a search filter component that consists of an input field. As
        the user types into the input, use controlled components to filter a
        list of items displayed below. The list should dynamically update to
        show only items matching the search query.
      </p>

      <div className="finder">
        <Input
          type="text"
          placeholder="Search Product....."
          onChange={handleSearch}
          value={searchedItem}
        />
      </div>

      <div className="searched-result-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>{product.description || "No description available."}</p>
              <strong>${product.price}</strong>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
