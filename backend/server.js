const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5001;
const mongoose = require('mongoose');
const Recipe = require('./models/Recipes');
const recipeRoutes = require('./routes/recipe');
const User = require('./models/User')
const dotenv = require('doten
const userRoutes = require("./routes/user");
const router = express.Router();

dotenv.config({ path: "./.env" });

app.use(cors());
app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use("/api/users", userRoutes); 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.post('/add-recipe', async (req, res) => {
  try {
    const recipeData = req.body;
    const recipe = new Recipe(recipeData);
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send({ error: 'Error adding recipe' });
  }
});


app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
});

app.get('/recipes/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const recipe = await Recipe.findById(req.params.id);
    console.log(recipe)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

let lastRequestedRecipe = null; 

const sessionChats = {}; 

app.post('/api/chat', async (req, res) => {
  const { userId, message } = req.body;
  let userMessage = message.toLowerCase().trim();

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID. Please log in." });
  }
  console.log(`Searching database for recipe: "${userMessage}"`);
  try {
      let recipeData = null;


      let systemPrompt = `You are the Sous Chef Chatbot, an interactive cooking assistant.
      You provide recipe support, answer culinary questions, suggest meal-planning ideas, and offer practical cooking tips.
      Avoid technical jargon, emphasize clarity, and prefer actionable advice.
      
      When asked about a recipe, return BOTH the ingredient list and the cooking instructions in a well-structured format.
      
      Example format:
      
      **Ingredients:**
      - 200g Spaghetti
      - 100g Pancetta
      - 2 large eggs
      - 50g Parmesan cheese
      
      **Instructions:**
      1. Boil the spaghetti in salted water.
      2. Fry the pancetta until crispy.
      3. Beat the eggs and mix with Parmesan cheese.
      4. Toss the pasta with the egg mixture and pancetta.
      5. Serve with extra cheese and black pepper.`;

      const recipeNameMatch = userMessage.match(/(?:recipe for|how to make|how to cook|how do i cook)\s+(.+)/i);

      let recipeName = recipeNameMatch ? recipeNameMatch[1].trim() : null;

      if (recipeName) {
          recipeName = recipeName.replace(/[\.\?\!\,]$/, "").trim();
      }
      console.log(`Searching database for recipe: "${recipeName}"`);

      if (recipeName) {
        console.log(`🔍 Searching for recipe: ${recipeName}`);

        recipeData = await Recipe.findOne({ name: new RegExp(`^${recipeName}$`, "i") });

        if (recipeData) {
            console.log(`Recipe found in database: ${recipeData.name}`);
            userMessage = `Give me the full recipe (ingredients and instructions) for ${recipeName}.`;
        } else {
            console.log(`⚠️ Recipe not found: ${recipeName}`);
        }
      }
      if (!sessionChats[userId]) {
          sessionChats[userId] = [];
      }

      sessionChats[userId].push({ role: 'user', content: userMessage });

      const formattedMessages = [
          { role: "system", content: systemPrompt },
          ...sessionChats[userId]
      ];

      const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
              model: 'gpt-3.5-turbo',
              messages: formattedMessages,
              max_tokens: 500,
          },
          {
              headers: { 'Authorization': `Bearer` }
          }
      );

      const assistantReply = response.data.choices[0].message.content.trim();
      sessionChats[userId].push({ role: 'assistant', content: assistantReply });

      res.json({
          reply: assistantReply,
          recipeId: recipeData ? recipeData._id : null,
          recipeName: recipeData ? recipeData.name : null,
          imageUrl: recipeData ? recipeData.imageUrl : null
      });

  } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Error connecting to ChatGPT' });
  }
});



















router.get("/recipes/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    console.log(`🔍 Searching recipes by name: ${query}`);

    // ✅ FIX: Search by name only (case-insensitive)
    const recipes = await Recipe.find({
      name: { $regex: query, $options: "i" } // Match recipe name only
    });

    if (recipes.length === 0) {
      console.log("⚠️ No recipes found for query:", query);
      return res.status(404).json({ message: "No recipes found" });
    }

    console.log(`✅ Found ${recipes.length} recipes`);
    res.json(recipes);
  } catch (error) {
    console.error("❌ Error fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    console.log(process.env.JWT_SECRET)
    const user = await User.create(userData);
    const token = user.getSignedJwtToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: 'Error register' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide an username and password" });
    }
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Invalid credentials",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
      });
    }
    const token = user.getSignedJwtToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      _id: user._id,
      username: user.username,
      token,
    });
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      msg: "Cannot convert username or password to string",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/recipes/search', async (req, res) => {
  const query = req.query.query;
  const recipes = await Recipe.find({ name: new RegExp(query, 'i') }); // Case-insensitive search by recipe name
  res.json(recipes);
});



/////////////////////////////////////////


// const userRoutes = require("./routes/user");
// app.use("/api/users", userRoutes);


// const { protect } = require("./middleware/auth"); // ✅ Load only protect function
// app.use("/api/users", userRoutes); // ✅ Already handles profile in userRoutes



// app.post('/api/chat', async (req, res) => {
//   const userMessage = req.body.message;

//   try {
//     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//       model: 'gpt-4',
//       messages: [
//         {
//           role: "system",
//           content: `You are the Sous Chef Chatbot, an interactive cooking assistant here to guide users through various cooking tasks. You provide recipe support, answer culinary questions, suggest meal-planning ideas, and offer practical cooking tips. You tailor responses for users of all skill levels, from beginners to seasoned chefs, and keep interactions engaging, supportive, and approachable. Avoid technical jargon, emphasize clarity, and prefer actionable advice. Prompt the user gently if more details are needed.`,
//         },
//         { role: 'user', content: userMessage }
//       ],
//       max_tokens: 400,
//     }, {
//       headers: {
//         'Authorization': `Bearer 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`
//       }
//     });

//     const reply = response.data.choices[0].message.content.trim();
//     res.json({ reply });
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: 'Error connecting to ChatGPT' });
//   }
// });

// app.post('/api/chat', async (req, res) => {
//   const userMessage = req.body.message;

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-4',
//         messages: [
//           {
//             role: "system",
//             content: `You are the Sous Chef Chatbot, a structured and helpful cooking assistant.
            
//             - If the user asks for a recipe, only provide the **Ingredients** section first.
//             - After listing the ingredients, ask: "Would you like the step-by-step cooking instructions?"
//             - If the user confirms, then provide the full instructions.
//             - Always keep responses short, clear, and easy to read.`,
//           },
//           { role: 'user', content: userMessage },
//         ],
//         max_tokens: 500, // Adjusted to allow for more detailed responses
//         temperature: 0.7, // Allows for creative but relevant responses
//       },
//       {
//         headers: {
//           Authorization: `Bearer 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`, // Ensure to replace with your actual API key
//         },
//       }
//     );

//     const reply = response.data.choices[0].message.content.trim();
//     res.json({ reply });
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: 'Error connecting to ChatGPT' });
//   }
// });















// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser"); // ✅ Added for handling cookies
// const recipeRoutes = require("./routes/recipe");
// const userRoutes = require("./routes/user");
// const Recipe = require("./models/Recipes");
// const User = require("./models/User");

// dotenv.config({ path: "./.env" });

// const app = express();
// const PORT = process.env.PORT || 5001;
// const mongoURI = process.env.MONGO_URI || 'mongodb+srv://user1:password_1234@sous-chef.zx7v4.mongodb.net/?retryWrites=true&w=majority&appName=sous-chef';

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(express.json());
// app.use(cookieParser()); // ✅ Ensures cookies can be read
// app.use("/api/recipes", recipeRoutes);
// app.use("/api/users", userRoutes);

// // ✅ Connect to MongoDB
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // ✅ Fetch all recipes
// app.get("/recipes", async (req, res) => {
//   try {
//     const recipes = await Recipe.find();
//     res.status(200).json(recipes);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching recipes" });
//   }
// });

// // ✅ Fetch single recipe by ID
// app.get("/recipes/:id", async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const recipe = await Recipe.findById(req.params.id);
//     console.log(recipe);
//     if (!recipe) {
//       return res.status(404).json({ message: "Recipe not found" });
//     }
//     res.json(recipe);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Search for recipes
// app.get("/recipes/search", async (req, res) => {
//   try {
//     const query = req.query.query;
//     const recipes = await Recipe.find({ name: new RegExp(query, "i") }); // Case-insensitive search
//     res.json(recipes);
//   } catch (error) {
//     res.status(500).json({ error: "Error searching for recipes" });
//   }
// });

// // ✅ Register a new user
// app.post("/api/users/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     console.log(process.env.JWT_SECRET);
    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ error: "Email already in use" });

//     const user = await User.create({ username, email, password });
//     const token = user.getSignedJwtToken();

//     res.status(201).json({
//       success: true,
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({ error: "Error registering user" });
//   }
// });

// // ✅ Login user
// app.post("/api/users/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ success: false, msg: "Please provide a username and password" });
//     }
//     const user = await User.findOne({ username }).select("+password");
//     if (!user) {
//       return res.status(400).json({ success: false, msg: "Invalid credentials" });
//     }
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, msg: "Invalid credentials" });
//     }
//     const token = user.getSignedJwtToken();
    
//     res.status(200).json({
//       success: true,
//       _id: user._id,
//       username: user.username,
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ success: false, msg: "Login failed" });
//   }
// });

// // ✅ Chatbot integration
// app.post("/api/chat", async (req, res) => {
//   let userMessage = req.body.message.toLowerCase().trim();

//   try {
//     let systemPrompt = `You are the Sous Chef Chatbot, an interactive cooking assistant.
//     You provide recipe support, answer culinary questions, suggest meal-planning ideas, and offer practical cooking tips.
//     Avoid technical jargon, emphasize clarity, and prefer actionable advice.

//     When asked about a recipe, return BOTH the ingredient list and the cooking instructions in a well-structured format.

//     Example format:
//     **Ingredients:**
//     - 200g Spaghetti
//     - 100g Pancetta
//     - 2 large eggs
//     - 50g Parmesan cheese

//     **Instructions:**
//     1. Boil the spaghetti in salted water.
//     2. Fry the pancetta until crispy.
//     3. Beat the eggs and mix with Parmesan cheese.
//     4. Toss the pasta with the egg mixture and pancetta.
//     5. Serve with extra cheese and black pepper.`;

//     // ✅ Modify user message for recipe requests
//     if (userMessage.includes("recipe") || userMessage.includes("how to make")) {
//       systemPrompt += ` Make sure the response is structured with ingredients first, followed by instructions.`;
//       userMessage = `Give me the full recipe (ingredients and instructions) for ${userMessage.replace(/recipe|how to make/gi, "").trim()}.`;
//     }

//     const response = await axios.post("https://api.openai.com/v1/chat/completions", {
//       model: "gpt-4o",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: userMessage },
//       ],
//       max_tokens: 500,
//     }, {
//       headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
//     });

//     const reply = response.data.choices[0].message.content.trim();
//     res.json({ reply });
//   } catch (error) {
//     console.error("Error:", error.response ? error.response.data : error.message);
//     res.status(500).json({ error: "Error connecting to ChatGPT" });
//   }
// });

// // ✅ Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
