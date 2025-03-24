// import React from 'react';
// import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

// export default function AppNavbar() {
//   return (
//     <Navbar isBordered variant="sticky" className="bg-white shadow-md">
//       <NavbarBrand>
//         <Link href="/" color="text" css={{ fontWeight: 'bold', fontSize: '1.5rem' }}>My NextUI App</Link>
//       </NavbarBrand>
//       <NavbarContent hideIn="xs">
//         <NavbarItem>
//           <Link href="/" color="text">Home</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link href="/about" color="text">About</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link href="/contact" color="text">Contact</Link>
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, InputBase, Button, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import { ChefHatLogo } from './ChefHatLogo';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// function AppNavbar() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar position="sticky" color="default">
//       <Toolbar style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
        
//         {/* Logo Centered */}
//         <Box display="flex" justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
//           <ChefHatLogo />
//           <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Roboto, sans-serif', ml: 1 }}>
//             Sous Chef
//           </Typography>
//         </Box>

//         {/* Navbar links in second line or as menu icon if scrolled */}
//         <Box sx={{ width: '100%', display: 'flex', justifyContent: isScrolled ? 'flex-end' : 'flex-start', mt: 1 }}>
//           {!isScrolled ? (
//             <Box display="flex" gap={2}>
//               <Button color="inherit">Meals</Button>
//               <Button color="inherit">Ingredients</Button>
//               <Button color="inherit">Cuisines</Button>
//               <Button color="inherit">Cooking Tips</Button>
//             </Box>
//           ) : (
//             <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
//               <MenuIcon />
//             </IconButton>
//           )}

//           {/* Menu for mobile/scroll view */}
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleMenuClose}>Meals</MenuItem>
//             <MenuItem onClick={handleMenuClose}>Ingredients</MenuItem>
//             <MenuItem onClick={handleMenuClose}>Cuisines</MenuItem>
//             <MenuItem onClick={handleMenuClose}>Cooking Tips</MenuItem>
//           </Menu>
//         </Box>

//         {/* Search bar, Login and Sign Up buttons */}
//         <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase placeholder="Type to search..." inputProps={{ 'aria-label': 'search' }} />
//           </Search>
//           <Button color="inherit" sx={{ ml: 2 }}>Login</Button>
//           <Button variant="contained" color="primary" sx={{ ml: 2 }}>Sign Up</Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default AppNavbar;

// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, InputBase, Button, Box, Container } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import { ChefHatLogo } from './ChefHatLogo';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: theme.spacing(2),
//   width: '100%',
//   maxWidth: '300px',
//   [theme.breakpoints.up('md')]: {
//     width: '600px',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//   },
// }));

// function AppNavbar() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <AppBar position="sticky" color="default">
//       <Container>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           {/* Left side: Logo and Category Buttons */}
//           <Box display="flex" alignItems="center">
//             <Box display="flex" alignItems="center" mr={4}>
//               <ChefHatLogo />
//               <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Roboto, sans-serif', ml: 1 }}>
//                 Sous Chef
//               </Typography>
//             </Box>
//             <Box display="flex" alignItems="center" gap={2}>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }}>Recipe</Button>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }}>Meal Planner</Button>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }}>Cooking Tips</Button>
//             </Box>
//           </Box>

//           {/* Centered Search Bar */}
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase placeholder="Search a recipe or ingredients" inputProps={{ 'aria-label': 'search' }} />
//           </Search>

//           {/* Right side: Login and Sign Up */}
//           <Box display="flex" alignItems="center">
//             <Button color="inherit">Login</Button>
//             <Button variant="contained" color="primary" sx={{ backgroundColor: '#ff6347', ml: 2 }}>Sign Up</Button>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default AppNavbar;







// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   InputBase,
//   Button,
//   Box,
//   Container,
//   Menu,
//   MenuItem,
//   IconButton,
// } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import { ChefHatLogo } from './ChefHatLogo';
// import { Link as RouterLink } from 'react-router-dom';
// import { useAuth } from '../providers/AuthContextProvider';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: theme.spacing(2),
//   width: '100%',
//   maxWidth: '300px',
//   [theme.breakpoints.up('md')]: {
//     width: '600px',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//   },
// }));

// function AppNavbar() {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     logOut();
//     handleMenuClose();
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <AppBar position="sticky" color="default">
//       <Container>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           {/* Left side: Logo and Category Buttons */}
//           <Box display="flex" alignItems="center">
//           <Box component={RouterLink} to="/home" display="flex" alignItems="center" mr={4} style={{ textDecoration: 'none', color: 'inherit' }}>
//               <ChefHatLogo />
//               <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Roboto, sans-serif', ml: 1 }}>
//                 Sous Chef
//               </Typography>
//             </Box>
//             <Box display="flex" alignItems="center" gap={2}>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/recipes')}>Recipe</Button>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/meal-planner')}>Meal Planner</Button>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }}>Cooking Tips</Button>
//             </Box>
//           </Box>

//           {/* Centered Search Bar */}
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase placeholder="Search a recipe or ingredients" inputProps={{ 'aria-label': 'search' }} />
//           </Search>

//           {/* Right side: Login/Sign Up or User Menu */}
//           <Box display="flex" alignItems="center">
//             {user ? (
//               <>
//                 <IconButton
//                   color="inherit"
//                   onClick={handleMenuOpen}
//                   size="large"
//                   edge="end"
//                   aria-controls="menu-appbar"
//                   aria-haspopup="true"
//                 >
//                   <AccountCircle />
//                 </IconButton>
//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorEl}
//                   anchorOrigin={{
//                     vertical: 'bottom', // Position below the icon
//                     horizontal: 'right',
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: 'top', // Align the top of the menu with the icon's bottom
//                     horizontal: 'right',
//                   }}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                 >
//                   <MenuItem disabled>{user}</MenuItem>
//                   <MenuItem onClick={handleLogout}>Log Out</MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <>
//                 <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
//                 <Button variant="contained" color="primary" sx={{ backgroundColor: '#ff6347', ml: 2 }} onClick={() => navigate('/register')}>
//                   Sign Up
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default AppNavbar;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   InputBase,
//   Button,
//   Box,
//   Container,
//   Menu,
//   MenuItem,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
// } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import { ChefHatLogo } from './ChefHatLogo';
// import { Link as RouterLink } from 'react-router-dom';
// import { useAuth } from '../providers/AuthContextProvider';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: theme.spacing(2),
//   width: '100%',
//   maxWidth: '300px',
//   [theme.breakpoints.up('md')]: {
//     width: '600px',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//   },
// }));

// function AppNavbar() {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     logOut();
//     handleMenuClose();
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Fetch recipes based on search query
//   useEffect(() => {
//     if (searchTerm.length > 1) {
//       fetch(`http://localhost:5001/recipes/search?query=${searchTerm}`)
//         .then((res) => res.json())
//         .then((data) => setSearchResults(data))
//         .catch((err) => console.error("Error fetching recipes:", err));
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm]);

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Navigate to search results when Enter is pressed
//   const handleSearchSubmit = (event) => {
//     if (event.key === 'Enter' && searchTerm.trim() !== '') {
//       navigate(`/search?query=${searchTerm}`);
//     }
//   };

//   return (
//     <AppBar position="sticky" color="default">
//       <Container>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           {/* Left side: Logo and Category Buttons */}
//           <Box display="flex" alignItems="center">
//             <Box
//               component={RouterLink}
//               to="/home"
//               display="flex"
//               alignItems="center"
//               mr={4}
//               style={{ textDecoration: 'none', color: 'inherit' }}
//             >
//               <ChefHatLogo />
//               <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Roboto, sans-serif', ml: 1 }}>
//                 Sous Chef
//               </Typography>
//             </Box>
//             <Box display="flex" alignItems="center" gap={2}>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/recipes')}>
//                 Recipe
//               </Button>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/meal-planner')}>
//                 Meal Planner
//               </Button>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }}>Cooking Tips</Button>
//             </Box>
//           </Box>

//           {/* Centered Search Bar */}
//           <Box sx={{ position: 'relative' }}>
//             <Search>
//               <SearchIconWrapper>
//                 <SearchIcon />
//               </SearchIconWrapper>
//               <StyledInputBase
//                 placeholder="Search a recipe or ingredients"
//                 inputProps={{ 'aria-label': 'search' }}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 onKeyPress={handleSearchSubmit}
//               />
//             </Search>
//             {searchResults.length > 0 && (
//               <Paper
//                 sx={{
//                   position: 'absolute',
//                   top: '100%',
//                   left: 0,
//                   width: '100%',
//                   zIndex: 10,
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//                   maxHeight: 200,
//                   overflowY: 'auto',
//                   backgroundColor: 'white',
//                 }}
//               >
//                 <List>
//                   {searchResults.map((recipe) => (
//                     <ListItem
//                       button
//                       key={recipe._id}
//                       onClick={() => navigate(`/recipes/${recipe._id}`)}
//                     >
//                       <ListItemText primary={recipe.name} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Paper>
//             )}
//           </Box>

//           {/* Right side: Login/Sign Up or User Menu */}
//           <Box display="flex" alignItems="center">
//             {user ? (
//               <>
//                 <IconButton
//                   color="inherit"
//                   onClick={handleMenuOpen}
//                   size="large"
//                   edge="end"
//                   aria-controls="menu-appbar"
//                   aria-haspopup="true"
//                 >
//                   <AccountCircle />
//                 </IconButton>
//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorEl}
//                   anchorOrigin={{
//                     vertical: 'bottom', // Position below the icon
//                     horizontal: 'right',
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: 'top', // Align the top of the menu with the icon's bottom
//                     horizontal: 'right',
//                   }}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                 >
//                   {/* <MenuItem disabled>{user}</MenuItem>
//                   <MenuItem onClick={handleLogout}>Log Out</MenuItem> */}
//                   <MenuItem component={RouterLink} to="/profile">Profile</MenuItem>
//                   <MenuItem onClick={handleLogout}>Log Out</MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <>
//                 <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ backgroundColor: '#ff6347', ml: 2 }}
//                   onClick={() => navigate('/register')}
//                 >
//                   Sign Up
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default AppNavbar;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   InputBase,
//   Button,
//   Box,
//   Container,
//   Menu,
//   MenuItem,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
// } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import { ChefHatLogo } from './ChefHatLogo';
// import { Link as RouterLink } from 'react-router-dom';
// import { useAuth } from '../providers/AuthContextProvider';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: theme.spacing(2),
//   width: '100%',
//   maxWidth: '300px',
//   [theme.breakpoints.up('md')]: {
//     width: '600px',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//   },
// }));

// function AppNavbar() {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     logOut();
//     handleMenuClose();
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Fetch recipes based on search query
//   useEffect(() => {
//     if (searchTerm.length > 1) {
//       fetch(`http://localhost:5001/recipes/search?query=${searchTerm}`)
//         .then((res) => res.json())
//         .then((data) => setSearchResults(data))
//         .catch((err) => console.error("Error fetching recipes:", err));
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm]);

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Navigate to search results when Enter is pressed
//   const handleSearchSubmit = (event) => {
//     if (event.key === 'Enter' && searchTerm.trim() !== '') {
//       navigate(`/search?query=${searchTerm}`);
//     }
//   };

//   return (
//     <AppBar position="sticky" color="default">
//       <Container>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           {/* Left side: Logo and Category Buttons */}
//           <Box display="flex" alignItems="center">
//             <Box
//               component={RouterLink}
//               to="/home"
//               display="flex"
//               alignItems="center"
//               mr={4}
//               style={{ textDecoration: 'none', color: 'inherit' }}
//             >
//               <ChefHatLogo />
//               <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Roboto, sans-serif', ml: 1 }}>
//                 Sous Chef
//               </Typography>
//             </Box>
//             <Box display="flex" alignItems="center" gap={2}>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/recipes')}>
//                 Recipe
//               </Button>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/meal-planner')}>
//                 Meal Planner
//               </Button>
//               <Button color="inherit" sx={{ fontWeight: 'bold' }}>Cooking Tips</Button>
//             </Box>
//           </Box>

//           {/* Centered Search Bar */}
//           <Box sx={{ position: 'relative' }}>
//             <Search>
//               <SearchIconWrapper>
//                 <SearchIcon />
//               </SearchIconWrapper>
//               <StyledInputBase
//                 placeholder="Search a recipe or ingredients"
//                 inputProps={{ 'aria-label': 'search' }}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 onKeyPress={handleSearchSubmit}
//               />
//             </Search>
//             {searchResults.length > 0 && (
//               <Paper
//                 sx={{
//                   position: 'absolute',
//                   top: '100%',
//                   left: 0,
//                   width: '100%',
//                   zIndex: 10,
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//                   maxHeight: 200,
//                   overflowY: 'auto',
//                   backgroundColor: 'white',
//                 }}
//               >
//                 <List>
//                   {searchResults.map((recipe) => (
//                     <ListItem
//                       button
//                       key={recipe._id}
//                       onClick={() => navigate(`/recipes/${recipe._id}`)}
//                     >
//                       <ListItemText primary={recipe.name} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Paper>
//             )}
//           </Box>

//           {/* Right side: Login/Sign Up or User Menu */}
//           <Box display="flex" alignItems="center">
//             {user ? (
//               <>
//                 <IconButton
//                   color="inherit"
//                   onClick={handleMenuOpen}
//                   size="large"
//                   edge="end"
//                   aria-controls="menu-appbar"
//                   aria-haspopup="true"
//                 >
//                   <AccountCircle />
//                 </IconButton>
//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorEl}
//                   anchorOrigin={{
//                     vertical: 'bottom', // Position below the icon
//                     horizontal: 'right',
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: 'top', // Align the top of the menu with the icon's bottom
//                     horizontal: 'right',
//                   }}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                 >
//                   <MenuItem disabled>{user}</MenuItem>
//                   <MenuItem onClick={handleLogout}>Log Out</MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <>
//                 <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ backgroundColor: '#ff6347', ml: 2 }}
//                   onClick={() => navigate('/register')}
//                 >
//                   Sign Up
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default AppNavbar;









import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ChefHatLogo } from './ChefHatLogo';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthContextProvider';
import { getRecipesBySearch } from "../utils/api";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f1f1f1",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
  marginLeft: theme.spacing(2),
  width: "300px",  // ✅ INCREASED WIDTH
  maxWidth: "500px",
  display: "flex",
  alignItems: "center",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  width: "100%",
}));

const SearchDropdown = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  zIndex: 10,
  backgroundColor: "#fff",
  boxShadow: theme.shadows[2],
  borderRadius: "4px",
}));

function AppNavbar() {
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logOut();
    handleMenuClose();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
  
    const fetchRecipes = async () => {
      try {
        const data = await getRecipesBySearch(searchTerm);
        setSearchResults(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
  
    fetchRecipes();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handleSearchSubmit = (event) => {
  //   if (event.key === "Enter" && searchTerm.trim() !== "") {
  //     setShowDropdown(false);
  //     navigate(`/foodlist?search=${searchTerm}`);
  //   }
  // };

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      setShowDropdown(false);
      navigate(`/foodlist?search=${searchTerm}`);
      setSearchTerm(""); // ✅ Clear the search bar after entering
    }
  };
  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <AppBar position="sticky" color="default">
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left side: Logo and Category Buttons */}
          <Box display="flex" alignItems="center">
            <Box
              component={RouterLink}
              to="/home"
              display="flex"
              alignItems="center"
              mr={4}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ChefHatLogo />
              <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Roboto, sans-serif', ml: 1 }}>
                Sous Chef
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/recipes')}>
                Recipe
              </Button>
              <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/meal-planner')}>
                Meal Planner
              </Button>
              <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/cookingtips')}>
                Cooking Tips
              </Button>
            </Box>
          </Box>

          {/* Centered Search Bar */}
          <Box sx={{ position: 'relative' }} ref={searchRef}>
            <Search>
              <SearchInput
                placeholder="Search Recipes..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
              />
              <IconButton sx={{ padding: "5px" }} onClick={() => navigate(`/foodlist?search=${searchTerm}`)}>
                <SearchIcon />
              </IconButton>
              {showDropdown && searchResults.length > 0 && (
                <SearchDropdown>
                  <List>
                    {searchResults.map((recipe) => (
                      <ListItem
                        key={recipe._id}
                        button
                        onClick={() => {
                          setShowDropdown(false);
                          setSearchTerm("");
                          navigate(`/recipes/${recipe._id}`);
                        }}
                      >
                        <ListItemText primary={recipe.name} />
                      </ListItem>
                    ))}
                  </List>
                </SearchDropdown>
              )}
            </Search>
          </Box>

          {/* Right side: Login/Sign Up or User Menu */}
          <Box display="flex" alignItems="center">
            {user ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  size="large"
                  edge="end"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom', // Position below the icon
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top', // Align the top of the menu with the icon's bottom
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem disabled>{user.username}</MenuItem>
                  <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem> {/* ✅ New Profile Button */}
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: '#ff6347', ml: 2 }}
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppNavbar;
