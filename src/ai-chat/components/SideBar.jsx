import { useAppContext } from '../context/AppContext'
import { useState, useEffect } from 'react';  
import { assets } from './../assets/assets'
import moment from 'moment'
import toast from 'react-hot-toast';


const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {chats, setSelectedChat, theme, setTheme, user, navigate, createNewChat, axios, setChats, fetchUsersChats, setToken, token} = useAppContext()
  const [search, setSearch] = useState('');

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    toast.success('Logged out successfully!')
  }

  const deleteChat = async (e, chatId) => {
    try {
        e.stopPropagation()
        const confirm = window.confirm('Are you sure you want to delete this chat?')
        if(!confirm) return
        const {data} = await axios.post('/api/chat/delete', {chatId}, {headers: {Authorization: token}})
        if(data.success){
          setChats(prev => prev.filter(chat => chat._id !== chatId))
          await fetchUsersChats()
          toast.success(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const handleLogoClick = () => {
    navigate('/'); 
    setIsMenuOpen(false); 
  };

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Overlay - closes sidebar when clicked */}
      {isMenuOpen && (
        <div 
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`flex flex-col h-screen min-w-72 p-5
        bg-white bg-opacity-110 backdrop-blur-sm
        dark:bg-[#1A1A2E]/95 dark:backdrop-blur-xl
        dark:border-[#5A5470]/70
        border-r border-gray-200 
        transition-all duration-500 max-md:fixed left-0 z-50
        ${!isMenuOpen && 'max-md:-translate-x-full'}`}>

        {/* {LOGO} */}
        <div>
          <img 
            src={theme === 'dark' ? assets.logo_full_dark : assets.purple_dark} 
            alt="Logo" 
            className='w-full max-w-48 cursor-pointer' 
            onClick={handleLogoClick} 
          />
        </div>

        {/* {New Chat Button} */}
        <button onClick={createNewChat} className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer'>
          <span className='mr-2 text-xl'>+</span> New Chat
        </button>

        {/* Search Conversation */}
        <div className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/20 rounded-md bg-white dark:bg-[#57317C]/10'>
          <img 
            src={assets.search_icon} 
            alt="Search Icon" 
            className='w-4 invert dark:invert-0' 
          />
          <input 
            type="text" 
            onChange={(e) => setSearch(e.target.value)} 
            value={search} 
            placeholder='Search Conversation' 
            className='flex-1 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none bg-transparent' 
          />
        </div>

        {/* Recent Chats */}
        {chats.length > 0 && <p className='mt-4 text-sm text-gray-900 dark:text-white'>Recent Chats</p>}
        <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3'>
          {chats.filter(chat => 
            chat.messages[0]
              ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          ).map(chat => (
            <div
              key={chat._id}
              onClick={() => { navigate('/chat'); setSelectedChat(chat); setIsMenuOpen(false); }}
              className='p-2 px-4 dark:bg-[#57317C]/10 bg-gray-50 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between items-center group hover:bg-gray-200 dark:hover:bg-[#57317C]/20 transition-all'
            >
              <div className='min-w-0 flex-1'>
                <p className='truncate w-full text-gray-900 dark:text-white'>
                  {chat.messages.length > 0 ? chat.messages[0].content.slice(0,32) : chat.name}
                </p>
                <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <img onClick={e=> toast.promise(deleteChat(e, chat._id), {loading: 'deleting...'})}
                src={assets.bin_icon}
                alt="Delete"
                className='w-4 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 invert dark:invert-0'
              />
            </div>
          ))}
        </div>

        {/* {Community Image} */}
        <div onClick={()=>{navigate('/community'); setIsMenuOpen(false)}} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
          <img src={assets.gallery_icon} className='w-5 invert dark:invert-0' alt="" />
          <div className='flex flex-col text-sm'>
            <p>Community Image</p>
          </div>
        </div>

        {/* {Resource Map} */}
<div onClick={()=>{navigate('/resource-map'); setIsMenuOpen(false)}} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
  <img src={assets.map_icon} className='w-5 invert dark:invert-0' alt="" />
  <div className='flex flex-col text-sm'>
    <p>Resource Map</p>
    <p className='text-xs text-gray-400'>Find nearby medical facilities</p>
  </div>
</div>


        {/* {Credit Option} */}
        <div onClick={()=>{navigate('/credits'); setIsMenuOpen(false)}} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
          <img src={assets.diamond_icon} className='w-5 dark:invert' alt="" />
          <div className='flex flex-col text-sm'>
            <p>Credits : {user?.credits}</p>
            <p className='text-xs text-gray-400'>Purchase credits to access more Features</p>
          </div>
        </div>

        

        {/* [dark mode toggle] */}
        <div className='flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md '>
          <div className='flex items-center gap-2 text-sm'>
            <img src={assets.theme_icon} className="w-4 invert dark:invert-0" alt="theme icon" />
            <p>Dark Mode</p>
          </div>
          <label className='relative inline-flex cursor-pointer'>
            <input onChange={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} type="checkbox" className='sr-only peer' checked={theme === 'dark'} />
            <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'>
            </div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
          </label>
        </div>

        {/* {user account} */}
        <div className='flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group'>
          <img src={assets.user_icon} className='w-7 rounded-full' alt="" />
          <p className='flex-1 text-sm dark:text-primary truncate'>{user ? user.name : 'Login your account'}</p>
          {user && (
            <img onClick={logout}
              src={assets.logout_icon} 
              alt="Logout" 
              className="h-5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 invert dark:invert-0" 
            />
          )}
        </div>

        <img 
          onClick={() => setIsMenuOpen(false)}
          src={assets.close_icon}
          className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden invert dark:invert-0"
          alt="Close"
        />
      </div>
    </>
  );
}

export default SideBar;
