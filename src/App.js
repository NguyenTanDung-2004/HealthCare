// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import CreateHomeOut from "./pages/HomeOut";
import HomeIn from "./pages/HomeIn";
import NutritionalRegimen from "./pages/NutritionalRegimen";
import DishDetails from "./pages/DishDetails";
import Workout from "./pages/Workout";
import WorkoutDetails from "./pages/WorkoutDetails";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Goals from "./pages/Goals";
import GoalDetails from "./pages/GoalDetails";
import Challenges from "./pages/Challenges";
import AdminStatistics from "./pages/AdminStatistics";
import AdminChallenges from "./pages/AdminChallenges";
import AdminWorkout from "./pages/AdminWorkout";
import AdminDish from "./pages/AdminDish";
import AdminProfile from "./pages/AdminProfile";
import AdminAddChallenges from "./pages/AdminAddChallenges";
import AdminAddWorkout from "./pages/AdminAddWorkout";
import AdminInfoWorkout from "./pages/AdminInfoWorkout";
import AdminAddFood from "./pages/AdminAddFood";
import AdminInfoDish from "./pages/AdminInfoDish";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/home_out" element={<CreateHomeOut />} />
        <Route
          path="/home_in"
          element={
            <ProtectedRoute>
              <HomeIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nutritional_regimen"
          element={
            <ProtectedRoute>
              <NutritionalRegimen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nutritional_regimen/:id"
          element={
            <ProtectedRoute>
              <DishDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workout"
          element={
            <ProtectedRoute>
              <Workout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workout/:id"
          element={
            <ProtectedRoute>
              <WorkoutDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals/:id"
          element={
            <ProtectedRoute>
              <GoalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges"
          element={
            <ProtectedRoute>
              <Challenges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/statistic"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminStatistics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/workout"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminWorkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/dish"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminDish />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/challenges"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminChallenges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/workout/:id"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminInfoWorkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/addWorkout"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminAddWorkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/dish/:id"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminInfoDish />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/addFood"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminAddFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/challenges/add"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AdminAddChallenges />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
