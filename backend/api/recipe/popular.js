// pages/api/recipes/popular.js
export default function handler(req, res) {
    const popularRecipes = [
      { id: 1, name: 'Spaghetti Carbonara', imageUrl: '/images/carbonara.jpg' },
      { id: 2, name: 'Chicken Parmesan', imageUrl: '/images/chicken-parmesan.jpg' },
      { id: 3, name: 'Beef Tacos', imageUrl: '/images/beef-tacos.jpg' },
      { id: 4, name: 'Vegetable Stir Fry', imageUrl: '/images/stir-fry.jpg' }
    ];
    res.status(200).json(popularRecipes);
  }
  