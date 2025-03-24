const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipes'); // assuming you have a Recipe model

router.get('/popular', async (req, res) => {
  try {
    const recipes = await Recipe.find().limit(10); // limit the number of popular recipes
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching popular recipes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get recipes based on selected category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    // Apply filter only if a specific category is selected (not "All")
    const filter = category && category !== 'All' ? { categories: { $in: [category] } } : {};

    const recipes = await Recipe.find(filter);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    console.log(`🔍 Searching recipes by name: ${query}`);

    // ✅ Query only the `name` field, preventing ObjectId error
    const recipes = await Recipe.find({
      name: { $regex: query, $options: "i" } // Case-insensitive search
    });

    console.log(`✅ Found ${recipes.length} recipes`);
    res.json(recipes);
  } catch (error) {
    console.error("❌ Error fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;

