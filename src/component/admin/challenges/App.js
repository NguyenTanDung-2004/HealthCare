import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import LineProgress from "../../challenges/LineProgress";
import ListChallenges from "./list/ListChallenges";
import Rank from "./rank/Rank";
import FilterList from "./list/Filter";
import SortList from "./list/Sort";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const handleAddChallenges = (id) => {
    navigate("/dashboard/challenges/add");
  };
  const [activeView, setActiveView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Lọc");
  const [sortType, setSortType] = useState("Sắp xếp");
  const [rankData, setRankData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await fetch(`${apiUrl}/challenge/getDataInRankTab`, {
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
        setRankData(data);
      } catch (err) {
        console.error("Error fetching rank data:", err);
      }
    };
    fetchRankData();
  }, [apiUrl]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };
  const handleSortChange = (sort) => {
    setSortType(sort);
  };

  const filteredRankData = rankData
    ? {
        ...rankData,
        listUserInRanks: rankData.listUserInRanks.filter(
          (user) => user.currentPoint > 0
        ),
      }
    : null;

  return (
    <Layout>
      <div>
        <div className=" flex flex-col  gap-5">
          <div className="mt-5 flex flex-wrap justify-between gap-4">
            <div className="flex rounded-md bg-white border-[#202224] border-[1px] ">
              <button
                className={`px-4 py-2 text-sm font-semibold border-r-[1px] border-[#202224]  hover:text-[#1445FE] ${
                  activeView === "list"
                    ? "text-[#1445FE] "
                    : "text-[#202224] opacity-60"
                }`}
                onClick={() => setActiveView("list")}
              >
                Thử thách
              </button>
              <button
                className={`px-4 py-1 text-sm  font-semibold hover:text-[#1445FE] ${
                  activeView === "rank"
                    ? "text-[#1445FE] "
                    : "text-[#202224] opacity-60"
                }`}
                onClick={() => setActiveView("rank")}
              >
                Bảng xếp hạng
              </button>
            </div>

            {activeView === "list" && (
              <div className=" w-[400px] bg-white  flex items-center rounded-xl px-3 py-2 border border-solid border-[#d5d5d5] bg-[#fcfdfd]">
                <span className="mr-4 text-gray-500">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên bài tập"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="outline-none text-sm flex-1"
                />
              </div>
            )}

            {activeView === "list" && (
              <div className="flex items-center gap-4">
                <SortList onSortChange={handleSortChange} />
                {/* <FilterList onFilterChange={handleFilterChange} /> */}
              </div>
            )}

            <button
              onClick={handleAddChallenges}
              className="w-11 h-11 rounded-full text-white flex items-center justify-center  bg-[#1445FE] cursor-pointer hover:bg-opacity-80"
            >
              <i className="fa-solid fa-plus text-xl"></i>
            </button>
          </div>

          <div>
            {activeView === "list" && (
              <ListChallenges
                searchTerm={searchTerm}
                filterType={filterType}
                sortType={sortType}
              />
            )}
            {activeView === "rank" && <Rank rankData={filteredRankData} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
