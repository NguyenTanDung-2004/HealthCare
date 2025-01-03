import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const ListChallenges = ({ searchTerm, filterType, sortType }) => {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchChallenges = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/challenge/getListExerciseChallenge`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setChallenges(data);
    } catch (err) {
      console.error("Error fetching list challenge:", err);
    }
  };
  useEffect(() => {
    fetchChallenges();
  }, [apiUrl]);

  const handleClick = (challenge) => {
    navigate(`/workout/${challenge.id}`, {
      state: { challengeData: challenge },
    });
  };
  const handleCardUpdate = async () => {
    await fetchChallenges();
  };

  const transformedChallenges = challenges.map((item) => ({
    id: item.exerciseId,
    exerciseId: item.exerciseId,
    image: item.linkImage,
    nameChallenges: item.name,
    nameWorkout: item.name,
    soLanTap: item.numberOfPractice,
    soNguoiTap: item.numberOfUsers,
    point: item.point,
    time: item.time,
    calories: item.calories,
  }));

  const filteredChallenges = transformedChallenges.filter(
    (challenge) =>
      challenge.nameWorkout.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "Lọc" || challenge.type === filterType)
  );

  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    if (sortType === "Điểm giảm dần") {
      return b.point - a.point;
    } else if (sortType === "Điểm tăng dần") {
      return a.point - b.point;
    } else if (sortType === "Calo giảm dần") {
      return b.calories - a.calories;
    } else if (sortType === "Calo tăng dần") {
      return a.calories - b.calories;
    } else if (sortType === "Thời gian giảm dần") {
      return b.time - a.time;
    } else if (sortType === "Thời gian tăng dần") {
      return a.time - b.time;
    }
    return 0;
  });

  return (
    <div className="mt-5 w-full flex flex-col gap-8">
      {sortedChallenges.map((challenge) => (
        <Card
          onClick={() => handleClick(challenge)}
          key={challenge.id}
          {...challenge}
          onCardUpdate={handleCardUpdate}
        />
      ))}
    </div>
  );
};

export default ListChallenges;
