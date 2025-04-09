import axios from "axios";

const API_URL = "http://localhost:5001/api"; 

const getAuthHeaders = () => {
  const token = localStorage.getItem("site"); 
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : {};
};

export const getUserFavorites = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/favorites`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching favorite recipes:", error.response?.data || error.message);
      throw error;
    }
};

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
        console.error("Recipe ID is undefined!");
        return;
      }
      console.log("Adding recipe to favorites:", recipeId); 
  
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


export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: getAuthHeaders(),
    });
    return response.data;
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
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving meal plan:", error.response?.data || error.message);
      throw error;
    }
};


export const getMealPlanByDate = async (date) => {
    try {
        console.log(`Fetching Meal Plan for: ${date}`);

        const response = await fetch(`http://localhost:5001/api/users/meal-planner/${date}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("site")}`, 
            },
        });

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Error fetching meal plan:", error);
        return { success: false, message: "Failed to fetch meal plan" };
    }
};


export const getRecipesBySearch = async (query) => {
    try {
      console.log(`Fetching recipes for: ${query}`);
  
      const response = await fetch(`http://localhost:5001/api/recipes/search?query=${query}`);
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching recipes:", error);
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