import { useState, useEffect, useRef } from 'react';  
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';  
import Message from './Message';  
import toast from 'react-hot-toast';

const ChatBox = () => {
  const containerRef = useRef(null)
  const { selectedChat, theme, user, axios, token, setUser, } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('text');  
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    try {
       e.preventDefault()
       if(!user) return toast('Log in to send message')
        setLoading(true)
      const promptCopy = prompt
      setPrompt('')
      setMessages(prev => [...prev, {role: 'user', content: prompt, timestamp: Date.now(), isImage: false}])
      const {data} = await axios.post(`/api/message/${mode}`, {chatId: selectedChat._id, prompt, isPublished},{headers: {Authorization: token }})
      if(data.success){
        setMessages(prev => [...prev, data.reply])
        //decrease credits
        if (mode ==='image'){
          setUser(prev => ({...prev, credits: prev.credits - 2}))
        }else{
          setUser(prev => ({...prev, credits: prev.credits - 1}))          
        }
      }else {
        toast.error(data.message)
        setPrompt(promptCopy)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setPrompt('')
      setLoading(false)
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  },[messages])

  return (
    <div className='flex flex-col h-screen max-md:mt-14 bg-white dark:bg-[#1A1A2E]'>
      
      {/* Chat Messages */}
      <div ref={containerRef} className='flex-1 overflow-y-auto px-4 md:px-10 xl:px-30 2xl:pr-40 pt-5 pb-32 md:pb-5'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <img 
              src={theme === 'dark' ? assets.logo_full_dark : assets.purple_dark} 
              alt="" 
              className='w-full max-w-56 sm:max-w-68'
            />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
              Ask me about your health.
            </p>
          </div>
        )}

        {messages.map((message, index) => 
          <Message key={index} message={message} />
        )}

        {loading && (
          <div className='loader flex items-center gap-1.5'>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          </div>
        )}
      </div>

      {/* Input Section - Fixed at bottom on mobile */}
      <div className='fixed md:relative bottom-0 left-0 right-0 bg-white dark:bg-[#1A1A2E] border-t border-gray-200 dark:border-white/20 md:border-t-0 pb-safe'>
        {mode === 'image' && (
          <label className="flex items-center justify-center gap-2 py-2 text-sm">
            <p className='text-xs dark:text-white'>Publish Generated Image to Community</p>
            <input 
              type="checkbox" 
              className='cursor-pointer' 
              checked={isPublished} 
              onChange={(e)=>setIsPublished(e.target.checked)}
            />
          </label>
        )}

        {/* Prompt input box */}
        <form 
          onSubmit={onSubmit} 
          className='flex items-center gap-2 md:gap-4 p-3 mx-3 md:mx-auto mb-3 md:mb-5 w-auto md:max-w-4xl border border-gray-300 dark:border-white/20 rounded-full bg-white dark:bg-[#1A1A2E]'
        >
          <select 
            onChange={(e) => setMode(e.target.value)} 
            value={mode}
            className='text-xs md:text-sm pl-2 md:pl-3 pr-1 md:pr-2 outline-none bg-transparent text-gray-900 dark:text-white'
          >
            <option className='dark:bg-purple-900' value="text">Text</option>
            <option className='dark:bg-purple-900' value="image">Image</option>
          </select>
          <input 
            onChange={(e) => setPrompt(e.target.value)} 
            value={prompt} 
            type="text" 
            placeholder="Type your prompt here..." 
            className='flex-1 text-sm outline-none bg-transparent text-gray-900 dark:text-white min-w-0' 
            required
          />
          <button disabled={loading} type="submit" className='flex-shrink-0'>
            <img 
              src={loading ? assets.stop_icon : assets.send_icon} 
              className='w-7 md:w-8 cursor-pointer' 
              alt="" 
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
