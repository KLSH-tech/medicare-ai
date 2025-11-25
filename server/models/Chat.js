import mongoose from "mongoose";
import openai from "../configs/openai.js";

const ChatSchema = new mongoose.Schema({
    userId : {type: String, ref: 'User', required: true},
    userName : {type: String, required: true},
    name : {type: String, required: true},
    messages: [{
        isImage: { type: Boolean, required: true},
        isPublished: { type: Boolean, default: false},
        role: { type: String, required: true},
        content: { type: String, required: true},
        timestamp: { type: Number, required: true},
    }
  ]
}, {timestamps: true})

const Chat = mongoose.model('Chat', ChatSchema)


export default Chat; 

export const sendMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, message } = req.body;

    // Find the chat
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.json({ success: false, message: "Chat not found" });
    }

    // Add user message to chat history
    chat.messages.push({
      isImage: false,
      isPublished: false,
      role: "user",
      content: message,
      timestamp: Date.now()
    });

    // Prepare messages for OpenAI API format
    const messages = [
      {
        role: "system",
        content: `You are Medicare AI, a professional medical health assistant. 

STRICT RULES:
- ONLY respond to health, medical, and healthcare-related questions
- Topics include: symptoms, diseases, medications, treatments, prevention, nutrition, mental health, fitness, medical procedures, wellness, first aid
- If a question is NOT related to health or medicine, politely refuse with: "I'm Medicare AI, and I can only assist with healthcare and medical-related questions. Please ask me about health topics."
- Keep responses clear, accurate, and helpful (max 200 words)
- Never provide medical diagnoses - always recommend consulting healthcare professionals for serious health concerns
- Be empathetic and supportive in your responses`
      },
      // Add conversation history (last 10 messages for context)
      ...chat.messages.slice(-11).map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      }))
    ];

    // Call Gemini API via OpenAI SDK
    const completion = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: messages,
      temperature: 0.7,
      max_tokens: 800,
    });

    const aiResponse = completion.choices[0].message.content;

    // Add AI response to chat history
    chat.messages.push({
      isImage: false,
      isPublished: false,
      role: "assistant",
      content: aiResponse,
      timestamp: Date.now()
    });

    // Update chat name with first user message (if still "New Chat")
    if (chat.name === "New Chat" && chat.messages.length === 2) {
      chat.name = message.substring(0, 50) + (message.length > 50 ? "..." : "");
    }

    await chat.save();

    res.json({ 
      success: true, 
      message: aiResponse,
      chat: chat 
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.json({ success: false, message: error.message || "Failed to get AI response" });
  }
};