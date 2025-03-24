// import axios from "axios";

// const API_URL = "http://localhost:5001/api"; // Change to your backend URL if deployed

// // Function to get auth headers for protected routes
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("site");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// /**
//  * Get user profile (Protected)
//  */
// export const getUserProfile = async () => {
//     try {
//       const token = localStorage.getItem("site"); // Retrieve token
//       if (!token) throw new Error("No token found");
  
//       const response = await axios.get("http://localhost:5001/api/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
  
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       throw error;
//     }
//   };
  

// /**
//  * Update user profile (Protected)
//  */
// export const updateUserProfile = async (userData) => {
//   const response = await axios.put(`${API_URL}/user/profile`, userData, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * Get user's saved meal planner (Protected)
//  */
// export const getUserMealPlanner = async () => {
//   const response = await axios.get(`${API_URL}/user/meal-planner`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * Add a meal to the user's meal planner (Protected)
//  */
// export const addUserMealToPlanner = async (mealData) => {
//   const response = await axios.post(`${API_URL}/user/meal-planner`, mealData, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * Get user's favorite recipes (Protected)
//  */
// export const getUserFavorites = async () => {
//   const response = await axios.get(`${API_URL}/user/favorites`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * Add a recipe to favorites (Protected)
//  */
// export const addRecipeToFavorites = async (recipeId) => {
//   const response = await axios.post(
//     `${API_URL}/user/favorites`,
//     { recipeId },
//     { headers: getAuthHeaders() }
//   );
//   return response.data;
// };

// /**
//  * Remove a recipe from favorites (Protected)
//  */
// export const removeRecipeFromFavorites = async (recipeId) => {
//   const response = await axios.delete(`${API_URL}/user/favorites/${recipeId}`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };



// import axios from "axios";

// const API_URL = "http://localhost:5001/api"; // Change to deployed backend URL if necessary

// // ✅ Function to get auth headers for protected routes
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// /**
//  * Get user profile (Protected)
//  */
// export const getUserProfile = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/profile`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

// /**
//  * Update user profile (Protected)
//  */
// export const updateUserProfile = async (userData) => {
//   const response = await axios.put(`${API_URL}/user/profile`, userData, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * Get user's saved meal planner (Protected)
//  */
// export const getUserMealPlanner = async () => {
//   const response = await axios.get(`${API_URL}/user/meal-planner`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * Add a meal to the user's meal planner (Protected)
//  */
// export const addUserMealToPlanner = async (mealData) => {
//   const response = await axios.post(`${API_URL}/user/meal-planner`, mealData, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * Get user's favorite recipes (Protected)
//  */
// export const getUserFavorites = async () => {
//   const response = await axios.get(`${API_URL}/user/favorites`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * Add a recipe to favorites (Protected)
//  */
// export const addRecipeToFavorites = async (recipeId) => {
//   const response = await axios.post(
//     `${API_URL}/user/favorites`,
//     { recipeId },
//     { headers: getAuthHeaders() }
//   );
//   return response.data;
// };

// /**
//  * Remove a recipe from favorites (Protected)
//  */
// export const removeRecipeFromFavorites = async (recipeId) => {
//   const response = await axios.delete(`${API_URL}/user/favorites/${recipeId}`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };







// import axios from "axios";

// const API_URL = "http://localhost:5001/api"; // Backend API base URL

// // Function to get auth headers for protected routes
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("site"); // Token stored in localStorage
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// /**
//  * ✅ User Authentication APIs
//  */

// // **Login User**
// export const loginUser = async (userData) => {
//   const response = await axios.post(`${API_URL}/users/login`, userData, {
//     headers: { "Content-Type": "application/json" },
//   });
//   return response.data;
// };

// // **Register New User**
// export const registerUser = async (userData) => {
//   const response = await axios.post(`${API_URL}/users/register`, userData, {
//     headers: { "Content-Type": "application/json" },
//   });
//   return response.data;
// };

// // **Logout User**
// export const logoutUser = () => {
//   localStorage.removeItem("site");
// };

// /**
//  * ✅ User Profile APIs
//  */

// // **Get User Profile (Includes Favorite Recipes)**
// export const getUserProfile = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/profile`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

// // **Update User Profile**
// export const updateUserProfile = async (userData) => {
//   const response = await axios.put(`${API_URL}/users/profile`, userData, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * ✅ Favorite Recipes APIs
//  */

// // **Get Favorite Recipes**
// export const getUserFavorites = async () => {
//   const response = await axios.get(`${API_URL}/users/favorite`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// // **Add Recipe to Favorites**
// export const addRecipeToFavorites = async (recipeId) => {
//   const response = await axios.post(
//     `${API_URL}/users/favorite`,
//     { recipeId },
//     { headers: getAuthHeaders() }
//   );
//   return response.data;
// };

// // **Remove Recipe from Favorites**
// export const removeRecipeFromFavorites = async (recipeId) => {
//   const response = await axios.delete(`${API_URL}/users/favorite/${recipeId}`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * ✅ Meal Planner APIs
//  */

// // **Get User's Saved Meal Planner**
// export const getUserMealPlanner = async () => {
//   const response = await axios.get(`${API_URL}/users/meal-planner`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// // **Add a Meal to the User's Meal Planner**
// export const addUserMealToPlanner = async (mealData) => {
//   const response = await axios.post(`${API_URL}/users/meal-planner`, mealData, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// // **Remove a Meal from the Meal Planner**
// export const removeUserMealFromPlanner = async (mealId) => {
//   const response = await axios.delete(`${API_URL}/users/meal-planner/${mealId}`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// /**
//  * ✅ Recipe APIs
//  */

// // **Get All Recipes**
// export const getAllRecipes = async () => {
//   const response = await axios.get(`${API_URL}/recipes`);
//   return response.data;
// };

// // **Get Recipe by ID**
// export const getRecipeById = async (recipeId) => {
//   const response = await axios.get(`${API_URL}/recipes/${recipeId}`);
//   return response.data;
// };

// // **Search Recipes by Query**
// export const searchRecipes = async (query) => {
//   const response = await axios.get(`${API_URL}/recipes/search?query=${query}`);
//   return response.data;
// };

// // **Add a New Recipe**
// export const addNewRecipe = async (recipeData) => {
//   const response = await axios.post(`${API_URL}/recipes`, recipeData, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// // **Delete a Recipe**
// export const deleteRecipe = async (recipeId) => {
//   const response = await axios.delete(`${API_URL}/recipes/${recipeId}`, {
//     headers: getAuthHeaders(),
//   });
//   return response.data;
// };

// export default {
//   loginUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
//   getUserFavorites,
//   addRecipeToFavorites,
//   removeRecipeFromFavorites,
//   getUserMealPlanner,
//   addUserMealToPlanner,
//   removeUserMealFromPlanner,
//   getAllRecipes,
//   getRecipeById,
//   searchRecipes,
//   addNewRecipe,
//   deleteRecipe,
// };










// import axios from "axios";

// const API_URL = "http://localhost:5001/api"; // Update this URL if backend is deployed

// // Function to get auth headers for protected routes
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("site"); // Token stored in localStorage
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// /**
//  * ✅ User Authentication APIs
//  */

// // **Login User**
// export const loginUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/users/login`, userData, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Login error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Register New User**
// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/users/register`, userData, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Registration error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Logout User**
// export const logoutUser = () => {
//   localStorage.removeItem("site");
// };

// /**
//  * ✅ User Profile APIs
//  */

// // **Get User Profile (Includes Favorite Recipes)**
// export const getUserProfile = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/profile`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Update User Profile**
// export const updateUserProfile = async (userData) => {
//   try {
//     const response = await axios.put(`${API_URL}/users/profile`, userData, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user profile:", error.response?.data || error.message);
//     throw error;
//   }
// };

// /**
//  * ✅ Favorite Recipes APIs
//  */

// // **Get Favorite Recipes**
// export const getUserFavorites = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/favorite`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching favorite recipes:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Add Recipe to Favorites**
// export const addRecipeToFavorites = async (recipeId) => {
//   try {
//     const response = await axios.post(
//         "http://localhost:5001/api/users/favorite", // ✅ Correct API Endpoint
//         { recipeId },
//         { headers: getAuthHeaders() }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error adding to favorites:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Remove Recipe from Favorites**
// export const removeRecipeFromFavorites = async (recipeId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/users/favorite/${recipeId}`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error removing from favorites:", error.response?.data || error.message);
//     throw error;
//   }
// };

// /**
//  * ✅ Meal Planner APIs
//  */

// // **Get User's Saved Meal Planner**
// export const getUserMealPlanner = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/meal-planner`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching meal planner:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Add a Meal to the User's Meal Planner**
// export const addUserMealToPlanner = async (mealData) => {
//   try {
//     const response = await axios.post(`${API_URL}/users/meal-planner`, mealData, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error adding meal to planner:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Remove a Meal from the Meal Planner**
// export const removeUserMealFromPlanner = async (mealId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/users/meal-planner/${mealId}`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error removing meal from planner:", error.response?.data || error.message);
//     throw error;
//   }
// };

// /**
//  * ✅ Recipe APIs
//  */

// // **Get All Recipes**
// export const getAllRecipes = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/recipes`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching recipes:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Get Recipe by ID**
// export const getRecipeById = async (recipeId) => {
//   try {
//     const response = await axios.get(`${API_URL}/recipes/${recipeId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching recipe by ID:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Search Recipes by Query**
// export const searchRecipes = async (query) => {
//   try {
//     const response = await axios.get(`${API_URL}/recipes/search?query=${query}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error searching recipes:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Add a New Recipe**
// export const addNewRecipe = async (recipeData) => {
//   try {
//     const response = await axios.post(`${API_URL}/recipes`, recipeData, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error adding new recipe:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Delete a Recipe**
// export const deleteRecipe = async (recipeId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/recipes/${recipeId}`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting recipe:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export default {
//   loginUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
//   getUserFavorites,
//   addRecipeToFavorites,
//   removeRecipeFromFavorites,
//   getUserMealPlanner,
//   addUserMealToPlanner,
//   removeUserMealFromPlanner,
//   getAllRecipes,
//   getRecipeById,
//   searchRecipes,
//   addNewRecipe,
//   deleteRecipe,
// };











// import axios from "axios";

// const API_URL = "http://localhost:5001/api"; // Adjust if needed

// // Function to get authentication headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("site"); // Ensure this matches your auth storage key
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// /**
//  * ✅ Favorite Recipes APIs
//  */

// // **Get Favorite Recipes**
// export const getUserFavorites = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/favorite`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching favorite recipes:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Add Recipe to Favorites**
// export const addRecipeToFavorites = async (recipeId) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/users/favorite`, // ✅ Correct API Endpoint
//       { recipeId },
//       { headers: getAuthHeaders() }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error adding to favorites:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Remove Recipe from Favorites**
// export const removeRecipeFromFavorites = async (recipeId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/users/favorite/${recipeId}`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error removing from favorites:", error.response?.data || error.message);
//     throw error;
//   }
// };

// /**
//  * ✅ User Profile API
//  */

// // **Get User Profile**
// export const getUserProfile = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/profile`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export default {
//   getUserFavorites,
//   addRecipeToFavorites,
//   removeRecipeFromFavorites,
//   getUserProfile,
// };




// import axios from "axios";

// const API_URL = "http://localhost:5001/api"; // Change if deployed

// // Function to get auth headers for protected routes
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("site"); // Get stored token
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// /**
//  * ✅ Authentication APIs
//  */

// // **Login User**
// export const loginUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, userData, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Login error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Register User**
// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, userData, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Registration error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Logout User**
// export const logoutUser = () => {
//   localStorage.removeItem("site"); // Remove token on logout
// };

// /**
//  * ✅ User Profile APIs
//  */

// // **Get User Profile (Includes Username & Favorite Recipes)**
// export const getUserProfile = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/profile`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error.response?.data || error.message);
//     throw error;
//   }
// };

// /**
//  * ✅ Favorite Recipes APIs
//  */

// // **Get Favorite Recipes**
// export const getUserFavorites = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/favorite`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching favorite recipes:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Add Recipe to Favorites**
// export const addRecipeToFavorites = async (recipeId) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/users/favorite`,
//       { recipeId },
//       { headers: getAuthHeaders() }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error adding to favorites:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Remove Recipe from Favorites**
// export const removeRecipeFromFavorites = async (recipeId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/users/favorite/${recipeId}`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error removing from favorites:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export default {
//   loginUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   getUserFavorites,
//   addRecipeToFavorites,
//   removeRecipeFromFavorites,
// };




///latest
// import axios from "axios";

// const API_URL = "http://localhost:5001/api"; // Backend API URL

// // Function to get auth headers for protected routes
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("site"); // Retrieve token from localStorage
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // **Get User's Favorite Recipes**
// export const getUserFavorites = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/users/favorites", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("site")}` }, // ✅ Ensure token is included
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching favorite recipes:", error.response?.data || error.message);
//       throw error;
//     }
//   };

// // **Add Recipe to Favorites**
// export const addRecipeToFavorites = async (recipeId) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/users/favorites`, // ✅ Corrected endpoint
//       { recipeId },
//       { headers: getAuthHeaders() }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error adding to favorites:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // **Remove Recipe from Favorites**
// export const removeRecipeFromFavorites = async (recipeId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/users/favorites/${recipeId}`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error removing from favorites:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export const getUserProfile = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/profile`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export default {
//   getUserFavorites,
//   addRecipeToFavorites,
//   removeRecipeFromFavorites,
//   getUserProfile
// };




import axios from "axios";

const API_URL = "http://localhost:5001/api"; // Backend API URL

// Function to get auth headers for protected routes
const getAuthHeaders = () => {
  const token = localStorage.getItem("site"); // Retrieve token from localStorage
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : {};
};

/**
 * ✅ User Favorite Recipes APIs
 */

// **Get User's Favorite Recipes**
// export const getUserFavorites = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users/favorites`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data.favoriteRecipes || []; // Ensure it returns an array
//   } catch (error) {
//     console.error("Error fetching favorite recipes:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const getUserFavorites = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/favorites`, {
        headers: getAuthHeaders(),
      });
      return response.data; // ✅ Return full recipe data, not just IDs
    } catch (error) {
      console.error("Error fetching favorite recipes:", error.response?.data || error.message);
      throw error;
    }
};

// **Add Recipe to Favorites**
// export const addRecipeToFavorites = async (recipeId) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/users/favorites`, // Ensure this matches backend route
//       { recipeId }, // Send as an object { recipeId }
//       { headers: getAuthHeaders() }
//     );
//     return response.data.favoriteRecipes || []; // Ensure it returns an array of favorites
//   } catch (error) {
//     console.error("Error adding to favorites:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const updateUserProfile = async (profileData) => {
    try {
      const response = await axios.put(`${API_URL}/users/profile`, profileData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      throw error;
    }
};

export const addRecipeToFavorites = async (recipeId) => {
    try {
      if (!recipeId) {
        console.error("❌ Recipe ID is undefined!");
        return;
      }
      console.log("✅ Adding recipe to favorites:", recipeId); // Debugging
  
      const response = await axios.post(
        `${API_URL}/users/favorites`,
        { recipeId },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to favorites:", error.response?.data || error.message);
      throw error;
    }
  };
  

// **Remove Recipe from Favorites**
export const removeRecipeFromFavorites = async (recipeId) => {
    try {
      const response = await axios.delete(`${API_URL}/users/favorites/${recipeId}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error removing from favorites:", error.response?.data || error.message);
      throw error;
    }
};


/**
 * ✅ User Profile API
 */

// **Get User Profile**
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: getAuthHeaders(),
    });
    return response.data; // Should return { _id, username, favoriteRecipes }
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data || error.message);
    throw error;
  }
};

export const saveMealPlan = async (mealPlanData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/meal-planner",
        mealPlanData,
        { headers: getAuthHeaders() } // Ensure authorization
      );
      return response.data;
    } catch (error) {
      console.error("Error saving meal plan:", error.response?.data || error.message);
      throw error;
    }
};


export const getMealPlanByDate = async (date) => {
    try {
        console.log(`📤 Fetching Meal Plan for: ${date}`);

        const response = await fetch(`http://localhost:5001/api/users/meal-planner/${date}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("site")}`, // ✅ Ensure user token is sent
            },
        });

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching meal plan:", error);
        return { success: false, message: "Failed to fetch meal plan" };
    }
};


export const getRecipesBySearch = async (query) => {
    try {
      console.log(`📤 Fetching recipes for: ${query}`);
  
      const response = await fetch(`http://localhost:5001/api/recipes/search?query=${query}`);
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ Error fetching recipes:", error);
      return [];
    }
};

export default {
  getUserFavorites,
  addRecipeToFavorites,
  removeRecipeFromFavorites,
  getUserProfile,
  saveMealPlan,
  getMealPlanByDate,
  getRecipesBySearch,
};



