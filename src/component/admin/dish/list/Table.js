import React, { useState, useEffect } from "react";
import Row from "./Row";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const columns = [
  { header: "ID", className: "w-[150px] flex-[3] hidden md:table-cell" },
  { header: "TÊN", className: "w-[300px] flex-[5] hidden md:table-cell " },
  {
    header: "NĂNG LƯỢNG",
    className: "w-[150px] flex-[3]  text-center  hidden md:table-cell",
  },
  {
    header: "CARB",
    className: "w-[140px] flex-[3] text-center hidden md:table-cell",
  },
  {
    header: "PROTEIN",
    className: "w-[140px] flex-[3] text-center hidden md:table-cell",
  },
  {
    header: "FAT",
    className: "w-[140px] flex-[3] text-center hidden md:table-cell",
  },
];

const Table = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Tên");
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`${apiUrl}/food/getAllFoods`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const transformedData = data.map((item, index) => ({
          id: String(index + 1).padStart(5, "0"),
          foodId: item.id,
          name: item.name,
          calories: parseFloat(item.calories).toFixed(1),
          carb: parseFloat(item.carb).toFixed(1),
          protein: parseFloat(item.protein).toFixed(1),
          fat: parseFloat(item.fat).toFixed(1),
        }));
        setFoods(transformedData);
      } catch (err) {
        console.error("Error fetching list food:", err);
      }
    };
    fetchFoods();
  }, [apiUrl]);

  const handleRowClick = (id) => {
    navigate(`/dashboard/dish/${id}`);
  };

  const handleAddClick = () => {
    navigate(`/dashboard/addFood`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = foods.filter((food) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Id") return food.id.toLowerCase().includes(term);
    if (searchBy === "Tên") return food.name.toLowerCase().includes(term);
    return food.name.toLowerCase().includes(term);
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <>
      <SearchBar
        setSearchTerm={handleSearch}
        setSearchBy={setSearchBy}
        handleAddClick={handleAddClick}
      />

      {/* title column */}
      <div className="mt-4 flex flex-wrap w-full bg-[#f5f5f5] h-[30px] items-center gap-3 p-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-bold`}
          >
            {col.header}
          </div>
        ))}
      </div>

      {/* table */}
      <div className="mt-4 flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        {currentData.map((food) => (
          <Row
            key={food.id}
            {...food}
            onClick={() => handleRowClick(food.foodId)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Table;
