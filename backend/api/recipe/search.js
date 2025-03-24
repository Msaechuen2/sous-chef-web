// Backend code (e.g., in your Express server file)
app.get('/recipes/search', async (req, res) => {
    const query = req.query.query;
    try {
      // Use a regex to perform a case-insensitive search for the query within the recipe name
      const recipes = await Recipe.find({ name: new RegExp(query, 'i') });
      res.json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).send('Server Error');
    }
  });
  