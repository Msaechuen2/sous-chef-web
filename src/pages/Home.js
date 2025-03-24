// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import './HomePage.css';

// const popularRecipes = [
//   { id: 1, name: 'Spaghetti Carbonara', imageUrl: './src/images/home1.jpg' },
//   { id: 2, name: 'Chicken Parmesan', imageUrl: '/home1.jpg' },
//   { id: 3, name: 'Beef Tacos', imageUrl: 'home1.jpg' },
//   { id: 4, name: 'Vegetable Stir Fry', imageUrl: 'home1.jpg' },
// ];

// const HomePage = () => {
//   return (
//     <div className="homepage">
//       {/* Hero Section */}
//       <section className="hero">
//         <h1>Welcome to Sous Chef</h1>
//         <p>Your personal cooking companion, here to help with recipes, meal planning, and more!</p>
//         <button className="cta-button">Explore Recipes</button>
//       </section>

//       {/* Features Section */}
//       <section className="features">
//         <h2>Our Features</h2>
//         <div className="feature-cards">
//           <div className="feature-card">
//             <h3>Recipe Search</h3>
//             <p>Discover a world of recipes at your fingertips.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Meal Planner</h3>
//             <p>Plan your meals for the week with ease.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Nutrition Management</h3>
//             <p>Stay on top of your nutritional goals.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Chat Assistant</h3>
//             <p>Get instant cooking advice anytime.</p>
//           </div>
//         </div>
//       </section>

//       {/* Popular Recipes */}
//       <section className="popular-recipes">
//         <h2>Popular Recipes</h2>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           loop={true} // Enable looping
//           autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
//           spaceBetween={20}
//           slidesPerView={3}
//           navigation
//           pagination={{ clickable: true }}
//         >
//           {popularRecipes.map((recipe) => (
//             <SwiperSlide key={recipe.id}>
//               <div className="recipe-card">
//                 <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
//                 <h3>{recipe.name}</h3>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>


//       {/* Cooking Tips */}
//       <section className="cooking-tips">
//         <h2>Cooking Tips & Articles</h2>
//         <div className="tips-cards">
//           <div className="tip-card">
//             <h3>Tip Title</h3>
//             <p>Brief tip description here.</p>
//           </div>
//           {/* Add more tip cards as needed */}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="cta-section">
//         <h2>Ready to start cooking?</h2>
//         <button className="cta-button">Join Sous Chef Today</button>
//       </section>
//     </div>
//   );
// };

// export default HomePage;


// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import './HomePage.css';

// const HomePage = () => {
//   // State to hold popular recipes data fetched from the backend
//   const [popularRecipes, setPopularRecipes] = useState([]);

//   // Fetch popular recipes from the backend API
//   useEffect(() => {
//     const fetchPopularRecipes = async () => {
//       try {
//         const response = await fetch('/api/recipes/popular'); // Replace with your actual API endpoint
//         const data = await response.json();
//         setPopularRecipes(data); // Update state with fetched recipes
//       } catch (error) {
//         console.error('Error fetching popular recipes:', error);
//       }
//     };

//     fetchPopularRecipes();
//   }, []);

//   return (
//     <div className="homepage">
//       {/* Hero Section */}
//       <section className="hero">
//         <h1>Welcome to Sous Chef</h1>
//         <p>Your personal cooking companion, here to help with recipes, meal planning, and more!</p>
//         <button className="cta-button">Explore Recipes</button>
//       </section>

//       {/* Features Section */}
//       <section className="features">
//         <h2>Our Features</h2>
//         <div className="feature-cards">
//           <div className="feature-card">
//             <h3>Recipe Search</h3>
//             <p>Discover a world of recipes at your fingertips.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Meal Planner</h3>
//             <p>Plan your meals for the week with ease.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Nutrition Management</h3>
//             <p>Stay on top of your nutritional goals.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Chat Assistant</h3>
//             <p>Get instant cooking advice anytime.</p>
//           </div>
//         </div>
//       </section>

//       {/* Popular Recipes */}
//       <section className="popular-recipes">
//         <h2>Popular Recipes</h2>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           loop={true} // Enable looping
//           autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
//           spaceBetween={20}
//           slidesPerView={3}
//           navigation
//           pagination={{ clickable: true }}
//         >
//           {popularRecipes.map((recipe) => (
//             <SwiperSlide key={recipe.id}>
//               <div className="recipe-card">
//                 <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
//                 <h3>{recipe.name}</h3>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       {/* Cooking Tips */}
//       <section className="cooking-tips">
//         <h2>Cooking Tips & Articles</h2>
//         <div className="tips-cards">
//           <div className="tip-card">
//             <h3>Tip Title</h3>
//             <p>Brief tip description here.</p>
//           </div>
//           {/* Add more tip cards as needed */}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="cta-section">
//         <h2>Ready to start cooking?</h2>
//         <button className="cta-button">Join Sous Chef Today</button>
//       </section>
//     </div>
//   );
// };

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import RecipeReviewCard from '../components/RecipeReviewCard'; // Ensure this path matches your structure
// import './HomePage.css';

// const sampleRecipes = [
//   {
//     id: 1,
//     name: 'Spaghetti Carbonara',
//     description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
//     imageUrl: './src/images/spaghetti.jpg',
//   },
//   {
//     id: 2,
//     name: 'Chicken Parmesan',
//     description: 'Crispy chicken breasts topped with marinara sauce and melted cheese.',
//     imageUrl: './src/images/chicken_parmesan.jpg',
//   },
//   {
//     id: 3,
//     name: 'Beef Tacos',
//     description: 'Soft tacos filled with seasoned beef, fresh salsa, and guacamole.',
//     imageUrl: './src/images/beef_tacos.jpg',
//   },
//   {
//     id: 4,
//     name: 'Vegetable Stir Fry',
//     description: 'A quick and easy stir fry with colorful veggies and savory sauce.',
//     imageUrl: './src/images/vegetable_stir_fry.jpg',
//   },
// ];

// const HomePage = () => {
//   return (
//     <div className="homepage">
//       {/* Hero Section */}
//       <section className="hero">
//         <h1>Welcome to Sous Chef</h1>
//         <p>Your personal cooking companion, here to help with recipes, meal planning, and more!</p>
//         <button className="cta-button">Explore Recipes</button>
//       </section>

//       {/* Popular Recipes Section */}
//       <section className="popular-recipes">
//         <h2>Popular Recipes</h2>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           loop={true} // Enable looping
//           autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
//           spaceBetween={20}
//           slidesPerView={3}
//           navigation
//           pagination={{ clickable: true }}
//         >
//           {sampleRecipes.map((recipe) => (
//             <SwiperSlide key={recipe.id}>
//               <RecipeReviewCard
//                 title={recipe.name}
//                 description={recipe.description}
//                 imageUrl={recipe.imageUrl}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import RecipeReviewCard from '../components/RecipeReviewCard'; // Ensure path is correct
// import './HomePage.css';

// const HomePage = () => {
//   const [popularRecipes, setPopularRecipes] = useState([]);

//   useEffect(() => {
//     const fetchPopularRecipes = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/recipes/popular'); // Replace with your API endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch popular recipes');
//         }
//         const data = await response.json();
//         setPopularRecipes(data); // Update state with fetched recipes
//       } catch (error) {
//         console.error('Error fetching popular recipes:', error);
//       }
//     };

//     fetchPopularRecipes();
//   }, []);

//   return (
//     <div className="homepage">
//       {/* Hero Section */}
//       <section className="hero">
//         <h1>Welcome to Sous Chef</h1>
//         <p>Your personal cooking companion, here to help with recipes, meal planning, and more!</p>
//         <button className="cta-button">Explore Recipes</button>
//       </section>

//       {/* Popular Recipes Section */}
//       <section className="popular-recipes">
//         <h2>Popular Recipes</h2>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           loop={true}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           spaceBetween={20}
//           slidesPerView={3}
//           navigation
//           pagination={{ clickable: true }}
//         >
//           {popularRecipes.map((recipe) => (
//             <SwiperSlide key={recipe._id}>
//               <RecipeReviewCard
//                 title={recipe.name}
//                 description={recipe.description}
//                 imageUrl={recipe.imageUrl}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>
//     </div>
//   );
// };

// export default HomePage;


///////////////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import './HomePage.css';
// import RecipeReviewCard from '../components/RecipeReviewCard'; // Adjust the path if needed
// import { useNavigate, Link } from 'react-router-dom';

// const HomePage = () => {
//   // State to hold popular recipes data fetched from the backend
//   const [popularRecipes, setPopularRecipes] = useState([]);
//   const navigate = useNavigate();

//   // Predefined recipe IDs
//   const recipeIds = [
//     '6730475187e96c51b1e1e3a8',
//     '6730479987e96c51b1e1e3a9',
//     '673047b787e96c51b1e1e3aa',
//     '673047d087e96c51b1e1e3ab',
//     '673047ea87e96c51b1e1e3ac'
//   ];

//   // Fetch popular recipes from the backend using the predefined IDs
//   useEffect(() => {
//     const fetchPopularRecipes = async () => {
//       try {
//         // Fetch all recipes by ID
//         console.log("Hello")
//         const requests = recipeIds.map(id =>
//           fetch(`http://localhost:5001/recipes/${id}`).then(res => res.json())
//         );

//         // Wait for all fetches to complete
//         const data = await Promise.all(requests);
//         setPopularRecipes(data); // Update state with fetched recipes
//       } catch (error) {
//         console.error('Error fetching popular recipes:', error);
//       }
//     };

//     fetchPopularRecipes();
//   }, []);

//   return (
//     <div className="homepage">
//       <section className="hero">
//         <h1>Welcome to Sous Chef</h1>
//         <p>Your personal cooking companion, here to help with recipes, meal planning, and more!</p>
//         <button className="cta-button" onClick={() => window.location.href = '/recipes'}>Explore Recipes</button>
//       </section>

//       {/* Features Section */}
//       {/* <section className="features">
//         <h2 className="h2-heading">Our Features</h2>
//         <div className="feature-cards">
//           <div className="feature-card">
//             <h3>Recipe Search</h3>
//             <p>Discover a world of recipes at your fingertips.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Meal Planner</h3>
//             <p>Plan your meals for the week with ease.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Nutrition Management</h3>
//             <p>Stay on top of your nutritional goals.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Chat Assistant</h3>
//             <p>Get instant cooking advice anytime.</p>
//           </div>
//         </div>
//       </section> */}
//       <section className="features">
//         <h2 className='h2-heading'>Our Features</h2>
//         <div className="feature-cards">
//           <div className="feature-card">
//             <img src="/images/recipe-book.jpg" alt="Recipe Search" className="feature-image" />
//             <h3 className='h3-feature'>Recipe Search</h3>
//             <p>Discover a world of recipes at your fingertips.</p>
//           </div>
//           <div className="feature-card">
//             <img src="/images/meal-plan.jpg" alt="Meal Planner" className="feature-image" />
//             <h3 className='h3-feature'>Meal Planner</h3>
//             <p>Plan your meals for the week with ease.</p>
//           </div>
//           <div className="feature-card">
//             <img src="/images/nutrition.jpg" alt="Nutrition Management" className="feature-image" />
//             <h3 className='h3-feature'>Nutrition Management</h3>
//             <p>Stay on top of your nutritional goals.</p>
//           </div>
//           <div className="feature-card">
//             <img src="/images/cooking-chat.jpg" alt="Chat Assistant" className="feature-image" />
//             <h3 className='h3-feature'>Chat Assistant</h3>
//             <p>Get instant cooking advice anytime.</p>
//           </div>
//         </div>
//       </section>


//       {/* Popular Recipes */}
//       <section className="popular-recipes">
//         <h2 className="h2-heading">Popular Recipes</h2>
//         <Swiper
//           modules={[Navigation, Autoplay]}
//           loop={true} // Enable looping
//           autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
//           spaceBetween={30}
//           slidesPerView={3}
//           navigation
//         >
//           {popularRecipes.map((recipe) => (
//             <SwiperSlide key={recipe._id}>
//               <RecipeReviewCard 
//                 title={recipe.name}
//                 description={recipe.description}
//                 imageUrl= {recipe.imageUrl}
//                 linkTo={`/recipes/${recipe._id}`}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       {/* Cooking Tips */}
//       <section className="cooking-tips">
//         <h2 className="h2-heading">Cooking Tips & Articles</h2>
//         <div className="tips-cards">
//           <div className="tip-card">
//             <h3>Tip Title</h3>
//             <p>Brief tip description here.</p>
//           </div>
//           {/* Add more tip cards as needed */}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="cta-section">
//         <h2>Ready to start cooking?</h2>
//         <button className="cta-button">Join Sous Chef Today</button>
//       </section>
//     </div>
//   );
// };

// export default HomePage;





// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Navigation, Autoplay } from 'swiper/modules';
// import './HomePage.css';
// import RecipeReviewCard from '../components/RecipeReviewCard'; // Adjust the path if needed
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../providers/AuthContextProvider';
// import { addRecipeToFavorites, getUserFavorites } from '../utils/api'; // Import API functions
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import IconButton from '@mui/material/IconButton';

// const HomePage = () => {
//   const { user } = useAuth(); // Get logged-in user info
//   const [popularRecipes, setPopularRecipes] = useState([]);
//   const [favoriteRecipes, setFavoriteRecipes] = useState([]);
//   const navigate = useNavigate();

//   const recipeIds = [
//     '6730475187e96c51b1e1e3a8',
//     '6730479987e96c51b1e1e3a9',
//     '673047b787e96c51b1e1e3aa',
//     '673047d087e96c51b1e1e3ab',
//     '673047ea87e96c51b1e1e3ac'
//   ];

//   // Fetch popular recipes from the backend
//   useEffect(() => {
//     const fetchPopularRecipes = async () => {
//       try {
//         const requests = recipeIds.map(id =>
//           fetch(`http://localhost:5001/recipes/${id}`).then(res => res.json())
//         );

//         const data = await Promise.all(requests);
//         setPopularRecipes(data);
//       } catch (error) {
//         console.error('Error fetching popular recipes:', error);
//       }
//     };

//     fetchPopularRecipes();
//   }, []);

//   // Fetch user's favorite recipes
//   useEffect(() => {
//     if (user) {
//       getUserFavorites()
//         .then((data) => setFavoriteRecipes(data))
//         .catch((err) => console.error("Error fetching favorites:", err));
//     }
//   }, [user]);

//   // Function to add a recipe to favorites
//   const handleAddToFavorites = async (recipeId) => {
//     if (!user) {
//       alert("You must be logged in to add favorites.");
//       return;
//     }

//     try {
//       await addRecipeToFavorites(recipeId);
//       setFavoriteRecipes([...favoriteRecipes, recipeId]); // Update local state
//     } catch (error) {
//       console.error("Error adding to favorites:", error);
//     }
//   };

//   return (
//     <div className="homepage">
//       <section className="hero">
//         <h1>Welcome to Sous Chef</h1>
//         <p>Your personal cooking companion, here to help with recipes, meal planning, and more!</p>
//         <button className="cta-button" onClick={() => navigate('/recipes')}>Explore Recipes</button>
//       </section>

//       <section className="features">
//         <h2 className='h2-heading'>Our Features</h2>
//         <div className="feature-cards">
//           <div className="feature-card">
//             <img src="/images/recipe-book.jpg" alt="Recipe Search" className="feature-image" />
//             <h3 className='h3-feature'>Recipe Search</h3>
//             <p>Discover a world of recipes at your fingertips.</p>
//           </div>
//           <div className="feature-card">
//             <img src="/images/meal-plan.jpg" alt="Meal Planner" className="feature-image" />
//             <h3 className='h3-feature'>Meal Planner</h3>
//             <p>Plan your meals for the week with ease.</p>
//           </div>
//           <div className="feature-card">
//             <img src="/images/nutrition.jpg" alt="Nutrition Management" className="feature-image" />
//             <h3 className='h3-feature'>Nutrition Management</h3>
//             <p>Stay on top of your nutritional goals.</p>
//           </div>
//           <div className="feature-card">
//             <img src="/images/cooking-chat.jpg" alt="Chat Assistant" className="feature-image" />
//             <h3 className='h3-feature'>Chat Assistant</h3>
//             <p>Get instant cooking advice anytime.</p>
//           </div>
//         </div>
//       </section>

//       {/* ✅ Popular Recipes Section with "Add to Favorites" Feature */}
//       <section className="popular-recipes">
//         <h2 className="h2-heading">Popular Recipes</h2>
//         <Swiper
//           modules={[Navigation, Autoplay]}
//           loop={true}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           spaceBetween={30}
//           slidesPerView={3}
//           navigation
//         >
//           {popularRecipes.map((recipe) => (
//             <SwiperSlide key={recipe._id}>
//               <div className="recipe-card">
//                 <RecipeReviewCard 
//                   title={recipe.name}
//                   description={recipe.description}
//                   imageUrl={recipe.imageUrl}
//                   linkTo={`/recipes/${recipe._id}`}
//                 />
//                 {/* ✅ Add to Favorites Button */}
//                 <IconButton
//                   aria-label="add to favorites"
//                   onClick={() => handleAddToFavorites(recipe._id)}
//                   color={favoriteRecipes.some(fav => fav._id === recipe._id) ? "error" : "default"}
//                 >
//                   <FavoriteIcon />
//                 </IconButton>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       {/* Cooking Tips */}
//       <section className="cooking-tips">
//         <h2 className="h2-heading">Cooking Tips & Articles</h2>
//         <div className="tips-cards">
//           <div className="tip-card">
//             <h3>Tip Title</h3>
//             <p>Brief tip description here.</p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="cta-section">
//         <h2>Ready to start cooking?</h2>
//         <button className="cta-button">Join Sous Chef Today</button>
//       </section>
//     </div>
//   );
// };

// export default HomePage;









// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Navigation, Autoplay } from 'swiper/modules';
// import './HomePage.css';
// import RecipeReviewCard from '../components/RecipeReviewCard';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../providers/AuthContextProvider';
// import { addRecipeToFavorites, getUserFavorites } from '../utils/api';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import IconButton from '@mui/material/IconButton';

// const HomePage = () => {
//   const { user } = useAuth();
//   const [popularRecipes, setPopularRecipes] = useState([]);
//   const [favoriteRecipes, setFavoriteRecipes] = useState([]); // ✅ Ensure it's an array
//   const navigate = useNavigate();

//   const recipeIds = [
//     '6730475187e96c51b1e1e3a8',
//     '6730479987e96c51b1e1e3a9',
//     '673047b787e96c51b1e1e3aa',
//     '673047d087e96c51b1e1e3ab',
//     '673047ea87e96c51b1e1e3ac'
//   ];

//   // ✅ Fetch popular recipes
//   useEffect(() => {
//     const fetchPopularRecipes = async () => {
//       try {
//         const requests = recipeIds.map(id =>
//           fetch(`http://localhost:5001/recipes/${id}`).then(res => res.json())
//         );

//         const data = await Promise.all(requests);
//         setPopularRecipes(data);
//       } catch (error) {
//         console.error('Error fetching popular recipes:', error);
//       }
//     };

//     fetchPopularRecipes();
//   }, []);

//   // ✅ Fetch user's favorite recipes
//   useEffect(() => {
//     if (user) {
//       getUserFavorites()
//         .then((data) => {
//           console.log("Favorite recipes fetched:", data);
//           setFavoriteRecipes(Array.isArray(data) ? data : []); // ✅ Ensure it's an array
//         })
//         .catch((err) => {
//           console.error("Error fetching favorites:", err);
//           setFavoriteRecipes([]); // ✅ Set empty array on error
//         });
//     }
//   }, [user]);

//   // ✅ Function to add a recipe to favorites
//   const handleAddToFavorites = async (recipe) => {
//     if (!user) {
//       alert("You must be logged in to add favorites.");
//       return;
//     }

//     try {
//       await addRecipeToFavorites(recipe._id);
//       setFavoriteRecipes([...favoriteRecipes, recipe]); // ✅ Store the full recipe object
//     } catch (error) {
//       console.error("Error adding to favorites:", error);
//     }
//   };

//   return (
//     <div className="homepage">
//       <section className="hero">
//         <h1>Welcome to Sous Chef</h1>
//         <p>Your personal cooking companion, here to help with recipes, meal planning, and more!</p>
//         <button className="cta-button" onClick={() => navigate('/recipes')}>Explore Recipes</button>
//       </section>

//       <section className="features">
//         <h2 className='h2-heading'>Our Features</h2>
//         <div className="feature-cards">
//           <div className="feature-card">
//             <img src="/images/recipe-book.jpg" alt="Recipe Search" className="feature-image" />
//             <h3 className='h3-feature'>Recipe Search</h3>
//             <p>Discover a world of recipes at your fingertips.</p>
//           </div>
//           <div className="feature-card">
//             <img src="/images/meal-plan.jpg" alt="Meal Planner" className="feature-image" />
//             <h3 className='h3-feature'>Meal Planner</h3>
//             <p>Plan your meals for the week with ease.</p>
//           </div>
//           <div className="feature-card">
//             <img src="/images/nutrition.jpg" alt="Nutrition Management" className="feature-image" />
//             <h3 className='h3-feature'>Nutrition Management</h3>
//             <p>Stay on top of your nutritional goals.</p>
//           </div>
//           <div className="feature-card">
//             <img src="/images/cooking-chat.jpg" alt="Chat Assistant" className="feature-image" />
//             <h3 className='h3-feature'>Chat Assistant</h3>
//             <p>Get instant cooking advice anytime.</p>
//           </div>
//         </div>
//       </section>

//       {/* ✅ Popular Recipes Section with "Add to Favorites" Feature */}
//       <section className="popular-recipes">
//         <h2 className="h2-heading">Popular Recipes</h2>
//         <Swiper
//           modules={[Navigation, Autoplay]}
//           loop={true}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           spaceBetween={30}
//           slidesPerView={3}
//           navigation
//         >
//           {popularRecipes.map((recipe) => (
//             <SwiperSlide key={recipe._id}>
//               <div className="recipe-card">
//                 <RecipeReviewCard 
//                   title={recipe.name}
//                   description={recipe.description}
//                   imageUrl={recipe.imageUrl}
//                   linkTo={`/recipes/${recipe._id}`}
//                 />
//                 {/* ✅ Add to Favorites Button */}
//                 <IconButton
//                   aria-label="add to favorites"
//                   onClick={() => handleAddToFavorites(recipe)}
//                   color={Array.isArray(favoriteRecipes) && favoriteRecipes.some(fav => fav._id === recipe._id) ? "error" : "default"} 
//                 >
//                   <FavoriteIcon />
//                 </IconButton>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       {/* Cooking Tips */}
//       <section className="cooking-tips">
//         <h2 className="h2-heading">Cooking Tips & Articles</h2>
//         <div className="tips-cards">
//           <div className="tip-card">
//             <h3>Tip Title</h3>
//             <p>Brief tip description here.</p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="cta-section">
//         <h2>Ready to start cooking?</h2>
//         <button className="cta-button">Join Sous Chef Today</button>
//       </section>
//     </div>
//   );
// };

// export default HomePage;




import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import './HomePage.css';
import RecipeReviewCard from '../components/RecipeReviewCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContextProvider';
import { addRecipeToFavorites, removeRecipeFromFavorites, getUserFavorites } from '../utils/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Typography, Box, Card, CardContent } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

const HomePage = () => {
  const { user } = useAuth();
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const navigate = useNavigate();

  const recipeIds = [
    '6730475187e96c51b1e1e3a8',
    '6730479987e96c51b1e1e3a9',
    '673047b787e96c51b1e1e3aa',
    '673047d087e96c51b1e1e3ab',
    '673047ea87e96c51b1e1e3ac'
  ];

  // ✅ Fetch popular recipes
  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const requests = recipeIds.map(id =>
          fetch(`http://localhost:5001/recipes/${id}`).then(res => res.json())
        );

        const data = await Promise.all(requests);
        setPopularRecipes(data);
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
      }
    };

    fetchPopularRecipes();
  }, []);

  // ✅ Fetch user's favorite recipes
  useEffect(() => {
    if (user) {
      getUserFavorites()
        .then((data) => {
          console.log("Favorite recipes fetched:", data);
          setFavoriteRecipes(Array.isArray(data) ? data.map(fav => fav._id) : []);
        })
        .catch((err) => {
          console.error("Error fetching favorites:", err);
          setFavoriteRecipes([]);
        });
    }
  }, [user]);

  // ✅ Toggle Favorite Function
  const handleToggleFavorite = async (recipeId) => {
    if (!user) {
      alert("You must be logged in to manage favorites.");
      return;
    }

    try {
      if (favoriteRecipes.includes(recipeId)) {
        await removeRecipeFromFavorites(recipeId);
        setFavoriteRecipes(favoriteRecipes.filter(id => id !== recipeId)); // ✅ Remove from UI
      } else {
        await addRecipeToFavorites(recipeId);
        setFavoriteRecipes([...favoriteRecipes, recipeId]); // ✅ Add to UI
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const cookingTips = [
    {
      id: 1,
      icon: <KitchenIcon color="primary" />,
      title: 'Salt Your Pasta Water',
      description: 'Always add salt once the water is boiling. It enhances the flavor of the pasta itself.',
    },
    {
      id: 2,
      icon: <WhatshotIcon color="error" />,
      title: 'Preheat Your Pan',
      description: 'Starting with a hot pan helps prevent sticking and ensures a perfect sear on proteins.',
    },
    {
      id: 3,
      icon: <TipsAndUpdatesIcon color="warning" />,
      title: 'Use Sharp Knives',
      description: 'Dull knives are more dangerous and less efficient. Keep them sharp for safety and ease.',
    },
    {
      id: 4,
      icon: <LocalDiningIcon color="success" />,
      title: 'Let Meat Rest',
      description: 'Resting meat after cooking locks in the juices and keeps it tender and flavorful.',
    },
    {
      id: 5,
      icon: <RestaurantIcon color="secondary" />,
      title: 'Finish with Acid',
      description: 'A splash of lemon juice or vinegar at the end brightens the dish and enhances flavor.',
    },
  ];

  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to Sous Chef</h1>
        <p>Your personal cooking companion, here to help with recipes, meal planning, and more!</p>
        <button className="cta-button" onClick={() => navigate('/recipes')}>Explore Recipes</button>
      </section>

      <section className="features">
        <h2 className='h2-heading'>Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img src="/images/recipe-book.jpg" alt="Recipe Search" className="feature-image" />
            <h3 className='h3-feature'>Recipe Search</h3>
            <p>Discover a world of recipes at your fingertips.</p>
          </div>
          <div className="feature-card">
            <img src="/images/meal-plan.jpg" alt="Meal Planner" className="feature-image" />
            <h3 className='h3-feature'>Meal Planner</h3>
            <p>Plan your meals for the week with ease.</p>
          </div>
          <div className="feature-card">
            <img src="/images/nutrition.jpg" alt="Nutrition Management" className="feature-image" />
            <h3 className='h3-feature'>Nutrition Management</h3>
            <p>Stay on top of your nutritional goals.</p>
          </div>
          <div className="feature-card">
            <img src="/images/cooking-chat.jpg" alt="Chat Assistant" className="feature-image" />
            <h3 className='h3-feature'>Chat Assistant</h3>
            <p>Get instant cooking advice anytime.</p>
          </div>
        </div>
      </section>

      {/* ✅ Popular Recipes Section with a Single Favorite Button */}
      <section className="popular-recipes">
        <h2 className="h2-heading">Popular Recipes</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={3}
          navigation
        >
          {popularRecipes.map((recipe) => (
            <SwiperSlide key={recipe._id}>
              <div className="recipe-card">
              <RecipeReviewCard 
                title={recipe.name}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
                linkTo={`/recipes/${recipe._id}`}
                recipeId={recipe._id}  // ✅ Pass recipe ID properly
              />
                {/* ✅ Ensure only one Favorite Button */}
                {/* <div className="favorite-button-container"> 
                  <IconButton
                    aria-label="toggle favorite"
                    onClick={() => handleToggleFavorite(recipe._id)}
                    color={favoriteRecipes.includes(recipe._id) ? "error" : "default"} 
                  >
                    <FavoriteIcon />
                  </IconButton>
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Cooking Tips */}
      <Box sx={{ mt: 6, mb: 0, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 0 }}>
          Quick Cooking Tips
        </Typography>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            600: { slidesPerView: 2 },
            960: { slidesPerView: 3 },
          }}
        >
          {cookingTips.map((tip) => (
            <SwiperSlide key={tip.id}>
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 350,
                  minHeight: 180,
                  mx: 'auto',
                  p: 2,
                  textAlign: 'left',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    {tip.icon}
                    <Typography fontWeight="bold" variant="subtitle1">
                      {tip.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {tip.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to start cooking?</h2>
        <button className="cta-button" onClick={() => navigate('/register')}>Join Sous Chef Today</button>
      </section>
    </div>
  );
};

export default HomePage;
