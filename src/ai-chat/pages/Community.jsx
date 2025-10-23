import { useEffect, useState } from "react"
import { dummyPublishedImages } from "../assets/assets"
import Loading from "./Loading"

const Community = () => {
  const [ images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // For future filtering functionality

  const fetchImages = async() => {
    setImages(dummyPublishedImages)
    setLoading(false)
  }

  useEffect(()=>{
    fetchImages()
  },[])

  if(loading) return <Loading />

  return (
    <div className="flex-1 flex flex-col h-screen bg-white dark:bg-[#1A1A2E] overflow-y-scroll">
      {/* Background gradient orbs */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-0 right-1/4 w-96 h-96 bg-radial-gradient from-color-6/10 to-transparent blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/3 left-1/4 w-96 h-96 bg-radial-gradient from-color-5/10 to-transparent blur-3xl animate-pulse [animation-delay:1.5s]'></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16 w-full">
        {/* Header Section */}
        <div className='mb-12 space-y-4'>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div>
              <p className='tagline text-color-5 mb-2'>COMMUNITY SHOWCASE</p>
              <h1 className='h2 text-gray-900 dark:text-n-1'>
                Created by Our Community
              </h1>
              <p className='body-2 text-n-4 dark:text-n-3 mt-2 max-w-2xl'>
                Browse medical education resources and health awareness images shared by our community
              </p>
            </div>

            {/* Stats Badge */}
            <div className='flex items-center gap-6'>
              <div className='text-center'>
                <p className='text-2xl font-bold text-gray-900 dark:text-n-1'>{images.length}</p>
                <p className='caption text-n-4 dark:text-n-3'>Images</p>
              </div>
              <div className='h-10 w-px bg-n-3/20'></div>
              <div className='text-center'>
                <p className='text-2xl font-bold text-gray-900 dark:text-n-1'>
                  {new Set(images.map(img => img.userName)).size}
                </p>
                <p className='caption text-n-4 dark:text-n-3'>Artists</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        {images.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {images.map((item, index) => (
              <a
                key={index}
                href={item.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block break-inside-avoid mb-5"
              >
                {/* Glassmorphism Card */}
                <div className='relative rounded-2xl overflow-hidden bg-white/60 dark:bg-n-7/60 backdrop-blur-xl border border-n-3/20 dark:border-n-5/20 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-color-5/50'>
                  
                  {/* Image */}
                  <div className='relative overflow-hidden'>
                    <img
                      src={item.imageUrl}
                      alt={`Created by ${item.userName}`}
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay on hover */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>

                  {/* Creator Info - Shows on Hover */}
                  <div className='absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                    <div className='flex items-center gap-3'>
                      {/* Avatar Circle */}
                      <div className='w-10 h-10 rounded-full bg-gradient-to-br from-color-1 to-color-5 flex items-center justify-center flex-shrink-0 shadow-lg'>
                        <span className='text-white font-semibold text-sm'>
                          {item.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Creator Name */}
                      <div className='flex-1 min-w-0'>
                        <p className='caption text-white font-medium truncate'>
                          {item.userName}
                        </p>
                        <p className='text-xs text-white/70'>
                          Community Artist
                        </p>
                      </div>

                      {/* External Link Icon */}
                      <svg 
                        className='w-5 h-5 text-white flex-shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1' 
                        fill='none' 
                        viewBox='0 0 24 24' 
                        stroke='currentColor'
                      >
                        <path 
                          strokeLinecap='round' 
                          strokeLinejoin='round' 
                          strokeWidth={2} 
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' 
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Corner Badge */}
                  <div className='absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <p className='text-xs text-white font-medium'>View</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          // Empty State
          <div className='flex flex-col items-center justify-center py-24'>
            <div className='w-20 h-20 rounded-full bg-gradient-to-br from-color-1/20 to-color-5/20 flex items-center justify-center mb-6'>
              <svg className='w-10 h-10 text-color-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
            <h3 className='h4 text-gray-900 dark:text-n-1 mb-2'>No Images Yet</h3>
            <p className='body-2 text-n-4 dark:text-n-3 text-center max-w-md'>
              Be the first to share your AI-generated masterpiece with the community
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Community
