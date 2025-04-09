import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Card, CardMedia, CardContent, List, ListItem, ListItemText, Divider, CircularProgress, Breadcrumbs, Link, Grid, Paper, Button, IconButton } from '@mui/material';
import { addRecipeToFavorites, getUserFavorites, removeRecipeFromFavorites } from '../utils/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../providers/AuthContextProvider';

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5001/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    const checkFavoriteStatus = async () => {
      if (!user) return; 
      try {
        const favorites = await getUserFavorites();
        const isFav = favorites.some((fav) => fav._id === recipeId); 
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    

    fetchRecipe();
    checkFavoriteStatus();
  }, [recipeId, user]);

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("You must be logged in to manage favorites.");
      return;
    }

    try {
      if (isFavorite) {
        await removeRecipeFromFavorites(recipeId); 
      } else {
        await addRecipeToFavorites(recipeId); 
      }

      setIsFavorite(!isFavorite); 
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (!recipe) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/home" underline="hover" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/recipes" underline="hover" color="inherit">
            Recipes
          </Link>
          <Typography color="textPrimary">{recipe.name}</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ display: 'flex', mb: 4 }}>
            <CardMedia
              component="img"
              sx={{ width: 250 }}
              image={recipe.imageUrl}
              alt={recipe.name}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                {recipe.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                Ingredients
              </Typography>

              
              <List dense>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color={isFavorite ? "error" : "primary"}
            onClick={handleToggleFavorite} 
            sx={{ mb: 2 }}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"} 
          </Button>

          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" color="text.secondary">Prep Time</Typography>
                <Typography>{recipe.prepTime} mins</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" color="text.secondary">Cook Time</Typography>
                <Typography>{recipe.cookTime} mins</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" color="text.secondary">Total Time</Typography>
                <Typography>{recipe.totalTime} mins</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" color="text.secondary">Servings</Typography>
                <Typography>{recipe.servings}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Instructions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recipe.instructions.map((step, index) => (
                <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={`Step ${index + 1}`}
                    secondary={step}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondaryTypographyProps={{ mt: 1 }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6">Nutrition Information</Typography>
            <Typography>Calories: 350 kcal</Typography>
            <Typography>Protein: 15g</Typography>
            <Typography>Carbs: 40g</Typography>
            <Typography>Fat: 10g</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6">Chef's Tips</Typography>
            <Typography variant="body2">Use fresh ingredients for the best flavor. Adjust the spices to taste.</Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Related Recipes</Typography>
            <List>
              <ListItem><ListItemText primary="Chicken Alfredo" /></ListItem>
              <ListItem><ListItemText primary="Vegetable Stir-Fry" /></ListItem>
              <ListItem><ListItemText primary="Beef Tacos" /></ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipePage;