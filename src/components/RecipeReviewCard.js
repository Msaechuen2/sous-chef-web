import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useAuth } from '../providers/AuthContextProvider';
import { addRecipeToFavorites, removeRecipeFromFavorites, getUserFavorites } from '../utils/api';
import './RecipeReviewCard.css';

export default function RecipeReviewCard({ title, description, imageUrl, linkTo, recipeId }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log("RecipeReviewCard Loaded - Recipe ID:", recipeId);
  }, [recipeId]);

  useEffect(() => {
    if (user && recipeId) {
      getUserFavorites()
        .then((favorites) => {
          if (favorites.some((fav) => fav._id === recipeId)) {
            setIsFavorite(true);
          }
        })
        .catch((err) => console.error("Error fetching favorites:", err));
    }
  }, [user, recipeId]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      alert("You must be logged in to manage favorites.");
      return;
    }
    
    if (!recipeId) {
      console.error("Recipe ID is undefined!");
      return;
    }

    try {
      if (isFavorite) {
        await removeRecipeFromFavorites(recipeId);
      } else {
        await addRecipeToFavorites(recipeId);
      }

      const updatedFavorites = await getUserFavorites();
      setIsFavorite(updatedFavorites.some((fav) => fav._id === recipeId));

    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardHeader title={title} subheader="Popular Recipe" />
      </Link>

      <Link to={linkTo}>
        <CardMedia component="img" image={imageUrl} className="small-image" />
      </Link>

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>

      <IconButton aria-label="add to favorites" onClick={handleFavoriteToggle} color={isFavorite ? "error" : "default"}>
        <FavoriteIcon />
      </IconButton>

      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
    </Card>
  );
}
