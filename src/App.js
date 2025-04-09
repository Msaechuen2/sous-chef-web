import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NextUIProvider } from "@nextui-org/react";
import HomePage from './pages/Home';
import MealPlanner from './pages/MealPlanner';
import ChatbotPopup from './components/ChatbotPopup';
import RecipePage from './pages/RecipePage';
import FoodListPage from './pages/FoodListPage';
import AppNavbar from "./components/AppNavbar";
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import AuthProvider from "./providers/AuthContextProvider.jsx";
import ProfilePage from './pages/ProfilePage'; 
import CookingTipsPage from "./pages/CookingTipsPage";

const AppContent = () => {
  const location = useLocation();
  
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <AppNavbar />}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/recipes/:recipeId" element={<RecipePage />} />
        <Route path="/recipes" element={<FoodListPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cookingtips" element={<CookingTipsPage />} />
      </Routes>
      {!hideNavbar && <ChatbotPopup />}
    </>
  );
};

export default function App() {
  return (
    <NextUIProvider>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </NextUIProvider>
  );
}
