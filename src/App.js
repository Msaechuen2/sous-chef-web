// import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Avatar, NextUIProvider } from "@nextui-org/react";
// import { ChefHatLogo } from "./components/ChefHatLogo.js";
// import { SearchIcon } from "./components/SearchIcon.js";
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/Home';
// import MealPlanner from './pages/MealPlanner';
// import ChatbotPopup from './components/ChatbotPopup';
// import RecipePage from './pages/RecipePage';
// import FoodListPage from './pages/FoodListPage';
// import AppNavbar from "./components/AppNavbar";
// import SearchResultsPage from './pages/SearchResultsPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from "./pages/RegisterPage";
// import AuthProvider from "./providers/AuthContextProvider.jsx";
// const navbarStyle = {
//   fontFamily: 'Roboto, serif',
// };

// export default function App() {
//   return (
//     <NextUIProvider>
//       <Router>
//         <AuthProvider>
//           <AppNavbar />
//           <div>
//             <Routes>
//               <Route path="/home" element={<HomePage />} />
//               <Route path="/meal-planner" element={<MealPlanner />} />
//               <Route path="/recipes/:recipeId" element={<RecipePage />} />
//               <Route path="/recipes" element={<FoodListPage />} />
//               <Route path="/search" component={<SearchResultsPage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//             </Routes>
//             <ChatbotPopup />
//           </div>
//         </AuthProvider>
//       </Router>
//     </NextUIProvider>
//   );
// }

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
import RegisterPage from './pages/RegisterPage'; // Assume you have this
import AuthProvider from "./providers/AuthContextProvider.jsx";
import ProfilePage from './pages/ProfilePage'; // Import Profile Page
import CookingTipsPage from "./pages/CookingTipsPage";

const AppContent = () => {
  const location = useLocation();
  
  // Check if the current route is '/login' or '/register'
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {/* Conditionally render the navbar based on the route */}
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
