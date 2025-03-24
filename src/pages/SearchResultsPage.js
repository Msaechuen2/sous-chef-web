import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5001/recipes/search?query=${query}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{query}"
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {results.length ? (
          results.map((recipe) => (
            <ListItem key={recipe._id} button component="a" href={`/recipes/${recipe._id}`}>
              <ListItemText primary={recipe.name} secondary={recipe.description} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No recipes found for "{query}"</Typography>
        )}
      </List>
    </Box>
  );
};

export default SearchResultsPage;
