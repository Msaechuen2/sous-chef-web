app.get('/recipes/search', async (req, res) => {
    const query = req.query.query;
    try {
      const recipes = await Recipe.find({ name: new RegExp(query, 'i') });
      res.json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).send('Server Error');
    }
  });
  