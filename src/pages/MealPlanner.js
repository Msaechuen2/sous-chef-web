import React, { useState, useEffect, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Menu,
  MenuItem,
  Fab,
  TextField,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { saveMealPlan, getMealPlanByDate } from "../utils/api";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const MealPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [mealCards, setMealCards] = useState([
    { title: "Meal 1", recipe: null, portion: 1 }
  ]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5001/recipes');
        const data = await response.json();
        
        console.log("Fetched Recipes:", data); 
        setRecipes(data);
        setFilteredRecipes(data); 
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    fetchRecipes();
  }, []);
  
  useEffect(() => {
    const fetchMealPlan = async () => {
        try {
            const formattedDate = selectedDate.format("YYYY-MM-DD");
            console.log(`Fetching Meal Plan for: ${formattedDate}`);

            const response = await getMealPlanByDate(formattedDate);

            if (response.success) {
                console.log("Meal Plan Response:", response);
                setMealCards(response.meals.length > 0
                    ? response.meals.map((meal, index) => ({
                        title: meal.title || `Meal ${index + 1}`,
                        portion: meal.portion || 1,
                        recipe: {
                            _id: meal.recipeId,
                            name: meal.recipeName,
                            imageUrl: meal.imageUrl || "", 
                            ingredients: meal.ingredients || [],
                        },
                    }))
                    : [{ title: "Meal 1", recipe: null }] 
                );
            }
        } catch (error) {
            console.error("Error fetching meal plan:", error);
        }
    };

    fetchMealPlan();
  }, [selectedDate]);



  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setFilteredRecipes(recipes);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const filtered = recipes.filter(recipe =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filtered);
        setFilteredRecipes(filtered);
      } catch (error) {
        console.error("Error searching recipes:", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm, recipes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter) => {
    setAnchorEl(null);
    setSelectedFilter(filter);
  
    const filteredRecipes = recipes.filter(recipe => 
      filter === "All" || 
      (recipe.categories && recipe.categories.some(category => category.toLowerCase() === filter.toLowerCase()))
    );
  
    console.log(`Filtering for: ${filter}`, filteredRecipes);
    setFilteredRecipes(filteredRecipes);
  };
  
  
  

  const handleSaveMealPlan = async () => {
    if (mealCards.length === 0 || !mealCards.some(meal => meal.recipe)) {
        alert("Please add at least one meal with a recipe before saving.");
        return;
    }

    const formattedMealPlan = {
        date: selectedDate.format("YYYY-MM-DD"), 
        meals: mealCards.filter(meal => meal.recipe).map(meal => ({
            title: meal.title,
            recipeId: meal.recipe._id,
            recipeName: meal.recipe.name,
            imageUrl: meal.recipe.imageUrl || "", 
            portion: meal.portion || 1,
  ingredients: meal.recipe.ingredients || []
        })),
    };

    console.log("Sending Meal Plan:", formattedMealPlan); 

    try {
        await saveMealPlan(formattedMealPlan);
        alert("Meal plan saved successfully!");
    } catch (error) {
        console.error("Error saving meal plan:", error);
        alert("Failed to save meal plan. Please try again.");
    }
  };

  

  const handleAddMeal = (recipe) => {
    if (selectedCard !== null) {
      const updatedCards = [...mealCards];
      updatedCards[selectedCard].recipe = recipe;
      setMealCards(updatedCards);
      setSelectedCard(null);
    }
  };

  const handleChangeMeal = (index) => {
    const updatedCards = [...mealCards];
    updatedCards[index].recipe = null;
    setMealCards(updatedCards);
    handleMenuClose();
  };

  const handleDeleteMealCard = (index) => {
    if (mealCards.length > 1) {
      const updatedCards = mealCards.filter((_, cardIndex) => cardIndex !== index);
      setMealCards(updatedCards);
    }
    handleMenuClose();
  };

  const handleMenuOpen = (event, index) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedCard(index);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const addNewCard = () => {
    setMealCards([...mealCards, { title: `Meal ${mealCards.length + 1}`, recipe: null }]);
  };

  const handleTitleChange = (index, newTitle) => {
    const updatedCards = [...mealCards];
    updatedCards[index].title = newTitle;
    setMealCards(updatedCards);
  };



  const handlePortionChange = (index, newPortion) => {
    const updatedCards = [...mealCards];
    updatedCards[index].portion = newPortion;
    setMealCards(updatedCards);
  };


  const adjustIngredientPortion = (ingredient, portion) => {
    const match = ingredient.match(/^([\d/.]+)\s*(.*)$/);
    if (!match) return ingredient; 

    let quantity = parseFloat(match[1]); 
    if (isNaN(quantity)) return ingredient; 

    quantity = (quantity * portion).toFixed(1); 
    return `${quantity} ${match[2]}`; 
  };


  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4, mt: 2 }}>
        <MuiLink component={Link} to="/home" underline="hover" color="inherit">
          Home
        </MuiLink>
        <Typography color="text.primary">Meal Planner</Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={3}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#000',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '2px',
          }}
        >
          Meal Planner
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDate}
            onChange={(newDate) => {
              if (newDate) {
                setSelectedDate(dayjs(newDate)); 
              }
            }}
            slotProps={{
              day: {
                sx: {
                  '&.Mui-selected': {
                    backgroundColor: '#FF6347 !important',
                    color: '#fff',
                  },
                },
              },
            }}
          />


        </LocalizationProvider>
      </Box>

      <Grid container spacing={4} mt={4}>
        {/* Left side: Meal Cards */}
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight="bold" sx={{ mr: 1 }}>
              {selectedDate.format('D MMM, YYYY')} Plan
            </Typography>
            <Fab color="primary" aria-label="add" onClick={addNewCard} size="small" sx={{ backgroundColor: '#FF6347', ml: 2, '&:hover': { backgroundColor: '#FF6347' }}}>
              <AddIcon />
            </Fab>
          </Box>
          
          {mealCards.map((meal, index) => (
            <Card key={index}

              sx={{
                mb: 2,
                position: 'relative',
                width: '100%',
                minHeight: 150, 
                overflow: 'visible',
                boxShadow: selectedCard === index ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
                border: selectedCard === index ? '2px solid #FF6347' : '1px solid #ddd',
                cursor: 'pointer',
                transition: "all 0.3s ease-in-out",
              }}
              onClick={() => setSelectedCard(index)}>
              {meal.recipe && (
                <CardMedia
                  component="img"
                  image={meal.recipe.imageUrl}
                  alt={meal.recipe.name}
                  sx={{ width: "40%", height: "100%", objectFit: "cover", position: "absolute" }}
                />
              )}
              <CardContent sx={{ marginLeft: meal.recipe ? "40%" : "0%" }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                      value={meal.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ flex: 1 }}
                  />

                  <TextField
                    type="number"
                    label="Portion"
                    size="small"
                    inputProps={{ min: 1 }}
                    value={meal.portion || 1}
                    onChange={(e) => handlePortionChange(index, parseInt(e.target.value) || 1)}
                    sx={{ width: 70, marginRight: 2 }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">x</InputAdornment>,
                    }}
                  />

                </Box>

                <Typography variant="body1" fontWeight="bold">
                    {meal.recipe ? meal.recipe.name : "Empty Meal Slot"}
                </Typography>

                {meal.recipe && meal.recipe.ingredients && meal.recipe.ingredients.length > 0 && (
                    <Accordion sx={{ mt: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body2">View Ingredients</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense>
                                {meal.recipe.ingredients.map((ingredient, idx) => (
                                    <ListItem key={idx}>
                                      <ListItemText 
                                        primary={`${adjustIngredientPortion(ingredient, meal.portion || 1)}`} 
                                      />
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                )}


                <IconButton aria-label="settings" onClick={(event) => handleMenuOpen(event, index)} sx={{ position: 'absolute', top: 4, right: 4 }}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl) && selectedCard === index} onClose={handleMenuClose}>
                  <MenuItem onClick={() => handleChangeMeal(index)}>Change Recipe</MenuItem>
                  <MenuItem onClick={() => handleDeleteMealCard(index)}>Delete</MenuItem>
                </Menu>
              </CardContent>
            </Card>
          ))}

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: '#FF6347' }} onClick={handleSaveMealPlan}>
            Save Meal Plan
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h5" fontWeight="bold">
              Recipes
            </Typography>
            <Box display="flex" alignItems="center" ref={searchRef}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mr: 1, width: "300px"}}
              />
              <SearchIcon />
            </Box>
            <IconButton onClick={handleFilterClick}>
              <FilterListIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleFilterClose(selectedFilter)}>
              <MenuItem onClick={() => handleFilterClose("All")}>All</MenuItem>
              <MenuItem onClick={() => handleFilterClose("Breakfast")}>Breakfast</MenuItem>
              <MenuItem onClick={() => handleFilterClose("Lunch")}>Lunch</MenuItem>
              <MenuItem onClick={() => handleFilterClose("Dinner")}>Dinner</MenuItem>
            </Menu>
          </Box>

          <Box sx={{ maxHeight: 500, overflowY: 'auto', paddingRight: 2 }}>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <Card key={recipe._id} sx={{ mb: 2, display: 'flex', alignItems: 'center', p: 1, boxShadow: 1, width: '100%' }}>
                  <CardMedia component="img" image={recipe.imageUrl} alt={recipe.name} sx={{ width: 150, height: 150 }} />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">{recipe.name}</Typography>
                    <Accordion sx={{ mt: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body2">View Ingredients</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={ingredient} />
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Button variant="contained" color="primary" sx={{ mt: 1, backgroundColor: '#FF6347' }} onClick={() => handleAddMeal(recipe)}>
                      Add to Meal Plan
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>No recipes found for {selectedFilter}</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealPlanner;