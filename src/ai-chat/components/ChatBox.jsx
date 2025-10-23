import { useState, useEffect, useRef } from 'react';  
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';  
import Message from './Message';  

const ChatBox = () => {

  const containerRef = useRef(null)
  const { selectedChat, theme } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('text');  
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {

    e.preventDefault();
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
    <div className='flex-1 flex flex-col h-screen max-md:mt-14 bg-white dark:bg-[#1A1A2E]'>
      
      {/* Chat Messages */}
      <div ref={containerRef} className='flex-1 overflow-y-auto m-5 md:m-10 xl:mx-30 2xl:pr-40 mb-0'>
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

      {mode === 'image' && (
        <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto">
          <p className='text-xs'>Publish Generated Image to Community </p>
          <input type="checkbox" className='cursor-pointer' checked={isPublished} 
          onChange={(e)=>setIsPublished(e.target.checked)}/>
        </label>
      )}

     {/* {Prompt input box} */}
        <form 
          onSubmit={onSubmit} 
          className='flex items-center gap-4 p-3 border mb-5 w-full max-w-4xl pl-4 mx-auto border-gray-300 dark:border-white/20 rounded-full bg-white dark:bg-[#1A1A2E]'
        >
          <select 
            onChange={(e) => setMode(e.target.value)} 
            value={mode}
            className='text-sm pl-3 pr-2 outline-none bg-transparent text-gray-900 dark:text-white'
          >
            <option className='dark:bg-purple-900' value="text">Text</option>
            <option className='dark:bg-purple-900' value="image">Image</option>
          </select>
          <input 
            onChange={(e) => setPrompt(e.target.value)} 
            value={prompt} 
            type="text" 
            placeholder="Type your prompt here..." 
            className='flex-1 w-full text-sm outline-none bg-transparent text-gray-900 dark:text-white' 
            required
          />
          <button disabled={loading} type="submit">
            <img 
              src={loading ? assets.stop_icon : assets.send_icon} 
              className='w-8 cursor-pointer' 
              alt="" 
            />
          </button>
        </form>
      </div>
   
  );
};

export default ChatBox;
