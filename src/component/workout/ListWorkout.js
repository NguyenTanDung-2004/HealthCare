import React, { useState } from "react";
import "../../css/workout/ListWorkout.css";
import CardWorkout from "./CardWorkout";
import { useNavigate } from "react-router-dom";

const ListWorkout = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // => chi tiết bài tập

  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const getDisplayedPages = () => {
    if (currentPage === 1) {
      return [1, 2, 3].filter((page) => page <= totalPages);
    } else if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages].filter(
        (page) => page > 0
      );
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const handleClick = (id) => {
    navigate(`/workout/${id}`);
  };

  return (
    <div className="list-workout">
      <div className="list-workout__info">
        <span>{data?.length || 0} bài tập</span>
      </div>

      <div className="list-workout__main">
        {currentItems.map((item) => (
          <CardWorkout
            key={item.id}
            name={item.name}
            image={item.image}
            calo={item.calo}
            time={item.time}
            rating={item.rating}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          className="btn-prev"
          disabled={currentPage === 1}
          onClick={goToPrevPage}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {getDisplayedPages().map((page) => (
          <button
            key={page}
            className={`btn-page ${currentPage === page ? "active" : ""}`}
            onClick={() => paginate(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="btn-next"
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ListWorkout;
