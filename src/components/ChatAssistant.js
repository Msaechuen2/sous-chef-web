// import React, { useState } from 'react';
// import axios from 'axios';

// const ChatAssistant = () => {
//   const [userInput, setUserInput] = useState('');
//   const [messages, setMessages] = useState([]);

//   const handleInputChange = (e) => setUserInput(e.target.value);

//   const handleSendMessage = async () => {
//     const userMessage = { role: 'user', content: userInput };
//     setMessages([...messages, userMessage]);

//     try {
//       const response = await axios.post('/api/chat', { message: userInput });
//       const assistantMessage = { role: 'assistant', content: response.data.reply };
//       setMessages([...messages, userMessage, assistantMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }

//     setUserInput('');
//   };

//   return (
//     <div>
//       <div className="chat-window">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.role}`}>
//             {msg.content}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={userInput}
//         onChange={handleInputChange}
//         placeholder="Ask me anything..."
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatAssistant;









// import React, { useState } from 'react';
// import axios from 'axios';
// import './ChatAssistant.css'; // Ensure the CSS file is imported for styling

// const ChatAssistant = () => {
//   const [userInput, setUserInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => setUserInput(e.target.value);

//   const handleSendMessage = async () => {
//     if (!userInput.trim()) return;

//     const userMessage = { role: 'user', content: userInput };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:5001/api/chat', { message: userInput });
//       const assistantMessage = { role: 'assistant', content: response.data.reply };
//       setMessages((prevMessages) => [...prevMessages, assistantMessage]);
//     } catch (err) {
//       setError('Error connecting to the chat server. Please try again.');
//       console.error('Error:', err);
//     }

//     setUserInput('');
//   };

//   return (
//     <div className="chat-assistant">
//       <div className="chat-window">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.role}`}>
//             <div className="message-content">{msg.content}</div>
//           </div>
//         ))}
//       </div>
//       {error && <p className="error-message">{error}</p>}
//       <div className="input-area">
//         <input
//           type="text"
//           value={userInput}
//           onChange={handleInputChange}
//           placeholder="Ask me anything..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatAssistant;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatAssistant.css';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop'; // ✅ Import stop icon
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from "../providers/AuthContextProvider";
import { addRecipeToFavorites, getUserFavorites, removeRecipeFromFavorites } from "../utils/api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { saveMealPlan, getMealPlanByDate } from "../utils/api";

const ChatAssistant = () => {
  const { user } = useAuth();
  const [userInput, setUserInput] = useState('');
  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState(
    JSON.parse(sessionStorage.getItem('chatHistory')) || [] // ✅ Load chat history from session storage
  );
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // ✅ Track if speech is active
  const recognitionRef = useRef(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isAddingToMealPlan, setIsAddingToMealPlan] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  
  const handleToggleFavorite = async (recipeId) => {
    if (!user) {
        alert("You must be logged in to manage favorites.");
        return;
    }

    try {
        if (favoriteRecipes.includes(recipeId)) {
            await removeRecipeFromFavorites(recipeId); // ✅ Remove from favorites
            setFavoriteRecipes((prev) => prev.filter((id) => id !== recipeId));
            console.log(`❌ Removed recipe ${recipeId} from favorites`);
        } else {
            await addRecipeToFavorites(recipeId); // ✅ Add to favorites
            setFavoriteRecipes((prev) => [...prev, recipeId]);
            console.log(`✅ Added recipe ${recipeId} to favorites`);
        }
    } catch (error) {
        console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
        if (!user) return;
        try {
            const favorites = await getUserFavorites();
            setFavoriteRecipes(favorites.map((fav) => fav._id)); // ✅ Store favorite recipe IDs
        } catch (error) {
            console.error("Error fetching favorite recipes:", error);
        }
    };

    fetchFavorites();
  }, [user]);



  useEffect(() => {
    setMessages([]); // ✅ Clears messages on component mount
    sessionStorage.removeItem("chatHistory"); // ✅ Ensure session storage is cleared
  }, []);




  useEffect(() => {
    sessionStorage.setItem('chatHistory', JSON.stringify(messages)); // ✅ Save chat history to session storage
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  // ✅ Toggle Listening Function
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.abort();
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // ✅ Send message function
  // const sendMessage = async (message) => {
  //   if (!message.trim()) return;

  //   const userMessage = { role: 'user', content: message };
  //   setMessages((prevMessages) => [...prevMessages, userMessage]);
  //   setError(null);

  //   try {
  //     const response = await axios.post('http://localhost:5001/api/chat', { message });
  //     const assistantMessage = { role: 'assistant', content: response.data.reply };

  //     setMessages((prevMessages) => [...prevMessages, assistantMessage]);
  //   } catch (err) {
  //     setError('Error connecting to the chat server. Please try again.');
  //     console.error('Error:', err);
  //   }

  //   setUserInput('');
  // };


  
  // const sendMessage = async (message) => {
  //   if (!message.trim()) return;
  
  //   const userId = localStorage.getItem("userId") || "guest"; // Fetch user ID or use a default session ID
  
  //   const userMessage = { role: 'user', content: message };
  //   const updatedMessages = [...messages, userMessage];
  //   setMessages(updatedMessages);
  //   setError(null);
  
  //   try {
  //     const response = await axios.post('http://localhost:5001/api/chat', {
  //       userId, // Send user ID (or session ID)
  //       message
  //     });
  
  //     const assistantMessage = { role: 'assistant', content: response.data.reply };
  //     setMessages([...updatedMessages, assistantMessage]);
  //   } catch (err) {
  //     setError('Error connecting to the chat server. Please try again.');
  //     console.error('Error:', err);
  //   }
  
  //   setUserInput('');
  // };

  //////////////////////////latest
  // const sendMessage = async (message) => {
  //   if (!message.trim()) return;

  //   const userId = "session-user"; // Temporary session ID
  //   const userMessage = { role: 'user', content: message };
  //   const updatedMessages = [...messages, userMessage];

  //   setMessages(updatedMessages); 
  //   setError(null);

  //   try {
  //     const response = await axios.post('http://localhost:5001/api/chat', {
  //       userId, 
  //       message
  //     });

  //     const assistantMessage = { role: 'assistant', content: response.data.reply };
  //     setMessages([...updatedMessages, assistantMessage]);

  //     sessionStorage.setItem('chatHistory', JSON.stringify([...updatedMessages, assistantMessage])); // ✅ Update session storage

  //   } catch (err) {
  //     setError('Error connecting to the chat server. Please try again.');
  //     console.error('Error:', err);
  //   }

  //   setUserInput('');
  // };
  








  // const sendMessage = async (message) => {
  //   if (!message.trim()) return;

  //   // ✅ Retrieve user data from localStorage
  //   const siteUser = JSON.parse(localStorage.getItem("siteUser")); // Parse stored user data
  //   const userId = siteUser?._id; // Extract _id

  //   if (!userId) {
  //       console.error("❌ User is not logged in. Favorites cannot be saved.");
  //       setError("You must be logged in to save favorites.");
  //       return;
  //   }

  //   const userMessage = { role: 'user', content: message };
  //   const updatedMessages = [...messages, userMessage];

  //   setMessages(updatedMessages);
  //   setError(null);

  //   try {
  //       let response;
  //       let assistantMessage;

  //       // ✅ Handle "save favorite" command
  //       if (message.toLowerCase().startsWith("save favorite")) {
  //           const recipeName = message.replace("save favorite", "").trim(); // Extract recipe name

  //           response = await axios.post('http://localhost:5001/api/chat', {
  //               userId,
  //               message: `save favorite ${recipeName}` // Send request to backend
  //           });

  //           assistantMessage = { role: 'assistant', content: response.data.reply };
  //       } else {
  //           // ✅ Normal chatbot request
  //           response = await axios.post('http://localhost:5001/api/chat', { userId, message });
  //           assistantMessage = { role: 'assistant', content: response.data.reply };
  //       }

  //       setMessages([...updatedMessages, assistantMessage]);
  //       sessionStorage.setItem('chatHistory', JSON.stringify([...updatedMessages, assistantMessage])); // ✅ Update session storage

  //   } catch (err) {
  //       setError('Error connecting to the chat server. Please try again.');
  //       console.error('Error:', err);
  //   }

  //   setUserInput('');
  // };




  // ✅ Speak last message function with cancel
  const toggleSpeech = () => {
    if (isSpeaking) {
      speechSynthesis.cancel(); // ✅ Cancel current speech
      setIsSpeaking(false);
    } else {
      if (messages.length === 0) return;

      const lastMessage = messages[messages.length - 1].content;
      const utterance = new SpeechSynthesisUtterance(lastMessage);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;

      utterance.onend = () => setIsSpeaking(false); // ✅ Reset when done speaking

      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };









  // const sendMessage = async (message) => {
  //   if (!message.trim()) return;

  //   const siteUser = JSON.parse(localStorage.getItem("siteUser"));
  //   const userId = siteUser?._id;

  //   const userMessage = { role: 'user', content: message };
  //   const updatedMessages = [...messages, userMessage];

  //   setMessages(updatedMessages);
  //   setError(null);

  //   // ✅ Check if the last message was asking to save a recipe
  //   const lastMessage = messages[messages.length - 1];
  //   if (lastMessage && lastMessage.content.includes("Would you like to add")) {
  //       if (message.toLowerCase() === "yes" || message.toLowerCase() === "add") {
  //           // ✅ Extract the recipe name from the last message
  //           const recipeNameMatch = lastMessage.content.match(/add "(.+?)"/);
  //           if (recipeNameMatch) {
  //               const recipeName = recipeNameMatch[1];
  //               saveToFavorites(recipeName);
  //               setMessages([...updatedMessages, { role: 'assistant', content: `"${recipeName}" has been added to your favorites!` }]);
  //               return;
  //           }
  //       } else {
  //           // ✅ User said no, don't save the recipe
  //           setMessages([...updatedMessages, { role: 'assistant', content: "Okay, not saving this recipe." }]);
  //           return;
  //       }
  //   }

  //   // ✅ Normal chatbot request if not responding to save prompt
  //   try {
  //       const response = await axios.post('http://localhost:5001/api/chat', { userId, message });
  //       const reply = response.data.reply;

  //       if (reply.toLowerCase().includes("ingredients") && reply.toLowerCase().includes("instructions")) {
  //           const recipeNameMatch = message.match(/how to cook (.+)/i);
  //           const recipeName = recipeNameMatch ? recipeNameMatch[1] : "Unknown Recipe";

  //           const assistantMessage = { role: 'assistant', content: reply, recipeName };
  //           setMessages([...updatedMessages, assistantMessage]);

  //           setTimeout(() => {
  //               const savePrompt = {
  //                   role: 'assistant',
  //                   content: `Would you like to add "${recipeName}" to your favorite recipes? (Yes/No)`
  //               };
  //               setMessages(prevMessages => [...prevMessages, savePrompt]);
  //           }, 1000);
  //       } else {
  //           setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
  //       }

  //       sessionStorage.setItem('chatHistory', JSON.stringify([...updatedMessages, { role: 'assistant', content: reply }]));

  //   } catch (err) {
  //       setError('Error connecting to the chat server. Please try again.');
  //       console.error('Error:', err);
  //   }

  //   setUserInput('');
  // };





  // const saveToFavorites = async (recipeName) => {
  //   const siteUser = JSON.parse(localStorage.getItem("siteUser"));
  //   const userId = siteUser?._id;

  //   if (!userId) {
  //       setError("You must be logged in to save favorites.");
  //       return;
  //   }

  //   try {
  //       // ✅ Step 1: Check if the recipe exists in the database
  //       const recipeResponse = await axios.get(`http://localhost:5001/api/recipes?name=${encodeURIComponent(recipeName)}`);

  //       if (recipeResponse.data.length === 0) {
  //           alert(`"${recipeName}" is not in our database. Please try a different recipe.`);
  //           return;
  //       }

  //       const recipe = recipeResponse.data[0]; // ✅ Use the first match

  //       // ✅ Step 2: Save the recipe to favorites
  //       const favoriteResponse = await axios.post('http://localhost:5001/api/users/favorites', {
  //           recipeId: recipe._id
  //       }, {
  //           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  //       });

  //       alert(favoriteResponse.data.success ? `"${recipe.name}" has been added to your favorites!` : "Failed to add favorite.");

  //   } catch (err) {
  //       console.error("Error saving favorite:", err);
  //       setError("Failed to save favorite. Please try again.");
  //   }
  // };











  // const sendMessage = async (message) => {
  //   if (!message.trim()) return;

  //   const siteUser = JSON.parse(localStorage.getItem("siteUser"));
  //   const userId = siteUser?._id;

  //   const userMessage = { role: 'user', content: message };
  //   const updatedMessages = [...messages, userMessage];

  //   setMessages(updatedMessages);
  //   setError(null);

  //   try {
  //       const response = await axios.post("http://localhost:5001/api/chat", { userId, message });
  //       const reply = response.data.reply;

  //       let assistantMessage = { role: "assistant", content: reply };

  //       // ✅ Detect if the chatbot response contains a recipe
  //       if (reply.toLowerCase().includes("ingredients") && reply.toLowerCase().includes("instructions")) {
  //           const recipeNameMatch = message.match(/how to cook (.+)/i);
  //           const recipeName = recipeNameMatch ? recipeNameMatch[1].trim() : "Unknown Recipe";

  //           // ✅ Check if the recipe exists in the database
  //           const recipeResponse = await axios.get(`http://localhost:5001/api/recipes?name=${encodeURIComponent(recipeName)}`);

  //           if (recipeResponse.data.length > 0) {
  //               const recipe = recipeResponse.data[0]; // ✅ Use the first matching recipe

  //               assistantMessage = {
  //                   role: "assistant",
  //                   content: reply,
  //                   recipeName,
  //                   imageUrl: recipe.imageUrl, // ✅ Include image URL from database
  //                   recipeId: recipe._id, // ✅ Store recipe ID for adding to favorites
  //               };
  //           } else {
  //               // ✅ If the recipe does not exist, show only the text response
  //               assistantMessage = { role: "assistant", content: reply, recipeName };
  //           }

  //           setMessages([...updatedMessages, assistantMessage]);
  //       } else {
  //           setMessages([...updatedMessages, assistantMessage]);
  //       }

  //       sessionStorage.setItem("chatHistory", JSON.stringify([...updatedMessages, assistantMessage]));

  //   } catch (err) {
  //       setError("Error connecting to the chat server. Please try again.");
  //       console.error("Error:", err);
  //   }

  //   setUserInput("");
  // };


  // const sendMessage = async () => {
  //   if (!userInput.trim()) return;

  //   const userMessage = { role: "user", content: userInput };
  //   setMessages((prevMessages) => [...prevMessages, userMessage]); // ✅ Add user message to chat

  //   try {
  //       const response = await axios.post('http://localhost:5001/api/chat', {
  //           userId: user ? user._id : "guest",
  //           message: userInput
  //       });

  //       console.log("🔹 Chatbot Response:", response.data); // ✅ Log full response

  //       const assistantMessage = {
  //           role: "assistant",
  //           content: response.data.reply,
  //           recipeId: response.data.recipeId,
  //           recipeName: response.data.recipeName,
  //           imageUrl: response.data.imageUrl
  //       };

  //       console.log(`🖼️ Debug: Recipe Image URL received -> ${assistantMessage.imageUrl}`);

  //       setMessages((prevMessages) => [...prevMessages, assistantMessage]); // ✅ Add assistant's reply

  //   } catch (err) {
  //       console.error('❌ Error:', err);
  //   }

  //   setUserInput(""); // ✅ Clear input field after sending
  // };



  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // ✅ Detect if user wants to add to meal plan
    if (message.toLowerCase().includes("meal plan")) {
        if (!selectedRecipe) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "assistant", content: "⚠️ No recipe selected. Please specify a recipe first." }
            ]);
            return;
        }

        setIsAddingToMealPlan(true); // ✅ Open date picker
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: "📅 Select a date for your meal", isDatePicker: true }
        ]);
        return;
    }

    // ✅ Send normal message if not adding to meal plan
    setMessages((prevMessages) => [...prevMessages, { role: "user", content: message }]);

    try {
        const response = await axios.post("http://localhost:5001/api/chat", {
            userId: user ? user._id : "guest",
            message
        });

        console.log("🔹 Chatbot Response:", response.data);

        const assistantMessage = {
            role: "assistant",
            content: response.data.reply,
            recipeId: response.data.recipeId,
            recipeName: response.data.recipeName,
            imageUrl: response.data.imageUrl
        };

        console.log(`🖼️ Debug: Recipe Image URL received -> ${assistantMessage.imageUrl}`);

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);

        // ✅ Store selected recipe if it’s a recipe response
        if (response.data.recipeId) {
            setSelectedRecipe(response.data);
        }

    } catch (err) {
        console.error("❌ Error:", err);
    }

    setUserInput(""); // ✅ Clear input field
  };


  const handleSaveMealPlan = async (date) => {
    if (!selectedRecipe) {
        alert("⚠️ No recipe selected. Please ask for a recipe first.");
        return;
    }

    const formattedMealPlan = {
        date: date, // ✅ Use selected date
        meals: [
            {
                title: selectedRecipe.recipeName,
                recipeId: selectedRecipe.recipeId,
                recipeName: selectedRecipe.recipeName,
                imageUrl: selectedRecipe.imageUrl || "", // ✅ Ensure image URL is included
            },
        ],
    };

    console.log("📤 Sending Meal Plan:", formattedMealPlan); // ✅ Debugging log

    try {
        const response = await saveMealPlan(formattedMealPlan); // ✅ Use `saveMealPlan` from API utils
        console.log("✅ Meal Plan Response:", response);

        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: `✅ "${selectedRecipe.recipeName}" added to your meal plan for ${formattedMealPlan.date}.` }
        ]);
    } catch (error) {
        console.error("❌ Error saving meal plan:", error);
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: "❌ Failed to save meal plan. Please try again." }
        ]);
    }
  };




  const handleDateSelect = (newDate) => {
    if (!newDate) {
        console.error("❌ Invalid date selected");
        return;
    }

    const formattedDate = dayjs(newDate); // ✅ Convert to dayjs object before setting state
    setSelectedDate(formattedDate);
    setIsAddingToMealPlan(false); // ✅ Hide date picker after selection

    console.log("📅 Selected Date:", formattedDate.format("YYYY-MM-DD"));

    handleSaveMealPlan(formattedDate.format("YYYY-MM-DD")); // ✅ Pass formatted string for saving
  };













  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="chat-assistant">
        {/* <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
        </div> */}


        <div className="chat-window">
              {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.role}`} 
                      style={{ 
                          position: "relative", 
                          padding: "12px",
                          borderRadius: "10px",
                          backgroundColor: msg.role === "assistant" ? "#f1f1f1" : "#dcf8c6",
                          marginBottom: "8px",
                          wordBreak: "break-word"
                      }}>
                      
                      {/* ✅ Show Correct Recipe Image */}
                      {msg.imageUrl && msg.recipeName && (
                          <div style={{ position: "relative", width: "100%", textAlign: "center" }}>
                              {console.log(`🖼️ Rendering image for: ${msg.recipeName} | URL: ${msg.imageUrl}`)}

                              <img 
                                  src={msg.imageUrl} 
                                  alt={msg.recipeName} 
                                  style={{ 
                                      width: "100%", 
                                      maxHeight: "200px", 
                                      objectFit: "cover", 
                                      borderRadius: "10px" 
                                  }} 
                              />

                              {/* ✅ Favorite Button (Top-Right) */}
                              <button 
                                  onClick={() => handleToggleFavorite(msg.recipeId)}
                                  style={{
                                      position: "absolute",
                                      top: "10px",
                                      right: "10px",
                                      background: "rgba(255, 255, 255, 0.7)",
                                      border: "none",
                                      borderRadius: "50%",
                                      padding: "8px",
                                      cursor: "pointer"
                                  }}
                                  title={favoriteRecipes.includes(msg.recipeId) ? "Remove from Favorites" : "Add to Favorites"}
                              >
                                  <FavoriteIcon style={{ color: favoriteRecipes.includes(msg.recipeId) ? "#FF6347" : "#A9A9A9", fontSize: "24px" }} />
                              </button>
                          </div>
                      )}

                      {msg.isDatePicker && (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <div style={{ textAlign: "center", marginTop: "8px" }}>
                                  <DatePicker
                                      value={selectedDate}
                                      onChange={(newDate) => handleDateSelect(newDate)} // ✅ Use correct function
                                      disablePast
                                      label="Select a Date"
                                  />
                              </div>
                          </LocalizationProvider>
                      )}

                      <div className="message-content">{msg.content}</div>
                  </div>
              ))}
        </div>


        {error && <p className="error-message">{error}</p>}
        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me anything..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(userInput) && setUserInput('')}
          />
          <button onClick={() => sendMessage(userInput)}>Send</button>
          <button onClick={toggleListening} className={isListening ? "listening" : ""}>
            {isListening ? <MicOffIcon /> : <MicIcon />}
          </button>
          <button onClick={toggleSpeech}>
            {isSpeaking ? <StopIcon /> : <VolumeUpIcon />} {/* ✅ Show Stop Icon when speaking */}
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default ChatAssistant;
