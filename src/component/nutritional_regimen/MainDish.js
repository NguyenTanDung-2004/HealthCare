import React, { useState, useEffect } from "react";
import "../../css/nutritional_regimen/MainDish.css";
import CategoryList from "./CategoryList";
import ListDishes from "./ListDishes";
import Filter from "./Filter";

const MainDish = ({ dishesData }) => {
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredDishes, setFilteredDishes] = useState(dishesData);
  const types = [
    "Tất cả",
    "Món chính",
    "Món phụ",
    "Món ăn vặt",
    "Món ăn sáng",
    "Đồ uống",
  ];

  useEffect(() => {
    setFilteredDishes(dishesData);
  }, [dishesData]);

  const handleFilterChange = (filters) => {
    let filtered = dishesData;
    if (
      filters.selectedCookingMethods &&
      filters.selectedCookingMethods.length > 0
    ) {
      filtered = filtered.filter((item) =>
        filters.selectedCookingMethods.includes(item.method)
      );
    }
    if (filters.selectedDiets && filters.selectedDiets.length > 0) {
      filtered = filtered.filter((item) =>
        filters.selectedDiets.includes(item.diet)
      );
    }
    if (filters.selectedCookingTime) {
      const convertTimeToMinutes = (time) => {
        if (time === "< 30 phút") {
          return 30;
        } else if (time === "< 1 giờ") {
          return 60;
        } else if (time === "< 2 giờ") {
          return 120;
        }
        return 1000;
      };
      filtered = filtered.filter(
        (item) => item.time <= convertTimeToMinutes(filters.selectedCookingTime)
      );
    }
    if (filters.selectedLevel) {
      filtered = filtered.filter(
        (item) => item.level === filters.selectedLevel
      );
    }
    setFilteredDishes(filtered);
  };

  const handleCategoryChange = (category) => {
    if (category === "Tất cả") {
      setFilteredDishes(dishesData);
      return;
    }

    const filtered = dishesData.filter((item) => item.type === category);
    setFilteredDishes(filtered);
  };

  const handleSearchClick = () => {
    if (!searchValue.trim()) {
      console.log("input empty");
      return;
    }

    setSearchClicked(true);
    const filtered = dishesData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredDishes(filtered);
    console.log(`Searching for: ${searchValue}`);
    fetchSearchResults(searchValue);
  };

  const fetchSearchResults = (query) => {};

  console.log("Dishes data in MainDish:", dishesData);
  return (
    <>
      <div id="discover" className="main-dish">
        <span className="title">KHÁM PHÁ</span>
        <div className="header-list">
          <CategoryList types={types} onCategoryChange={handleCategoryChange} />
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              value={searchValue}
              placeholder="search ..."
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="search-button ml-1" onClick={handleSearchClick}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="main">
          <ListDishes data={filteredDishes} />
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>
    </>
  );
};

export default MainDish;
