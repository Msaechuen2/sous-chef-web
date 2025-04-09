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
import { Link } from "react-router-dom"; 

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
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}> {(user.displayName || user.username || "?").charAt(0).toUpperCase()} </Avatar>
        <Typography variant="h4">{profile.displayName || user?.displayName || user?.username || "Guest User"}</Typography>
        <Typography variant="body1" color="text.secondary">{profile.bio || user?.bio || "No bio yet."}</Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: -5 }}>Favorite Recipes</Typography>
      {favoriteRecipes.length === 0 ? (
        <Typography variant="body2" color="text.secondary">No favorite recipes yet.</Typography>
      ) : (
        <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto", mt: -1, alignItems: "center" }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={favoriteRecipes.length > 3} 
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={favoriteRecipes.length <= 3 ? 0 : 20} 
            slidesPerView={favoriteRecipes.length <= 3 ? favoriteRecipes.length : 4} 
            navigation={favoriteRecipes.length > 1} 
            style={{
                display: "flex",
                justifyContent: favoriteRecipes.length <= 3 ? "center" : "flex-start", 
            }}
            >
            {favoriteRecipes.map((recipe) => (
              <SwiperSlide key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card
                    sx={{
                      width: 250, 
                      height: 300, 
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: 3,
                      borderRadius: 2, 
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={recipe.imageUrl}
                      alt={recipe.name}
                      sx={{
                        width: "100%",
                        height: 250, 
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

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" sx={{ mx: 1 }} onClick={() => setOpenModal(true)}>Edit Profile</Button>
        <Button variant="outlined" color="error" onClick={logOut} sx={{ mx: 1 }}>Logout</Button>
      </Box>

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
