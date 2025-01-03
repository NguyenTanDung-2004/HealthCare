import React, { useState } from "react";

const SearchBar = ({ setSearchTerm, setSearchBy, handleAddClick }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [selectedSearchBy, setSelectedSearchBy] = useState("Tên");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchByChange = (field) => {
    setSelectedSearchBy(field);
    setSearchBy(field);
    setIsDropdownOpen(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const searchByOptions = ["Id", "Tên"];

  return (
    <>
      <div className="flex flex-wrap gap-10 w-full max-md:max-w-full  justify-between">
        <div className="flex gap-5 justify-center my-auto min-w-[240px]">
          <form className="flex items-center my-auto text-sm text-center min-w-[240px] text-neutral-800 w-[252px]">
            <div className="flex self-stretch my-auto min-w-[240px] w-[252px]">
              <div className="flex relative items-center bg-white rounded-l-lg border border-solid border-[rgba(0, 0, 0, 0.5)] h-[38px] w-[147px] px-4">
                <img
                  loading="lazy"
                  src="/images/search.svg"
                  alt="icon-search"
                  className="object-contain aspect-square"
                />
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  className="text-sm text-[#202224] w-full font-light opacity-50 bg-transparent h-full px-2 focus:outline-none"
                  onChange={handleSearchChange}
                />
              </div>

              {/* search by */}
              <div className="relative" onMouseLeave={closeDropdown}>
                <div
                  className="text-sm text-[#202224] font-light opacity-50 flex items-center justify-center border border-solid border-[#d5d5d5]  bg-[#eceaea] rounded-r-lg h-[38px] w-[105px] cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  {selectedSearchBy}
                </div>

                {isDropdownOpen && (
                  <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10">
                    <ul className="text-sm text-[#2b3034e6] font-light py-1">
                      {searchByOptions.map((option, index) => (
                        <li
                          key={index}
                          className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                          onClick={() => handleSearchByChange(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <button
          onClick={handleAddClick}
          className="px-7 h-[38px] bg-[#1445FE] hover:bg-opacity-90 rounded-[8px] text-xs font-semibold tracking-normal leading-loose text-center text-white"
        >
          THÊM BÀI TẬP
        </button>
      </div>
    </>
  );
};

export default SearchBar;