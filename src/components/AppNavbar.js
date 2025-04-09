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
  width: "300px",  
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

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      setShowDropdown(false);
      navigate(`/foodlist?search=${searchTerm}`);
      setSearchTerm(""); 
    }
  };
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
                    vertical: 'bottom', 
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top', 
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem disabled>{user.username}</MenuItem>
                  <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem> 
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
