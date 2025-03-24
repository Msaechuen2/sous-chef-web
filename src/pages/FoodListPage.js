// import React, { useState, useEffect } from 'react';
// import { Box, Container, List, ListItem, ListItemText, Divider, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

// const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Western', 'Southern', 'Japanese', 'Chinese', 'American'];

// const FoodListPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [recipes, setRecipes] = useState([]);

//   // Fetch recipes based on selected category
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(`http://localhost:5001/recipes?category=${selectedCategory}`);
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };
//     fetchRecipes();
//   }, [selectedCategory]);

//   return (
//     <Container maxWidth="lg" sx={{ display: 'flex', py: 4 }}>
//       {/* Sidebar for categories */}
//       <Box sx={{ width: '20%', mr: 4 }}>
//         <Typography variant="h6" gutterBottom>Categories</Typography>
//         <List component="nav">
//           {categories.map((category) => (
//             <ListItem button key={category} selected={selectedCategory === category} onClick={() => setSelectedCategory(category)}>
//               <ListItemText primary={category} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Recipe List */}
//       <Box sx={{ width: '80%' }}>
//         <Typography variant="h4" gutterBottom>{selectedCategory} Recipes</Typography>
//         <Divider sx={{ mb: 2 }} />
//         <Grid container spacing={2}>
//           {recipes.map((recipe) => (
//             <Grid item xs={12} sm={6} md={4} key={recipe._id}>
//               <Card sx={{ maxWidth: 345 }}>
//                 <CardMedia component="img" height="140" image={recipe.imageUrl} alt={recipe.name} />
//                 <CardContent>
//                   <Typography variant="h6">{recipe.name}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {recipe.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default FoodListPage;


// import React, { useState, useEffect } from 'react';
// import { Box, Container, List, ListItem, ListItemText, Divider, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

// const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Western', 'Southern', 'Japanese', 'Chinese', 'American'];

// const FoodListPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [recipes, setRecipes] = useState([
//     {
//       _id: '1',
//       name: 'Spaghetti Carbonara',
//       description: 'A classic Italian pasta dish with creamy egg sauce, pancetta, and Parmesan cheese.',
//       imageUrl: '/images/Spaghetti-Carbonara.jpg', // Replace with a valid image URL
//       category: 'Dinner'
//     },
//     // Add more hardcoded sample recipes as needed
//   ]);

//   // Fetch recipes based on selected category
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(`http://localhost:5001/recipes?category=${selectedCategory}`);
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     // Only fetch if not using hardcoded data or fetching based on category
//     if (selectedCategory !== 'All') {
//       fetchRecipes();
//     }
//   }, [selectedCategory]);

//   return (
//     <Container maxWidth="lg" sx={{ display: 'flex', py: 4 }}>
//       {/* Sidebar for categories */}
//       <Box sx={{ width: '20%', mr: 4 }}>
//         <Typography variant="h6" gutterBottom>Categories</Typography>
//         <List component="nav">
//           {categories.map((category) => (
//             <ListItem button key={category} selected={selectedCategory === category} onClick={() => setSelectedCategory(category)}>
//               <ListItemText primary={category} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Recipe List */}
//       <Box sx={{ width: '80%' }}>
//         <Typography variant="h4" gutterBottom>{selectedCategory} Recipes</Typography>
//         <Divider sx={{ mb: 2 }} />
//         <Grid container spacing={2}>
//           {recipes
//             .filter(recipe => selectedCategory === 'All' || recipe.category === selectedCategory)
//             .map((recipe) => (
//               <Grid item xs={12} key={recipe._id}>
//                 <Card sx={{ display: 'flex', boxShadow: 'none', borderRadius: 2, border: '1px solid #e0e0e0' }}>
//                   <CardMedia
//                     component="img"
//                     sx={{ width: 160, borderRadius: '4px 0 0 4px' }}
//                     image={recipe.imageUrl}
//                     alt={recipe.name}
//                   />
//                   <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 2 }}>
//                     <Typography variant="h6" gutterBottom>{recipe.name}</Typography>
//                     <Typography variant="body2" color="text.secondary">{recipe.description}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default FoodListPage;



// import React, { useState, useEffect } from 'react';
// import { Box, Container, List, ListItem, ListItemText, Divider, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

// const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Western', 'Southern', 'Japanese', 'Chinese', 'American'];

// const FoodListPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [recipes, setRecipes] = useState([
//     {
//       _id: '1',
//       name: 'Spaghetti Carbonara',
//       description: 'A classic Italian pasta dish with creamy egg sauce, pancetta, and Parmesan cheese.',
//       imageUrl: '/images/Spaghetti-Carbonara.jpg', // Replace with a valid image URL
//       category: 'Dinner'
//     },
//   ]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(`http://localhost:5001/recipes?category=${selectedCategory}`);
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     if (selectedCategory == 'All') {
//       fetchRecipes();
//     }
//   }, [selectedCategory]);

//   return (
//     <Container maxWidth="lg" sx={{ display: 'flex', py: 4 }}>
//       {/* Sidebar for categories */}
//       <Box
//         sx={{
//           width: '20%',
//           mr: 4,
//           p: 2,
//           bgcolor: 'grey.100',
//           borderRadius: 2,
//           boxShadow: 1,
//         }}
//       >
//         <Typography variant="h6" gutterBottom sx={{ color: '#ff6347', fontWeight: 'bold' }}>
//           Categories
//         </Typography>
//         <List component="nav">
//           {categories.map((category) => (
//             <ListItem
//               button
//               key={category}
//               selected={selectedCategory === category}
//               onClick={() => setSelectedCategory(category)}
//               sx={{
//                 borderRadius: 1,
//                 mb: 1,
//                 bgcolor: selectedCategory === category ? '#ff6347' : 'inherit',
//                 color: selectedCategory === category ? 'white' : 'text.primary',
//                 '&:hover': {
//                   bgcolor: '#ff6347',
//                   color: 'white',
//                 },
//               }}
//             >
//               <ListItemText
//                 primary={category}
//                 primaryTypographyProps={{
//                   fontWeight: selectedCategory === category ? 'bold' : 'normal',
//                 }}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Recipe List */}
//       <Box sx={{ width: '80%' }}>
//         <Typography variant="h4" gutterBottom>{selectedCategory} Recipes</Typography>
//         <Divider sx={{ mb: 2 }} />
//         <Grid container spacing={2}>
//           {recipes
//             .filter(recipe => selectedCategory === 'All' || recipe.category === selectedCategory)
//             .map((recipe) => (
//               <Grid item xs={12}>
//                 <Card sx={{ display: 'flex', width: '100%', height: 180, marginBottom: 2 }}>
//                 <CardMedia
//                     component="img"
//                     image={recipe.imageUrl}
//                     alt={recipe.name}
//                     sx={{ width: 200, height: '100%', objectFit: 'cover', borderRadius: '4px 0 0 4px' }}
//                 />
//                 <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
//                     <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
//                     {recipe.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
//                     {recipe.description}
//                     </Typography>
//                 </CardContent>
//                 </Card>
//               </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default FoodListPage;

import React, { useState, useEffect } from 'react';
import { Box, Container, List, ListItem, ListItemText, Divider, Typography, Grid, Card, CardContent, CardMedia, Pagination, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Western', 'Japanese', 'Chinese'];

const FoodListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch recipes from backend based on selected category
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const categoryQuery = selectedCategory === 'All' ? '' : `?category=${selectedCategory}`;
        const response = await fetch(`http://localhost:5001/recipes${categoryQuery}`);
        const data = await response.json();
        setRecipes(data);
        setPage(1); // Reset to the first page on category change
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  // Filter and paginate the recipes
  const filteredRecipes = recipes.filter(recipe => 
    selectedCategory === 'All' || recipe.categories.includes(selectedCategory.toLowerCase())
  );
  const displayedRecipes = filteredRecipes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', py: 4 }}>
      
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/home" underline="hover" color="inherit">
          Home
        </MuiLink>
        <Typography color="text.primary">{selectedCategory} Recipes</Typography>
      </Breadcrumbs>

      {/* Sidebar for categories */}
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

        {/* Recipe List */}
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

          {/* Pagination */}
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
