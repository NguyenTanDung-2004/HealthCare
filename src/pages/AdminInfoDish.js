import React from "react";
import App from "../component/admin/dishInfo/App";
import { useParams } from "react-router-dom";
const AdminInfoDish = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen overflow-hidden ">
      <App id={id} />
    </div>
  );
};

export default AdminInfoDish;
