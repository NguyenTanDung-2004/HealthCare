import React, { useState, useEffect } from "react";
import CardInfo from "./CardInfo";
import DetailCardModal from "./DetailCardModal";

const UserMealsTabContent = ({ mealLabel }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMeals, setUserMeals] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserMeals = async () => {
      try {
        const response = await fetch(`${apiUrl}/food/getListUserFood`, {
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
        setUserMeals(data);
      } catch (error) {
        console.error("Error fetching user meals:", error);
      }
    };
    fetchUserMeals();
  }, [apiUrl]);

  const handleCardClick = (item) => {
    setSelectedMeal(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <div className="grid grid-cols-3 gap-4">
        {userMeals?.map((item) => (
          <div
            key={item.name}
            className="p-2"
            onClick={() => handleCardClick(item)}
          >
            <CardInfo
              name={item.name}
              image={"/images/editnutrition/dish-default.png"}
              calo={item.calories}
              weight={item.weight}
              protein={item.protein}
              fat={item.fat}
              carb={item.carb}
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <DetailCardModal
          onClose={handleCloseModal}
          mealLabel={mealLabel}
          name={selectedMeal.name}
          weight={selectedMeal.weight}
          calories={selectedMeal.calories}
          fat={selectedMeal.fat}
          protein={selectedMeal.protein}
          carb={selectedMeal.carb}
          flagSystem={0}
          flagUpdate={0}
        />
      )}
    </div>
  );
};

export default UserMealsTabContent;
