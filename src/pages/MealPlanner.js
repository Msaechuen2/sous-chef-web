// // // src/pages/MealPlanner.js

// // import React, { useState } from 'react';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { Container, Box, Typography, TextField, Grid, Card, CardContent } from '@mui/material';
// // import dayjs from 'dayjs';

// // const MealPlanner = () => {
// //   const [selectedDate, setSelectedDate] = useState(dayjs());

// //   return (
// //     <Container maxWidth="md" sx={{ mt: 4 }}>
// //       <Box textAlign="center" mb={4}>
// //         <Typography variant="h4" gutterBottom>
// //           Meal Planner
// //         </Typography>
// //         <Typography variant="body1" color="textSecondary">
// //           Plan your meals by selecting a date and adding your meals for breakfast, lunch, and dinner.
// //         </Typography>
// //       </Box>

// //       {/* Date Picker */}
// //       <LocalizationProvider dateAdapter={AdapterDayjs}>
// //         <DatePicker
// //           label="Select a Date"
// //           value={selectedDate}
// //           onChange={(newValue) => setSelectedDate(newValue)}
// //           renderInput={(params) => (
// //             <TextField {...params} variant="outlined" fullWidth sx={{ mb: 4 }} />
// //           )}
// //         />
// //       </LocalizationProvider>

// //       {/* Meal Planner Sections */}
// //       <Grid container spacing={2}>
// //         <Grid item xs={12} md={4}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6">Breakfast</Typography>
// //               <TextField
// //                 label="Add Breakfast"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 placeholder="e.g., Pancakes, Smoothie"
// //               />
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         <Grid item xs={12} md={4}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6">Lunch</Typography>
// //               <TextField
// //                 label="Add Lunch"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 placeholder="e.g., Salad, Sandwich"
// //               />
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         <Grid item xs={12} md={4}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6">Dinner</Typography>
// //               <TextField
// //                 label="Add Dinner"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 placeholder="e.g., Pasta, Grilled Chicken"
// //               />
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>
// //     </Container>
// //   );
// // };

// // export default MealPlanner;


// import React, { useState } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import dayjs from 'dayjs';

// const recipes = [
//   {
//     id: 1,
//     name: 'Spaghetti Carbonara',
//     ingredients: ['Spaghetti', 'Eggs', 'Parmesan', 'Pancetta'],
//     nutrition: { calories: 400, protein: 15, carbs: 50, fat: 20 },
//   },
//   // Add more recipes here
// ];

// const MealPlanner = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [selectedMeals, setSelectedMeals] = useState([]);
//   const [mealCards, setMealCards] = useState([null, null, null]); // Three empty meal slots

//   const handleAddMeal = (recipe) => {
//     const updatedCards = [...mealCards];
//     const emptySlotIndex = updatedCards.findIndex((meal) => meal === null);
//     if (emptySlotIndex !== -1) {
//       updatedCards[emptySlotIndex] = recipe;
//       setMealCards(updatedCards);
//     }
//   };

//   return (
//     <Container>
//       {/* Header and Calendar (Section 1) */}
//       <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={3}>
//         <Typography
//           variant="h3"
//           component="h1"
//           sx={{
//             fontWeight: 'bold',
//             color: '#FF6347',
//             textAlign: 'center',
//             fontFamily: 'Arial, sans-serif',
//             letterSpacing: '2px',
//             textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
//           }}
//         >
//           Meal Planner
//         </Typography>
//       </Box>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <StaticDatePicker
//           displayStaticWrapperAs="desktop"
//           value={selectedDate}
//           onChange={(newDate) => setSelectedDate(newDate)}
//         />
//       </LocalizationProvider>

//       {/* Section 2 */}
//       <Grid container spacing={4} mt={4}>
//         {/* Left Side: Meal Cards */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Meals for {selectedDate.format('MMMM D, YYYY')}
//           </Typography>
//           {mealCards.map((meal, index) => (
//             <Card key={index} sx={{ mb: 2 }}>
//               <CardContent>
//                 {meal ? (
//                   <Typography variant="h6">{meal.name}</Typography>
//                 ) : (
//                   <Typography variant="h6" color="text.secondary">
//                     Empty Meal Slot
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </Grid>

//         {/* Right Side: Recipe List */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Recipes
//           </Typography>
//           {recipes.map((recipe) => (
//             <Card key={recipe.id} sx={{ mb: 2 }}>
//               <CardContent>
//                 <Typography variant="h6">{recipe.name}</Typography>
//                 <Accordion>
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography>Ingredients</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <List>
//                       {recipe.ingredients.map((ingredient, index) => (
//                         <ListItem key={index}>
//                           <ListItemText primary={ingredient} />
//                         </ListItem>
//                       ))}
//                     </List>
//                   </AccordionDetails>
//                 </Accordion>
//                 <Accordion>
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography>Nutrition</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <List>
//                       <ListItem>
//                         <ListItemText primary={`Calories: ${recipe.nutrition.calories}`} />
//                       </ListItem>
//                       <ListItem>
//                         <ListItemText primary={`Protein: ${recipe.nutrition.protein}g`} />
//                       </ListItem>
//                       <ListItem>
//                         <ListItemText primary={`Carbs: ${recipe.nutrition.carbs}g`} />
//                       </ListItem>
//                       <ListItem>
//                         <ListItemText primary={`Fat: ${recipe.nutrition.fat}g`} />
//                       </ListItem>
//                     </List>
//                   </AccordionDetails>
//                 </Accordion>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ mt: 2, backgroundColor: '#FF6347' }}
//                   onClick={() => handleAddMeal(recipe)}
//                 >
//                   Add to Meal Plan
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MealPlanner;






// import React, { useState, useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import dayjs from 'dayjs';

// const MealPlanner = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [mealCards, setMealCards] = useState([null, null, null]); // Three empty meal slots
//   const [recipes, setRecipes] = useState([]); // Store recipes fetched from the backend

//   // Fetch recipes from the database
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/recipes'); // Update with your API endpoint
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleAddMeal = (recipe) => {
//     const updatedCards = [...mealCards];
//     const emptySlotIndex = updatedCards.findIndex((meal) => meal === null);
//     if (emptySlotIndex !== -1) {
//       updatedCards[emptySlotIndex] = recipe;
//       setMealCards(updatedCards);
//     }
//   };

//   return (
//     <Container>
//       {/* Header and Calendar (Section 1) */}
//       <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={3}>
//         <Typography
//           variant="h3"
//           component="h1"
//           sx={{
//             fontWeight: 'bold',
//             color: '#FF6347',
//             textAlign: 'center',
//             fontFamily: 'Arial, sans-serif',
//             letterSpacing: '2px',
//             textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
//           }}
//         >
//           Meal Planner
//         </Typography>
//       </Box>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <StaticDatePicker
//           displayStaticWrapperAs="desktop"
//           value={selectedDate}
//           onChange={(newDate) => setSelectedDate(newDate)}
//         />
//       </LocalizationProvider>

//       {/* Section 2 */}
//       <Grid container spacing={4} mt={4}>
//         {/* Left Side: Meal Cards */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             {selectedDate.format('D MMMM, YYYY')}
//           </Typography>
//           {mealCards.map((meal, index) => (
//             <Card key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//               {meal ? (
//                 <>
//                   <CardMedia
//                     component="img"
//                     image={meal.imageUrl} // Ensure that `imageUrl` is part of your fetched data
//                     alt={meal.name}
//                     sx={{ width: 80, height: 80, objectFit: 'cover', marginRight: 2 }}
//                   />
//                   <CardContent>
//                     <Typography variant="h6">{meal.name}</Typography>
//                   </CardContent>
//                 </>
//               ) : (
//                 <CardContent>
//                   <Typography variant="h6" color="text.secondary">
//                     Empty Meal Slot
//                   </Typography>
//                 </CardContent>
//               )}
//             </Card>
//           ))}
//         </Grid>

//         {/* Right Side: Recipe List */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Recipes
//           </Typography>
//           {recipes.map((recipe) => (
//             <Card key={recipe._id} sx={{ mb: 2 }}>
//               <CardContent>
//                 <Typography variant="h6">{recipe.name}</Typography>
//                 <CardMedia
//                   component="img"
//                   image={recipe.imageUrl} // Assuming `imageUrl` is available in your recipe data
//                   alt={recipe.name}
//                   sx={{ height: 140, objectFit: 'cover', marginBottom: 2 }}
//                 />
//                 <Accordion>
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography>Ingredients</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <List>
//                       {recipe.ingredients.map((ingredient, index) => (
//                         <ListItem key={index}>
//                           <ListItemText primary={ingredient} />
//                         </ListItem>
//                       ))}
//                     </List>
//                   </AccordionDetails>
//                 </Accordion>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ mt: 2, backgroundColor: '#FF6347' }}
//                   onClick={() => handleAddMeal(recipe)}
//                 >
//                   Add to Meal Plan
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MealPlanner;


// import React, { useState, useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import dayjs from 'dayjs';

// const MealPlanner = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [mealCards, setMealCards] = useState([null, null, null]); // Three empty meal slots
//   const [recipes, setRecipes] = useState([]); // Store recipes fetched from the backend

//   // Fetch recipes from the database
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/recipes'); // Update with your API endpoint
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleAddMeal = (recipe) => {
//     const updatedCards = [...mealCards];
//     const emptySlotIndex = updatedCards.findIndex((meal) => meal === null);
//     if (emptySlotIndex !== -1) {
//       updatedCards[emptySlotIndex] = recipe;
//       setMealCards(updatedCards);
//     }
//   };

//   return (
//     <Container>
//       {/* Header and Calendar (Section 1) */}
//       <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={3}>
//         <Typography
//           variant="h3"
//           component="h1"
//           sx={{
//             fontWeight: 'bold',
//             color: '#FF6347',
//             textAlign: 'center',
//             fontFamily: 'Arial, sans-serif',
//             letterSpacing: '2px',
//             textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
//           }}
//         >
//           Meal Planner
//         </Typography>
//       </Box>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <StaticDatePicker
//           displayStaticWrapperAs="desktop"
//           value={selectedDate}
//           onChange={(newDate) => setSelectedDate(newDate)}
//         />
//       </LocalizationProvider>

//       {/* Section 2 */}
//       <Grid container spacing={4} mt={4}>
//         {/* Left Side: Meal Cards */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Meals for {selectedDate.format('MMMM D, YYYY')}
//           </Typography>
//           {mealCards.map((meal, index) => (
//             <Card
//               key={index}
//               sx={{
//                 mb: 2,
//                 display: 'flex',
//                 alignItems: 'center',
//                 p: 1,
//                 boxShadow: 1,
//                 width: '100%',
//               }}
//             >
//               {meal ? (
//                 <>
//                   <CardMedia
//                     component="img"
//                     image={meal.imageUrl}
//                     alt={meal.name}
//                     sx={{ width: 150, height: 150 }}
//                   />
//                   <CardContent>
//                     <Typography variant="body1" fontWeight="bold">
//                       {meal.name}
//                     </Typography>
//                   </CardContent>
//                 </>
//               ) : (
//                 <CardContent>
//                   <Typography variant="body1" color="text.secondary">
//                     Empty Meal Slot
//                   </Typography>
//                 </CardContent>
//               )}
//             </Card>
//           ))}
//         </Grid>

//         {/* Right Side: Recipe List */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Recipes
//           </Typography>
//           <Box
//             sx={{
//               maxHeight: 500, // Set the fixed height
//               overflowY: 'auto',
//               paddingRight: 2,
//             }}
//           >
//             {recipes.map((recipe) => (
//               <Card
//                 key={recipe._id}
//                 sx={{
//                   mb: 2,
//                   display: 'flex',
//                   alignItems: 'center',
//                   p: 1,
//                   boxShadow: 1,
//                   width: '100%',
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={recipe.imageUrl}
//                   alt={recipe.name}
//                   sx={{ width: 150, height: 150 }}
//                 />
//                 <CardContent sx={{ flex: 1 }}>
//                   <Typography variant="body1" fontWeight="bold">
//                     {recipe.name}
//                   </Typography>
//                   <Accordion sx={{ mt: 1 }}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                       <Typography variant="body2">Ingredients</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <List>
//                         {recipe.ingredients.map((ingredient, index) => (
//                           <ListItem key={index}>
//                             <ListItemText primary={ingredient} />
//                           </ListItem>
//                         ))}
//                       </List>
//                     </AccordionDetails>
//                   </Accordion>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ mt: 1, backgroundColor: '#FF6347' }}
//                     onClick={() => handleAddMeal(recipe)}
//                   >
//                     Add to Meal Plan
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MealPlanner;











// import React, { useState, useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   Menu,
//   MenuItem,
//   Fab,
//   TextField,
//   Breadcrumbs,
//   Link as MuiLink,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import AddIcon from '@mui/icons-material/Add';
// import dayjs from 'dayjs';
// import { Link } from 'react-router-dom';

// const MealPlanner = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [mealCards, setMealCards] = useState([{ title: "Meal 1", recipe: null }]);
//   const [recipes, setRecipes] = useState([]);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/recipes');
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleAddMeal = (recipe) => {
//     if (selectedCard !== null) {
//       const updatedCards = [...mealCards];
//       updatedCards[selectedCard].recipe = recipe;
//       setMealCards(updatedCards);
//       setSelectedCard(null);
//     }
//   };

//   const handleChangeMeal = (index) => {
//     const updatedCards = [...mealCards];
//     updatedCards[index].recipe = null;
//     setMealCards(updatedCards);
//     handleMenuClose();
//   };

//   const handleDeleteMealCard = (index) => {
//     const updatedCards = mealCards.filter((_, cardIndex) => cardIndex !== index);
//     setMealCards(updatedCards);
//     handleMenuClose();
//   };

//   const handleMenuOpen = (event, index) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedCard(index);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const addNewCard = () => {
//     setMealCards([...mealCards, { title: `Meal ${mealCards.length + 1}`, recipe: null }]);
//   };

//   const handleTitleChange = (index, newTitle) => {
//     const updatedCards = [...mealCards];
//     updatedCards[index].title = newTitle;
//     setMealCards(updatedCards);
//   };

//   return (
//     <Container>
//       {/* Breadcrumbs */}
//       <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
//         <MuiLink component={Link} to="/home" underline="hover" color="inherit">
//           Home
//         </MuiLink>
//         <Typography color="text.primary">Meal Planner</Typography>
//       </Breadcrumbs>

//       <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={3}>
//         <Typography
//           variant="h3"
//           component="h1"
//           sx={{
//             fontWeight: 'bold',
//             color: '#000',
//             textAlign: 'center',
//             fontFamily: 'Arial, sans-serif',
//             letterSpacing: '2px',
//           }}
//         >
//           Meal Planner
//         </Typography>
//       </Box>

//       <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <StaticDatePicker
//             displayStaticWrapperAs="desktop"
//             value={selectedDate}
//             onChange={(newDate) => setSelectedDate(newDate)}
//             slotProps={{
//               day: {
//                 sx: {
//                   '&.Mui-selected': {
//                     backgroundColor: '#FF6347 !important',
//                     color: '#fff',
//                   },
//                 },
//               },
//             }}
//           />
//         </LocalizationProvider>
//       </Box>

//       <Grid container spacing={4} mt={4}>
//         {/* Left side: Meal Cards */}
//         <Grid item xs={12} md={6}>
//           <Box display="flex" alignItems="center" mb={2}>
//             <Typography variant="h5" fontWeight="bold" sx={{ mr: 1 }}>
//               {selectedDate.format('D MMM, YYYY')} Plan
//             </Typography>
//             <Fab
//               color="primary"
//               aria-label="add"
//               onClick={addNewCard}
//               size="small"
//               sx={{
//                 backgroundColor: '#FF6347',
//                 ml: 2,
//                 '&:hover': { backgroundColor: '#FF6347' },
//               }}
//             >
//               <AddIcon />
//             </Fab>
//           </Box>

//           {mealCards.map((meal, index) => (
//             <Card
//               key={index}
//               sx={{
//                 mb: 2,
//                 position: 'relative',
//                 width: '100%',
//                 height: meal.recipe ? 200 : 150,
//                 overflow: 'visible',
//                 boxShadow: selectedCard === index ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
//                 border: selectedCard === index ? '2px solid #FF6347' : '1px solid #ddd',
//                 cursor: 'pointer',
//                 zIndex: 0,
//               }}
//               onClick={() => setSelectedCard(index)}
//             >
//               {meal.recipe ? (
//                 <>
//                   <CardMedia
//                     component="img"
//                     image={meal.recipe.imageUrl}
//                     alt={meal.recipe.name}
//                     sx={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       width: '40%',
//                       height: '100%',
//                       objectFit: 'cover',
//                     }}
//                   />
//                   <CardContent
//                     sx={{
//                       position: 'relative',
//                       zIndex: 1,
//                       width: '60%',
//                       marginLeft: '40%',
//                     }}
//                   >
//                     <TextField
//                       value={meal.title}
//                       onChange={(e) => handleTitleChange(index, e.target.value)}
//                       variant="outlined"
//                       size="small"
//                       InputProps={{
//                         style: {
//                           color: '#333',
//                         },
//                       }}
//                       sx={{ mb: 1 }}
//                     />
//                     <Typography variant="body1" fontWeight="bold">
//                       {meal.recipe.name}
//                     </Typography>
//                     <Accordion sx={{ mt: 1, position: 'relative', zIndex: 2 }}>
//                       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography variant="body2">Ingredients</Typography>
//                       </AccordionSummary>
//                       <AccordionDetails>
//                         <List>
//                           {meal.recipe.ingredients.map((ingredient, i) => (
//                             <ListItem key={i}>
//                               <ListItemText primary={ingredient} />
//                             </ListItem>
//                           ))}
//                         </List>
//                       </AccordionDetails>
//                     </Accordion>
//                     <IconButton
//                       aria-label="settings"
//                       onClick={(event) => handleMenuOpen(event, index)}
//                       sx={{ position: 'absolute', top: 4, right: 4, color: 'black' }}
//                     >
//                       <MoreVertIcon />
//                     </IconButton>
//                     <Menu
//                       anchorEl={anchorEl}
//                       open={Boolean(anchorEl) && selectedCard === index}
//                       onClose={handleMenuClose}
//                       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                     >
//                       <MenuItem onClick={() => handleChangeMeal(index)}>Change Recipe</MenuItem>
//                       <MenuItem onClick={() => handleDeleteMealCard(index)}>Delete</MenuItem>
//                     </Menu>
//                   </CardContent>
//                 </>
//               ) : (
//                 <CardContent>
//                   <TextField
//                     value={meal.title}
//                     onChange={(e) => handleTitleChange(index, e.target.value)}
//                     variant="outlined"
//                     size="small"
//                     placeholder="Meal Title"
//                     sx={{ mb: 1 }}
//                   />
//                   <Typography variant="body1" color="text.secondary">
//                     Empty Meal Slot
//                   </Typography>
//                   <IconButton
//                     aria-label="settings"
//                     onClick={(event) => handleMenuOpen(event, index)}
//                     sx={{ position: 'absolute', top: 4, right: 4 }}
//                   >
//                     <MoreVertIcon />
//                   </IconButton>
//                   <Menu
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl) && selectedCard === index}
//                     onClose={handleMenuClose}
//                     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                   >
//                     <MenuItem onClick={() => handleDeleteMealCard(index)}>Delete</MenuItem>
//                   </Menu>
//                 </CardContent>
//               )}
//             </Card>
//           ))}
//         </Grid>

//         {/* Right side: Recipe List */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Recipes
//           </Typography>
//           <Box
//             sx={{
//               maxHeight: 500,
//               overflowY: 'auto',
//               paddingRight: 2,
//             }}
//           >
//             {recipes.map((recipe) => (
//               <Card
//                 key={recipe._id}
//                 sx={{
//                   mb: 2,
//                   display: 'flex',
//                   alignItems: 'center',
//                   p: 1,
//                   boxShadow: 1,
//                   width: '100%',
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={recipe.imageUrl}
//                   alt={recipe.name}
//                   sx={{ width: 150, height: 150 }}
//                 />
//                 <CardContent sx={{ flex: 1 }}>
//                   <Typography variant="body1" fontWeight="bold">
//                     {recipe.name}
//                   </Typography>
//                   <Accordion sx={{ mt: 1 }}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                       <Typography variant="body2">Ingredients</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <List>
//                         {recipe.ingredients.map((ingredient, i) => (
//                           <ListItem key={i}>
//                             <ListItemText primary={ingredient} />
//                           </ListItem>
//                         ))}
//                       </List>
//                     </AccordionDetails>
//                   </Accordion>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ mt: 1, backgroundColor: '#FF6347' }}
//                     onClick={() => handleAddMeal(recipe)}
//                   >
//                     Add to Meal Plan
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MealPlanner;







// import React, { useState, useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   Menu,
//   MenuItem,
//   Fab,
//   TextField,
//   Breadcrumbs,
//   Link as MuiLink,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import AddIcon from '@mui/icons-material/Add';
// import dayjs from 'dayjs';
// import { Link } from 'react-router-dom';
// import { Portal } from '@mui/material';
// import { saveMealPlan } from "../utils/api";

// const handleSaveMealPlan = async () => {
//   if (mealCards.length === 0 || !mealCards.some(meal => meal.recipe)) {
//     alert("Please add at least one meal with a recipe before saving.");
//     return;
//   }

//   const formattedMealPlan = {
//     date: selectedDate.format("YYYY-MM-DD"),
//     meals: mealCards.filter(meal => meal.recipe).map(meal => ({
//       title: meal.title,
//       recipeId: meal.recipe._id,
//       recipeName: meal.recipe.name,
//     })),
//   };

//   try {
//     await saveMealPlan(formattedMealPlan);
//     alert("Meal plan saved successfully!");
//   } catch (error) {
//     console.error("Error saving meal plan:", error);
//     alert("Failed to save meal plan. Please try again.");
//   }
// };



// const MealPlanner = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [mealCards, setMealCards] = useState([{ title: "Meal 1", recipe: null }]);
//   const [recipes, setRecipes] = useState([]);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/recipes');
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleAddMeal = (recipe) => {
//     if (selectedCard !== null) {
//       const updatedCards = [...mealCards];
//       updatedCards[selectedCard].recipe = recipe;
//       setMealCards(updatedCards);
//       setSelectedCard(null);
//     }
//   };

//   const handleChangeMeal = (index) => {
//     const updatedCards = [...mealCards];
//     updatedCards[index].recipe = null;
//     setMealCards(updatedCards);
//     handleMenuClose();
//   };

//   // const handleDeleteMealCard = (index) => {
//   //   const updatedCards = mealCards.filter((_, cardIndex) => cardIndex !== index);
//   //   setMealCards(updatedCards);
//   //   handleMenuClose();
//   // };

//   const handleDeleteMealCard = (index) => {
//     if (mealCards.length > 1) { // Ensures at least one card remains
//       const updatedCards = mealCards.filter((_, cardIndex) => cardIndex !== index);
//       setMealCards(updatedCards);
//     }
//     handleMenuClose();
//   };

//   const handleMenuOpen = (event, index) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedCard(index);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const addNewCard = () => {
//     setMealCards([...mealCards, { title: `Meal ${mealCards.length + 1}`, recipe: null }]);
//   };

//   const handleTitleChange = (index, newTitle) => {
//     const updatedCards = [...mealCards];
//     updatedCards[index].title = newTitle;
//     setMealCards(updatedCards);
//   };

//   return (
//     <Container>
//       {/* Breadcrumbs */}
//       <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4, mt: 2 }}>
//         <MuiLink component={Link} to="/home" underline="hover" color="inherit">
//           Home
//         </MuiLink>
//         <Typography color="text.primary">Meal Planner</Typography>
//       </Breadcrumbs>

//       <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={3}>
//         <Typography
//           variant="h3"
//           component="h1"
//           sx={{
//             fontWeight: 'bold',
//             color: '#000',
//             textAlign: 'center',
//             fontFamily: 'Arial, sans-serif',
//             letterSpacing: '2px',
//           }}
//         >
//           Meal Planner
//         </Typography>
//       </Box>

//       <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <StaticDatePicker
//             displayStaticWrapperAs="desktop"
//             value={selectedDate}
//             onChange={(newDate) => setSelectedDate(newDate)}
//             slotProps={{
//               day: {
//                 sx: {
//                   '&.Mui-selected': {
//                     backgroundColor: '#FF6347 !important',
//                     color: '#fff',
//                   },
//                 },
//               },
//             }}
//           />
//         </LocalizationProvider>
//       </Box>

//       <Grid container spacing={4} mt={4}>
//         {/* Left side: Meal Cards */}
//         <Grid item xs={12} md={6}>
//           <Box display="flex" alignItems="center" mb={2}>
//             <Typography variant="h5" fontWeight="bold" sx={{ mr: 1 }}>
//               {selectedDate.format('D MMM, YYYY')} Plan
//             </Typography>
//             <Fab
//               color="primary"
//               aria-label="add"
//               onClick={addNewCard}
//               size="small"
//               sx={{
//                 backgroundColor: '#FF6347',
//                 ml: 2,
//                 '&:hover': { backgroundColor: '#FF6347' },
//               }}
//             >
//               <AddIcon />
//             </Fab>
//           </Box>

//           {mealCards.map((meal, index) => (
//             <Card
//               key={index}
//               sx={{
//                 mb: 2,
//                 position: 'relative',
//                 width: '100%',
//                 height: meal.recipe ? 200 : 150,
//                 overflow: 'visible',
//                 boxShadow: selectedCard === index ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
//                 border: selectedCard === index ? '2px solid #FF6347' : '1px solid #ddd',
//                 cursor: 'pointer',
//                 zIndex: 0,
//               }}
//               onClick={() => setSelectedCard(index)}
//             >
//               {meal.recipe ? (
//                 <>
//                   <CardMedia
//                     component="img"
//                     image={meal.recipe.imageUrl}
//                     alt={meal.recipe.name}
//                     sx={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       width: '40%',
//                       height: '100%',
//                       objectFit: 'cover',
//                     }}
//                   />
//                   <CardContent
//                     sx={{
//                       position: 'relative',
//                       zIndex: 1,
//                       width: '60%',
//                       marginLeft: '40%',
//                     }}
//                   >
//                     <TextField
//                       value={meal.title}
//                       onChange={(e) => handleTitleChange(index, e.target.value)}
//                       variant="outlined"
//                       size="small"
//                       InputProps={{
//                         style: {
//                           color: '#333',
//                         },
//                       }}
//                       sx={{ mb: 1 }}
//                     />
//                     <Typography variant="body1" fontWeight="bold">
//                       {meal.recipe.name}
//                     </Typography>
//                     <Accordion sx={{ mt: 1, position: 'relative', zIndex: 2 }}>
//                       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography variant="body2">Ingredients</Typography>
//                       </AccordionSummary>
//                       <AccordionDetails
//                         sx={{
//                           position: 'absolute',
//                           top: '100%',
//                           left: 0,
//                           backgroundColor: '#fff',
//                           zIndex: 10, // Ensure the ingredients list appears above all other cards
//                           boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//                           width: '100%',
//                         }}
//                       >
//                         <List>
//                           {meal.recipe.ingredients.map((ingredient, i) => (
//                             <ListItem key={i}>
//                               <ListItemText primary={ingredient} />
//                             </ListItem>
//                           ))}
//                         </List>
//                       </AccordionDetails>
//                     </Accordion>
//                     <IconButton
//                       aria-label="settings"
//                       onClick={(event) => handleMenuOpen(event, index)}
//                       sx={{ position: 'absolute', top: 4, right: 4, color: 'black' }}
//                     >
//                       <MoreVertIcon />
//                     </IconButton>
//                     <Menu
//                       anchorEl={anchorEl}
//                       open={Boolean(anchorEl) && selectedCard === index}
//                       onClose={handleMenuClose}
//                       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                     >
//                       <MenuItem onClick={() => handleChangeMeal(index)}>Change Recipe</MenuItem>
//                       <MenuItem onClick={() => handleDeleteMealCard(index)}>Delete</MenuItem>
//                     </Menu>
//                   </CardContent>
//                 </>
//               ) : (
//                 <CardContent>
//                   <TextField
//                     value={meal.title}
//                     onChange={(e) => handleTitleChange(index, e.target.value)}
//                     variant="outlined"
//                     size="small"
//                     placeholder="Meal Title"
//                     sx={{ mb: 1 }}
//                   />
//                   <Typography variant="body1" color="text.secondary">
//                     Empty Meal Slot
//                   </Typography>
//                   <IconButton
//                     aria-label="settings"
//                     onClick={(event) => handleMenuOpen(event, index)}
//                     sx={{ position: 'absolute', top: 4, right: 4 }}
//                   >
//                     <MoreVertIcon />
//                   </IconButton>
//                   <Menu
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl) && selectedCard === index}
//                     onClose={handleMenuClose}
//                     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                   >
//                     <MenuItem onClick={() => handleDeleteMealCard(index)}>Delete</MenuItem>
//                   </Menu>
//                 </CardContent>
//               )}
//             </Card>
//           ))}


//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2, backgroundColor: '#FF6347' }}
//             onClick={handleSaveMealPlan}
//           >
//             Save Meal Plan
//           </Button>
//         </Grid>

//         {/* Right side: Recipe List */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Recipes
//           </Typography>
//           <Box
//             sx={{
//               maxHeight: 500,
//               overflowY: 'auto',
//               paddingRight: 2,
//             }}
//           >
//             {recipes.map((recipe) => (
//               <Card
//                 key={recipe._id}
//                 sx={{
//                   mb: 2,
//                   display: 'flex',
//                   alignItems: 'center',
//                   p: 1,
//                   boxShadow: 1,
//                   width: '100%',
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={recipe.imageUrl}
//                   alt={recipe.name}
//                   sx={{ width: 150, height: 150 }}
//                 />
//                 <CardContent sx={{ flex: 1 }}>
//                   <Typography variant="body1" fontWeight="bold">
//                     {recipe.name}
//                   </Typography>
//                   <Accordion sx={{ mt: 1 }}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                       <Typography variant="body2">Ingredients</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <List>
//                         {recipe.ingredients.map((ingredient, i) => (
//                           <ListItem key={i}>
//                             <ListItemText primary={ingredient} />
//                           </ListItem>
//                         ))}
//                       </List>
//                     </AccordionDetails>
//                   </Accordion>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ mt: 1, backgroundColor: '#FF6347' }}
//                     onClick={() => handleAddMeal(recipe)}
//                   >
//                     Add to Meal Plan
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MealPlanner;






// import React, { useState, useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   Menu,
//   MenuItem,
//   Fab,
//   TextField,
//   Breadcrumbs,
//   Link as MuiLink,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import AddIcon from '@mui/icons-material/Add';
// import dayjs from 'dayjs';
// import { Link } from 'react-router-dom';
// import { saveMealPlan, getMealPlanByDate } from "../utils/api";

// const MealPlanner = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [mealCards, setMealCards] = useState([{ title: "Meal 1", recipe: null }]);
//   const [recipes, setRecipes] = useState([]);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/recipes');
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);


//   useEffect(() => {
//     const fetchMealPlan = async () => {
//         try {
//             const formattedDate = selectedDate.format("YYYY-MM-DD");
//             console.log(`📆 Fetching Meal Plan for: ${formattedDate}`);

//             const response = await getMealPlanByDate(formattedDate);

//             if (response.success) {
//                 console.log("📦 Meal Plan Response:", response);
//                 setMealCards(response.meals.length > 0
//                     ? response.meals.map((meal, index) => ({
//                         title: meal.title || `Meal ${index + 1}`,
//                         recipe: {
//                             _id: meal.recipeId,
//                             name: meal.recipeName,
//                             imageUrl: meal.imageUrl || "", // ✅ Ensure image is retrieved
//                         },
//                     }))
//                     : [{ title: "Meal 1", recipe: null }] // ✅ Reset if no saved meals
//                 );
//             }
//         } catch (error) {
//             console.error("❌ Error fetching meal plan:", error);
//         }
//     };

//     fetchMealPlan();
//   }, [selectedDate]);

  
//   const handleSaveMealPlan = async () => {
//     if (mealCards.length === 0 || !mealCards.some(meal => meal.recipe)) {
//         alert("Please add at least one meal with a recipe before saving.");
//         return;
//     }

//     const formattedMealPlan = {
//         date: selectedDate.format("YYYY-MM-DD"), // ✅ Ensure date is sent in YYYY-MM-DD format
//         meals: mealCards.filter(meal => meal.recipe).map(meal => ({
//             title: meal.title,
//             recipeId: meal.recipe._id,
//             recipeName: meal.recipe.name,
//             imageUrl: meal.recipe.imageUrl || "", // ✅ Ensure image URL is included
//         })),
//     };

//     console.log("📤 Sending Meal Plan:", formattedMealPlan); // ✅ Debugging log

//     try {
//         await saveMealPlan(formattedMealPlan);
//         alert("Meal plan saved successfully!");
//     } catch (error) {
//         console.error("❌ Error saving meal plan:", error);
//         alert("Failed to save meal plan. Please try again.");
//     }
//   };

  

//   const handleAddMeal = (recipe) => {
//     if (selectedCard !== null) {
//       const updatedCards = [...mealCards];
//       updatedCards[selectedCard].recipe = recipe;
//       setMealCards(updatedCards);
//       setSelectedCard(null);
//     }
//   };

//   const handleChangeMeal = (index) => {
//     const updatedCards = [...mealCards];
//     updatedCards[index].recipe = null;
//     setMealCards(updatedCards);
//     handleMenuClose();
//   };

//   const handleDeleteMealCard = (index) => {
//     if (mealCards.length > 1) {
//       const updatedCards = mealCards.filter((_, cardIndex) => cardIndex !== index);
//       setMealCards(updatedCards);
//     }
//     handleMenuClose();
//   };

//   const handleMenuOpen = (event, index) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedCard(index);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const addNewCard = () => {
//     setMealCards([...mealCards, { title: `Meal ${mealCards.length + 1}`, recipe: null }]);
//   };

//   const handleTitleChange = (index, newTitle) => {
//     const updatedCards = [...mealCards];
//     updatedCards[index].title = newTitle;
//     setMealCards(updatedCards);
//   };

//   return (
//     <Container>
//       {/* Breadcrumbs */}
//       <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4, mt: 2 }}>
//         <MuiLink component={Link} to="/home" underline="hover" color="inherit">
//           Home
//         </MuiLink>
//         <Typography color="text.primary">Meal Planner</Typography>
//       </Breadcrumbs>

//       <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={3}>
//         <Typography
//           variant="h3"
//           component="h1"
//           sx={{
//             fontWeight: 'bold',
//             color: '#000',
//             textAlign: 'center',
//             fontFamily: 'Arial, sans-serif',
//             letterSpacing: '2px',
//           }}
//         >
//           Meal Planner
//         </Typography>
//       </Box>

//       <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           {/* <StaticDatePicker
//             displayStaticWrapperAs="desktop"
//             value={selectedDate}
//             onChange={(newDate) => setSelectedDate(newDate)}
//             slotProps={{
//               day: {
//                 sx: {
//                   '&.Mui-selected': {
//                     backgroundColor: '#FF6347 !important',
//                     color: '#fff',
//                   },
//                 },
//               },
//             }}
//           /> */}
//           <StaticDatePicker
//             displayStaticWrapperAs="desktop"
//             value={selectedDate}
//             onChange={(newDate) => {
//               if (newDate) {
//                 setSelectedDate(dayjs(newDate)); // ✅ Ensure correct date format
//               }
//             }}
//             slotProps={{
//               day: {
//                 sx: {
//                   '&.Mui-selected': {
//                     backgroundColor: '#FF6347 !important',
//                     color: '#fff',
//                   },
//                 },
//               },
//             }}
//           />


//         </LocalizationProvider>
//       </Box>

//       <Grid container spacing={4} mt={4}>
//         {/* Left side: Meal Cards */}
//         <Grid item xs={12} md={6}>
//           <Box display="flex" alignItems="center" mb={2}>
//             <Typography variant="h5" fontWeight="bold" sx={{ mr: 1 }}>
//               {selectedDate.format('D MMM, YYYY')} Plan
//             </Typography>
//             <Fab color="primary" aria-label="add" onClick={addNewCard} size="small" sx={{ backgroundColor: '#FF6347', ml: 2, '&:hover': { backgroundColor: '#FF6347' }}}>
//               <AddIcon />
//             </Fab>
//           </Box>

//           {mealCards.map((meal, index) => (
//             <Card key={index}
//               sx={{
//                 mb: 2,
//                 position: 'relative',
//                 width: '100%',
//                 height: meal.recipe ? 200 : 150,
//                 overflow: 'visible',
//                 boxShadow: selectedCard === index ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
//                 border: selectedCard === index ? '2px solid #FF6347' : '1px solid #ddd',
//                 cursor: 'pointer',
//                 zIndex: 0,
//               }}
//               onClick={() => setSelectedCard(index)}>
//               {meal.recipe && (
//                 <CardMedia
//                   component="img"
//                   image={meal.recipe.imageUrl}
//                   alt={meal.recipe.name}
//                   sx={{ width: "40%", height: "100%", objectFit: "cover", position: "absolute" }}
//                 />
//               )}
//               <CardContent sx={{ marginLeft: meal.recipe ? "40%" : "0%" }}>
//                 <TextField value={meal.title} onChange={(e) => handleTitleChange(index, e.target.value)} variant="outlined" size="small" />
//                 <Typography variant="body1" fontWeight="bold">
//                   {meal.recipe ? meal.recipe.name : "Empty Meal Slot"}
//                 </Typography>
//                 <IconButton aria-label="settings" onClick={(event) => handleMenuOpen(event, index)} sx={{ position: 'absolute', top: 4, right: 4 }}>
//                   <MoreVertIcon />
//                 </IconButton>
//                 <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && selectedCard === index} onClose={handleMenuClose}>
//                   <MenuItem onClick={() => handleChangeMeal(index)}>Change Recipe</MenuItem>
//                   <MenuItem onClick={() => handleDeleteMealCard(index)}>Delete</MenuItem>
//                 </Menu>
//               </CardContent>
//             </Card>
//           ))}

//           <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: '#FF6347' }} onClick={handleSaveMealPlan}>
//             Save Meal Plan
//           </Button>
//         </Grid>

//         {/* Right side: Recipe List */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             Recipes
//           </Typography>
//           <Box sx={{ maxHeight: 500, overflowY: 'auto', paddingRight: 2 }}>
//             {recipes.map((recipe) => (
//               <Card key={recipe._id} sx={{ mb: 2, display: 'flex', alignItems: 'center', p: 1, boxShadow: 1, width: '100%' }}>
//                 <CardMedia component="img" image={recipe.imageUrl} alt={recipe.name} sx={{ width: 150, height: 150 }} />
//                 <CardContent sx={{ flex: 1 }}>
//                   <Typography variant="body1" fontWeight="bold">{recipe.name}</Typography>
//                   <Button variant="contained" color="primary" sx={{ mt: 1, backgroundColor: '#FF6347' }} onClick={() => handleAddMeal(recipe)}>
//                     Add to Meal Plan
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MealPlanner;













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
  ///
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5001/recipes');
        const data = await response.json();
        
        console.log("Fetched Recipes:", data); // ✅ Check if categories exist
        setRecipes(data);
        setFilteredRecipes(data); // ✅ Show all recipes initially
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
            console.log(`📆 Fetching Meal Plan for: ${formattedDate}`);

            const response = await getMealPlanByDate(formattedDate);

            if (response.success) {
                console.log("📦 Meal Plan Response:", response);
                setMealCards(response.meals.length > 0
                    ? response.meals.map((meal, index) => ({
                        title: meal.title || `Meal ${index + 1}`,
                        portion: meal.portion || 1,
                        recipe: {
                            _id: meal.recipeId,
                            name: meal.recipeName,
                            imageUrl: meal.imageUrl || "", // ✅ Ensure image is retrieved
                            ingredients: meal.ingredients || [],
                        },
                    }))
                    : [{ title: "Meal 1", recipe: null }] // ✅ Reset if no saved meals
                );
            }
        } catch (error) {
            console.error("❌ Error fetching meal plan:", error);
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
  
    // ✅ Ensure categories exist and use lowercase for case-insensitive matching
    const filteredRecipes = recipes.filter(recipe => 
      filter === "All" || 
      (recipe.categories && recipe.categories.some(category => category.toLowerCase() === filter.toLowerCase()))
    );
  
    console.log(`Filtering for: ${filter}`, filteredRecipes); // ✅ Debugging log
    setFilteredRecipes(filteredRecipes);
  };
  
  
  

  const handleSaveMealPlan = async () => {
    if (mealCards.length === 0 || !mealCards.some(meal => meal.recipe)) {
        alert("Please add at least one meal with a recipe before saving.");
        return;
    }

    const formattedMealPlan = {
        date: selectedDate.format("YYYY-MM-DD"), // ✅ Ensure date is sent in YYYY-MM-DD format
        meals: mealCards.filter(meal => meal.recipe).map(meal => ({
            title: meal.title,
            recipeId: meal.recipe._id,
            recipeName: meal.recipe.name,
            imageUrl: meal.recipe.imageUrl || "", // ✅ Ensure image URL is included
            portion: meal.portion || 1,
  ingredients: meal.recipe.ingredients || []
        })),
    };

    console.log("📤 Sending Meal Plan:", formattedMealPlan); // ✅ Debugging log

    try {
        await saveMealPlan(formattedMealPlan);
        alert("Meal plan saved successfully!");
    } catch (error) {
        console.error("❌ Error saving meal plan:", error);
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
    const match = ingredient.match(/^([\d/.]+)\s*(.*)$/); // Extract quantity and unit
    if (!match) return ingredient; // If no number is found, return as-is

    let quantity = parseFloat(match[1]); // Convert to number
    if (isNaN(quantity)) return ingredient; // Return original if not a valid number

    quantity = (quantity * portion).toFixed(1); // Scale amount
    return `${quantity} ${match[2]}`; // Rebuild ingredient string
  };


  return (
    <Container>
      {/* Breadcrumbs */}
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
          {/* <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
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
          /> */}
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDate}
            onChange={(newDate) => {
              if (newDate) {
                setSelectedDate(dayjs(newDate)); // ✅ Ensure correct date format
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
              // sx={{
              //   display:
              //   mb: 2,
              //   position: 'relative',
              //   width: '100%',
              //   height: meal.recipe ? 200 : 150,
              //   overflow: 'visible',
              //   boxShadow: selectedCard === index ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
              //   border: selectedCard === index ? '2px solid #FF6347' : '1px solid #ddd',
              //   cursor: 'pointer',
              //   zIndex: 0,
              // }}

              sx={{
                mb: 2,
                position: 'relative',
                width: '100%',
                minHeight: 150, // ✅ Set minimum height instead of fixed height
                overflow: 'visible',
                boxShadow: selectedCard === index ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
                border: selectedCard === index ? '2px solid #FF6347' : '1px solid #ddd',
                cursor: 'pointer',
                transition: "all 0.3s ease-in-out", // ✅ Smooth transition for expansion
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

                  {/* ✅ Portion Selector */}
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

                {/* ✅ Ingredients Dropdown for Selected Meals */}
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

        {/* Right side: Recipe List */}
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
            {/* Filter Button */}
            <IconButton onClick={handleFilterClick}>
              <FilterListIcon />
            </IconButton>

            {/* Filter Dropdown */}
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