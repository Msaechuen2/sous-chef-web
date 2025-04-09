const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  prepTime: { type: Number }, 
  cookTime: { type: Number },
});

const Recipe = mongoose.model('recipes', recipeSchema);
module.exports = Recipe;