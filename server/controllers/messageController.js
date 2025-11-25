import axios from "axios"
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import imagekit from "../configs/imageKit.js"
import openai from "../configs/openai.js"

// text based ai chat message controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id

        // check credits
        if(req.user.credits < 1){
            return res.json({success: false, message: "You don't have enough credits to use this feature."})
        }

        const {chatId, prompt} = req.body

        const chat = await Chat.findOne({userId, _id: chatId})
        chat.messages.push({role: "user", content: prompt, timestamp: Date.now(), isImage: false})

        // UPDATED: Add system prompt with medical-only restriction
        const {choices} = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
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

If there's ANY doubt the question is medical/healthcare related, you MUST refuse.
Keep responses under 200 words. Always recommend consulting healthcare professionals for serious concerns.`
                },
                // Add conversation history for context
                ...chat.messages.slice(-10).map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.5,
            max_tokens: 800,
        });

        const reply = {...choices[0].message, timestamp: Date.now(), isImage: false}
        res.json({success: true, reply})

        chat.messages.push(reply)
        await chat.save()

        await User.updateOne({_id: userId}, {$inc: {credits: -1}})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// image generation message controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // check credits
        if(req.user.credits < 2){
            return res.json({success: false, message: "You don't have enough credits to use this feature."})
        }
        
        const {prompt, chatId, isPublished} = req.body
        
        //Find chat
        const chat = await Chat.findOne({userId, _id: chatId})

        // Push user message
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        });

        //encode the prompt
        const encodedPrompt = encodeURIComponent(prompt)

        // construct imagekit ai generation url
        const generatedImageUrl = `${process.env.IMAGE_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/medicare/${Date.now()}.png?tr=w-800,h-800`

        //trigger generation by fetching from imagekit
        const aiImageResponse = await axios.get(generatedImageUrl, {responseType: "arraybuffer"})

        //convert to base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString('base64')}`;

        //upload to imagekit media library
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "medicare-ai"
        })

        const reply = {
            role: 'assistant',
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }

        res.json({success: true, reply})

        chat.messages.push(reply)
        await chat.save()

        await User.updateOne({_id: userId}, {$inc: {credits: -2}})
        
    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}
