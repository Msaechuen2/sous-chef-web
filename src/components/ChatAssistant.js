import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatAssistant.css';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop'; 
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
  const [messages, setMessages] = useState(
    JSON.parse(sessionStorage.getItem('chatHistory')) || [] 
  );
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); 
  const recognitionRef = useRef(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isAddingToMealPlan, setIsAddingToMealPlan] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isTyping, setIsTyping] = useState(false);


  const [typingDots, setTypingDots] = useState("");

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      setTypingDots(prev => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, [isTyping]);


  const handleToggleFavorite = async (recipeId) => {
    if (!user) {
        alert("You must be logged in to manage favorites.");
        return;
    }

    try {
        if (favoriteRecipes.includes(recipeId)) {
            await removeRecipeFromFavorites(recipeId); 
            setFavoriteRecipes((prev) => prev.filter((id) => id !== recipeId));
            console.log(`Removed recipe ${recipeId} from favorites`);
        } else {
            await addRecipeToFavorites(recipeId); 
            setFavoriteRecipes((prev) => [...prev, recipeId]);
            console.log(`Added recipe ${recipeId} to favorites`);
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
            setFavoriteRecipes(favorites.map((fav) => fav._id)); 
        } catch (error) {
            console.error("Error fetching favorite recipes:", error);
        }
    };

    fetchFavorites();
  }, [user]);



  useEffect(() => {
    setMessages([]);
    sessionStorage.removeItem("chatHistory");
  }, []);




  useEffect(() => {
    sessionStorage.setItem('chatHistory', JSON.stringify(messages)); 
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

  const toggleSpeech = () => {
    if (isSpeaking) {
      speechSynthesis.cancel(); 
      setIsSpeaking(false);
    } else {
      if (messages.length === 0) return;

      const lastMessage = messages[messages.length - 1].content;
      const utterance = new SpeechSynthesisUtterance(lastMessage);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;

      utterance.onend = () => setIsSpeaking(false); 

      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    if (message.toLowerCase().includes("meal plan")) {
        if (!selectedRecipe) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "assistant", content: "No recipe selected. Please specify a recipe first." }
            ]);
            return;
        }

        setIsAddingToMealPlan(true);
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: "Select a date for your meal", isDatePicker: true }
        ]);
        return;
    }

    setMessages((prevMessages) => [...prevMessages, { role: "user", content: message }]);
    setIsTyping(true); 
    try {
        const response = await axios.post("http://localhost:5001/api/chat", {
            userId: user ? user._id : "guest",
            message
        });

        console.log("Chatbot Response:", response.data);

        const assistantMessage = {
            role: "assistant",
            content: response.data.reply,
            recipeId: response.data.recipeId,
            recipeName: response.data.recipeName,
            imageUrl: response.data.imageUrl
        };

        console.log(`Debug: Recipe Image URL received -> ${assistantMessage.imageUrl}`);

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);

        if (response.data.recipeId) {
            setSelectedRecipe(response.data);
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
      setIsTyping(false); 
      setUserInput(""); 
    }
  };


  const handleSaveMealPlan = async (date) => {
    if (!selectedRecipe) {
        alert("No recipe selected. Please ask for a recipe first.");
        return;
    }

    const formattedMealPlan = {
        date: date, 
        meals: [
            {
                title: selectedRecipe.recipeName,
                recipeId: selectedRecipe.recipeId,
                recipeName: selectedRecipe.recipeName,
                imageUrl: selectedRecipe.imageUrl || "", 
            },
        ],
    };

    console.log("Sending Meal Plan:", formattedMealPlan); 

    try {
        const response = await saveMealPlan(formattedMealPlan);
        console.log("Meal Plan Response:", response);

        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: `"${selectedRecipe.recipeName}" added to your meal plan for ${formattedMealPlan.date}.` }
        ]);
    } catch (error) {
        console.error("Error saving meal plan:", error);
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: "Failed to save meal plan. Please try again." }
        ]);
    }
  };




  const handleDateSelect = (newDate) => {
    if (!newDate) {
        console.error("Invalid date selected");
        return;
    }

    const formattedDate = dayjs(newDate); 
    setSelectedDate(formattedDate);
    setIsAddingToMealPlan(false); 

    console.log("Selected Date:", formattedDate.format("YYYY-MM-DD"));

    handleSaveMealPlan(formattedDate.format("YYYY-MM-DD"));
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
              
              {isTyping && (
                <div className="message assistant" style={{
                  padding: "12px",
                  borderRadius: "10px",
                  backgroundColor: "#f1f1f1",
                  marginBottom: "8px",
                  color: "#888"
                }}>
                  Sous Chef is typing{typingDots}
                </div>
              )}
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
