const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Recipe = require("../models/Recipes"); 
const { protect } = require("../middleware/auth");

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
  

router.get("/favorites", protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .populate("favoriteRecipes", "name description imageUrl") 
        .select("favoriteRecipes"); 
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user.favoriteRecipes);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
      res.status(500).json({ error: "Server error while fetching favorites" });
    }
});

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

    if (!date) {
        console.error("Date is missing in request body!");
        return res.status(400).json({ error: "Date is required!" });
    }

    if (typeof date !== "string") {
        date = new Date(date).toISOString().split("T")[0]; 
    }

    try {
        const user = await User.findOne({ _id: req.user.id });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!Array.isArray(user.mealPlanner)) {
            user.mealPlanner = [];
        }

        user.mealPlanner = user.mealPlanner.filter(entry => entry.date);

        const existingMealIndex = user.mealPlanner.findIndex(entry => entry.date === date);

        if (existingMealIndex !== -1) {
            user.mealPlanner[existingMealIndex].meals = meals.map(meal => ({
                title: meal.title,
                recipeId: meal.recipeId,
                recipeName: meal.recipeName,
                imageUrl: meal.imageUrl || "", 
                portion: meal.portion || 1,
                ingredients: meal.ingredients || [],
            }));
        } else {
            user.mealPlanner.push({
                date: date,
                meals: meals.map(meal => ({
                    title: meal.title,
                    recipeId: meal.recipeId,
                    recipeName: meal.recipeName,
                    imageUrl: meal.imageUrl || "",
                    portion: meal.portion || 1,
                    ingredients: meal.ingredients || [],
                })),
            });
        }

        await user.save();

        console.log("Meal Plan Updated Successfully:", user.mealPlanner);
        res.json({ success: true, message: "Meal Plan updated successfully!" });
    } catch (error) {
        console.error("Error Saving Meal Plan:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  
router.get("/meal-planner/:date", protect, async (req, res) => {
    try {
        const { date } = req.params;

        const user = await User.findById(req.user.id);
        if (!user) {
            console.log("User not found!");
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const mealPlan = user.mealPlanner.find(plan => plan.date === date);

        if (!mealPlan) {
            console.log("⚠️ No meal plan found for this date.");
            return res.status(200).json({ success: true, meals: [] });
        }

        console.log("Meal Plan Found:", mealPlan);
        res.json({ success: true, meals: mealPlan.meals });
    } catch (error) {
        console.error("Error fetching meal plan:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;