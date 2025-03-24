// import React, { useEffect, useState } from "react";
// import { getUserProfile } from "../utils/api"; // Update the path

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await getUserProfile();
//         setProfile(data);
//       } catch (err) {
//         setError("Failed to load profile. Please log in again.");
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Profile</h2>
//       {profile ? (
//         <div>
//           <p><strong>Username:</strong> {profile.username}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Created At:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;


// import React from 'react';
// import { Container, Typography, Paper } from '@mui/material';
// import { useAuth } from '../providers/AuthContextProvider';

// const ProfilePage = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Typography variant="h6">Please log in to view your profile.</Typography>;
//   }

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
//         <Typography variant="h4" fontWeight="bold">Profile</Typography>
//         <Typography variant="h6" sx={{ mt: 2 }}>Username: {user}</Typography>
//       </Paper>
//     </Container>
//   );
// };

// export default ProfilePage;









// import React, { useEffect, useState } from "react";
// import { Container, Typography, Paper, List, ListItem, ListItemText, IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { getUserProfile, removeRecipeFromFavorites } from "../utils/api";
// import { useAuth } from "../providers/AuthContextProvider";

// const ProfilePage = () => {
//   const { user } = useAuth();
//   const [favoriteRecipes, setFavoriteRecipes] = useState([]);

//   useEffect(() => {
//     if (user) {
//       getUserProfile()
//         .then((data) => setFavoriteRecipes(data.favoriteRecipes))
//         .catch((err) => console.error("Error loading profile:", err));
//     }
//   }, [user]);

//   const handleRemoveFavorite = async (recipeId) => {
//     try {
//       await removeRecipeFromFavorites(recipeId);
//       setFavoriteRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
//     } catch (error) {
//       console.error("Error removing favorite recipe:", error);
//     }
//   };

//   if (!user) {
//     return <Typography variant="h6">Please log in to view your profile.</Typography>;
//   }

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
//         <Typography variant="h4" fontWeight="bold">Profile</Typography>
//         <Typography variant="h6" sx={{ mt: 2 }}>Username: {user}</Typography>

//         <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Favorite Recipes</Typography>
//         <List>
//           {favoriteRecipes.length > 0 ? (
//             favoriteRecipes.map((recipe) => (
//               <ListItem key={recipe._id} sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <ListItemText primary={recipe.name} />
//                 <IconButton onClick={() => handleRemoveFavorite(recipe._id)}>
//                   <DeleteIcon color="error" />
//                 </IconButton>
//               </ListItem>
//             ))
//           ) : (
//             <Typography>No favorite recipes yet.</Typography>
//           )}
//         </List>
//       </Paper>
//     </Container>
//   );
// };

// export default ProfilePage;







// import React, { useEffect, useState } from "react";
// import { getUserFavorites } from "../utils/api"; // Import API function
// import { useAuth } from "../providers/AuthContextProvider";

// const ProfilePage = () => {
//   const { user } = useAuth();
//   const [favoriteRecipes, setFavoriteRecipes] = useState([]); // Default to empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user's favorite recipes
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const data = await getUserFavorites();
//         setFavoriteRecipes(data || []); // Ensure it's always an array
//       } catch (err) {
//         setError("Failed to load favorite recipes.");
//         console.error("Error fetching favorites:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   if (!user) {
//     return <p>Please log in to view your profile.</p>;
//   }

//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>Username: {user.username}</p>

//       <h2>Favorite Recipes</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : favoriteRecipes.length > 0 ? (
//         <ul>
//           {favoriteRecipes.map((recipe) => (
//             <li key={recipe._id}>{recipe.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No favorite recipes yet.</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;




// import React, { useEffect, useState } from 'react';
// import { getUserFavorites } from '../utils/api';
// import { Box, Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

// const ProfilePage = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const data = await getUserFavorites();
//         setFavorites(data);
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         My Favorite Recipes
//       </Typography>
//       {favorites.length === 0 ? (
//         <Typography>No favorite recipes yet.</Typography>
//       ) : (
//         <List>
//           {favorites.map((recipe) => (
//             <ListItem key={recipe._id}>
//               <ListItemText primary={recipe.name} secondary={recipe.description} />
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Container>
//   );
// };

// export default ProfilePage;





// import React, { useEffect, useState } from 'react';
// import { Container, Box, Typography, Avatar, Button, Card, CardMedia, CardContent } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Navigation, Autoplay } from 'swiper/modules';
// import { useAuth } from '../providers/AuthContextProvider';
// import { getUserFavorites } from '../utils/api';

// const ProfilePage = () => {
//   const { user, logOut } = useAuth();
//   const [favoriteRecipes, setFavoriteRecipes] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const data = await getUserFavorites();
//         setFavoriteRecipes(data);
//       } catch (error) {
//         console.error("Error fetching favorite recipes:", error);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   return (
//     <Container maxWidth="lg" sx={{ py: 5, textAlign: 'center' }}>
//       {/* ✅ Profile Section */}
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
//         <Avatar sx={{ width: 100, height: 100, mb: 2 }}>J</Avatar>
//         <Typography variant="h4">{user?.username || "Guest User"}</Typography>
//         <Typography variant="body1" color="text.secondary">
//           "Passionate Home Chef"
//         </Typography>
//       </Box>

//       {/* ✅ Favorite Recipes Section with Swiper Slider */}
//       <Typography variant="h5" sx={{ mb: 0 }}>Favorite Recipes</Typography> {/* 🔹 Moved Closer */}
//       {favoriteRecipes.length === 0 ? (
//         <Typography variant="body2" color="text.secondary">No favorite recipes yet.</Typography>
//       ) : (
//         <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
//           <Swiper
//             modules={[Navigation, Autoplay]}
//             loop={true}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             spaceBetween={20} // Increase space between slides
//             slidesPerView={4} // Show 4 slides per view
//             navigation
//             breakpoints={{
//               640: { slidesPerView: 1 }, // Mobile: 1 card
//               1024: { slidesPerView: 2 }, // Tablets: 2 cards
//               1440: { slidesPerView: 3 }, // Large screens: 3 cards
//               1600: { slidesPerView: 4 }, // Extra large screens: 4 cards
//             }}
//           >
//             {favoriteRecipes.map((recipe) => (
//               <SwiperSlide key={recipe._id}>
//                 <Card 
//                   sx={{
//                     width: '100%', 
//                     height: 400,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     textAlign: 'center',
//                     boxShadow: 3,
//                   }}
//                 >
//                   <CardMedia 
//                     component="img" 
//                     image={recipe.imageUrl} 
//                     alt={recipe.name}
//                     sx={{
//                       width: '100%',
//                       height: 300, 
//                       objectFit: 'cover',
//                     }} 
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
//                       {recipe.name}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </Box>
//       )}

//       {/* ✅ Buttons Section */}
//       <Box sx={{ mt: 3 }}>
//         <Button variant="contained" color="primary" sx={{ mx: 1 }}>Edit Profile</Button>
//         <Button variant="outlined" color="error" onClick={logOut} sx={{ mx: 1 }}>Logout</Button>
//       </Box>
//     </Container>
//   );
// };

// export default ProfilePage;









// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Avatar,
//   Button,
//   TextField,
//   Modal,
//   Card,
//   CardMedia,
//   CardContent,
// } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import { Navigation, Autoplay } from "swiper/modules";
// import { useAuth } from "../providers/AuthContextProvider";
// import { getUserFavorites, getUserProfile, updateUserProfile } from "../utils/api";

// const ProfilePage = () => {
//   const { user, logOut } = useAuth();
//   const [favoriteRecipes, setFavoriteRecipes] = useState([]);
//   const [profile, setProfile] = useState({ displayName: "", bio: "" });
//   const [openModal, setOpenModal] = useState(false);
//   const [editedProfile, setEditedProfile] = useState({ displayName: "", bio: "" });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const profileData = await getUserProfile();
//         setProfile(profileData);
//         setEditedProfile(profileData);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     const fetchFavorites = async () => {
//       try {
//         const data = await getUserFavorites();
//         setFavoriteRecipes(data);
//       } catch (error) {
//         console.error("Error fetching favorite recipes:", error);
//       }
//     };

//     fetchProfile();
//     fetchFavorites();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       const updatedProfile = await updateUserProfile(editedProfile);
//       setProfile(updatedProfile);
//       setOpenModal(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 5, textAlign: "center" }}>
//       {/* ✅ Profile Section */}
//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
//         <Avatar sx={{ width: 100, height: 100, mb: 2 }}>J</Avatar>
//         <Typography variant="h4">{profile.displayName || user?.username || "Guest User"}</Typography>
//         <Typography variant="body1" color="text.secondary">{profile.bio || "No bio yet."}</Typography>
//       </Box>

//       {/* ✅ Favorite Recipes Section with Swiper Slider */}
//       <Typography variant="h5" sx={{ mb: 0 }}>Favorite Recipes</Typography> {/* 🔹 Moved Closer */}
//         {favoriteRecipes.length === 0 ? (
//         <Typography variant="body2" color="text.secondary">No favorite recipes yet.</Typography>
//         ) : (
//         <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
//           <Swiper
//             modules={[Navigation, Autoplay]}
//             loop={true}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             spaceBetween={20} // Increase space between slides
//             slidesPerView={4} // Show 4 slides per view
//             navigation
//             // breakpoints={{
//             //   640: { slidesPerView: 1 }, // Mobile: 1 card
//             //   1024: { slidesPerView: 2 }, // Tablets: 2 cards
//             //   1440: { slidesPerView: 3 }, // Large screens: 3 cards
//             //   1600: { slidesPerView: 4 }, // Extra large screens: 4 cards
//             // }}
//           >
//             {favoriteRecipes.map((recipe) => (
//               <SwiperSlide key={recipe._id}>
//                 <Card 
//                   sx={{
//                     width: '100%', 
//                     height: 400,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     textAlign: 'center',
//                     boxShadow: 3,
//                   }}
//                 >
//                   <CardMedia 
//                     component="img" 
//                     image={recipe.imageUrl} 
//                     alt={recipe.name}
//                     sx={{
//                       width: '100%',
//                       height: 300, 
//                       objectFit: 'cover',
//                     }} 
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
//                       {recipe.name}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </Box>
//       )}

//       {/* ✅ Buttons Section */}
//       <Box sx={{ mt: 3 }}>
//         <Button variant="contained" color="primary" sx={{ mx: 1 }} onClick={() => setOpenModal(true)}>Edit Profile</Button>
//         <Button variant="outlined" color="error" onClick={logOut} sx={{ mx: 1 }}>Logout</Button>
//       </Box>

//       {/* ✅ Edit Profile Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2, maxWidth: 400, mx: "auto", mt: "10%" }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
//           <TextField
//             fullWidth
//             label="Display Name"
//             value={editedProfile.displayName}
//             onChange={(e) => setEditedProfile({ ...editedProfile, displayName: e.target.value })}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Bio"
//             value={editedProfile.bio}
//             onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
//             multiline
//             rows={3}
//             sx={{ mb: 2 }}
//           />
//           <Button variant="contained" color="primary" onClick={handleEditProfile} sx={{ mr: 1 }}>Save</Button>
//           <Button variant="outlined" color="error" onClick={() => setOpenModal(false)}>Cancel</Button>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default ProfilePage;




// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Avatar,
//   Button,
//   TextField,
//   Modal,
//   Card,
//   CardMedia,
//   CardContent,
// } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import { Navigation, Autoplay } from "swiper/modules";
// import { useAuth } from "../providers/AuthContextProvider";
// import { getUserFavorites, getUserProfile, updateUserProfile } from "../utils/api";

// const ProfilePage = () => {
//   const { user, setUser, logOut } = useAuth(); // ✅ Ensuring user is updated in AuthContext
//   const [favoriteRecipes, setFavoriteRecipes] = useState([]);
//   const [profile, setProfile] = useState({ displayName: "", bio: "" });
//   const [openModal, setOpenModal] = useState(false);
//   const [editedProfile, setEditedProfile] = useState({ displayName: "", bio: "" });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const profileData = await getUserProfile();
//         setProfile(profileData);
//         setEditedProfile(profileData);
//         setUser((prevUser) => ({
//           ...prevUser,
//           displayName: profileData.displayName,
//           bio: profileData.bio,
//         })); // ✅ Ensures updated user data persists
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     const fetchFavorites = async () => {
//       try {
//         const data = await getUserFavorites();
//         setFavoriteRecipes(data);
//       } catch (error) {
//         console.error("Error fetching favorite recipes:", error);
//       }
//     };

//     fetchProfile();
//     fetchFavorites();
//   }, [setUser]); // ✅ Ensures the profile updates properly

//   const handleEditProfile = async () => {
//     try {
//       const updatedProfile = await updateUserProfile(editedProfile);
//       setProfile(updatedProfile);
//       setUser((prevUser) => ({
//         ...prevUser,
//         displayName: updatedProfile.displayName,
//         bio: updatedProfile.bio,
//       })); // ✅ Ensures the updated profile is stored
//       setOpenModal(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 5, textAlign: "center" }}>
//       {/* ✅ Profile Section */}
//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
//         <Avatar sx={{ width: 100, height: 100, mb: 2 }}>J</Avatar>
//         <Typography variant="h4">{profile.displayName || user?.displayName || user?.username || "Guest User"}</Typography>
//         <Typography variant="body1" color="text.secondary">{profile.bio || user?.bio || "No bio yet."}</Typography>
//       </Box>

//       {/* ✅ Favorite Recipes Section */}
//       <Typography variant="h5" sx={{ mb: 1 }}>Favorite Recipes</Typography> {/* 🔹 Moved Closer */}
//       {favoriteRecipes.length === 0 ? (
//         <Typography variant="body2" color="text.secondary">No favorite recipes yet.</Typography>
//       ) : (
//         <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto", mt: -1, alignItems: "center" }}> {/* 🔹 Increased Width */}
//           <Swiper
//             modules={[Navigation, Autoplay]}
//             loop={true}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             spaceBetween={20} // 🔹 Adjusted Spacing
//             slidesPerView={4} // 🔹 Ensures 4 Recipes Per View
//             navigation
//           >
//             {favoriteRecipes.map((recipe) => (
//               <SwiperSlide key={recipe._id}>
//                 <Card sx={{ width: "100%", height: 400, boxShadow: 3 }}>
//                   <CardMedia component="img" image={recipe.imageUrl} alt={recipe.name} sx={{ width: "100%", height: 300, objectFit: "cover" }} />
//                   <CardContent>
//                     <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>{recipe.name}</Typography>
//                   </CardContent>
//                 </Card>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </Box>
//       )}

//       {/* ✅ Buttons Section */}
//       <Box sx={{ mt: 3 }}>
//         <Button variant="contained" color="primary" sx={{ mx: 1 }} onClick={() => setOpenModal(true)}>Edit Profile</Button>
//         <Button variant="outlined" color="error" onClick={logOut} sx={{ mx: 1 }}>Logout</Button>
//       </Box>

//       {/* ✅ Edit Profile Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2, maxWidth: 400, mx: "auto", mt: "10%" }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
//           <TextField
//             fullWidth
//             label="Display Name"
//             value={editedProfile.displayName}
//             onChange={(e) => setEditedProfile({ ...editedProfile, displayName: e.target.value })}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Bio"
//             value={editedProfile.bio}
//             onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
//             multiline
//             rows={3}
//             sx={{ mb: 2 }}
//           />
//           <Button variant="contained" color="primary" onClick={handleEditProfile} sx={{ mr: 1 }}>Save</Button>
//           <Button variant="outlined" color="error" onClick={() => setOpenModal(false)}>Cancel</Button>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default ProfilePage;









import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Modal,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import { useAuth } from "../providers/AuthContextProvider";
import { getUserFavorites, getUserProfile, updateUserProfile } from "../utils/api";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation

const ProfilePage = () => {
  const { user, setUser, logOut } = useAuth(); 
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [profile, setProfile] = useState({ displayName: "", bio: "" });
  const [openModal, setOpenModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ displayName: "", bio: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setProfile(profileData);
        setEditedProfile(profileData);
        setUser((prevUser) => ({
          ...prevUser,
          displayName: profileData.displayName,
          bio: profileData.bio,
        }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const data = await getUserFavorites();
        setFavoriteRecipes(data);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };

    fetchProfile();
    fetchFavorites();
  }, [setUser]);

  const handleEditProfile = async () => {
    try {
      const updatedProfile = await updateUserProfile(editedProfile);
      setProfile(updatedProfile);
      setUser((prevUser) => ({
        ...prevUser,
        displayName: updatedProfile.displayName,
        bio: updatedProfile.bio,
      }));
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5, textAlign: "center" }}>
      {/* ✅ Profile Section */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>J</Avatar>
        <Typography variant="h4">{profile.displayName || user?.displayName || user?.username || "Guest User"}</Typography>
        <Typography variant="body1" color="text.secondary">{profile.bio || user?.bio || "No bio yet."}</Typography>
      </Box>

      {/* ✅ Favorite Recipes Section */}
      <Typography variant="h5" sx={{ mb: -5 }}>Favorite Recipes</Typography>
      {favoriteRecipes.length === 0 ? (
        <Typography variant="body2" color="text.secondary">No favorite recipes yet.</Typography>
      ) : (
        <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto", mt: -1, alignItems: "center" }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={favoriteRecipes.length > 3} // ✅ Enable loop only if there are more than 2 recipes
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={favoriteRecipes.length <= 3 ? 0 : 20} // ✅ No space if only 1-2 recipes
            slidesPerView={favoriteRecipes.length <= 3 ? favoriteRecipes.length : 4} // ✅ Adjust slidesPerView dynamically
            navigation={favoriteRecipes.length > 1} // ✅ Show navigation only if more than 1 recipe
            style={{
                display: "flex",
                justifyContent: favoriteRecipes.length <= 3 ? "center" : "flex-start", // ✅ Center if 1-2 recipes
            }}
            >
            {favoriteRecipes.map((recipe) => (
              <SwiperSlide key={recipe._id}>
                {/* ✅ Wrapped inside Link to navigate to recipe page */}
                <Link to={`/recipes/${recipe._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card
                    sx={{
                      width: 250, // ✅ Fixed width
                      height: 300, // ✅ Fixed height
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: 3,
                      borderRadius: 2, // ✅ Ensures rounded corners for consistency
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={recipe.imageUrl}
                      alt={recipe.name}
                      sx={{
                        width: "100%",
                        height: 250, // ✅ Ensures equal height for images
                        objectFit: "cover",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                        {recipe.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}

      {/* ✅ Buttons Section */}
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" sx={{ mx: 1 }} onClick={() => setOpenModal(true)}>Edit Profile</Button>
        <Button variant="outlined" color="error" onClick={logOut} sx={{ mx: 1 }}>Logout</Button>
      </Box>

      {/* ✅ Edit Profile Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2, maxWidth: 400, mx: "auto", mt: "10%" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
          <TextField
            fullWidth
            label="Display Name"
            value={editedProfile.displayName}
            onChange={(e) => setEditedProfile({ ...editedProfile, displayName: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Bio"
            value={editedProfile.bio}
            onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleEditProfile} sx={{ mr: 1 }}>Save</Button>
          <Button variant="outlined" color="error" onClick={() => setOpenModal(false)}>Cancel</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
