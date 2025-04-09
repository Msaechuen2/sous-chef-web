import React, { useState, useEffect } from 'react';
import { Box, Container, List, ListItem, ListItemText, Divider, Typography, Grid, Card, CardContent, CardMedia, Pagination, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Western', 'Japanese', 'Chinese'];

const FoodListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const categoryQuery = selectedCategory === 'All' ? '' : `?category=${selectedCategory}`;
        const response = await fetch(`http://localhost:5001/recipes${categoryQuery}`);
        const data = await response.json();
        setRecipes(data);
        setPage(1); 
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  const filteredRecipes = recipes.filter(recipe => 
    selectedCategory === 'All' || recipe.categories.includes(selectedCategory.toLowerCase())
  );
  const displayedRecipes = filteredRecipes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', py: 4 }}>
      
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/home" underline="hover" color="inherit">
          Home
        </MuiLink>
        <Typography color="text.primary">{selectedCategory} Recipes</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            width: '20%',
            mr: 4,
            p: 2,
            bgcolor: 'grey.100',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#ff6347', fontWeight: 'bold' }}>
            Categories
          </Typography>
          <List component="nav">
            {categories.map((category) => (
              <ListItem
                button
                key={category}
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: selectedCategory === category ? '#ff6347' : 'inherit',
                  color: selectedCategory === category ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: '#ff6347',
                    color: 'white',
                  },
                }}
              >
                <ListItemText
                  primary={category}
                  primaryTypographyProps={{
                    fontWeight: selectedCategory === category ? 'bold' : 'normal',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ width: '80%' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold'}}>{selectedCategory} Recipes</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {displayedRecipes.map((recipe) => (
              <Grid item xs={12} key={recipe._id}>
                <Card sx={{ display: 'flex', width: '100%', height: 180, marginBottom: 2 }}>
                  <CardMedia
                    image={recipe.imageUrl}
                    alt={recipe.name}
                    component={Link}
                    to={`/recipes/${recipe._id}`}
                    sx={{ width: 200, height: '100%', objectFit: 'cover', borderRadius: '4px 0 0 4px' }}
                  />
                  <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
                      component={Link}
                      to={`/recipes/${recipe._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {recipe.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      {recipe.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Pagination
              count={Math.ceil(filteredRecipes.length / itemsPerPage)}
              page={page}
              onChange={(event, value) => setPage(value)}
              sx={{
                '& .Mui-selected': {
                  bgcolor: '#ff6f61 !important',
                  color: 'white',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FoodListPage;
