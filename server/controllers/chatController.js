import Chat from "../models/Chat.js"
import openai from "../configs/openai.js";

// api controller for creating a new chat
export const createChat = async(req, res) => {
    try {
        const userId = req.user._id

        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name
        }

        await Chat.create(chatData)
        res.json({success: true, message: "Chat created!"})
    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}

// api controller for getting all chats
export const getChat = async(req, res) => {
    try {
        const userId = req.user._id
        const chats = await Chat.find({userId}).sort({ updatedAt: -1 })
        
        res.json({success: true, chats})
    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}

// api controller for deleting a chat
export const deleteChat = async(req, res) => {
    try {
        const userId = req.user._id
        const {chatId} = req.body
       
        await Chat.deleteOne({_id: chatId, userId})
        
        res.json({success: true, message: "Chat deleted!"})
    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}

// Send message to AI
export const sendMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, message } = req.body;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.json({ success: false, message: "Chat not found" });
    }

    chat.messages.push({
      isImage: false,
      isPublished: false,
      role: "user",
      content: message,
      timestamp: Date.now()
    });

    const messages = [
      {
        role: "system",
        content: `You are Medicare AI. You MUST follow these rules WITHOUT EXCEPTION:

CRITICAL INSTRUCTIONS:
1. You ONLY answer questions about: health, medicine, diseases, symptoms, treatments, medications, nutrition, mental health, fitness, medical procedures, wellness, healthcare systems, and first aid.

2. For ANY question NOT related to healthcare or medicine, you MUST respond EXACTLY with: "I'm Medicare AI, and I can only assist with healthcare and medical-related questions. Please ask me about health topics."

3. NON-MEDICAL TOPICS YOU MUST REFUSE:
   - Weather, sports, entertainment, politics, general technology
   - Cooking (unless nutrition/diet related), travel, general knowledge
   - Math, programming, business, jokes, stories
   - ANY topic outside healthcare/medicine

4. REFUSE these types of questions:
   - "What's the capital of France?" → REFUSE
   - "Tell me a joke" → REFUSE
   - "How to code?" → REFUSE
   - "What's the weather?" → REFUSE
   
5. ANSWER these types of questions:
   - "What are symptoms of flu?" → ANSWER
   - "How to reduce stress?" → ANSWER
   - "What foods help heart health?" → ANSWER

If there's ANY doubt the question is medical/healthcare related, you MUST refuse.
Keep responses under 200 words. Always recommend consulting healthcare professionals for serious concerns.`
      },
      ...chat.messages.slice(-11).map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      }))
    ];

    const completion = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: messages,
      temperature: 0.5,
      max_tokens: 800,
    });

    const aiResponse = completion.choices[0].message.content;

    chat.messages.push({
      isImage: false,
      isPublished: false,
      role: "assistant",
      content: aiResponse,
      timestamp: Date.now()
    });

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
