// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { protect } = require('../middleware/auth');

// // **Get User Profile**
// router.get("/profile", protect, async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id).select("-password");
//       if (!user) return res.status(404).json({ message: "User not found" });
  
//       res.json(user);
//     } catch (error) {
//       console.error("Profile fetch error:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

// // **Add Meal Plan**
// router.post('/meal-planner', protect, async (req, res) => {
//   try {
//     const { date, meal } = req.body;
//     const user = await User.findById(req.user.id);
    
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Check if a meal plan exists for the given date
//     let mealPlan = user.mealPlanner.find((plan) => plan.date === date);
    
//     if (!mealPlan) {
//       // Create a new meal plan for the date
//       user.mealPlanner.push({ date, meals: [meal] });
//     } else {
//       // Append meal to existing meal plan
//       mealPlan.meals.push(meal);
//     }

//     await user.save();
//     res.json({ success: true, mealPlanner: user.mealPlanner });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error adding meal plan' });
//   }
// });

// // **Delete Meal Plan**
// router.delete('/meal-planner/:date/:mealId', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Find the meal plan by date
//     const mealPlan = user.mealPlanner.find((plan) => plan.date === req.params.date);
//     if (!mealPlan) return res.status(404).json({ error: 'Meal plan not found' });

//     // Remove the meal by ID
//     mealPlan.meals = mealPlan.meals.filter((meal) => meal._id.toString() !== req.params.mealId);
    
//     // Remove the meal plan if no meals left
//     if (mealPlan.meals.length === 0) {
//       user.mealPlanner = user.mealPlanner.filter((plan) => plan.date !== req.params.date);
//     }

//     await user.save();
//     res.json({ success: true, mealPlanner: user.mealPlanner });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error deleting meal' });
//   }
// });

// // **Add Recipe to Favorites**
// router.post('/favorite', protect, async (req, res) => {
//   try {
//     const { recipeId } = req.body;
//     const user = await User.findById(req.user.id);
    
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Check if recipe is already in favorites
//     if (user.favoriteRecipes.includes(recipeId)) {
//       return res.status(400).json({ error: 'Recipe already in favorites' });
//     }

//     user.favoriteRecipes.push(recipeId);
//     await user.save();
//     res.json({ success: true, favoriteRecipes: user.favoriteRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error adding to favorites' });
//   }
// });

// // **Remove Recipe from Favorites**
// router.delete('/favorite/:recipeId', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     user.favoriteRecipes = user.favoriteRecipes.filter(
//       (id) => id.toString() !== req.params.recipeId
//     );

//     await user.save();
//     res.json({ success: true, favoriteRecipes: user.favoriteRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error removing from favorites' });
//   }
// });

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { protect } = require('../middleware/auth');
// const { getUserProfile } = require("../controllers/userController"); // Ensure controller is imported

// router.get("/profile", protect, getUserProfile);

// **Get User Profile**
// router.get("/profile", protect, async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id).select("-password");
//       if (!user) return res.status(404).json({ message: "User not found" });
  
//       res.json(user);
//     } catch (error) {
//       console.error("Profile fetch error:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

// **Add Meal Plan**
// router.post('/meal-planner', protect, async (req, res) => {
//   try {
//     const { date, meal } = req.body;
//     const user = await User.findById(req.user.id);
    
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Check if a meal plan exists for the given date
//     let mealPlan = user.mealPlanner.find((plan) => plan.date === date);
    
//     if (!mealPlan) {
//       // Create a new meal plan for the date
//       user.mealPlanner.push({ date, meals: [meal] });
//     } else {
//       // Append meal to existing meal plan
//       mealPlan.meals.push(meal);
//     }

//     await user.save();
//     res.json({ success: true, mealPlanner: user.mealPlanner });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error adding meal plan' });
//   }
// });

// // **Delete Meal Plan**
// router.delete('/meal-planner/:date/:mealId', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Find the meal plan by date
//     const mealPlan = user.mealPlanner.find((plan) => plan.date === req.params.date);
//     if (!mealPlan) return res.status(404).json({ error: 'Meal plan not found' });

//     // Remove the meal by ID
//     mealPlan.meals = mealPlan.meals.filter((meal) => meal._id.toString() !== req.params.mealId);
    
//     // Remove the meal plan if no meals left
//     if (mealPlan.meals.length === 0) {
//       user.mealPlanner = user.mealPlanner.filter((plan) => plan.date !== req.params.date);
//     }

//     await user.save();
//     res.json({ success: true, mealPlanner: user.mealPlanner });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error deleting meal' });
//   }
// });

// // **Add Recipe to Favorites**
// router.post('/favorite', protect, async (req, res) => {
//   try {
//     const { recipeId } = req.body;
//     const user = await User.findById(req.user.id);
    
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Check if recipe is already in favorites
//     if (user.favoriteRecipes.includes(recipeId)) {
//       return res.status(400).json({ error: 'Recipe already in favorites' });
//     }

//     user.favoriteRecipes.push(recipeId);
//     await user.save();
//     res.json({ success: true, favoriteRecipes: user.favoriteRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error adding to favorites' });
//   }
// });

// // **Remove Recipe from Favorites**
// router.delete('/favorite/:recipeId', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     user.favoriteRecipes = user.favoriteRecipes.filter(
//       (id) => id.toString() !== req.params.recipeId
//     );

//     await user.save();
//     res.json({ success: true, favoriteRecipes: user.favoriteRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error removing from favorites' });
//   }
// });

// module.exports = router;




//////////////////////////////////////
// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const { protect } = require("../middleware/auth");

// // ✅ Simple profile route
// router.get("/profile", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("username"); // Fetch only username
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json(user);
//   } catch (error) {
//     console.error("Profile fetch error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;






const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Recipe = require("../models/Recipes"); 
const { protect } = require("../middleware/auth");

// ✅ Get user profile (Only Username)
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username displayName bio");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile", protect, async (req, res) => {
    try {
      const { displayName, bio } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { displayName, bio },
        { new: true, runValidators: true }
      ).select("username displayName bio");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Server error while updating profile" });
    }
});
  

// ✅ Get User's Favorite Recipes
// router.get("/favorites", protect, async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id).populate("favoriteRecipes"); // Populate recipe details
//       if (!user) return res.status(404).json({ message: "User not found" });
  
//       res.json({ favorites: user.favoriteRecipes });
//     } catch (error) {
//       console.error("Error fetching favorite recipes:", error);
//       res.status(500).json({ message: "Server error" });
//     }
// });

router.get("/favorites", protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .populate("favoriteRecipes", "name description imageUrl") // ✅ Fetch details
        .select("favoriteRecipes"); 
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user.favoriteRecipes); // ✅ Return populated recipes
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
      res.status(500).json({ error: "Server error while fetching favorites" });
    }
});

// ✅ Add Recipe to Favorites
router.post("/favorites", protect, async (req, res) => {
    try {
      const { recipeId } = req.body;
      if (!recipeId) {
        return res.status(400).json({ error: "Recipe ID is required" });
      }
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (user.favoriteRecipes.includes(recipeId)) {
        return res.status(400).json({ error: "Recipe already in favorites" });
      }
  
      user.favoriteRecipes.push(recipeId);
      await user.save();
  
      res.json({ success: true, favoriteRecipes: user.favoriteRecipes });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      res.status(500).json({ error: "Server error while adding to favorites" });
    }
});
  
  

// ✅ Remove Recipe from Favorites
router.delete("/favorites/:recipeId", protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      user.favoriteRecipes = user.favoriteRecipes.filter(
        (id) => id.toString() !== req.params.recipeId
      );
  
      await user.save();
      res.json({ success: true, favoriteRecipes: user.favoriteRecipes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error removing from favorites" });
    }
});


router.post("/meal-planner", protect, async (req, res) => {
    console.log("📩 Received Meal Plan Request:", req.body);

    let { date, meals } = req.body;

    // ✅ Ensure date is provided
    if (!date) {
        console.error("❌ Date is missing in request body!");
        return res.status(400).json({ error: "Date is required!" });
    }

    // ✅ Ensure date is formatted correctly (YYYY-MM-DD)
    if (typeof date !== "string") {
        date = new Date(date).toISOString().split("T")[0]; 
    }

    try {
        const user = await User.findOne({ _id: req.user.id });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Initialize mealPlanner if it's missing
        if (!Array.isArray(user.mealPlanner)) {
            user.mealPlanner = [];
        }

        // ✅ Ensure no invalid meal plans are saved
        user.mealPlanner = user.mealPlanner.filter(entry => entry.date);

        // 🔍 **Check if a meal plan already exists for this date**
        const existingMealIndex = user.mealPlanner.findIndex(entry => entry.date === date);

        if (existingMealIndex !== -1) {
            // ✅ **Update existing date's meals instead of duplicating**
            user.mealPlanner[existingMealIndex].meals = meals.map(meal => ({
                title: meal.title,
                recipeId: meal.recipeId,
                recipeName: meal.recipeName,
                imageUrl: meal.imageUrl || "", // ✅ Ensure image URL is stored
                portion: meal.portion || 1,
                ingredients: meal.ingredients || [],
            }));
        } else {
            // ✅ **Add a new meal plan entry**
            user.mealPlanner.push({
                date: date,
                meals: meals.map(meal => ({
                    title: meal.title,
                    recipeId: meal.recipeId,
                    recipeName: meal.recipeName,
                    imageUrl: meal.imageUrl || "", // ✅ Ensure image URL is stored
                    portion: meal.portion || 1,
                    ingredients: meal.ingredients || [],
                })),
            });
        }

        // ✅ Save changes
        await user.save();

        console.log("✅ Meal Plan Updated Successfully:", user.mealPlanner);
        res.json({ success: true, message: "Meal Plan updated successfully!" });
    } catch (error) {
        console.error("❌ Error Saving Meal Plan:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  
router.get("/meal-planner/:date", protect, async (req, res) => {
    try {
        const { date } = req.params;
        console.log(`📩 Received Meal Plan Fetch Request for date: ${date}`);

        const user = await User.findById(req.user.id);
        if (!user) {
            console.log("❌ User not found!");
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("📅 Searching meal plan for:", date);

        const mealPlan = user.mealPlanner.find(plan => plan.date === date);

        if (!mealPlan) {
            console.log("⚠️ No meal plan found for this date.");
            return res.status(200).json({ success: true, meals: [] }); // ✅ Return empty list if no meal plan found
        }

        console.log("✅ Meal Plan Found:", mealPlan);
        res.json({ success: true, meals: mealPlan.meals });
    } catch (error) {
        console.error("❌ Error fetching meal plan:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});






module.exports = router;













// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const { protect } = require("../middleware/auth");

// // **Add Recipe to Favorites**
// router.post("/favorite", protect, async (req, res) => {
//   try {
//     const { recipeId } = req.body;
//     const user = await User.findById(req.user.id);

//     if (!user) return res.status(404).json({ error: "User not found" });

//     // Check if the recipe is already in favorites
//     if (user.favoriteRecipes.includes(recipeId)) {
//       return res.status(400).json({ error: "Recipe already in favorites" });
//     }

//     user.favoriteRecipes.push(recipeId);
//     await user.save();

//     res.json({ success: true, favoriteRecipes: user.favoriteRecipes });
//   } catch (err) {
//     console.error("Error adding to favorites:", err);
//     res.status(500).json({ error: "Error adding to favorites" });
//   }
// });

// // **Remove Recipe from Favorites**
// router.delete("/favorite/:recipeId", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     user.favoriteRecipes = user.favoriteRecipes.filter(
//       (id) => id.toString() !== req.params.recipeId
//     );

//     await user.save();
//     res.json({ success: true, favoriteRecipes: user.favoriteRecipes });
//   } catch (err) {
//     console.error("Error removing from favorites:", err);
//     res.status(500).json({ error: "Error removing from favorites" });
//   }
// });

// module.exports = router;




