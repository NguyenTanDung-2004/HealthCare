import React, { useState } from "react";
import Row from "./Row";
import Pagination from "./Pagination";
import SortRank from "./Sort";

const columns = [
  { header: "RANK", className: "w-[150px] hidden md:table-cell" },
  { header: "TÊN", className: "w-[450px] hidden md:table-cell" },
  { header: "BMI", className: "w-[300px] hidden md:table-cell" },
  { header: "TỔNG ĐIỂM", className: "flex-1 hidden md:table-cell " },
];

const Table = ({ listUserInRanks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("Cao xuống thấp");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (sort) => {
    setSortType(sort);
  };

  if (!listUserInRanks) {
    return <div className="text-center">Loading table ...</div>;
  }

  // Lọc dữ liệu theo searchTerm (tên)
  const filteredData = listUserInRanks?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp dữ liệu
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortType === "Thấp đến cao") {
      return a.currentPoint - b.currentPoint;
    } else if (sortType === "Cao xuống thấp") {
      return b.currentPoint - a.currentPoint;
    }
    return b.currentPoint - a.currentPoint;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="w-full sm:w-[700px] flex items-center rounded-xl px-3 py-2 border border-solid border-[#d5d5d5] bg-[#fcfdfd]">
          <span className="mr-4 text-gray-500">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên "
            value={searchTerm}
            onChange={handleSearchChange}
            className="outline-none text-sm flex-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <SortRank onSortChange={handleSortChange} />
        </div>
      </div>
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
        {currentData.map((user, index) => (
          <Row
            key={user.name + index}
            {...user}
            rank={user.rank}
            avatar={user.linkImage}
            stt={(currentPage - 1) * itemsPerPage + index + 1}
            bmi={user.bmi === "NaN" || !user.bmi ? "-" : user.bmi} // Xử lý BMI ở đây
            totalPoints={user.currentPoint}
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
