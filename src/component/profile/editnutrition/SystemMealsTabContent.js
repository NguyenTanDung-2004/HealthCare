import React, { useState, useEffect } from "react";
import CardInfo from "./CardInfo";
import DetailCardModal from "./DetailCardModal";

const SystemMealsTabContent = ({ mealLabel }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [systemMeals, setSystemMeals] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSystemMeals = async () => {
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
        setSystemMeals(data);
      } catch (error) {
        console.error("Error fetching system meals:", error);
      }
    };
    fetchSystemMeals();
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
        {systemMeals?.map((item) => (
          <div
            key={item.id}
            className="p-2"
            onClick={() => handleCardClick(item)}
          >
            <CardInfo
              name={item.name}
              image={item.removeImage}
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
          foodId={selectedMeal.id}
          weight={selectedMeal.weight}
          calories={selectedMeal.calories}
          fat={selectedMeal.fat}
          protein={selectedMeal.protein}
          carb={selectedMeal.carb}
          flagSystem={1}
          flagUpdate={0}
        />
      )}
    </div>
  );
};

export default SystemMealsTabContent;
