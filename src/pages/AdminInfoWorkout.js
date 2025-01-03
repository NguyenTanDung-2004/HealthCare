import React from "react";
import App from "../component/admin/workoutInfo/App";
import { useParams } from "react-router-dom";
const AdminInfoWorkout = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen overflow-hidden ">
      <App id={id} />
    </div>
  );
};

export default AdminInfoWorkout;
