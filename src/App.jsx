import { useState } from "react";
import { Nav } from "./Navigation/Nav";
import { Products } from "./Products/Products";
import { Recommended } from "./Recommended/Recommended";
import { Sidebar } from "./Sidebar/Sidebar";
import { data } from "./db/data";
import "./index.css";
import { Card } from "./components/Card";

export const App = () => {
  const [selectedCategory, setselectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  //Input filter
  const filteredItems = data.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  //Radio filter
  const handleChange = (e) => {
    setselectedCategory(e.target.value);
  };

  //Buttons filter
  const handleClick = (e) => {
    setselectedCategory(e.target.value);
  };

  //Handle seleted option
  const filteredData = (products, seleted, query) => {
    let filteredProducts = products;

    //Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    //Selected Filter
    if (seleted) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === seleted ||
          color === seleted ||
          company === seleted ||
          newPrice === seleted ||
          title === seleted
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, newPrice, prevPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          newPrice={newPrice}
          prevPrice={prevPrice}
        />
      )
    );
  };

  const result = filteredData(data, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Nav query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
};
