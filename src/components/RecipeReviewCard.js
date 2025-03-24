// // RecipeReviewCard.js
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme }) => ({
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function RecipeReviewCard({ title, subheader, image, description }) {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>}
//         action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
//         title={title}
//         subheader={subheader}
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image={image}
//         alt={title}
//       />
//       <CardContent>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           {description}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>Method:</Typography>
//           <Typography paragraph>Step-by-step cooking instructions can go here.</Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }




// import React from 'react';
// import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// export default function RecipeReviewCard({ title, description, imageUrl }) {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>}
//         action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
//         title={title}
//         subheader="Popular Recipe"
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image={imageUrl}
//         alt={title}
//       />
//       <CardContent>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           {description}
//         </Typography>
//       </CardContent>
//       <IconButton aria-label="add to favorites"><FavoriteIcon /></IconButton>
//       <IconButton aria-label="share"><ShareIcon /></IconButton>
//     </Card>
//   );
// }





// import React from 'react';
// import { Card, CardHeader, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
// import { Link } from 'react-router-dom';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import './RecipeReviewCard.css';

// export default function RecipeReviewCard({ title, description, imageUrl, linkTo }) {
//   return (
//     <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
//       {/* Wrap CardHeader in Link to make the title clickable */}
//       <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
//         <CardHeader
//           title={title}
//           subheader="Popular Recipe"
//         />
//       </Link>
      
//       {/* Wrap CardMedia in Link to make the image clickable */}
//       <Link to={linkTo}>
//         <CardMedia
//           component="img"
//           image={imageUrl}
//           className='small-image'
//         />
//       </Link>
      
//       <CardContent>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           {description}
//         </Typography>
//       </CardContent>
      
//       <IconButton aria-label="add to favorites"><FavoriteIcon /></IconButton>
//       <IconButton aria-label="share"><ShareIcon /></IconButton>
//     </Card>
//   );
// }


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

  // **Debugging: Check if recipeId is properly received**
  useEffect(() => {
    console.log("RecipeReviewCard Loaded - Recipe ID:", recipeId);
  }, [recipeId]);

  // ✅ Fetch favorite status when component mounts
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

  // ✅ Handle Add/Remove Favorite
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

      // ✅ Refresh favorite list from database
      const updatedFavorites = await getUserFavorites();
      setIsFavorite(updatedFavorites.some((fav) => fav._id === recipeId));

    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      {/* Wrap CardHeader in Link to make the title clickable */}
      <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardHeader title={title} subheader="Popular Recipe" />
      </Link>

      {/* Wrap CardMedia in Link to make the image clickable */}
      <Link to={linkTo}>
        <CardMedia component="img" image={imageUrl} className="small-image" />
      </Link>

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>

      {/* ✅ Toggle Favorite Button */}
      <IconButton aria-label="add to favorites" onClick={handleFavoriteToggle} color={isFavorite ? "error" : "default"}>
        <FavoriteIcon />
      </IconButton>

      {/* Share Button (unchanged) */}
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
    </Card>
  );
}
